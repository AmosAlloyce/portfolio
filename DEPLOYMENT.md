# Deployment Guide - Render.com (Free Tier)

This guide will help you deploy your portfolio website to Render.com, making it accessible on the live internet for **FREE**.

## Prerequisites

1. GitHub account with your portfolio code pushed
2. Render.com account (sign up at https://render.com)
3. GitHub Personal Access Token
4. Groq API Key

## Step-by-Step Deployment

### 1. Prepare Your Repository

First, push your code to GitHub:

```bash
cd /home/alloyce/portfolio
git add .
git commit -m "Initial portfolio setup"
git remote add origin https://github.com/AmosAlloyce/portfolio.git
git push -u origin main
```

### 2. Sign Up for Render.com

1. Go to https://render.com
2. Click "Get Started for Free"
3. Sign up with your GitHub account
4. Authorize Render to access your repositories

### 3. Create PostgreSQL Database

1. From Render Dashboard, click **"New +"** → **"PostgreSQL"**
2. Configure:
   - **Name:** `portfolio-db`
   - **Database:** `portfolio_production`
   - **User:** `portfolio`
   - **Region:** Oregon (US West) - closest free region
   - **Plan:** **Free**
3. Click **"Create Database"**
4. Wait for database to be created (takes ~2 minutes)
5. **Copy the Internal Database URL** - you'll need this

### 4. Create Redis Instance

1. Click **"New +"** → **"Redis"**
2. Configure:
   - **Name:** `portfolio-redis`
   - **Region:** Oregon (US West)
   - **Plan:** **Free**
   - **Maxmemory Policy:** `allkeys-lru`
3. Click **"Create Redis"**
4. **Copy the Internal Redis URL** - you'll need this

### 5. Create Web Service

1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository:
   - Select **"Build and deploy from a Git repository"**
   - Click **"Connect"** next to your portfolio repository
3. Configure the service:
   - **Name:** `portfolio-web` (or your preferred name)
   - **Region:** Oregon (US West)
   - **Branch:** `main`
   - **Root Directory:** Leave empty
   - **Runtime:** **Ruby**
   - **Build Command:**
     ```bash
     bundle install && rails db:migrate && rails assets:precompile
     ```
   - **Start Command:**
     ```bash
     bundle exec puma -C config/puma.rb
     ```
   - **Plan:** **Free**

### 6. Configure Environment Variables

In the **Environment** section, add these variables:

| Key | Value | Notes |
|-----|-------|-------|
| `RAILS_ENV` | `production` | Required |
| `RAILS_MASTER_KEY` | [Generate with `rails secret`] | **CRITICAL** - Keep secret! |
| `SECRET_KEY_BASE` | [Generate with `rails secret`] | **CRITICAL** - Keep secret! |
| `GITHUB_TOKEN` | `ghp_your_token_here` | From github.com/settings/tokens |
| `GROQ_API_KEY` | `gsk_your_key_here` | From console.groq.com |
| `GITHUB_USERNAME` | `AmosAlloyce` | Your GitHub username |
| `DATABASE_URL` | [Paste Internal Database URL from step 3] | From PostgreSQL service |
| `REDIS_URL` | [Paste Internal Redis URL from step 4] | From Redis service |

**To generate RAILS_MASTER_KEY and SECRET_KEY_BASE:**
```bash
docker compose run --rm web rails secret
# Copy the output and use it for both variables
```

### 7. Deploy!

1. Click **"Create Web Service"**
2. Render will automatically:
   - Clone your repository
   - Install dependencies
   - Run migrations
   - Build assets
   - Start your application
3. **First deployment takes 5-10 minutes**
4. Watch the logs for any errors

### 8. Initialize Your Data

Once deployed, you need to sync your GitHub repositories:

**Option A: Using Render Shell (Recommended)**
1. Go to your web service dashboard
2. Click **"Shell"** tab
3. Run:
   ```bash
   rails runner "GithubSyncService.new.sync_all"
   ```

**Option B: Using API Endpoint**
```bash
curl -X POST https://your-app-name.onrender.com/api/sync
```

### 9. Access Your Live Website

Your portfolio is now live at:
```
https://your-app-name.onrender.com
```

Example: `https://portfolio-web-abc123.onrender.com`

You can also add a custom domain in Render settings!

## Post-Deployment Configuration

### Set Up Automatic Syncing (Optional)

To keep your repositories updated, you can:

1. **Use Render Cron Jobs (Paid feature)** - Schedule daily syncs
2. **Use GitHub Actions** - Trigger sync on push
3. **Manual sync** - Run the API endpoint when needed

### GitHub Actions Example

Create `.github/workflows/sync-repos.yml`:

```yaml
name: Sync Repositories

on:
  schedule:
    - cron: '0 0 * * *'  # Daily at midnight
  workflow_dispatch:  # Manual trigger

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger Sync
        run: |
          curl -X POST https://your-app-name.onrender.com/api/sync
```

## Monitoring & Maintenance

### View Logs
1. Go to your web service dashboard
2. Click **"Logs"** tab
3. Monitor for errors or issues

### Check Service Health
Visit: `https://your-app-name.onrender.com/up`

### Database Backups
Render automatically backs up your PostgreSQL database daily (free tier).

## Troubleshooting

### Build Fails

**Error: "Bundle install failed"**
- Check your Gemfile.lock is committed
- Ensure Ruby version matches in `.ruby-version`

**Error: "Database migration failed"**
- Verify DATABASE_URL is set correctly
- Check database is running and accessible

### Application Won't Start

**Error: "Missing SECRET_KEY_BASE"**
- Generate a new secret: `rails secret`
- Add it to environment variables

**Error: "GitHub API rate limit"**
- Verify GITHUB_TOKEN is set correctly
- Check token has required permissions

### Slow Performance

Free tier limitations:
- **Spins down after 15 minutes of inactivity**
- First request after spin-down takes 30-60 seconds
- Upgrade to paid plan ($7/month) for always-on service

### Database Connection Issues

- Verify DATABASE_URL format: `postgresql://user:password@host:port/database`
- Check PostgreSQL service is running
- Ensure web service and database are in same region

## Free Tier Limits

**Web Service:**
- 750 hours/month (enough for 24/7 if only one service)
- Spins down after 15 minutes of inactivity
- 512 MB RAM
- Shared CPU

**PostgreSQL:**
- 1 GB storage
- Expires after 90 days (must upgrade or migrate)
- Daily backups

**Redis:**
- 25 MB storage
- Expires after 90 days

## Upgrading to Paid Plans

If you need more resources:
- **Web Service:** $7/month (always-on, more RAM)
- **PostgreSQL:** $7/month (persistent, 1 GB storage)
- **Redis:** $10/month (persistent, 100 MB storage)

## Alternative Free Hosting Options

If Render doesn't work for you:

1. **Railway.app** - Similar to Render, $5 free credit/month
2. **Fly.io** - Free tier with 3 VMs, 3 GB storage
3. **Heroku** - No longer has free tier (paid only)

## Security Best Practices

1. **Never commit secrets** - Use environment variables
2. **Rotate API keys** - Change them periodically
3. **Enable HTTPS** - Render provides free SSL certificates
4. **Monitor logs** - Check for suspicious activity
5. **Keep dependencies updated** - Run `bundle update` regularly

## Support

- **Render Docs:** https://render.com/docs
- **Render Community:** https://community.render.com
- **Rails Guides:** https://guides.rubyonrails.org

---

**Your portfolio is now live and accessible to anyone on the internet! 🎉**

Share your URL with potential employers, clients, and the developer community!
