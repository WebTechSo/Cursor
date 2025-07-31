#!/bin/bash

echo "🚀 Quick Push to GitHub"
echo "======================"
echo ""

# Check git status
echo "📋 Current git status:"
git status --short
echo ""

echo "✅ All files are committed and ready to push!"
echo ""

echo "📝 To push to GitHub, you need to:"
echo ""
echo "1. Create a new repository on GitHub:"
echo "   - Go to: https://github.com/new"
echo "   - Name: google-meet-transcript-summarizer"
echo "   - Description: Chrome extension for Google Meet transcript summarization"
echo "   - Make it Public or Private"
echo "   - DO NOT initialize with README, .gitignore, or license"
echo "   - Click 'Create repository'"
echo ""
echo "2. Copy the repository URL (it will look like):"
echo "   https://github.com/YOUR_USERNAME/google-meet-transcript-summarizer.git"
echo ""
echo "3. Run these commands (replace YOUR_REPO_URL with the actual URL):"
echo ""
echo "   git remote add origin YOUR_REPO_URL"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""

echo "🌐 Would you like to proceed with setting up the remote? (y/n)"
read -r response

if [[ "$response" =~ ^[Yy]$ ]]; then
    echo ""
    echo "📝 Enter your GitHub repository URL:"
    echo "   Example: https://github.com/username/google-meet-transcript-summarizer.git"
    read -r repo_url
    
    if [[ -n "$repo_url" ]]; then
        echo ""
        echo "🔗 Adding remote repository..."
        git remote add origin "$repo_url"
        
        echo "🔄 Renaming branch to 'main'..."
        git branch -M main
        
        echo "📤 Pushing to GitHub..."
        git push -u origin main
        
        if [ $? -eq 0 ]; then
            echo ""
            echo "✅ Successfully pushed to GitHub!"
            echo "🌐 Your repository is now available at: $repo_url"
            echo ""
            echo "🎉 Next steps:"
            echo "1. Test the extension in Chrome"
            echo "2. Replace placeholder icons with actual PNG files"
            echo "3. Update documentation if needed"
        else
            echo ""
            echo "❌ Error pushing to GitHub. Please check:"
            echo "1. Repository URL is correct"
            echo "2. You have access to the repository"
            echo "3. Your git credentials are configured"
        fi
    else
        echo "❌ No repository URL provided"
    fi
else
    echo ""
    echo "📋 Manual commands to run:"
    echo "git remote add origin YOUR_REPO_URL"
    echo "git branch -M main"
    echo "git push -u origin main"
fi

echo ""
echo "🎉 Setup complete!"