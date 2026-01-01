# Claude Code Configuration for ISRS

This directory contains Claude Code configuration and custom slash commands for the ISRS project.

## Files

- **settings.local.json** - Project-specific permissions and settings
- **commands/** - Custom slash commands for ISRS workflows

## Available Slash Commands

When you run `ISRS.command` and Claude Code launches, you have access to these project-specific commands:

### `/start`
Displays comprehensive ISRS project overview including:
- Project structure (frontend + backend)
- Permission levels and RBAC details
- Database information
- Important URLs (local and production)
- Recent major changes
- Quick reference guide

**When to use**: Start of each session, or when you need to refresh your context about the project.

### `/status`
Quick health check of the entire system:
- Git status (both repos)
- Local server status
- Production deployment health
- Database connectivity
- Recent commits

**When to use**: Before deploying, after making changes, or when troubleshooting.

### `/deploy`
Complete deployment workflow with verification:
- Pre-deployment checks
- Git status validation
- Automated push to production
- Post-deployment verification
- Health checks

**When to use**: After completing and testing features locally, ready to push to production.

### `/pr`
Create well-formatted GitHub pull requests:
- Analyzes your commits and changes
- Generates comprehensive PR description
- Includes test plan and summary
- Uses `gh` CLI to create PR

**When to use**: When you want to create a PR for code review or documentation.

### `/fix-deploy`
Systematic deployment troubleshooting:
- Diagnoses common issues (404, 500, CORS, auth, database)
- Provides targeted fixes for each issue type
- Tests and verifies solutions
- Step-by-step debugging guide

**When to use**: When production is broken or behaving unexpectedly after deployment.

### `/rollback`
Safe deployment rollback:
- Identifies last working version
- Safety checks (migrations, uncommitted changes)
- Multiple rollback strategies (safe revert vs force push)
- Database rollback handling
- Post-rollback verification

**When to use**: When a deployment breaks production and you need to quickly restore working state.

## How It Works

1. **Startup**: When you run `ISRS.command`, it:
   - Checks git status, environment, database, dependencies
   - Starts local dev servers (frontend on 8080, backend on 3001)
   - Launches Claude Code with Sonnet 4.5
   - Displays available slash commands

2. **Slash Commands**: Type `/commandname` in Claude Code to trigger the command
   - Each command is a markdown file in `commands/` directory
   - Claude Code reads the file and executes the instructions
   - Commands have full context about ISRS project structure

3. **Project Context**: Claude Code automatically knows:
   - Working directories are set to frontend and backend locations
   - Database credentials and connection strings
   - Project architecture and recent changes
   - Common workflows and deployment procedures

## Customization

To add your own slash commands:

1. Create a new `.md` file in `.claude/commands/`
2. Name it after your command (e.g., `mycommand.md` → `/mycommand`)
3. Write instructions for Claude in markdown format
4. The command will be automatically available next time you start Claude Code

## Example Custom Command

Create `.claude/commands/test-auth.md`:

```markdown
# Test ISRS Authentication Flow

Test the complete authentication flow for ISRS.

1. Request a magic link for aaron.kornbluth@gmail.com
2. Query the database to get the magic_link_token
3. Simulate clicking the link (GET /auth/verify)
4. Verify the exchange token is created
5. Test the /api/auth/exchange endpoint
6. Verify session token is returned
7. Test /api/auth/session endpoint with the session token

Provide detailed output for each step with status indicators.
```

Then type `/test-auth` in Claude Code to run it!

## Tips

- Use `/start` at the beginning of each session
- Use `/status` before deploying or when debugging
- Keep your slash commands focused on a single task
- Include clear instructions and expected outputs
- Add error handling guidance for robust commands

## Support

For issues or questions about Claude Code:
- Type `/help` in Claude Code
- Visit: https://docs.claude.com/en/docs/claude-code
- Report issues: https://github.com/anthropics/claude-code/issues
