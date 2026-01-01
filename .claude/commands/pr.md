# Create GitHub Pull Request

Create a well-formatted GitHub pull request for ISRS changes.

## Prerequisites Check

1. **Determine which repo**
   - Ask user: Frontend, Backend, or Both?

2. **Git status validation**
   - Ensure changes are committed
   - Check current branch
   - Verify branch is pushed to remote

3. **Branch check**
   - If on `main`, warn user and suggest creating feature branch
   - If on feature branch, proceed

## Pull Request Creation

For each selected repo:

1. **Analyze changes**
   - Run `git log main..HEAD` to see commits in PR
   - Run `git diff main...HEAD` to see all changes
   - Review modified files

2. **Generate PR summary**
   - **Title**: Concise description of changes (50 chars max)
   - **Summary**:
     - Brief overview (2-3 sentences)
     - Bullet points of key changes
     - Reference any issues if applicable
   - **Test Plan**:
     - How to test the changes
     - What to verify
     - Expected behavior
   - **Footer**: Add "🤖 Generated with [Claude Code](https://claude.com/claude-code)"

3. **Create PR using gh CLI**
   ```bash
   gh pr create --title "PR Title" --body "$(cat <<'EOF'
   ## Summary
   - Change 1
   - Change 2

   ## Test Plan
   - [ ] Test step 1
   - [ ] Test step 2

   🤖 Generated with [Claude Code](https://claude.com/claude-code)
   EOF
   )"
   ```

4. **Handle errors**
   - If `gh` not installed, provide instructions
   - If not authenticated, guide user through `gh auth login`

## After PR Creation

1. **Display PR URL**
2. **Show PR details** (number, title, link)
3. **Suggest next steps**:
   - Request reviewers if needed
   - Link related PRs if both frontend/backend changed
   - Remind about deployment after merge

## Example PR Format

```markdown
## Summary
Implement unified admin dashboard with role-based navigation

- Created single `/admin/` dashboard for all permission levels
- Added dynamic sidebar that filters nav items by user's permission level
- Implemented hide/show functionality for customizable navigation
- Updated all 18 roles to redirect to unified dashboard

## Test Plan
- [ ] Login as Super Admin - verify all nav items visible
- [ ] Login as Board Member - verify appropriate access (level 70+)
- [ ] Login as regular Member - verify limited access (level 50+)
- [ ] Test hide/show functionality - items persist in localStorage
- [ ] Verify profile editing saves to database

## Related Changes
- Backend: Updated role settings in database
- Frontend: New admin dashboard layout and styling

🤖 Generated with [Claude Code](https://claude.com/claude-code)
```
