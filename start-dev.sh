#!/bin/bash

# ============================================
# ISRS Development Server Startup
# ============================================
# Backend Port:  3001
# Frontend Port: 8080
# ============================================

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

# Project directories
BACKEND_DIR="/Users/akorn/Desktop/isrs-database-backend"
FRONTEND_DIR="/Users/akorn/Desktop/ISRS"

# Start backend
start_backend() {
    echo -e "${BLUE}Starting ISRS Backend Server...${NC}"
    cd "$BACKEND_DIR"
    npm run dev &
    BACKEND_PID=$!
    echo -e "${GREEN}✓ Backend running on http://localhost:3001 (PID: $BACKEND_PID)${NC}"
}

# Start frontend
start_frontend() {
    echo -e "${BLUE}Starting ISRS Frontend Server...${NC}"
    cd "$FRONTEND_DIR"
    npm run dev &
    FRONTEND_PID=$!
    echo -e "${GREEN}✓ Frontend running on http://localhost:8080 (PID: $FRONTEND_PID)${NC}"
}

# Open Chrome tabs
open_browser() {
    sleep 3
    echo -e "${BLUE}Opening Chrome tabs...${NC}"

    open -na "Google Chrome" --args \
        --new-window "http://localhost:8080/" \
        --new-tab "http://localhost:3001/health" \
        --new-tab "https://isrs-frontend.onrender.com/" \
        --new-tab "https://isrs-frontend.onrender.com/member/" \
        --new-tab "https://dashboard.render.com/project/prj-d41llo7gi27c739l7bbg"

    echo -e "${GREEN}✓ Chrome tabs opened:${NC}"
    echo -e "  - Local Frontend (http://localhost:8080)"
    echo -e "  - Backend Health (http://localhost:3001/health)"
    echo -e "  - Production Frontend"
    echo -e "  - Production Member Portal"
    echo -e "  - Render Dashboard"
}

# Cleanup on Ctrl+C
cleanup() {
    echo -e "\n${BLUE}Shutting down servers...${NC}"
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    echo -e "${GREEN}✓ All servers stopped${NC}"
    exit 0
}

trap cleanup INT

# Main execution
start_backend
sleep 2
start_frontend
open_browser

echo ""
echo "=================================================="
echo -e "${GREEN}🌿 ISRS Development Environment Ready!${NC}"
echo "=================================================="
echo ""
echo "Frontend: http://localhost:8080"
echo "Backend:  http://localhost:3001"
echo "API Health: http://localhost:3001/health"
echo ""
echo "Press Ctrl+C to stop all servers"
echo "=================================================="

# Keep script running
wait
