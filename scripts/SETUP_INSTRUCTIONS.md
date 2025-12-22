# Google Drive Bulk Import - Setup Instructions

## Prerequisites

- Node.js installed (v14 or higher)
- Access to Google Cloud Console
- Admin access to ISRS backend

## Step 1: Install Dependencies

```bash
cd /Users/akorn/Desktop/ISRS
npm install googleapis axios form-data --save
```

## Step 2: Create Google Cloud Service Account

### 2.1 Create/Select Project
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select an existing one
   - Click the project dropdown at the top
   - Click "NEW PROJECT"
   - Name it "ISRS Drive Import"
   - Click "CREATE"

### 2.2 Enable Google Drive API
1. In the Cloud Console, go to "APIs & Services" > "Library"
2. Search for "Google Drive API"
3. Click on it and click "ENABLE"

### 2.3 Create Service Account
1. Go to "APIs & Services" > "Credentials"
2. Click "CREATE CREDENTIALS" > "Service Account"
3. Fill in details:
   - Name: `isrs-drive-importer`
   - Description: `Service account for bulk importing images from Google Drive`
4. Click "CREATE AND CONTINUE"
5. Skip the optional steps (no roles needed for this use case)
6. Click "DONE"

### 2.4 Create and Download Key
1. Find your new service account in the list
2. Click on it to open details
3. Go to the "KEYS" tab
4. Click "ADD KEY" > "Create new key"
5. Choose "JSON" format
6. Click "CREATE"
7. The key file will download automatically
8. **IMPORTANT**: Rename this file to `google-credentials.json`
9. Move it to: `/Users/akorn/Desktop/ISRS/scripts/google-credentials.json`

## Step 3: Share Google Drive Folder with Service Account

1. Open the downloaded JSON key file and find the "client_email" field
   - It will look like: `isrs-drive-importer@your-project.iam.gserviceaccount.com`
2. Go to your Google Drive folder: https://drive.google.com/drive/folders/1WiTM7u8TME8QEFMGSEpSQd7woJjtfGXp
3. Right-click the folder > "Share"
4. Paste the service account email
5. Set permission to "Viewer"
6. Uncheck "Notify people"
7. Click "Share"

**Repeat step 3 for each Drive folder you want to import from**

## Step 4: Get Backend Authentication Token

You need an admin auth token to upload to the backend:

1. Go to: http://localhost:8080/login.html (or production URL)
2. Login with your admin account
3. Open browser DevTools (F12 or Cmd+Option+I)
4. Go to Console tab
5. Type: `localStorage.getItem('isrs_auth_token')`
6. Copy the token (without quotes)

## Step 5: Run the Import Script

### Basic Usage
```bash
node scripts/gdrive-bulk-import.js \
  --folder-id=1WiTM7u8TME8QEFMGSEpSQd7woJjtfGXp \
  --category=logos \
  --public=false \
  --auth-token=YOUR_TOKEN_HERE
```

### Import Logos
```bash
node scripts/gdrive-bulk-import.js \
  --folder-id=YOUR_LOGOS_FOLDER_ID \
  --category=logos \
  --public=false \
  --auth-token=YOUR_TOKEN
```

### Import Headshots
```bash
node scripts/gdrive-bulk-import.js \
  --folder-id=YOUR_HEADSHOTS_FOLDER_ID \
  --category=headshots \
  --public=false \
  --auth-token=YOUR_TOKEN
```

### Import Backgrounds
```bash
node scripts/gdrive-bulk-import.js \
  --folder-id=YOUR_BACKGROUNDS_FOLDER_ID \
  --category=backgrounds \
  --public=false \
  --auth-token=YOUR_TOKEN
```

## Step 6: Verify Upload

1. Files are downloaded to: `/Users/akorn/Desktop/ISRS/temp-downloads/`
2. Check the console output for success/error messages
3. Login to admin portal to verify images appear
4. Use admin controls to publish selected images

## Advanced Usage

### Multiple Folders
Create a batch import script:

```javascript
// scripts/batch-import.js
const GDriveBulkImporter = require('./gdrive-bulk-import');

const AUTH_TOKEN = 'your-token-here';

const folders = [
  { folderId: 'FOLDER_ID_1', options: { category: 'logos', isPublic: false, authToken: AUTH_TOKEN } },
  { folderId: 'FOLDER_ID_2', options: { category: 'headshots', isPublic: false, authToken: AUTH_TOKEN } },
  { folderId: 'FOLDER_ID_3', options: { category: 'backgrounds', isPublic: false, authToken: AUTH_TOKEN } }
];

(async () => {
  const importer = new GDriveBulkImporter();
  await importer.initialize();
  importer.ensureDownloadDir();
  await importer.processFolders(folders);
  importer.cleanup();
})();
```

Then run: `node scripts/batch-import.js`

### Cleanup After Import
Add `--cleanup=true` to delete local files after successful upload:

```bash
node scripts/gdrive-bulk-import.js \
  --folder-id=YOUR_FOLDER_ID \
  --category=logos \
  --cleanup=true
```

## Troubleshooting

### "Credentials file not found"
- Make sure `google-credentials.json` is in `/Users/akorn/Desktop/ISRS/scripts/`
- Check the file name is exactly `google-credentials.json`

### "Permission denied" or "File not found"
- Make sure you shared the Drive folder with the service account email
- Wait a few minutes after sharing for permissions to propagate
- Verify the folder ID is correct

### "Authentication required" from backend
- Make sure your auth token is valid (tokens expire)
- Refresh the token by logging in again
- Verify you're using an admin account

### Images not appearing in gallery
- Check they were uploaded as private (default)
- Login to admin portal to publish them
- Verify the backend API is running

## Security Notes

⚠️ **IMPORTANT**:
- Never commit `google-credentials.json` to git (it's in .gitignore)
- Store auth tokens securely, don't hardcode them
- Revoke service account access after import if not needed long-term
- Review imported images before making them public

## Support

If you encounter issues:
1. Check the console output for specific error messages
2. Verify all setup steps were completed
3. Test with a small folder first (2-3 images)
4. Check backend logs for upload errors
