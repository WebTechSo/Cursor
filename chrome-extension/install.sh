#!/bin/bash

echo "🚀 Google Meet Transcript Summarizer - Installation Guide"
echo "========================================================"
echo ""

# Check if we're in the right directory
if [ ! -f "manifest.json" ]; then
    echo "❌ Error: Please run this script from the chrome-extension directory"
    echo "   Current directory: $(pwd)"
    echo "   Expected files: manifest.json, content.js, background.js, etc."
    exit 1
fi

echo "✅ Extension files found!"
echo ""

# List all files to verify
echo "📁 Extension files:"
ls -la *.js *.html *.json *.md 2>/dev/null
echo ""

echo "📋 Installation Steps:"
echo "1. Open Chrome browser"
echo "2. Go to: chrome://extensions/"
echo "3. Enable 'Developer mode' (toggle in top right)"
echo "4. Click 'Load unpacked'"
echo "5. Select this directory: $(pwd)"
echo "6. Click 'Select Folder'"
echo ""

echo "🔧 After Installation:"
echo "1. Click the extension icon in your Chrome toolbar"
echo "2. Enter your OpenAI API key"
echo "3. Click 'Save API Key'"
echo ""

echo "🎯 To Use:"
echo "1. Join a Google Meet meeting"
echo "2. Wait for transcript data to be captured"
echo "3. Click extension icon → Configure options → Generate Summary"
echo ""

echo "📝 Note: You'll need an OpenAI API key from https://platform.openai.com/"
echo ""

# Check if we're on Linux and can open Chrome
if command -v google-chrome &> /dev/null; then
    echo "🌐 Would you like to open Chrome extensions page? (y/n)"
    read -r response
    if [[ "$response" =~ ^[Yy]$ ]]; then
        google-chrome chrome://extensions/
    fi
elif command -v chromium-browser &> /dev/null; then
    echo "🌐 Would you like to open Chromium extensions page? (y/n)"
    read -r response
    if [[ "$response" =~ ^[Yy]$ ]]; then
        chromium-browser chrome://extensions/
    fi
else
    echo "💡 Tip: You can manually open Chrome and go to chrome://extensions/"
fi

echo ""
echo "🎉 Installation guide complete!"