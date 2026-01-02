#!/bin/bash

# Start timing
STARTUP_START=$(date +%s)

echo -ne "\033]0;ISRS\007"
echo -ne "\033]1;ISRS\007"
cd ~/Desktop/ISRS

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  🦪 ISRS Development Environment"
echo "  📍 Location: $(pwd)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# ============================================
# 1. GIT STATUS CHECK
# ============================================
echo ""
echo "  🔍 Git Status:"
CURRENT_BRANCH=$(git branch --show-current 2>/dev/null)
if [ -n "$CURRENT_BRANCH" ]; then
    echo -e "  ${BLUE}📌 Branch: $CURRENT_BRANCH${NC}"

    # Check if not on main
    if [ "$CURRENT_BRANCH" != "main" ]; then
        echo -e "  ${YELLOW}⚠️  Not on main branch${NC}"
    fi

    # Check for uncommitted changes
    if ! git diff-index --quiet HEAD 2>/dev/null; then
        CHANGED_FILES=$(git status --short | wc -l | xargs)
        echo -e "  ${YELLOW}⚠️  $CHANGED_FILES uncommitted changes${NC}"
    else
        echo -e "  ${GREEN}✓ Working tree clean${NC}"
    fi

    # Check ahead/behind
    git fetch origin $CURRENT_BRANCH 2>/dev/null
    AHEAD=$(git rev-list --count origin/$CURRENT_BRANCH..HEAD 2>/dev/null || echo "0")
    BEHIND=$(git rev-list --count HEAD..origin/$CURRENT_BRANCH 2>/dev/null || echo "0")

    if [ "$AHEAD" != "0" ]; then
        echo -e "  ${BLUE}↑ $AHEAD commits ahead of origin${NC}"
    fi
    if [ "$BEHIND" != "0" ]; then
        echo -e "  ${YELLOW}↓ $BEHIND commits behind origin${NC}"
    fi

    # Last commit
    LAST_COMMIT=$(git log -1 --pretty=format:"%h - %s" 2>/dev/null)
    echo -e "  ${BLUE}📝 Last: $LAST_COMMIT${NC}"
else
    echo -e "  ${RED}❌ Not a git repository${NC}"
fi

# ============================================
# 2. ENVIRONMENT VALIDATION
# ============================================
echo ""
echo "  🔐 Environment Check:"
REQUIRED_VARS=("DATABASE_URL" "JWT_SECRET" "SESSION_SECRET")
ENV_VALID=true

# Check backend .env
if [ -f "/Users/akorn/Desktop/isrs-database-backend/.env" ]; then
    source /Users/akorn/Desktop/isrs-database-backend/.env
    echo -e "  ${GREEN}✅ Backend .env file loaded${NC}"

    # Check age
    if [ "$(uname)" = "Darwin" ]; then
        last_modified=$(stat -f %m "/Users/akorn/Desktop/isrs-database-backend/.env")
    else
        last_modified=$(stat -c %Y "/Users/akorn/Desktop/isrs-database-backend/.env")
    fi
    current_time=$(date +%s)
    days_old=$(((current_time - last_modified) / 86400))

    if [ $days_old -gt 7 ]; then
        echo -e "  ${YELLOW}⚠️  Backend .env is $days_old days old - consider syncing${NC}"
    fi

    # Validate required variables
    for var in "${REQUIRED_VARS[@]}"; do
        if [ -z "${!var}" ]; then
            echo -e "  ${RED}❌ Missing: $var${NC}"
            ENV_VALID=false
        fi
    done

    if [ "$ENV_VALID" = true ]; then
        echo -e "  ${GREEN}✓ All required variables present${NC}"
    fi
else
    echo -e "  ${RED}❌ No backend .env file found${NC}"
    echo -e "  ${YELLOW}💡 Copy from .env.example in isrs-database-backend/${NC}"
    ENV_VALID=false
fi

# ============================================
# 3. DATABASE HEALTH CHECK
# ============================================
echo ""
echo "  🗄️  Database Check:"
if [ -n "$DATABASE_URL" ]; then
    if psql "$DATABASE_URL" -c "SELECT 1;" > /dev/null 2>&1; then
        echo -e "  ${GREEN}✅ Database connection successful${NC}"

        # Check last migration (if migrations table exists)
        LAST_MIGRATION=$(psql "$DATABASE_URL" -t -c "SELECT version FROM schema_migrations ORDER BY version DESC LIMIT 1;" 2>/dev/null | xargs)
        if [ -n "$LAST_MIGRATION" ]; then
            echo -e "  ${BLUE}📊 Last migration: $LAST_MIGRATION${NC}"
        fi
    else
        echo -e "  ${YELLOW}⚠️  Database connection failed${NC}"
    fi
else
    echo -e "  ${YELLOW}⚠️  No DATABASE_URL configured${NC}"
fi

# ============================================
# 4. DEPENDENCY CHECK
# ============================================
echo ""
echo "  📦 Dependency Check:"

# Backend
if [ -d "/Users/akorn/Desktop/isrs-database-backend/node_modules" ]; then
    echo -e "  ${GREEN}✓ Backend dependencies installed${NC}"
else
    echo -e "  ${YELLOW}⚠️  Backend node_modules missing - run: cd isrs-database-backend && npm install${NC}"
fi

# Frontend
if [ -d "node_modules" ]; then
    echo -e "  ${GREEN}✓ Frontend dependencies installed${NC}"
else
    echo -e "  ${YELLOW}⚠️  Frontend node_modules missing - run: npm install${NC}"
fi

# ============================================
# 5. PORT CONFLICT DETECTION
# ============================================
echo ""
echo "  🔌 Port Check:"
PORT_CONFLICT=false

# Check backend port 3001
if lsof -Pi :3001 -sTCP:LISTEN -t >/dev/null 2>&1; then
    PID=$(lsof -Pi :3001 -sTCP:LISTEN -t)
    PROCESS=$(ps -p $PID -o comm= 2>/dev/null)
    echo -e "  ${YELLOW}⚠️  Port 3001 in use by $PROCESS (PID: $PID)${NC}"
    PORT_CONFLICT=true
else
    echo -e "  ${GREEN}✓ Port 3001 available${NC}"
fi

# Check frontend port 8080
if lsof -Pi :8080 -sTCP:LISTEN -t >/dev/null 2>&1; then
    PID=$(lsof -Pi :8080 -sTCP:LISTEN -t)
    PROCESS=$(ps -p $PID -o comm= 2>/dev/null)
    echo -e "  ${YELLOW}⚠️  Port 8080 in use by $PROCESS (PID: $PID)${NC}"
    PORT_CONFLICT=true
else
    echo -e "  ${GREEN}✓ Port 8080 available${NC}"
fi

# Auto-cleanup if ports are in use
if [ "$PORT_CONFLICT" = true ]; then
    echo -e "  ${BLUE}🧹 Cleaning up port conflicts...${NC}"
    pkill -9 node 2>/dev/null
    sleep 2
    echo -e "  ${GREEN}✓ Ports cleared${NC}"
else
    pkill -9 node 2>/dev/null && echo -e "  ${GREEN}✓ Cleaned up old processes${NC}" || echo -e "  ${GREEN}✓ No old processes${NC}"
fi

# ============================================
# 6. LAST DEPLOYMENT INFO
# ============================================
echo ""
echo "  🚀 Deployment Status:"

# Get last deploy from git
LAST_DEPLOY_COMMIT=$(git log --grep="deploy\|Deploy" -1 --pretty=format:"%h - %ar - %s" 2>/dev/null)
if [ -n "$LAST_DEPLOY_COMMIT" ]; then
    echo -e "  ${BLUE}📅 Last deploy: $LAST_DEPLOY_COMMIT${NC}"
fi

# Check if we can get Render status
if command -v render &> /dev/null; then
    RENDER_STATUS=$(render deploys list --limit 1 2>/dev/null | grep -v "ID" | head -1)
    if [ -n "$RENDER_STATUS" ]; then
        echo -e "  ${BLUE}🎯 Render: $RENDER_STATUS${NC}"
    fi
fi

# ============================================
# 7. START DEVELOPMENT SERVERS
# ============================================
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  🚀 Starting Development Servers..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Start servers
./start-dev.sh &
DEV_PID=$!

# Wait and verify
sleep 7

RETRY_COUNT=0
MAX_RETRIES=3
while [ $RETRY_COUNT -lt $MAX_RETRIES ]; do
    if curl -s http://localhost:3001/health > /dev/null 2>&1 && curl -s http://localhost:8080 > /dev/null 2>&1; then
        echo -e "  ${GREEN}✅ Servers verified and running${NC}"
        break
    else
        RETRY_COUNT=$((RETRY_COUNT + 1))
        if [ $RETRY_COUNT -lt $MAX_RETRIES ]; then
            echo -e "  ${YELLOW}⏳ Waiting for servers... (attempt $RETRY_COUNT/$MAX_RETRIES)${NC}"
            sleep 5
        else
            echo -e "  ${YELLOW}⚠️  Servers may not be fully started${NC}"
        fi
    fi
done

# ============================================
# 8. AUTO-OPEN CHROME WITH APPROVED URLS
# ============================================
echo ""
echo "  🌐 Opening Chrome with ISRS URLs..."

# Open Chrome with multiple tabs
open -a "Google Chrome" \
  "http://localhost:8080/public/" \
  "http://localhost:8080/admin" \
  "http://localhost:8080/member/login.html" \
  "http://localhost:3001/health" \
  "https://isrs-frontend.onrender.com/" \
  "https://isrs-frontend.onrender.com/admin" \
  "https://dashboard.render.com/project/prj-d41llo7gi27c739l7bbg"

echo -e "  ${GREEN}✅ Chrome launched with ISRS tabs${NC}"

# ============================================
# 9. AUTO-LOGIN MAGIC LINK (for ISRS authentication)
# ============================================
echo ""
echo "  🔑 Magic Link Info:"
echo -e "  ${BLUE}💡 ISRS uses magic link authentication${NC}"
echo -e "  ${BLUE}📧 Request login link at: http://localhost:8080/member/login.html${NC}"

# ============================================
# 10. QUICK COMMANDS MENU
# ============================================
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  📋 Quick Commands:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  /deploy      - Deploy to production (if configured)"
echo "  /status      - Check deployment status"
echo "  /pr          - Create pull request"
echo ""
echo "  Development URLs:"
echo "  📱 Frontend:  http://localhost:8080/public/"
echo "  👥 Member:    http://localhost:8080/member/"
echo "  🔧 Backend:   http://localhost:3001"
echo "  🏥 Health:    http://localhost:3001/health"
echo "  🌐 Prod:      https://isrs-frontend.onrender.com"
echo "  🎛️  Render:    https://dashboard.render.com/project/prj-d41llo7gi27c739l7bbg"
echo ""

# ============================================
# 11. STARTUP TIME
# ============================================
STARTUP_END=$(date +%s)
STARTUP_TIME=$((STARTUP_END - STARTUP_START))
echo -e "  ${GREEN}⚡ Startup completed in ${STARTUP_TIME}s${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "  🤖 Starting Claude Code (Sonnet 4.5)..."
echo ""
echo "  💡 ISRS-Specific Claude Commands Available:"
echo "     /start      - Project overview and context"
echo "     /status     - Check deployment and system status"
echo "     /deploy     - Deploy changes to production"
echo "     /pr         - Create GitHub pull request"
echo "     /fix-deploy - Troubleshoot deployment issues"
echo "     /rollback   - Rollback to previous deployment"
echo ""
echo -e "  ${BLUE}💬 Type /start in Claude Code to see full project details${NC}"
echo ""

# ============================================
# CLEANUP HANDLER
# ============================================
cleanup() {
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "  🛑 Shutting down ISRS development environment..."
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    kill $DEV_PID 2>/dev/null
    killall node 2>/dev/null
    echo -e "  ${GREEN}✅ All servers stopped${NC}"
    echo "  👋 Goodbye!"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
}
trap cleanup EXIT

# ============================================
# LAUNCH CLAUDE CODE
# ============================================
export ANTHROPIC_API_KEY=""
export CLAUDE_API_KEY=""
claude --model sonnet
