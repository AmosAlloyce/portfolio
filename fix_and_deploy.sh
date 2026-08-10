#!/bin/bash

# Fix permissions and deploy portfolio to GitHub
# Run this script with: bash fix_and_deploy.sh

set -e

echo "🔧 Fixing git permissions..."
sudo chown -R $USER:$USER /home/alloyce/portfolio/.git 2>/dev/null || {
    echo "Removing old .git directory..."
    sudo rm -rf /home/alloyce/portfolio/.git
    echo "Initializing fresh git repository..."
    git init
}

echo "📝 Configuring git..."
git config --global user.name "Amos Alloyce"
git config --global user.email "your-email@example.com"

echo "📦 Staging all files..."
git add .

echo "💾 Creating initial commit..."
git commit -m "Initial portfolio setup with AI-powered features

- Rails 7.1 application with PostgreSQL and Redis
- GitHub API integration for repository syncing
- Groq AI integration for descriptions and chatbot
- Play-with-Docker integration for one-click container launch
- Responsive UI with Tailwind CSS
- Docker and Docker Compose setup
- Render.com deployment configuration
- Complete documentation (README, TECHNICAL_PLAN, FRONTEND_DESIGN, DEPLOYMENT)"

echo ""
echo "✅ Git repository initialized and committed!"
echo ""
echo "📤 Next steps:"
echo "1. Create a new repository on GitHub: https://github.com/new"
echo "2. Name it 'portfolio' (or your preferred name)"
echo "3. Run these commands:"
echo ""
echo "   git remote add origin https://github.com/AmosAlloyce/portfolio.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "4. Then follow DEPLOYMENT.md to deploy on Render.com"
echo ""
