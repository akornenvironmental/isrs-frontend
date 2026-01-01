# Safely Rollback Deployment

Rollback to a previous working version of the ISRS application.

## ⚠️ IMPORTANT WARNING

**Before rolling back, confirm with the user:**
1. Are you SURE you want to rollback? This will undo recent changes.
2. Which service needs rollback? (Frontend, Backend, or Both)
3. Do you know when it was last working? (commit hash, date, or "previous commit")

## Step 1: Identify Last Working Version

### Frontend:
```bash
cd /Users/akorn/Desktop/ISRS
git log --oneline -10
```

### Backend:
```bash
cd /Users/akorn/Desktop/isrs-database-backend
git log --oneline -10
```

Show user recent commits and ask which one to rollback to.

## Step 2: Safety Checks

1. **Check for uncommitted changes**
   - Stash or commit them first
   - Warn user if working tree is dirty

2. **Verify database migrations**
   - If rolling back backend, check for database migrations
   - **CRITICAL**: Cannot easily rollback migrations
   - If migrations were run, warn user this is more complex

3. **Backup consideration**
   - Suggest user downloads backup if rollback is substantial
   - For database changes, strongly recommend database backup first

## Step 3: Perform Rollback

### Option A: Rollback to Previous Commit (Simple)
```bash
# Create a new commit that reverts to previous state
git revert HEAD --no-edit
git push origin main
```
**This is the SAFE option** - creates a new commit that undoes changes.

### Option B: Rollback to Specific Commit (More Complex)
```bash
# Reset to specific commit (dangerous!)
git reset --hard <commit-hash>
git push origin main --force
```
**⚠️ WARNING**: This rewrites history. Only use if:
- User understands the implications
- No one else is working on the repo
- User explicitly requests force push

### Option C: Create Revert Commit for Range
```bash
# Revert multiple commits safely
git revert --no-commit HEAD~3..HEAD
git commit -m "Rollback: Revert to working version before recent changes

Reverting commits:
- <commit 1>
- <commit 2>
- <commit 3>

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
git push origin main
```
**This is the SAFE option for multiple commits**.

## Step 4: Database Rollback (If Needed)

If backend rollback includes database changes:

1. **Check migrations**
   ```bash
   ls -la /Users/akorn/Desktop/isrs-database-backend/database/migrations/
   ```

2. **Identify problem migrations**
   - Show user recent migration files
   - Ask which need to be rolled back

3. **Manual rollback required**
   - Database migrations don't auto-rollback
   - Options:
     - Write down migration (CREATE TABLE → DROP TABLE)
     - Restore from database backup
     - Manually undo changes via SQL

4. **Test database connection**
   ```bash
   DATABASE_URL="postgresql://isrs_user:***@dpg-d41lpl3uibrs73andv50-a.oregon-postgres.render.com/isrs_database?sslmode=require" \
   node -e "const {Pool} = require('pg'); new Pool({connectionString:process.env.DATABASE_URL}).query('SELECT version FROM schema_migrations ORDER BY version DESC LIMIT 5').then(r=>console.log(r.rows)).catch(e=>console.error(e.message))"
   ```

## Step 5: Verify Rollback

After pushing rollback:

1. **Wait for Render deployment** (60-90 seconds)

2. **Test endpoints**:
   - Frontend: `curl -I https://isrs-frontend.onrender.com/member`
   - Backend: `curl https://isrs-database-backend.onrender.com/health`

3. **Test critical functionality**:
   - Authentication flow
   - Admin dashboard
   - Database operations
   - Any feature that was broken

4. **Compare with pre-rollback state**
   - Verify the issue is resolved
   - Confirm no new issues introduced

## Step 6: Post-Rollback

1. **Document what happened**
   - What was wrong?
   - What commit(s) caused the issue?
   - What was rolled back?

2. **Plan forward**
   - If code needs to be fixed and redeployed
   - Create new branch for fix
   - Test thoroughly before redeploying

3. **Report to user**:
   ```
   ✅ Rollback Complete

   Rolled back: [Frontend/Backend]
   From commit: <bad-commit>
   To commit: <good-commit>

   Status:
   - Production deployed: ✅
   - Endpoints verified: ✅
   - Authentication tested: ✅

   Next steps:
   - Fix identified in branch: [feature/fix-issue]
   - Test locally before deploying again
   ```

## Emergency Rollback Procedure

If site is completely down:

1. **Immediate revert**:
   ```bash
   git revert HEAD --no-edit && git push origin main
   ```

2. **Don't wait for analysis** - get working version deployed first

3. **Investigate after** site is back up

4. **Notify user** of emergency rollback and get their OK before proceeding with fix
