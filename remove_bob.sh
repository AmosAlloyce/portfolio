#!/bin/bash
# Script to remove .bob directory from git tracking

cd /home/alloyce/portfolio

# Fix .gitignore ownership
sudo chown alloyce:alloyce .gitignore

# Add .bob/ to .gitignore
echo "" >> .gitignore
echo "# Ignore Bob Shell directory" >> .gitignore
echo ".bob/" >> .gitignore

# Remove .bob from git cache
git rm -r --cached .bob

# Commit and push
git add .gitignore
git commit -m "Remove .bob directory from version control"
git push

echo "✅ .bob directory removed from GitHub!"
