# ISRS Project Overview

You're working on the **International Society for Reef Studies (ISRS)** project.

## Project Structure

**Frontend** (this repo): `/Users/akorn/Desktop/ISRS`
- Static HTML/CSS/JavaScript
- Hosted on Render: https://isrs-frontend.onrender.com
- Local dev: http://localhost:8080

**Backend**: `/Users/akorn/Desktop/isrs-database-backend`
- Node.js/Express + PostgreSQL
- Hosted on Render: https://isrs-database-backend.onrender.com
- Local dev: http://localhost:3001

## Key Features

1. **Passwordless Authentication**: Magic link email system
2. **Role-Based Access Control (RBAC)**: 18 roles with permission levels 0-100
3. **Unified Admin Dashboard**: `/admin/` with dynamic sidebar navigation
4. **Cross-Origin Session Management**: HTTP-only cookies + localStorage

## Permission Levels
- Level 50+: Members (Dashboard, Contacts, Organizations, Conferences)
- Level 60+: Content Managers (+Photos, Press Kit)
- Level 70+: Board/Advisory (+Board Documents, Votes, Funding)
- Level 80+: System Admins (+User Feedback, Import, Settings)
- Level 90+: Full System Access
- Level 100: Super Administrator

## Database
**Production**: PostgreSQL on Render
```
postgresql://isrs_user:***@dpg-d41lpl3uibrs73andv50-a.oregon-postgres.render.com/isrs_database
```

**Key Tables**:
- `attendee_profiles` - User data
- `user_sessions` - Authentication sessions
- `roles` - RBAC definitions
- `user_roles` - User-role assignments

## Important URLs

**Production**:
- Frontend: https://isrs-frontend.onrender.com
- Member Portal: https://isrs-frontend.onrender.com/member/
- Admin Dashboard: https://isrs-frontend.onrender.com/admin/
- Backend API: https://isrs-database-backend.onrender.com
- Render Dashboard: https://dashboard.render.com/project/prj-d41llo7gi27c739l7bbg

**Local Development**:
- Frontend: http://localhost:8080
- Backend: http://localhost:3001
- API Health: http://localhost:3001/health

## Available Slash Commands

- `/start` - This overview (you're here!)
- `/status` - Check deployment and system status
- `/deploy` - Deploy changes to production
- `/pr` - Create GitHub pull request
- `/fix-deploy` - Troubleshoot deployment issues
- `/rollback` - Rollback to previous deployment

## Quick Reference

**Test Super Admin Login**:
Email: aaron.kornbluth@gmail.com
(Uses magic link - check email or database)

**Recent Major Changes**:
- ✅ Unified admin dashboard at `/admin/`
- ✅ Permission-based navigation filtering
- ✅ Sidebar hide/show customization with localStorage
- ✅ Comprehensive user info banner (different for members vs admins)
- ✅ Profile editing saves to production database

**Working Directories** (already set):
- Main: /Users/akorn/Desktop/ISRS
- Backend migrations: /Users/akorn/Desktop/isrs-database-backend/database/migrations
- Backend controllers: /Users/akorn/Desktop/isrs-database-backend/src/controllers
- Backend middleware: /Users/akorn/Desktop/isrs-database-backend/src/middleware
- Backend routes: /Users/akorn/Desktop/isrs-database-backend/src/routes

Ready to code! 🚀
