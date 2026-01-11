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
- Create your .env file
- Start the application

The app will open at: **http://localhost:5173**

---

## Option 2: Manual Setup (Step by Step)

If you prefer to run commands manually, here they are:

### Step 1: Install Dependencies
Copy and paste:
```bash
npm install
```
Wait for it to finish (might take 1-2 minutes).

---

### Step 2: Create Environment File
Copy and paste:
```bash
cp .env.example .env
```

---

### Step 3: Start the App
Copy and paste:
```bash
npm run dev
```

The app will start at: **http://localhost:5173**

Your browser should automatically open. If not, manually go to http://localhost:5173

---

## 🔑 Adding Your Claude API Key (Optional)

The app works without an API key using mock responses. But for real AI responses:

1. **Get an API key:**
   - Go to https://console.anthropic.com/
   - Sign up or log in
   - Go to "API Keys" section
   - Create a new key

2. **Add it to your .env file:**

   Open the `.env` file (you can use TextEdit or any text editor):
   ```bash
   open .env
   ```

   Replace this:
   ```
   VITE_ANTHROPIC_API_KEY=your_api_key_here
   ```

   With your actual key:
   ```
   VITE_ANTHROPIC_API_KEY=sk-ant-api03-xxxxxxxxxxxxx
   ```

   Save the file.

3. **Restart the app:**
   - Press `Ctrl+C` in Terminal to stop
   - Run `npm run dev` again

---

## 🛑 To Stop the App

Press **Ctrl+C** in the Terminal window

---

## ❓ Troubleshooting

### "command not found: node"
**Problem:** Node.js is not installed
**Solution:** Install Node.js from https://nodejs.org/

### "permission denied: ./setup-mac.sh"
**Problem:** Script doesn't have execute permission
**Solution:** Run:
```bash
chmod +x setup-mac.sh
./setup-mac.sh
```

### Port 5173 is already in use
**Problem:** Another app is using that port
**Solution:**
```bash
# Kill whatever is on port 5173
lsof -ti:5173 | xargs kill -9
# Then try again
npm run dev
```

### Can't find the project
**Problem:** You're in the wrong directory
**Solution:**
```bash
# Navigate to the project folder first
cd /path/to/louisiana-business-chatbot
# Then run the setup
./setup-mac.sh
```

---

## 📱 Opening in Your Browser

After running `npm run dev`, you should see something like:

```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

**Just click the link or copy http://localhost:5173/ into your browser!**

---

## 🎉 Success!

You should see:
1. A welcome screen with Louisiana Business Assistant
2. A "Get Started" button
3. Blue and gold Louisiana-themed design

If you see this, you're ready to go! Click "Get Started" to begin.

---

## Need More Help?

- Full documentation: See `README.md`
- Issues: Check the troubleshooting section above
- Still stuck? The app logs will show in your Terminal - look for error messages there
