# ISRS Port Configuration

## Current Port Assignment

✅ **Frontend: Port 8080**
- Set in: `package.json`
- Scripts: `npm start` and `npm run dev`
- Config: `-l 8080` flag in serve command

**DO NOT CHANGE** - This port is locked for multi-project development.

---

## Multi-Project Port Scheme

When running multiple projects simultaneously, each uses different ports to avoid conflicts:

| Project | Backend | Frontend | Status |
|---------|---------|----------|--------|
| AKORN   | 3000    | 5173     | ✅ Locked |
| ISRS    | N/A     | 8080     | ✅ Locked |
| Project 3 | 3001  | 5174     | Available |
| Project 4 | 3002  | 5175     | Available |
| Project 5 | 3003  | 5176     | Available |

---

## Why Port 8080?

- **Different from standard dev ports** - Avoids conflicts with typical Node (3000) and Vite (5173) defaults
- **Static server convention** - Port 8080 is commonly used for static file servers
- **No backend** - ISRS is frontend-only, so we only need one port

---

## Running Multiple Projects

You can now run AKORN and ISRS simultaneously:

```bash
# Terminal 1: ISRS
cd ~/Desktop/ISRS
./ISRS.command
# Runs on localhost:8080

# Terminal 2: AKORN
cd ~/Desktop/AKORN
./AKORN.command
# Runs on localhost:3000 (backend) and localhost:5173 (frontend)
```

Each project has its own:
- iTerm2 window with project name as title
- Chrome window with project-specific tabs
- Port configuration that doesn't conflict

---

## Configuration Files

### package.json (lines 6-9)
```json
"scripts": {
  "start": "npx serve public -l 8080",
  "dev": "npx serve . -l 8080"
},
"_comment_port": "ISRS Frontend Port: 8080 - DO NOT CHANGE"
```

### start-dev.sh (lines 3-5)
```bash
# ISRS Port Configuration
# Frontend: Port 8080 - DO NOT CHANGE (locked for multi-project development)
# This allows ISRS to run simultaneously with other projects
```

---

## For Future Projects

When adding a new project, assign sequential ports:
- Backend: 3001, 3002, 3003, etc.
- Frontend: 5174, 5175, 5176, etc.

Update the table above to track all project ports.
