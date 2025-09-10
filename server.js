const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const validator = require('validator');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
// Serve static files from current directory
app.use(express.static('.', {
  index: ['index.html', 'index.htm']
}));

// CSV file setup
const CSV_FILE = './newsletter_subscribers.csv';

// Ensure CSV file exists with headers
const initializeCSV = () => {
  if (!fs.existsSync(CSV_FILE)) {
    const headers = 'email,subscribed_at,source\n';
    fs.writeFileSync(CSV_FILE, headers);
    console.log('Created newsletter_subscribers.csv file');
  }
};

// Initialize CSV file
initializeCSV();

// Helper functions for CSV operations
const readCSV = () => {
  try {
    const data = fs.readFileSync(CSV_FILE, 'utf8');
    const lines = data.trim().split('\n');
    const headers = lines[0].split(',');
    const subscribers = [];
    
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',');
      const subscriber = {};
      headers.forEach((header, index) => {
        subscriber[header] = values[index];
      });
      subscribers.push(subscriber);
    }
    
    return subscribers;
  } catch (error) {
    console.error('Error reading CSV:', error);
    return [];
  }
};

const writeToCSV = (email) => {
  try {
    const timestamp = new Date().toISOString();
    const csvLine = `${email},${timestamp},newsletter\n`;
    fs.appendFileSync(CSV_FILE, csvLine);
    console.log(`Added subscriber to CSV: ${email}`);
    return true;
  } catch (error) {
    console.error('Error writing to CSV:', error);
    return false;
  }
};

const emailExistsInCSV = (email) => {
  const subscribers = readCSV();
  return subscribers.some(sub => sub.email === email);
};

// Newsletter signup endpoint
app.post('/api/newsletter-signup', (req, res) => {
  const { email } = req.body;

  // Validate email
  if (!email || !validator.isEmail(email)) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a valid email address'
    });
  }

  try {
    // Check if email already exists
    if (emailExistsInCSV(email)) {
      return res.status(409).json({
        success: false,
        message: 'This email is already subscribed'
      });
    }

    // Add email to CSV
    const success = writeToCSV(email);
    
    if (success) {
      res.json({
        success: true,
        message: 'Thanks for subscribing! Check your email for our free guides.',
        email: email
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Failed to save subscription'
      });
    }

  } catch (error) {
    console.error('Unexpected error:', error);
    res.status(500).json({
      success: false,
      message: 'An unexpected error occurred'
    });
  }
});

// Get all subscribers (for admin purposes)
app.get('/api/subscribers', (req, res) => {
  try {
    const subscribers = readCSV();
    res.json({
      success: true,
      subscribers: subscribers,
      count: subscribers.length
    });
  } catch (error) {
    console.error('Error reading subscribers:', error);
    res.status(500).json({
      success: false,
      message: 'Error reading subscribers'
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'JAV Coaching backend is running',
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 JAV Coaching server running on port ${PORT}`);
  console.log(`📧 Newsletter subscribers will be saved to: ${CSV_FILE}`);
  console.log(`🔗 API endpoints:`);
  console.log(`   POST /api/newsletter-signup - Subscribe to newsletter`);
  console.log(`   GET  /api/subscribers - Get all subscribers (admin)`);
  console.log(`   GET  /api/health - Health check`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down server...');
  console.log('✅ Server stopped');
  process.exit(0);
});
