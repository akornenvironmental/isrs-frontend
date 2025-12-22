# ISRS Scripts

This directory contains utility scripts for managing the ISRS website and database.

## Available Scripts

### `gdrive-bulk-import.js`
Bulk import images from Google Drive folders with AI analysis and categorization.

**See:** [SETUP_INSTRUCTIONS.md](./SETUP_INSTRUCTIONS.md) for complete setup guide.

**Quick Start:**
```bash
# Install dependencies
npm install googleapis axios form-data

# Run import
node scripts/gdrive-bulk-import.js \
  --folder-id=YOUR_FOLDER_ID \
  --category=logos \
  --auth-token=YOUR_TOKEN
```

## Security

⚠️ **NEVER commit these files to git:**
- `google-credentials.json` - Service account credentials
- Any files containing auth tokens or API keys

These files are automatically ignored by `.gitignore`.

## Support

For questions or issues with scripts, contact the development team.
