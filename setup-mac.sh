#!/bin/bash

# Louisiana Business Assistant - Mac Setup Script
# This script will set up and run your chatbot application with backend

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

# Step 2: Setup backend environment file
if [ ! -f server/.env ]; then
    echo "🔧 Step 2: Creating server/.env file..."
    cp server/.env.example server/.env
    echo "✅ server/.env file created!"
    echo ""
    echo "⚠️  OPTIONAL: Add your Claude API key for real AI responses!"
    echo "   1. Open server/.env file"
    echo "   2. Replace 'your_api_key_here' with your actual API key"
    echo "   3. Get API key from: https://console.anthropic.com/"
    echo ""
    echo "   The app works without an API key using helpful mock responses."
    echo ""
else
    echo "✅ server/.env file already exists"
    echo ""
fi

# Step 3: Start both servers
echo "🚀 Step 3: Starting backend and frontend servers..."
echo ""
echo "Backend API will run at: http://localhost:3001"
echo "Frontend will run at: http://localhost:5173"
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""
echo "Starting in 3 seconds..."
sleep 3

npm start
