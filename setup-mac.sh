#!/bin/bash

# Louisiana Business Assistant - Mac Setup Script
# This script will set up and run your chatbot application

echo "🎉 Louisiana Business Assistant - Setup"
echo "========================================"
echo ""

# Step 1: Install dependencies
echo "📦 Step 1: Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Error: npm install failed. Make sure Node.js is installed."
    echo "Install Node.js from: https://nodejs.org/"
    exit 1
fi

echo "✅ Dependencies installed!"
echo ""

# Step 2: Setup environment file
if [ ! -f .env ]; then
    echo "🔧 Step 2: Creating .env file..."
    cp .env.example .env
    echo "✅ .env file created!"
    echo ""
    echo "⚠️  IMPORTANT: You need to add your Claude API key!"
    echo "   1. Open .env file"
    echo "   2. Replace 'your_api_key_here' with your actual API key"
    echo "   3. Get API key from: https://console.anthropic.com/"
    echo ""
    echo "   OR run without API key - the app will use mock responses"
    echo ""
else
    echo "✅ .env file already exists"
    echo ""
fi

# Step 3: Start the development server
echo "🚀 Step 3: Starting development server..."
echo ""
echo "The app will open at: http://localhost:5173"
echo "Press Ctrl+C to stop the server"
echo ""
echo "Starting in 3 seconds..."
sleep 3

npm run dev
