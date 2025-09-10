const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
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

// Database setup
const db = new sqlite3.Database('./newsletter.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database');
    
    // Create subscribers table if it doesn't exist
    db.run(`CREATE TABLE IF NOT EXISTS subscribers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      subscribed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      source TEXT DEFAULT 'newsletter'
    )`, (err) => {
      if (err) {
        console.error('Error creating table:', err.message);
      } else {
        console.log('Subscribers table ready');
      }
    });
  }
});

// API Endpoints
app.get('/api/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'JAV Coaching backend is running', 
    timestamp: new Date().toISOString() 
  });
});

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

  // Check if email already exists
  db.get('SELECT email FROM subscribers WHERE email = ?', [email], (err, row) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({
        success: false,
        message: 'Database error occurred'
      });
    }

    if (row) {
      return res.status(409).json({
        success: false,
        message: 'This email is already subscribed'
      });
    }

    // Insert new subscriber
    db.run('INSERT INTO subscribers (email) VALUES (?)', [email], function(err) {
      if (err) {
        console.error('Error inserting subscriber:', err);
        return res.status(500).json({
          success: false,
          message: 'Failed to save subscription'
        });
      }

      console.log(`New subscriber added: ${email} (ID: ${this.lastID})`);
      
      res.json({
        success: true,
        message: 'Thanks for subscribing! Check your email for our free guides.',
        email: email
      });
    });
  });
});

// Get all subscribers (for admin purposes)
app.get('/api/subscribers', (req, res) => {
  db.all('SELECT * FROM subscribers ORDER BY subscribed_at DESC', [], (err, rows) => {
    if (err) {
      console.error('Error reading subscribers:', err);
      return res.status(500).json({
        success: false,
        message: 'Error reading subscribers'
      });
    }

    res.json({
      success: true,
      subscribers: rows,
      count: rows.length
    });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 JAV Coaching server running on port ${PORT}`);
  console.log(`📧 Newsletter subscribers will be saved to SQLite database`);
  console.log(`🔗 API endpoints:`);
  console.log(`   POST /api/newsletter-signup - Subscribe to newsletter`);
  console.log(`   GET  /api/subscribers - Get all subscribers (admin)`);
  console.log(`   GET  /api/health - Health check`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down server...');
  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err.message);
    } else {
      console.log('Database connection closed');
    }
    console.log('✅ Server stopped');
    process.exit(0);
  });
});