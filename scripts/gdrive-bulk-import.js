#!/usr/bin/env node
/**
 * Google Drive Bulk Image Import Script
 * Downloads images from Google Drive folders and imports them to ISRS database with AI analysis
 *
 * Usage:
 *   node scripts/gdrive-bulk-import.js --folder-id=FOLDER_ID --category=logos
 *
 * Setup:
 *   1. Create Google Cloud Project: https://console.cloud.google.com
 *   2. Enable Google Drive API
 *   3. Create Service Account and download JSON key
 *   4. Share your Drive folder with the service account email
 *   5. Save key as scripts/google-credentials.json
 */

const fs = require('fs');
const path = require('path');
const { google } = require('googleapis');
const axios = require('axios');
const FormData = require('form-data');

// Configuration
const CREDENTIALS_PATH = path.join(__dirname, 'google-credentials.json');
const DOWNLOAD_DIR = path.join(__dirname, '../temp-downloads');
const API_BASE_URL = process.env.API_URL || 'https://isrs-database-backend.onrender.com';

// Categories for organizing assets
const CATEGORIES = {
  LOGOS: 'logos',
  HEADSHOTS: 'headshots',
  BACKGROUNDS: 'backgrounds',
  CONFERENCE: 'conference',
  FIELD_WORK: 'field_work',
  SPECIES: 'species'
};

class GDriveBulkImporter {
  constructor() {
    this.drive = null;
    this.downloadedFiles = [];
    this.processedFiles = [];
    this.errors = [];
  }

  /**
   * Initialize Google Drive API client
   */
  async initialize() {
    console.log('🔐 Initializing Google Drive API...');

    if (!fs.existsSync(CREDENTIALS_PATH)) {
      throw new Error(`Credentials file not found at: ${CREDENTIALS_PATH}\n\nPlease follow setup instructions in the script header.`);
    }

    const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, 'utf8'));
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/drive.readonly']
    });

    this.drive = google.drive({ version: 'v3', auth });
    console.log('✅ Google Drive API initialized\n');
  }

  /**
   * Create download directory if it doesn't exist
   */
  ensureDownloadDir() {
    if (!fs.existsSync(DOWNLOAD_DIR)) {
      fs.mkdirSync(DOWNLOAD_DIR, { recursive: true });
      console.log(`📁 Created download directory: ${DOWNLOAD_DIR}\n`);
    }
  }

  /**
   * List all files in a Google Drive folder
   */
  async listFolderContents(folderId) {
    console.log(`📋 Listing contents of folder: ${folderId}`);

    const files = [];
    let pageToken = null;

    do {
      const response = await this.drive.files.list({
        q: `'${folderId}' in parents and trashed=false`,
        fields: 'nextPageToken, files(id, name, mimeType, size, createdTime, modifiedTime)',
        pageSize: 100,
        pageToken
      });

      files.push(...response.data.files);
      pageToken = response.data.nextPageToken;
    } while (pageToken);

    console.log(`   Found ${files.length} items\n`);
    return files;
  }

  /**
   * Download a file from Google Drive
   */
  async downloadFile(file, category) {
    const dest = path.join(DOWNLOAD_DIR, category, file.name);
    const destDir = path.dirname(dest);

    // Create category subdirectory
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }

    console.log(`⬇️  Downloading: ${file.name}`);

    try {
      const response = await this.drive.files.get(
        { fileId: file.id, alt: 'media' },
        { responseType: 'stream' }
      );

      const writer = fs.createWriteStream(dest);
      response.data.pipe(writer);

      await new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
      });

      console.log(`   ✓ Saved to: ${dest}`);

      return {
        originalName: file.name,
        localPath: dest,
        size: file.size,
        mimeType: file.mimeType,
        category,
        driveMetadata: {
          id: file.id,
          createdTime: file.createdTime,
          modifiedTime: file.modifiedTime
        }
      };
    } catch (error) {
      console.error(`   ✗ Failed to download: ${error.message}`);
      this.errors.push({ file: file.name, error: error.message });
      return null;
    }
  }

  /**
   * Determine category from folder structure or filename
   */
  detectCategory(fileName, folderName = '') {
    const name = (fileName + ' ' + folderName).toLowerCase();

    if (name.includes('logo')) return CATEGORIES.LOGOS;
    if (name.includes('headshot') || name.includes('portrait')) return CATEGORIES.HEADSHOTS;
    if (name.includes('background') || name.includes('bg')) return CATEGORIES.BACKGROUNDS;
    if (name.includes('conference') || name.includes('icsr')) return CATEGORIES.CONFERENCE;
    if (name.includes('field') || name.includes('restoration')) return CATEGORIES.FIELD_WORK;
    if (name.includes('oyster') || name.includes('clam') || name.includes('mussel')) return CATEGORIES.SPECIES;

    return 'uncategorized';
  }

  /**
   * Upload file to ISRS backend with AI analysis
   */
  async uploadToBackend(fileInfo, options = {}) {
    console.log(`📤 Uploading to backend: ${fileInfo.originalName}`);

    try {
      const formData = new FormData();
      formData.append('photo', fs.createReadStream(fileInfo.localPath));
      formData.append('category', fileInfo.category);
      formData.append('is_public', options.isPublic || false);

      if (options.caption) formData.append('caption', options.caption);
      if (options.tags) formData.append('tags', JSON.stringify(options.tags));

      const response = await axios.post(
        `${API_BASE_URL}/api/photos/upload`,
        formData,
        {
          headers: {
            ...formData.getHeaders(),
            'Authorization': `Bearer ${options.authToken}`
          },
          maxBodyLength: Infinity,
          maxContentLength: Infinity
        }
      );

      console.log(`   ✓ Upload successful`);
      if (response.data.ai_analysis) {
        console.log(`   🤖 AI detected: ${response.data.ai_analysis.description || 'N/A'}`);
      }

      return response.data;
    } catch (error) {
      console.error(`   ✗ Upload failed: ${error.message}`);
      this.errors.push({ file: fileInfo.originalName, error: error.message });
      return null;
    }
  }

  /**
   * Process a single folder
   */
  async processFolder(folderId, options = {}) {
    const category = options.category || 'uncategorized';
    console.log(`\n${'='.repeat(60)}`);
    console.log(`📂 Processing folder: ${folderId}`);
    console.log(`   Category: ${category}`);
    console.log(`   Privacy: ${options.isPublic ? 'Public' : 'Private'}`);
    console.log(`${'='.repeat(60)}\n`);

    // List files
    const files = await this.listFolderContents(folderId);
    const imageFiles = files.filter(f =>
      f.mimeType.startsWith('image/') ||
      f.name.match(/\.(jpg|jpeg|png|gif|webp)$/i)
    );

    console.log(`🖼️  Found ${imageFiles.length} image files\n`);

    // Download files
    for (const file of imageFiles) {
      const fileInfo = await this.downloadFile(file, category);
      if (fileInfo) {
        this.downloadedFiles.push(fileInfo);
      }
    }

    // Upload to backend if auth token provided
    if (options.authToken && this.downloadedFiles.length > 0) {
      console.log(`\n📤 Uploading ${this.downloadedFiles.length} files to backend...\n`);

      for (const fileInfo of this.downloadedFiles) {
        const result = await this.uploadToBackend(fileInfo, options);
        if (result) {
          this.processedFiles.push({ ...fileInfo, backendId: result.id });
        }
      }
    }

    this.printSummary();
  }

  /**
   * Process multiple folders
   */
  async processFolders(folderConfigs) {
    for (const config of folderConfigs) {
      await this.processFolder(config.folderId, config.options);
    }
  }

  /**
   * Print summary of operations
   */
  printSummary() {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`📊 IMPORT SUMMARY`);
    console.log(`${'='.repeat(60)}`);
    console.log(`✓ Downloaded: ${this.downloadedFiles.length} files`);
    console.log(`✓ Processed:  ${this.processedFiles.length} files`);
    console.log(`✗ Errors:     ${this.errors.length}`);

    if (this.errors.length > 0) {
      console.log(`\n❌ ERRORS:`);
      this.errors.forEach(e => console.log(`   - ${e.file}: ${e.error}`));
    }

    console.log(`\n📁 Downloaded files saved to: ${DOWNLOAD_DIR}`);
    console.log(`${'='.repeat(60)}\n`);
  }

  /**
   * Clean up downloaded files
   */
  cleanup() {
    if (fs.existsSync(DOWNLOAD_DIR)) {
      fs.rmSync(DOWNLOAD_DIR, { recursive: true, force: true });
      console.log(`🗑️  Cleaned up temporary files\n`);
    }
  }
}

// CLI Interface
if (require.main === module) {
  const args = process.argv.slice(2);
  const config = {};

  args.forEach(arg => {
    const [key, value] = arg.replace('--', '').split('=');
    config[key] = value;
  });

  if (!config['folder-id']) {
    console.error(`
❌ ERROR: Missing required argument

Usage:
  node scripts/gdrive-bulk-import.js --folder-id=FOLDER_ID [options]

Required:
  --folder-id=ID          Google Drive folder ID

Optional:
  --category=TYPE         Category (logos, headshots, backgrounds, etc.)
  --public=true|false     Make images public (default: false)
  --auth-token=TOKEN      Backend authentication token
  --cleanup=true|false    Delete local files after upload (default: false)

Example:
  node scripts/gdrive-bulk-import.js \\
    --folder-id=1WiTM7u8TME8QEFMGSEpSQd7woJjtfGXp \\
    --category=logos \\
    --public=false \\
    --auth-token=YOUR_TOKEN

Setup Instructions:
  1. Go to https://console.cloud.google.com
  2. Create new project or select existing
  3. Enable Google Drive API
  4. Create Service Account
  5. Download JSON key and save as scripts/google-credentials.json
  6. Share your Drive folder with service account email
    `);
    process.exit(1);
  }

  (async () => {
    const importer = new GDriveBulkImporter();

    try {
      await importer.initialize();
      importer.ensureDownloadDir();

      await importer.processFolder(config['folder-id'], {
        category: config.category || 'uncategorized',
        isPublic: config.public === 'true',
        authToken: config['auth-token']
      });

      if (config.cleanup === 'true') {
        importer.cleanup();
      }

      console.log('✅ Import completed successfully!\n');
    } catch (error) {
      console.error(`\n❌ FATAL ERROR: ${error.message}\n`);
      console.error(error.stack);
      process.exit(1);
    }
  })();
}

module.exports = GDriveBulkImporter;
