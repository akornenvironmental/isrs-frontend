#!/usr/bin/env node
/**
 * List contents of a Google Drive folder
 * Shows all files and subfolders with their IDs
 */

const fs = require('fs');
const path = require('path');
const { google } = require('googleapis');

const CREDENTIALS_PATH = path.join(__dirname, 'google-credentials.json');

async function listFolder(folderId) {
  // Initialize Google Drive API
  const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, 'utf8'));
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/drive.readonly']
  });

  const drive = google.drive({ version: 'v3', auth });

  console.log(`\n📁 Listing contents of folder ID: ${folderId}\n`);

  // Get folder name
  const folder = await drive.files.get({
    fileId: folderId,
    fields: 'name'
  });
  console.log(`Folder: ${folder.data.name}\n`);

  // List all items
  const response = await drive.files.list({
    q: `'${folderId}' in parents and trashed=false`,
    fields: 'files(id, name, mimeType, size)',
    orderBy: 'name',
    pageSize: 100
  });

  const files = response.data.files;

  if (files.length === 0) {
    console.log('   (empty folder)');
    return;
  }

  // Separate folders and files
  const folders = files.filter(f => f.mimeType === 'application/vnd.google-apps.folder');
  const images = files.filter(f => f.mimeType.startsWith('image/'));
  const others = files.filter(f => !f.mimeType.startsWith('image/') && f.mimeType !== 'application/vnd.google-apps.folder');

  // Print folders
  if (folders.length > 0) {
    console.log('📂 SUBFOLDERS:\n');
    folders.forEach(f => {
      console.log(`   📁 ${f.name}`);
      console.log(`      ID: ${f.id}\n`);
    });
  }

  // Print images
  if (images.length > 0) {
    console.log('🖼️  IMAGE FILES:\n');
    images.forEach(f => {
      const sizeMB = f.size ? (f.size / 1024 / 1024).toFixed(2) : 'N/A';
      console.log(`   ${f.name} (${sizeMB} MB)`);
      console.log(`      ID: ${f.id}`);
      console.log(`      Type: ${f.mimeType}\n`);
    });
  }

  // Print other files
  if (others.length > 0) {
    console.log('📄 OTHER FILES:\n');
    others.forEach(f => {
      console.log(`   ${f.name}`);
      console.log(`      Type: ${f.mimeType}\n`);
    });
  }

  console.log('─'.repeat(60));
  console.log(`Total: ${folders.length} folders, ${images.length} images, ${others.length} other files`);
  console.log('─'.repeat(60) + '\n');
}

// CLI
if (require.main === module) {
  const folderId = process.argv[2];

  if (!folderId) {
    console.error('\n❌ Missing folder ID\n');
    console.log('Usage: node scripts/list-gdrive-folder.js FOLDER_ID\n');
    console.log('Example: node scripts/list-gdrive-folder.js 16kkDYxmSWTk1xfy5ZXENVw5fi70bXk16\n');
    process.exit(1);
  }

  listFolder(folderId).catch(err => {
    console.error(`\n❌ Error: ${err.message}\n`);
    process.exit(1);
  });
}
