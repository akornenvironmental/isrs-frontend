#!/usr/bin/env node
/**
 * Recursively scan Google Drive folder structure to find all images
 */

const fs = require('fs');
const path = require('path');
const { google } = require('googleapis');

const CREDENTIALS_PATH = path.join(__dirname, 'google-credentials.json');

class GDriveScanner {
  constructor() {
    this.drive = null;
    this.imagesByFolder = {};
    this.totalImages = 0;
    this.foldersScanned = 0;
  }

  async initialize() {
    const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, 'utf8'));
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/drive.readonly']
    });
    this.drive = google.drive({ version: 'v3', auth });
  }

  async listFolder(folderId) {
    const response = await this.drive.files.list({
      q: `'${folderId}' in parents and trashed=false`,
      fields: 'files(id, name, mimeType, size)',
      orderBy: 'name',
      pageSize: 1000
    });
    return response.data.files;
  }

  async scanFolderRecursive(folderId, folderPath = '', depth = 0) {
    if (depth > 10) return; // Safety limit

    this.foldersScanned++;
    const files = await this.listFolder(folderId);

    const images = files.filter(f =>
      f.mimeType.startsWith('image/') ||
      f.name.match(/\.(jpg|jpeg|png|gif|webp|svg|bmp|tiff)$/i)
    );

    const folders = files.filter(f => f.mimeType === 'application/vnd.google-apps.folder');

    // Store images for this folder
    if (images.length > 0) {
      this.imagesByFolder[folderPath] = {
        folderId,
        images: images.map(img => ({
          name: img.name,
          id: img.id,
          size: img.size ? parseInt(img.size) : 0,
          type: img.mimeType
        })),
        count: images.length
      };
      this.totalImages += images.length;
    }

    // Recursively scan subfolders
    for (const folder of folders) {
      const subPath = folderPath ? `${folderPath}/${folder.name}` : folder.name;
      await this.scanFolderRecursive(folder.id, subPath, depth + 1);
    }
  }

  formatSize(bytes) {
    if (!bytes) return 'N/A';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
  }

  printReport() {
    console.log('\n' + '='.repeat(80));
    console.log('📊 GOOGLE DRIVE IMAGE SCAN REPORT');
    console.log('='.repeat(80));
    console.log(`\n🔍 Scanned: ${this.foldersScanned} folders`);
    console.log(`🖼️  Found: ${this.totalImages} total images\n`);

    if (Object.keys(this.imagesByFolder).length === 0) {
      console.log('❌ No images found in this folder structure.\n');
      return;
    }

    console.log('📂 FOLDERS WITH IMAGES:\n');

    // Sort by folder path
    const sortedFolders = Object.keys(this.imagesByFolder).sort();

    sortedFolders.forEach(folderPath => {
      const folder = this.imagesByFolder[folderPath];
      console.log(`\n📁 ${folderPath || '(Root)'}`);
      console.log(`   ID: ${folder.folderId}`);
      console.log(`   Images: ${folder.count}`);

      // Calculate total size
      const totalSize = folder.images.reduce((sum, img) => sum + img.size, 0);
      console.log(`   Total Size: ${this.formatSize(totalSize)}`);

      // Show first few images as preview
      console.log(`   Preview:`);
      folder.images.slice(0, 5).forEach(img => {
        console.log(`      - ${img.name} (${this.formatSize(img.size)})`);
      });

      if (folder.images.length > 5) {
        console.log(`      ... and ${folder.images.length - 5} more`);
      }
    });

    console.log('\n' + '='.repeat(80));
    console.log('💡 SUGGESTED IMPORT STRATEGY');
    console.log('='.repeat(80) + '\n');

    this.suggestImportStrategy(sortedFolders);
  }

  suggestImportStrategy(folderPaths) {
    const suggestions = [];

    folderPaths.forEach(folderPath => {
      const folder = this.imagesByFolder[folderPath];
      const lowerPath = folderPath.toLowerCase();

      let category = 'uncategorized';
      let priority = 'medium';
      let recommendation = '';

      // Determine category based on folder name
      if (lowerPath.includes('logo')) {
        category = 'logos';
        priority = 'high';
        recommendation = 'Import to /images/assets/logos/ - Use for website branding';
      } else if (lowerPath.includes('headshot') || lowerPath.includes('portrait') || lowerPath.includes('board')) {
        category = 'headshots';
        priority = 'high';
        recommendation = 'Link to member profiles in admin portal';
      } else if (lowerPath.includes('background') || lowerPath.includes('bg') || lowerPath.includes('hero')) {
        category = 'backgrounds';
        priority = 'medium';
        recommendation = 'Use for hero sections and page backgrounds';
      } else if (lowerPath.includes('conference') || lowerPath.includes('icsr')) {
        category = 'conference';
        priority = 'medium';
        recommendation = 'Add to public gallery with ICSR tag';
      } else if (lowerPath.includes('restoration') || lowerPath.includes('field')) {
        category = 'field_work';
        priority = 'medium';
        recommendation = 'Add to public gallery with field work tag';
      } else if (lowerPath.includes('species') || lowerPath.includes('oyster') || lowerPath.includes('shellfish')) {
        category = 'species';
        priority = 'low';
        recommendation = 'Add to public gallery, good for educational content';
      } else if (lowerPath.includes('press') || lowerPath.includes('media')) {
        category = 'press';
        priority = 'high';
        recommendation = 'Add to press kit page';
      }

      suggestions.push({
        folderPath,
        folderId: folder.folderId,
        count: folder.count,
        category,
        priority,
        recommendation
      });
    });

    // Group by priority
    const high = suggestions.filter(s => s.priority === 'high');
    const medium = suggestions.filter(s => s.priority === 'medium');
    const low = suggestions.filter(s => s.priority === 'low');

    if (high.length > 0) {
      console.log('🔴 HIGH PRIORITY (import first):\n');
      high.forEach(s => {
        console.log(`   📂 ${s.folderPath}`);
        console.log(`      Category: ${s.category}`);
        console.log(`      Count: ${s.count} images`);
        console.log(`      Action: ${s.recommendation}`);
        console.log(`      Command: node scripts/gdrive-bulk-import.js --folder-id=${s.folderId} --category=${s.category}\n`);
      });
    }

    if (medium.length > 0) {
      console.log('🟡 MEDIUM PRIORITY:\n');
      medium.forEach(s => {
        console.log(`   📂 ${s.folderPath}`);
        console.log(`      Category: ${s.category}`);
        console.log(`      Count: ${s.count} images`);
        console.log(`      Action: ${s.recommendation}`);
        console.log(`      Command: node scripts/gdrive-bulk-import.js --folder-id=${s.folderId} --category=${s.category}\n`);
      });
    }

    if (low.length > 0) {
      console.log('🟢 LOW PRIORITY (optional):\n');
      low.forEach(s => {
        console.log(`   📂 ${s.folderPath}`);
        console.log(`      Category: ${s.category}`);
        console.log(`      Count: ${s.count} images\n`);
      });
    }

    console.log('='.repeat(80));
    console.log('📝 BATCH IMPORT SCRIPT');
    console.log('='.repeat(80) + '\n');
    console.log('Create scripts/batch-import-all.sh:\n');
    console.log('#!/bin/bash\n');

    [...high, ...medium].forEach(s => {
      console.log(`node scripts/gdrive-bulk-import.js --folder-id=${s.folderId} --category=${s.category}`);
    });

    console.log('\n' + '='.repeat(80) + '\n');
  }
}

// CLI
if (require.main === module) {
  const folderId = process.argv[2] || '16kkDYxmSWTk1xfy5ZXENVw5fi70bXk16'; // Default to ISRS root

  (async () => {
    console.log('🔍 Starting comprehensive scan of Google Drive folder...\n');

    const scanner = new GDriveScanner();
    await scanner.initialize();

    // Get folder name
    const folder = await scanner.drive.files.get({
      fileId: folderId,
      fields: 'name'
    });

    console.log(`📂 Scanning: ${folder.data.name}`);
    console.log(`   ID: ${folderId}`);
    console.log(`   This may take a minute...\n`);

    await scanner.scanFolderRecursive(folderId, folder.data.name);
    scanner.printReport();
  })().catch(err => {
    console.error(`\n❌ Error: ${err.message}\n`);
    process.exit(1);
  });
}
