# Deploy to Production

Run the complete deployment workflow with verification for ISRS.

## Pre-deployment Checks

1. **Verify git status is clean**
   - Check for uncommitted changes
   - Ensure you're on the main branch (or ask user)

2. **Run tests** (if applicable)
   - Frontend tests
   - Backend tests

3. **Confirm with user**
   - Ask which repo(s) to deploy: Frontend, Backend, or Both
   - Show what will be deployed (recent commits)

## Deployment Steps

### Frontend Deployment (if selected):
1. Navigate to `/Users/akorn/Desktop/ISRS`
2. Commit any staged changes if user confirms
3. Push to GitHub: `git push origin main`
4. Render will auto-deploy from GitHub
5. Wait 60 seconds for deployment
6. Verify: `curl -I https://isrs-frontend.onrender.com/member`

### Backend Deployment (if selected):
1. Navigate to `/Users/akorn/Desktop/isrs-database-backend`
2. Commit any staged changes if user confirms
3. Push to GitHub: `git push origin main`
4. Render will auto-deploy from GitHub
5. Wait 90 seconds for deployment
6. Verify: `curl https://isrs-database-backend.onrender.com/health`

## Post-deployment Verification

1. **Test authentication flow**
   - Check login endpoint responds
   - Verify session creation works

2. **Check admin dashboard**
   - Verify `/admin/` loads correctly
   - Check sidebar navigation

3. **Database connectivity**
   - Verify backend can connect to database
   - Check recent migrations applied

4. **Report status**
   - ✅ Successful deployment with verification results
   - ⚠️ Deployed but with warnings
   - ❌ Deployment failed with error details

Always provide the user with:
- Deployment URL(s)
- Render dashboard link
- Any errors or warnings encountered
