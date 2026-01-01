# Troubleshoot Deployment Issues

Systematically diagnose and fix ISRS deployment problems.

## Step 1: Identify the Problem

Ask user:
- Which service is having issues? (Frontend, Backend, or Both)
- What symptoms are they seeing?
  - Site not loading
  - API errors (404, 500, etc.)
  - Authentication failures
  - Database connection issues
  - Other

## Step 2: Check Deployment Status

### For Frontend:
```bash
curl -I https://isrs-frontend.onrender.com/member
```
- Check HTTP status code
- Verify Content-Type headers
- Check for redirect issues

### For Backend:
```bash
curl https://isrs-database-backend.onrender.com/health
```
- Should return health check JSON
- Verify database connectivity in response

## Step 3: Common Issues & Fixes

### Issue: 404 Not Found
**Diagnosis**:
- Check if Render service is deployed
- Verify build completed successfully
- Check file paths in production

**Fix**:
- Review Render logs
- Verify build command in render.yaml
- Check static file configuration

### Issue: 500 Internal Server Error
**Diagnosis**:
- Backend error or crash
- Database connection failure
- Missing environment variables

**Fix**:
```bash
# Test database connection
DATABASE_URL="postgresql://isrs_user:***@dpg-d41lpl3uibrs73andv50-a.oregon-postgres.render.com/isrs_database?sslmode=require" \
node -e "const {Pool} = require('pg'); new Pool({connectionString:process.env.DATABASE_URL}).query('SELECT 1').then(()=>console.log('DB OK')).catch(e=>console.error(e.message))"
```
- Check Render environment variables
- Review backend logs for stack traces

### Issue: Authentication Failures
**Diagnosis**:
- Session token issues
- Cookie problems (SameSite, Secure, domain)
- CORS configuration
- Exchange token flow broken

**Fix**:
- Check browser console for errors
- Verify session creation in database:
  ```sql
  SELECT * FROM user_sessions
  WHERE email = 'aaron.kornbluth@gmail.com'
  ORDER BY created_at DESC LIMIT 5;
  ```
- Test magic link flow manually
- Verify CORS settings in backend

### Issue: Database Connection Errors
**Diagnosis**:
- Invalid DATABASE_URL
- SSL/TLS configuration
- Connection pool exhausted
- Network issues

**Fix**:
- Verify DATABASE_URL format
- Check PostgreSQL service status on Render
- Test connection with psql:
  ```bash
  psql "postgresql://isrs_user:***@dpg-d41lpl3uibrs73andv50-a.oregon-postgres.render.com/isrs_database?sslmode=require" -c "SELECT NOW();"
  ```

### Issue: CORS Errors
**Diagnosis**:
- Frontend and backend on different domains
- Missing Access-Control headers
- Preflight request failures

**Fix**:
- Verify CORS configuration in backend
- Check allowed origins include both:
  - https://isrs-frontend.onrender.com
  - http://localhost:8080 (for dev)
- Verify credentials: true setting

### Issue: Build Failures
**Diagnosis**:
- Check Render build logs
- npm install errors
- Missing dependencies
- Build script failures

**Fix**:
- Review package.json scripts
- Verify all dependencies in package.json
- Check Node.js version compatibility
- Clear Render build cache if needed

## Step 4: Verification

After applying fix:
1. **Wait for deployment** (60-90 seconds)
2. **Test the endpoint**:
   - Frontend: `curl -I https://isrs-frontend.onrender.com/member`
   - Backend: `curl https://isrs-database-backend.onrender.com/health`
3. **Test authentication flow**:
   - Request magic link
   - Verify email/database token
   - Click link, check redirect
   - Verify session created
4. **Check admin dashboard**:
   - Load /admin/
   - Verify sidebar loads
   - Test navigation

## Step 5: Report Results

Provide user with:
- ✅ Issue resolved - explanation of what was wrong
- ⚠️ Partial fix - what's working, what needs more work
- ❌ Still broken - next troubleshooting steps
- 📊 Verification results
- 🔗 Relevant URLs to test

If issue persists, suggest:
- Checking Render dashboard logs
- Reviewing recent commits for breaking changes
- Considering rollback if recent deploy broke things
