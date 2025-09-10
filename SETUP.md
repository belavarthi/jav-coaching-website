# Quick Setup Guide

## 🚀 Getting Started

### Option 1: Use the Startup Script (Recommended)
```bash
./start.sh
```

### Option 2: Manual Setup
```bash
# Install dependencies
npm install

# Start the unified server
node server.js
```

## 📧 Newsletter Subscribers

Newsletter subscribers are automatically saved to a CSV file:
- **File**: `newsletter_subscribers.csv`
- **Format**: `email,subscribed_at,source`
- **Location**: Same directory as your website files

## 🧪 Testing

- **Website**: http://localhost:3001
- **API Health**: http://localhost:3001/api/health
- **Test Signup**: Use the newsletter form on any page

## 📊 Admin Features

- **View Subscribers**: http://localhost:3001/api/subscribers
- **CSV File**: `newsletter_subscribers.csv` (created automatically)

## 🔧 Troubleshooting

- Check console logs for errors
- Ensure the server has write permissions in the directory
- Check port availability (3001)
- CSV file is created automatically on first signup
