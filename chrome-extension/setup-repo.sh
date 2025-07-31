#!/bin/bash

echo "🚀 Setting up GitHub repository for Chrome Extension"
echo "=================================================="
echo ""

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    echo "❌ Error: Not in a git repository"
    echo "   Please run: git init"
    exit 1
fi

echo "✅ Git repository initialized"
echo ""

# Show current status
echo "📋 Current git status:"
git status --short
echo ""

echo "🔧 Next steps to create a new repository:"
echo ""
echo "1. Go to GitHub.com and create a new repository:"
echo "   - Visit: https://github.com/new"
echo "   - Choose a repository name (e.g., 'google-meet-transcript-summarizer')"
echo "   - Make it public or private as preferred"
echo "   - DO NOT initialize with README, .gitignore, or license"
echo "   - Click 'Create repository'"
echo ""
echo "2. After creating the repository, GitHub will show you commands like:"
echo "   git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "3. Replace YOUR_USERNAME and REPO_NAME with your actual values"
echo ""

# Ask if user wants to proceed with remote setup
echo "🌐 Would you like to set up the remote repository now? (y/n)"
echo "   (You'll need to provide the GitHub repository URL)"
read -r response

if [[ "$response" =~ ^[Yy]$ ]]; then
    echo ""
    echo "📝 Enter your GitHub repository URL:"
    echo "   Example: https://github.com/username/repo-name.git"
    read -r repo_url
    
    if [[ -n "$repo_url" ]]; then
        echo ""
        echo "🔗 Adding remote repository..."
        git remote add origin "$repo_url"
        
        echo "🔄 Renaming branch to 'main'..."
        git branch -M main
        
        echo "📤 Pushing to GitHub..."
        git push -u origin main
        
        echo ""
        echo "✅ Repository setup complete!"
        echo "🌐 Your extension is now available at: $repo_url"
    else
        echo "❌ No repository URL provided"
    fi
else
    echo ""
    echo "📋 Manual setup instructions:"
    echo "1. Create repository on GitHub"
    echo "2. Run: git remote add origin YOUR_REPO_URL"
    echo "3. Run: git branch -M main"
    echo "4. Run: git push -u origin main"
fi

echo ""
echo "🎉 Setup complete!"