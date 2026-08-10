# 🚀 Deploy Your Portfolio to Render.com (FREE)

## Step 1: Get Your API Keys Ready

### GitHub Token
1. Go to https://github.com/settings/tokens
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. Name it: `Portfolio Render`
4. Select scope: **`repo`** (full control of private repositories)
5. Click **"Generate token"**
6. **Copy the token** (starts with `ghp_`)

### Groq API Key
1. Go to https://console.groq.com/keys
2. Click **"Create API Key"**
3. Name it: `Portfolio`
4. **Copy the key** (starts with `gsk_`)

### Rails Master Key
Run this command locally:
```bash
docker compose run --rm web rails secret
```
Copy the output (long random string)

---

## Step 2: Sign Up on Render.com

1. Go to **https://render.com**
2. Click **"Get Started for Free"**
3. Click **"Sign in with GitHub"**
4. Authorize Render to access your repositories

---

## Step 3: Create PostgreSQL Database

1. From Render Dashboard, click **"New +"** → **"PostgreSQL"**
2. Configure:
   - **Name:** `portfolio-db`
   - **Database:** `portfolio_production`
   - **User:** `portfolio`
   - **Region:** Oregon (US West)
   - **Plan:** **Free**
3. Click **"Create Database"**
4. Wait 2 minutes for it to be created
5. **Copy the "Internal Database URL"** (you'll need this)

---

## Step 4: Create Redis Instance

1. Click **"New +"** → **"Redis"**
2. Configure:
   - **Name:** `portfolio-redis`
   - **Region:** Oregon (US West)
   - **Plan:** **Free**
   - **Maxmemory Policy:** `allkeys-lru`
3. Click **"Create Redis"**
4. **Copy the "Internal Redis URL"** (you'll need this)

---

## Step 5: Create Web Service

1. Click **"New +"** → **"Web Service"**
2. Click **"Build and deploy from a Git repository"**
3. Find and click **"Connect"** next to `AmosAlloyce/portfolio`
4. Configure:
   - **Name:** `portfolio-web` (or your preferred name)
   - **Region:** Oregon (US West)
   - **Branch:** `main`
   - **Root Directory:** (leave empty)
   - **Runtime:** **Ruby**
   - **Build Command:**
     ```
     bundle install && rails db:migrate && rails assets:precompile
     ```
   - **Start Command:**
     ```
     bundle exec puma -C config/puma.rb
     ```
   - **Plan:** **Free**

---

## Step 6: Add Environment Variables

Scroll down to **"Environment Variables"** section and add these:

| Key | Value |
|-----|-------|
| `RAILS_ENV` | `production` |
| `RAILS_MASTER_KEY` | [Paste the output from `rails secret`] |
| `SECRET_KEY_BASE` | [Same as RAILS_MASTER_KEY] |
| `GITHUB_TOKEN` | `ghp_your_token_here` |
| `GROQ_API_KEY` | `gsk_your_key_here` |
| `GITHUB_USERNAME` | `AmosAlloyce` |
| `DATABASE_URL` | [Paste Internal Database URL from Step 3] |
| `REDIS_URL` | [Paste Internal Redis URL from Step 4] |

---

## Step 7: Deploy!

1. Click **"Create Web Service"**
2. Render will start building your application
3. **Wait 5-10 minutes** for first deployment
4. Watch the logs for progress
5. Look for: **"Your service is live 🎉"**

---

## Step 8: Sync Your GitHub Repositories

Once deployed, your app will be at: `https://portfolio-web-xxxx.onrender.com`

Run this command to sync your repositories:
```bash
curl -X POST https://your-app-name.onrender.com/api/sync
```

Replace `your-app-name` with your actual Render URL.

---

## 🎉 You're Live!

Visit your portfolio at: `https://your-app-name.onrender.com`

### What Visitors Can Do:
- Browse your 7 featured GitHub projects
- Launch Docker containers via Play-with-Docker
- Chat with AI about your projects
- Filter by programming language
- View detailed project pages

---

## ⚠️ Important Notes

**Free Tier Limitations:**
- App spins down after 15 minutes of inactivity
- First request after spin-down takes 30-60 seconds
- PostgreSQL expires after 90 days (must upgrade or migrate)

**To Keep It Always On:**
- Upgrade to paid plan ($7/month for web service)

---

## 🔧 Troubleshooting

**Build fails with "Bundle install failed":**
- Check Ruby version matches `.ruby-version` file

**"Missing SECRET_KEY_BASE" error:**
- Make sure you added RAILS_MASTER_KEY and SECRET_KEY_BASE

**Database connection error:**
- Verify DATABASE_URL is correct
- Ensure PostgreSQL service is running

**GitHub sync returns empty:**
- Check GITHUB_TOKEN is valid
- Verify GITHUB_USERNAME is correct

---

## 📞 Need Help?

- **Render Docs:** https://render.com/docs
- **Render Community:** https://community.render.com
- **Your Code:** https://github.com/AmosAlloyce/portfolio

**Total Cost: $0/month** 💰
**Total Time: ~15 minutes** ⏱️
