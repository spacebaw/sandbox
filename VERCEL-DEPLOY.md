# 🚀 Deploying Louisiana Business Assistant to Vercel

This guide will walk you through deploying your chatbot to Vercel for free!

## 📋 Prerequisites

1. **GitHub Account** - Your code needs to be on GitHub
2. **Vercel Account** - Sign up at https://vercel.com (free!)
3. **Anthropic API Key** - From https://console.anthropic.com/

---

## 🎯 Step-by-Step Deployment

### Step 1: Push Your Code to GitHub

First, make sure all your latest changes are committed and pushed:

```bash
cd ~/Desktop/sandbox
git add -A
git commit -m "Prepare for Vercel deployment"
git push origin claude/louisiana-business-chatbot-W5ceL
```

Then, merge to your main branch (or create a new branch for deployment):

```bash
# Option A: Merge to main
git checkout main
git merge claude/louisiana-business-chatbot-W5ceL
git push origin main

# Option B: Push current branch (Vercel can deploy from any branch)
# Already done above!
```

---

### Step 2: Sign Up for Vercel

1. Go to https://vercel.com
2. Click **"Sign Up"**
3. Choose **"Continue with GitHub"**
4. Authorize Vercel to access your GitHub repositories

---

### Step 3: Import Your Project

1. On Vercel Dashboard, click **"Add New..."** → **"Project"**
2. Find your repository: `spacebaw/sandbox` (or whatever your repo is named)
3. Click **"Import"**

---

### Step 4: Configure Build Settings

Vercel should auto-detect your Vite project. Verify these settings:

- **Framework Preset:** Vite
- **Root Directory:** `./` (leave as is)
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

**These should be auto-filled! Just verify they're correct.**

---

### Step 5: Add Environment Variables

**CRITICAL STEP:** Add your API key as an environment variable.

1. Scroll down to **"Environment Variables"** section
2. Add a new variable:
   - **Name:** `ANTHROPIC_API_KEY`
   - **Value:** Your API key (e.g., `sk-ant-api03-xxxxxxxxxxxxx`)
   - **Environments:** Select all three: Production, Preview, Development
3. Click **"Add"**

**Important:** Your API key will be securely stored on Vercel's servers and NEVER exposed to the browser!

---

### Step 6: Deploy!

1. Click **"Deploy"**
2. Wait 1-2 minutes while Vercel builds your project
3. You'll see a success screen with your live URL! 🎉

Your chatbot will be live at: `https://your-project-name.vercel.app`

---

## ✅ Verify Your Deployment

### Test the Frontend
1. Visit your Vercel URL
2. You should see the Louisiana Business Assistant welcome screen

### Test the API
Visit: `https://your-project-name.vercel.app/api/health`

You should see:
```json
{
  "status": "ok",
  "hasApiKey": true
}
```

### Test the Chatbot
1. Click "Get Started"
2. Complete the assessment
3. Ask a question - you should get real AI responses!

---

## 🔧 Troubleshooting

### "API key not configured" error
- Go to your Vercel Dashboard → Project → Settings → Environment Variables
- Make sure `ANTHROPIC_API_KEY` is set
- Redeploy: Deployments tab → Click ⋯ → Redeploy

### Build fails
- Check the build logs in Vercel
- Common issues:
  - TypeScript errors: Fix locally and push again
  - Missing dependencies: Make sure package.json is committed

### API returns 404
- Check that `/api/chat.js` and `/api/health.js` exist in your repo
- Vercel automatically creates API routes from files in `/api/` directory

### Chatbot shows mock responses
- API key might not be set in Vercel environment variables
- Check `/api/health` endpoint to verify `hasApiKey: true`

---

## 🎨 Custom Domain (Optional)

Want a custom domain like `businesshelp.com`?

1. Go to Project Settings → Domains
2. Click "Add"
3. Enter your domain name
4. Follow DNS configuration instructions
5. Wait for DNS propagation (5-60 minutes)

---

## 🔄 Updating Your Deployment

Every time you push to GitHub, Vercel automatically redeploys!

```bash
# Make changes locally
git add -A
git commit -m "Update chatbot features"
git push origin main
```

Vercel will automatically:
1. Detect the push
2. Build your project
3. Deploy the new version
4. Keep the same URL

**Preview deployments:** Every branch gets its own preview URL for testing!

---

## 💰 Cost

- **Vercel Hobby Plan:** FREE
  - Unlimited deployments
  - Automatic HTTPS
  - Global CDN
  - Perfect for this project!

- **Claude API Costs:** Pay per use
  - Monitor at https://console.anthropic.com/
  - ~$0.001 per conversation (very cheap!)

---

## 📊 Monitoring

### View Logs
1. Go to Vercel Dashboard → Your Project
2. Click "Deployments"
3. Click any deployment → "Functions" tab
4. See real-time logs for API calls

### Analytics (Optional)
1. Project Settings → Analytics
2. Enable Vercel Analytics (free!)
3. See visitor stats and performance

---

## 🔒 Security Best Practices

✅ **Already Implemented:**
- API key stored securely in Vercel environment variables
- CORS properly configured
- HTTPS enabled by default
- API key never exposed to browser

⚠️ **Optional Enhancements:**
- Add rate limiting (to prevent abuse)
- Add user authentication (if needed)
- Monitor API usage and set billing alerts

---

## 🎉 You're Live!

Your Louisiana Business Assistant is now:
- ✅ Accessible worldwide at your Vercel URL
- ✅ Automatically HTTPS secured
- ✅ Auto-deploying on every git push
- ✅ Hosted on global CDN for fast performance
- ✅ API key safely secured

**Share your URL with Louisiana small business owners and help them succeed!** 🌟

---

## 📞 Need Help?

- **Vercel Docs:** https://vercel.com/docs
- **Vercel Support:** https://vercel.com/support
- **GitHub Issues:** Create an issue in your repo

---

**Built with ❤️ for Louisiana small businesses**
