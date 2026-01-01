# ISRS Project Architecture

## Overview

ISRS is a **FULL-STACK APPLICATION** with separate frontend and backend repositories.

---

## Project Structure

### Two Separate Repositories

| Repository | Location | Purpose |
|------------|----------|---------|
| **Frontend** | `/Users/akorn/Desktop/ISRS` | Static HTML/CSS/JS website |
| **Backend** | `/Users/akorn/Desktop/isrs-database-backend` | Node.js/Express API server |

---

## Frontend Repository (`ISRS`)

### Technology Stack
- **HTML5** - Semantic markup
- **CSS3** - Modern responsive design
- **Vanilla JavaScript** - No frameworks, pure JS
- **Static Server** - `npx serve` for local development

### Port Configuration
- **Local Development**: Port 8080
- **Production**: https://isrs-frontend.onrender.com

### Directory Structure
```
ISRS/
├── public/                 # Main website files
│   ├── css/               # Stylesheets
│   ├── js/                # JavaScript files
│   │   ├── api.js         # API client
│   │   ├── api-config.js  # API configuration
│   │   ├── member-auth.js # Authentication
│   │   └── ...
│   ├── index.html         # Home page
│   ├── about.html
│   ├── icsr.html
│   └── member/            # Member portal
├── admin/                 # Admin dashboard
│   ├── css/
│   ├── js/
│   └── index.html
├── scripts/               # Utility scripts (Google Drive, data import)
├── package.json
└── README.md
```

### API Configuration (public/js/api-config.js)
```javascript
const API_CONFIG = {
  baseURL: this.isLocalhost
    ? 'http://localhost:3000'
    : 'https://isrs-database-backend.onrender.com'
};
```

The frontend **calls the backend API** for:
- Admin statistics
- Board vote processing
- User authentication
- Member management
- Conference registration
- Photo uploads
- Database operations

---

## Backend Repository (`isrs-database-backend`)

### Technology Stack
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **PostgreSQL** - Relational database (hosted on Render)
- **Claude AI** - AI-powered features
- **AWS SES** - Email service
- **Stripe** - Payment processing

### Port Configuration
- **Local Development**: Port 3000
- **Production**: https://isrs-database-backend.onrender.com

### Directory Structure
```
isrs-database-backend/
├── src/
│   ├── server.js          # Main Express server
│   ├── config/
│   │   └── database.js    # PostgreSQL connection
│   ├── routes/            # API routes
│   │   ├── authRoutes.js
│   │   ├── adminRoutes.js
│   │   ├── voteRoutes.js
│   │   ├── membershipRoutes.js
│   │   └── ...
│   ├── controllers/       # Business logic
│   ├── middleware/        # Auth, RBAC, error handling
│   │   ├── auth.js
│   │   ├── rbacAuth.js
│   │   └── errorHandler.js
│   └── models/            # Database models
├── database/
│   ├── schema.sql         # PostgreSQL schema
│   └── migrations/        # Database migrations
├── scripts/               # Utility scripts
├── package.json
└── README.md
```

### Server Configuration (src/server.js:36)
```javascript
const PORT = process.env.PORT || 3000;
```

### Database Configuration
- **Type**: PostgreSQL
- **Connection**: Via `DATABASE_URL` environment variable
- **Location**: Hosted on Render (production)
- **Schema**: `database/schema.sql`

### Authentication System
- **Method**: Magic link authentication (passwordless)
- **Session Management**: HTTP-only cookies
- **RBAC**: Role-Based Access Control
- **Authorization**: Database-driven permissions

### Key Features
- Board vote processing with Claude AI
- Member authentication and profiles
- Conference registration system
- Abstract submission and review
- Photo gallery management
- Email campaigns (AWS SES)
- Payment processing (Stripe)
- Feedback system
- Committee management

---

## Full Development Environment

### Required Ports

| Service | Port | Used By |
|---------|------|---------|
| Backend API | 3000 | ISRS Backend |
| Frontend | 8080 | ISRS Frontend |

### Database Connection
```javascript
// Backend: src/config/database.js
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL?.includes('render.com')
    ? { rejectUnauthorized: false }
    : false
});
```

### Environment Variables (Backend)
Required in `isrs-database-backend/.env`:
```bash
# Server
PORT=3000
NODE_ENV=development

# Database
DATABASE_URL=postgresql://user:password@host:5432/database

# Claude AI
CLAUDE_API_KEY=sk-ant-api03-...
CLAUDE_MODEL=claude-sonnet-4.5-20250929

# Email
AWS_SES_REGION=us-east-1
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...

# Security
API_KEY=...
ALLOWED_ORIGINS=http://localhost:8080,https://isrs-frontend.onrender.com
```

---

## How Authentication Works

1. **Frontend** (ISRS) sends login request to backend
2. **Backend** (`isrs-database-backend`) generates magic link
3. User clicks magic link in email
4. **Backend** creates session and sets HTTP-only cookie
5. **Frontend** makes authenticated API calls with cookie
6. **Backend** validates session from database (RBAC middleware)

### Authentication Flow
```
User → Frontend (8080) → Backend API (3000) → PostgreSQL
                ↓                              ↓
           localStorage token           user_sessions table
```

---

## Running the Complete Stack Locally

### Option 1: Manual Start (Two Terminals)

**Terminal 1: Backend**
```bash
cd ~/Desktop/isrs-database-backend
npm run dev
# Runs on localhost:3000
```

**Terminal 2: Frontend**
```bash
cd ~/Desktop/ISRS
npm run dev
# Runs on localhost:8080
```

### Option 2: Using ISRS.command (Recommended)

The `ISRS.command` applet **only starts the frontend** (port 8080).

To run the full stack, you need **TWO separate applets**:

1. **ISRS.command** - Starts frontend + Claude Code
2. **ISRS-Backend.command** - Would start backend (not created yet)

---

## Production Deployment

### Frontend (Static Site)
- **Hosting**: Render Static Site
- **URL**: https://isrs-frontend.onrender.com
- **Build**: None needed (static files)
- **Publish Directory**: `./public`

### Backend (Web Service)
- **Hosting**: Render Web Service
- **URL**: https://isrs-database-backend.onrender.com
- **Build Command**: `npm install`
- **Start Command**: `npm start`

### Database
- **Hosting**: Render PostgreSQL
- **Connection**: Via `DATABASE_URL` environment variable
- **SSL**: Required for Render connections

---

## Key API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/auth/login` | POST | Request magic link |
| `/auth/verify` | GET | Verify magic link token |
| `/api/admin/stats` | GET | Dashboard statistics |
| `/api/votes/process` | POST | Process board vote |
| `/api/membership/*` | * | Membership management |
| `/api/conference/*` | * | Conference registration |
| `/api/photos/*` | * | Photo gallery |
| `/api/feedback/*` | * | Feedback system |

---

## Comparison with AKORN

| Feature | AKORN | ISRS |
|---------|-------|------|
| Architecture | Monorepo (backend + frontend) | Split repos |
| Backend Port | 3000 | 3000 |
| Frontend Port | 5173 (Vite) | 8080 (serve) |
| Backend Framework | Express | Express |
| Frontend Framework | React/Vite | Vanilla JS |
| Database | PostgreSQL | PostgreSQL |
| Auth | TBD | Magic links + RBAC |

---

## Multi-Project Port Scheme

| Project | Backend | Frontend |
|---------|---------|----------|
| AKORN   | 3000    | 5173     |
| ISRS    | 3000    | 8080     |

**CONFLICT DETECTED**: Both projects use port 3000 for backend!

### Solution

Update ISRS backend to use a different port when running locally:

**Option 1**: Change ISRS backend to port 3001
**Option 2**: Change AKORN backend to port 3001

Recommended port scheme:
| Project | Backend | Frontend |
|---------|---------|----------|
| AKORN   | 3000    | 5173     |
| ISRS    | 3001    | 8080     |

---

## Next Steps

1. ✅ Frontend port locked at 8080
2. ⚠️  Backend port needs to be changed to 3001 to avoid conflict with AKORN
3. ⏳ Create `ISRS-Backend.command` applet for one-click backend startup
4. ⏳ Update `start-dev.sh` to start both frontend AND backend
5. ⏳ Update API config to use correct local backend port (3001)
