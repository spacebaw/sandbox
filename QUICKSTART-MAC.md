# 🚀 Quick Start Guide for Mac

## Prerequisites

**You need Node.js installed on your Mac.**

Check if you have it:
```bash
node --version
```

If you don't have Node.js (or get an error), install it:
1. Go to https://nodejs.org/
2. Download the LTS version for Mac
3. Install it (just click through the installer)

---

## Option 1: Automatic Setup (Easiest) ⭐

**Just copy and paste this ONE command into your Terminal:**

```bash
./setup-mac.sh
```

That's it! The script will:
- Install all dependencies
- Create your server/.env file
- Start BOTH the backend API and frontend app

You'll see:
- **Backend API** at: http://localhost:3001
- **Frontend App** at: http://localhost:5173

The browser should open automatically!

---

## Option 2: Manual Setup (Step by Step)

If you prefer to run commands manually:

### Step 1: Install Dependencies
```bash
npm install
```
Wait for it to finish (might take 1-2 minutes).

---

### Step 2: Create Backend Environment File
```bash
cp server/.env.example server/.env
```

---

### Step 3: Start Both Servers
```bash
npm start
```

This starts:
- Backend server on port 3001
- Frontend app on port 5173

Your browser should automatically open to http://localhost:5173

---

## 🔑 Adding Your Claude API Key (Optional)

**The app works great without an API key!** It uses smart mock responses.

**But for real AI-powered responses:**

### Step 1: Get an API Key
- Go to https://console.anthropic.com/
- Sign up or log in
- Go to "API Keys" section
- Create a new key

### Step 2: Add it to server/.env

Open the file:
```bash
open server/.env
```

Replace this:
```
ANTHROPIC_API_KEY=your_api_key_here
```

With your actual key:
```
ANTHROPIC_API_KEY=sk-ant-api03-xxxxxxxxxxxxx
```

Save the file (Cmd+S).

### Step 3: Restart

Press **Ctrl+C** in Terminal to stop both servers, then:
```bash
npm start
```

Now you'll get real AI responses! 🎉

---

## 🛑 To Stop the Servers

Press **Ctrl+C** in the Terminal window (this stops both servers)

---

## 📁 Project Structure

```
louisiana-business-chatbot/
├── src/               # Frontend React app
├── server/            # Backend API server
│   ├── index.js      # Express server
│   └── .env          # API key (create this)
├── package.json       # Dependencies
└── setup-mac.sh      # Easy setup script
```

---

## ❓ Troubleshooting

### "command not found: node"
**Problem:** Node.js is not installed
**Solution:** Install from https://nodejs.org/

---

### "permission denied: ./setup-mac.sh"
**Problem:** Script doesn't have execute permission
**Solution:**
```bash
chmod +x setup-mac.sh
./setup-mac.sh
```

---

### "Port 3001 or 5173 already in use"
**Problem:** Another app is using those ports
**Solution:**
```bash
# Kill processes on those ports
lsof -ti:3001 | xargs kill -9
lsof -ti:5173 | xargs kill -9
# Then try again
npm start
```

---

### "ENOENT: no such file or directory"
**Problem:** You're in the wrong directory
**Solution:**
```bash
# Navigate to the project folder
cd ~/Desktop/sandbox
# Verify you're in the right place
ls
# You should see: package.json, src/, server/, etc.
# Then try again
npm start
```

---

### Backend not connecting / Mock responses showing
**Problem:** Backend server isn't running properly
**Solution:**
1. Make sure you ran `npm start` (not just `npm run dev`)
2. Check Terminal - you should see TWO servers starting
3. Look for "Backend server running on http://localhost:3001"
4. Try visiting http://localhost:3001/api/health in your browser
5. It should show: `{"status":"ok","hasApiKey":false}` (or true if key is set)

---

## 🎯 Quick Commands Reference

```bash
# Install everything
npm install

# Start both servers (recommended)
npm start

# Start ONLY frontend (mock responses only)
npm run dev

# Start ONLY backend
npm run server

# Pull latest changes from GitHub
git pull origin claude/louisiana-business-chatbot-W5ceL
```

---

## 🎉 Success!

You should see:
1. Terminal showing both servers starting
2. Browser opens to http://localhost:5173
3. A welcome screen with Louisiana Business Assistant
4. Blue and gold Louisiana-themed design

**Click "Get Started"** to begin!

---

## 🔄 Pulling Updates

When new changes are pushed, get them with:

```bash
cd ~/Desktop/sandbox
git pull origin claude/louisiana-business-chatbot-W5ceL
npm install  # In case new dependencies were added
npm start
```

---

## 💡 How It Works Now

**Architecture:**
```
Frontend (React)          Backend (Express)         Claude API
    :5173          →          :3001           →      Anthropic
                 (fetch)                      (secure)
```

Your API key is now **safely stored on the backend** (server/.env), not in the browser!

This fixes the CORS error you were seeing before. 🎊

---

## 📖 Need More Help?

- Full documentation: See `README.md`
- Issues: Check troubleshooting section above
- The Terminal shows helpful logs - look for error messages there

---

**Built with ❤️ for Louisiana small businesses**
