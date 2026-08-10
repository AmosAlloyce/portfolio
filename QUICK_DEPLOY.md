# Quick Deployment Guide - Fix Git Permissions

## The Issue
The `.git` directory was created by Docker with root ownership, causing permission errors.

## Solution: Fresh Start (2 Minutes)

### Step 1: Create Fresh Git Repository
Run these commands in your terminal:

```bash
cd /home/alloyce/portfolio

# Remove the problematic .git directory (requires password)
sudo rm -rf .git

# Initialize fresh git repository
git init

# Configure git (update email)
git config user.name "Amos Alloyce"
git config user.email "your-email@example.com"
```

### Step 2: Commit Your Code
```bash
# Stage all files
git add .

# Create initial commit
git commit -m "Initial portfolio setup with AI features"
```

### Step 3: Push to GitHub

**First, create a new repository on GitHub:**
1. Go to https://github.com/new
2. Repository name: `portfolio`
3. Keep it **Public**
4. **DO NOT** initialize with README (we already have one)
5. Click "Create repository"

**Then push your code:**
```bash
# Add GitHub remote (replace with your actual repo URL)
git remote add origin https://github.com/AmosAlloyce/portfolio.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 4: Deploy on Render.com

1. **Sign up at https://render.com** (use GitHub login)

2. **Click "New +" → "Web Service"**

3. **Connect your portfolio repository**

4. **Render will auto-detect `render.yaml`** and configure:
   - PostgreSQL database
   - Redis cache
   - Web service

5. **Add Environment Variables** in Render dashboard:
   ```
   GITHUB_TOKEN=ghp_your_token_here
   GROQ_API_KEY=gsk_your_key_here
   RAILS_MASTER_KEY=<generate with: rails secret>
   GITHUB_USERNAME=AmosAlloyce
   ```

6. **Click "Create Web Service"** - deployment takes 5-10 minutes

7. **After deployment, sync your repositories:**
   ```bash
   curl -X POST https://your-app-name.onrender.com/api/sync
   ```

### Step 5: Access Your Live Portfolio
Your portfolio will be live at:
```
https://your-app-name.onrender.com
```

## Generate RAILS_MASTER_KEY

Run this locally:
```bash
docker compose run --rm web rails secret
```

Copy the output and use it as `RAILS_MASTER_KEY` in Render.

## Troubleshooting

**"Permission denied" when running sudo rm -rf .git**
- Enter your system password when prompted
- This is a one-time operation to clean up the Docker-created files

**"Authentication failed" when pushing to GitHub**
- Use a Personal Access Token instead of password
- Create one at: https://github.com/settings/tokens
- Use it as your password when prompted

**Render deployment fails**
- Check all environment variables are set correctly
- View logs in Render dashboard for specific errors
- Ensure `RAILS_MASTER_KEY` is set

## Need Help?

See the complete guide in **DEPLOYMENT.md** for detailed instructions and troubleshooting.

---

**Total time: ~10 minutes to go live! 🚀**
