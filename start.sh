#!/bin/bash

# JAV Coaching Website Startup Script
# This script starts the unified Node.js server that serves both frontend and backend

echo "🚀 Starting JAV Coaching Website..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm dependencies are installed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Check if CSV file exists (will be created automatically)
if [ ! -f "newsletter_subscribers.csv" ]; then
    echo "📝 Newsletter CSV file will be created automatically when first subscriber signs up."
fi

# Start the unified server
echo "🌐 Starting JAV Coaching server..."
echo "📱 Website will be available at: http://localhost:3001"
echo "🔗 API endpoints available at: http://localhost:3001/api/*"
echo ""
echo "Press Ctrl+C to stop the server"

# Start the server
node server.js
