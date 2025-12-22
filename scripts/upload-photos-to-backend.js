const fs = require('fs');
const path = require('path');
const FormData = require('form-data');
const fetch = require('node-fetch');

// Configuration
const API_BASE_URL = process.env.API_URL || 'http://localhost:3000';
const CATALOG_FILE = path.join(__dirname, '../public/data/photo-catalog.json');
const PROGRESS_FILE = path.join(__dirname, '../temp-downloads/upload-progress.json');
const IMAGES_BASE = path.join(__dirname, '../public/images');

// Upload configuration
const BATCH_SIZE = 5; // Upload 5 photos at a time
const RETRY_ATTEMPTS = 3;
const RETRY_DELAY = 2000; // 2 seconds

class PhotoUploader {
  constructor() {
    this.catalog = null;
    this.progress = {
      uploaded: [],
      failed: [],
      total: 0,
      currentIndex: 0
    };
    this.authToken = null;
  }

  // Load catalog and progress
  async init() {
    console.log('Initializing photo uploader...\n');

    // Load catalog
    if (!fs.existsSync(CATALOG_FILE)) {
      throw new Error(`Catalog file not found: ${CATALOG_FILE}`);
    }

    this.catalog = JSON.parse(fs.readFileSync(CATALOG_FILE, 'utf8'));
    this.progress.total = this.catalog.photos.length;

    console.log(`Loaded catalog with ${this.progress.total} photos`);
    console.log(`Categories:`);
    Object.entries(this.catalog.categories).forEach(([key, cat]) => {
      console.log(`  - ${cat.name}: ${cat.count} photos`);
    });

    // Load existing progress if available
    if (fs.existsSync(PROGRESS_FILE)) {
      const savedProgress = JSON.parse(fs.readFileSync(PROGRESS_FILE, 'utf8'));
      this.progress = { ...this.progress, ...savedProgress };
      console.log(`\nResuming from previous session:`);
      console.log(`  - Already uploaded: ${this.progress.uploaded.length}`);
      console.log(`  - Failed: ${this.progress.failed.length}`);
    }

    console.log('');
  }

  // Save progress to disk
  saveProgress() {
    const progressDir = path.dirname(PROGRESS_FILE);
    if (!fs.existsSync(progressDir)) {
      fs.mkdirSync(progressDir, { recursive: true });
    }
    fs.writeFileSync(PROGRESS_FILE, JSON.stringify(this.progress, null, 2));
  }

  // Authenticate with backend (placeholder - implement based on your auth system)
  async authenticate() {
    console.log('Authenticating with backend...');

    // TODO: Implement your authentication logic here
    // For now, assume the backend accepts requests without auth for admin operations
    // In production, you would:
    // 1. Load admin credentials from environment variables
    // 2. Call your login endpoint
    // 3. Store the auth token

    // Example:
    // const response = await fetch(`${API_BASE_URL}/api/auth/admin-login`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     email: process.env.ADMIN_EMAIL,
    //     password: process.env.ADMIN_PASSWORD
    //   })
    // });
    // const data = await response.json();
    // this.authToken = data.token;

    console.log('Authentication ready (using public upload endpoint)\n');
  }

  // Upload a single photo
  async uploadPhoto(photo, attempt = 1) {
    const imagePath = path.join(IMAGES_BASE, photo.category, photo.original_filename);

    if (!fs.existsSync(imagePath)) {
      throw new Error(`Image file not found: ${imagePath}`);
    }

    // Create form data
    const formData = new FormData();
    formData.append('photo', fs.createReadStream(imagePath));
    formData.append('caption', photo.caption || '');
    formData.append('description', photo.description || '');
    formData.append('category', photo.category || '');
    formData.append('tags', JSON.stringify(photo.tags || []));
    formData.append('license_type', photo.license_type || 'All Rights Reserved');
    formData.append('is_public', 'true');

    // Add optional fields
    if (photo.photographer_name) {
      formData.append('photographer_name', photo.photographer_name);
    }
    if (photo.location_name) {
      formData.append('location_name', photo.location_name);
    }
    if (photo.event) {
      formData.append('event', photo.event);
    }

    // Upload to backend
    const headers = formData.getHeaders();
    if (this.authToken) {
      headers['Authorization'] = `Bearer ${this.authToken}`;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/photos/upload`, {
        method: 'POST',
        body: formData,
        headers: headers
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      if (attempt < RETRY_ATTEMPTS) {
        console.log(`  Retry ${attempt}/${RETRY_ATTEMPTS} after ${RETRY_DELAY}ms...`);
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
        return this.uploadPhoto(photo, attempt + 1);
      }
      throw error;
    }
  }

  // Upload all photos
  async uploadAll(options = {}) {
    const {
      dryRun = false,
      categoriesFilter = null,
      limit = null
    } = options;

    if (dryRun) {
      console.log('DRY RUN MODE - No actual uploads will be performed\n');
    }

    await this.init();

    if (!dryRun) {
      await this.authenticate();
    }

    // Filter photos
    let photosToUpload = this.catalog.photos.filter(photo => {
      // Skip already uploaded
      if (this.progress.uploaded.includes(photo.id)) {
        return false;
      }

      // Filter by category if specified
      if (categoriesFilter && !categoriesFilter.includes(photo.category)) {
        return false;
      }

      return true;
    });

    // Apply limit if specified
    if (limit) {
      photosToUpload = photosToUpload.slice(0, limit);
    }

    console.log(`Uploading ${photosToUpload.length} photos...\n`);

    // Upload in batches
    for (let i = 0; i < photosToUpload.length; i++) {
      const photo = photosToUpload[i];
      const progress = `[${i + 1}/${photosToUpload.length}]`;

      try {
        console.log(`${progress} Uploading: ${photo.caption}`);
        console.log(`  Category: ${photo.category} | File: ${photo.original_filename}`);

        if (!dryRun) {
          const result = await this.uploadPhoto(photo);
          this.progress.uploaded.push(photo.id);
          console.log(`  ✓ Success! Photo ID: ${result.data?.id || 'N/A'}`);
        } else {
          console.log(`  ✓ Would upload (dry run)`);
        }
      } catch (error) {
        console.error(`  ✗ Failed: ${error.message}`);
        this.progress.failed.push({
          id: photo.id,
          error: error.message,
          timestamp: new Date().toISOString()
        });
      }

      // Save progress after each upload
      if (!dryRun) {
        this.progress.currentIndex = i + 1;
        this.saveProgress();
      }

      console.log('');

      // Add small delay between uploads to avoid overwhelming the server
      if (!dryRun && i < photosToUpload.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }

    // Print summary
    console.log('\n' + '='.repeat(60));
    console.log('UPLOAD SUMMARY');
    console.log('='.repeat(60));
    console.log(`Total photos: ${this.progress.total}`);
    console.log(`Uploaded: ${this.progress.uploaded.length} ✓`);
    console.log(`Failed: ${this.progress.failed.length} ✗`);
    console.log(`Remaining: ${this.progress.total - this.progress.uploaded.length - this.progress.failed.length}`);

    if (this.progress.failed.length > 0) {
      console.log('\nFailed uploads:');
      this.progress.failed.forEach(failure => {
        console.log(`  - ${failure.id}: ${failure.error}`);
      });
    }

    console.log('\n');
  }

  // Upload specific categories
  async uploadCategory(category) {
    await this.uploadAll({ categoriesFilter: [category] });
  }

  // Reset progress
  resetProgress() {
    if (fs.existsSync(PROGRESS_FILE)) {
      fs.unlinkSync(PROGRESS_FILE);
      console.log('Progress reset successfully');
    }
  }
}

// CLI interface
if (require.main === module) {
  const args = process.argv.slice(2);
  const uploader = new PhotoUploader();

  const command = args[0] || 'help';

  (async () => {
    try {
      switch (command) {
        case 'all':
          await uploader.uploadAll();
          break;

        case 'dry-run':
          await uploader.uploadAll({ dryRun: true });
          break;

        case 'conference':
          await uploader.uploadCategory('conference');
          break;

        case 'historic':
          await uploader.uploadCategory('historic');
          break;

        case 'headshots':
          await uploader.uploadCategory('headshots');
          break;

        case 'logos':
          await uploader.uploadCategory('logos');
          break;

        case 'backgrounds':
          await uploader.uploadCategory('backgrounds');
          break;

        case 'test':
          await uploader.uploadAll({ limit: 5, dryRun: false });
          break;

        case 'reset':
          uploader.resetProgress();
          break;

        case 'help':
        default:
          console.log(`
Photo Upload Tool - Upload photos to ISRS backend

Usage:
  node upload-photos-to-backend.js <command>

Commands:
  all         Upload all photos
  dry-run     Simulate upload without actually uploading
  test        Upload first 5 photos as a test
  conference  Upload only conference photos
  historic    Upload only historic photos
  headshots   Upload only headshots
  logos       Upload only logos
  backgrounds Upload only backgrounds
  reset       Reset upload progress
  help        Show this help message

Environment Variables:
  API_URL          Backend API URL (default: http://localhost:3000)
  ADMIN_EMAIL      Admin email for authentication
  ADMIN_PASSWORD   Admin password for authentication

Examples:
  node upload-photos-to-backend.js dry-run
  node upload-photos-to-backend.js test
  node upload-photos-to-backend.js conference
  API_URL=https://isrs-database-backend.onrender.com node upload-photos-to-backend.js all
          `);
          break;
      }
    } catch (error) {
      console.error('Error:', error.message);
      process.exit(1);
    }
  })();
}

module.exports = { PhotoUploader };
