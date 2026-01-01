# Quick Status Check

Check the current status of the ISRS project and deployments.

## Tasks to perform:

1. **Git Status**
   - Run `git status` in both frontend and backend repos
   - Show current branch and uncommitted changes

2. **Local Servers**
   - Check if backend is running: `curl -s http://localhost:3001/health`
   - Check if frontend is running: `curl -s -o /dev/null -w "%{http_code}" http://localhost:8080`

3. **Production Health**
   - Check production backend: `curl -I https://isrs-database-backend.onrender.com/health`
   - Check production frontend: `curl -I https://isrs-frontend.onrender.com/member`

4. **Database Connection**
   - Test database connection: `DATABASE_URL="postgresql://isrs_user:rzE9q7ONZUAAdnA7ndLMXPKILyI6mnVr@dpg-d41lpl3uibrs73andv50-a.oregon-postgres.render.com/isrs_database?sslmode=require" node -e "const {Pool} = require('pg'); new Pool({connectionString:process.env.DATABASE_URL}).query('SELECT NOW()').then(()=>console.log('✅ Database connected')).catch(e=>console.log('❌ Database error:', e.message))"`

5. **Recent Commits**
   - Show last 3 commits from frontend repo
   - Show last 3 commits from backend repo

Provide a concise summary with status indicators (✅/⚠️/❌) for each check.
