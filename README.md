# ISRS Frontend

Modern, responsive website for the International Shellfish Restoration Society (ISRS).

## Features

### Public Pages
- **Home**: Overview of ISRS mission and impact
- **About**: Organization details, values, and partnerships
- **ICSR**: Conference history and information
- **ICSR2026**: Details about upcoming conference in Puget Sound, WA

### Admin Dashboard
- **Statistics Dashboard**: Real-time database statistics
- **Board Vote Processing**: AI-powered vote extraction using Claude API
- **Board Members Management**: View and manage board member data
- **Conference Management**: ICSR registration and sponsor tracking
- **Database Tools**: Connection testing and table management

## Technology Stack

- **HTML5**: Semantic markup
- **CSS3**: Modern responsive design
- **Vanilla JavaScript**: No frameworks, pure JS for maximum performance
- **Backend API**: Node.js/Express/PostgreSQL on Render

## Project Structure

```
isrs-frontend/
├── public/
│   ├── css/
│   │   └── styles.css          # Main stylesheet
│   ├── js/
│   │   └── api.js              # API client
│   ├── index.html              # Home page
│   ├── about.html              # About page
│   ├── icsr.html               # ICSR history
│   └── icsr2026.html           # ICSR2026 conference
├── admin/
│   ├── css/
│   │   └── admin.css           # Admin dashboard styles
│   ├── js/
│   │   └── admin.js            # Dashboard functionality
│   └── index.html              # Admin dashboard
├── package.json
└── README.md
```

## Development

### Local Testing

```bash
# Navigate to project directory
cd /Users/akorn/isrs-frontend

# Start development server
npm run dev

# Or use serve directly
npx serve . -l 8080
```

Visit http://localhost:8080 to view the site.

### Admin Access

To access the admin dashboard at `/admin/`, use one of the authorized emails:
- aaron.kornbluth@gmail.com
- erinflahertyconsulting@gmail.com
- lisa.paton@gmail.com

The system verifies permissions against the backend API before granting access.

## Deployment

### Option 1: Render Static Site

1. Create new Static Site on Render
2. Connect to GitHub repository
3. Build Command: `(leave empty)`
4. Publish Directory: `.`

### Option 2: Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Option 3: Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy
```

## DNS Configuration

Once deployed, update DNS records in Squarespace:

1. Go to Squarespace → Settings → Domains
2. Select shellfish-society.org
3. Advanced Settings → DNS Settings
4. Add/Update A records or CNAME to point to new hosting

## Backend API

The frontend connects to the backend API at:
https://isrs-database-backend.onrender.com

API endpoints:
- `GET /api/admin/stats` - Statistics
- `POST /api/votes/process` - Process board vote
- `GET /api/votes/history` - Vote history
- `GET /api/admin/board-members` - Board members
- `GET /api/users/permissions` - Check user permissions

## Environment

No environment variables needed on the frontend. All configuration is in the code.

Backend API URL is set in `/public/js/api.js`:
```javascript
const API_BASE_URL = 'https://isrs-database-backend.onrender.com';
```

## Support

For issues or questions, contact:
- Email: info@shellfish-society.org
- GitHub: https://github.com/akornenvironmental/isrs-database-backend

## License

Copyright © 2024-2025 International Shellfish Restoration Society
