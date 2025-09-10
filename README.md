# JAV Coaching Newsletter Backend

This backend server handles newsletter signups for the JAV Coaching website, saving subscriber emails to a local CSV file.

## Features

- ✅ **Email Collection**: Collects emails via API endpoint
- ✅ **CSV Storage**: Stores emails in a local CSV file
- ✅ **Email Validation**: Validates email format before processing
- ✅ **Duplicate Prevention**: Prevents duplicate email subscriptions
- ✅ **Error Handling**: Comprehensive error handling and user feedback
- ✅ **Security**: Input validation and secure email handling
- ✅ **Simple Setup**: No database or email configuration required

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Start the Server

**Development mode (with auto-restart):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will start on port 3001 by default.

## CSV File

Newsletter subscribers are automatically saved to `newsletter_subscribers.csv` with the following format:

```csv
email,subscribed_at,source
user@example.com,2025-01-10T12:00:00.000Z,newsletter
another@example.com,2025-01-10T12:05:00.000Z,newsletter
```

## API Endpoints

### POST `/api/newsletter-signup`
Subscribe to newsletter

**Request:**
```json
{
  "email": "user@example.com"
}
```

**Success Response:**
```json
{
  "success": true,
  "message": "Thanks for subscribing! Check your email for our free guides.",
  "email": "user@example.com"
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Please provide a valid email address"
}
```

### GET `/api/subscribers`
Get all subscribers (admin endpoint)

**Response:**
```json
{
  "success": true,
  "subscribers": [
    {
      "email": "user@example.com",
      "subscribed_at": "2025-01-10T12:00:00.000Z",
      "source": "newsletter"
    }
  ],
  "count": 1
}
```

### GET `/api/health`
Health check endpoint

**Response:**
```json
{
  "success": true,
  "message": "JAV Coaching backend is running",
  "timestamp": "2025-01-10T12:00:00.000Z"
}
```

## How It Works

When someone subscribes, the system will:

1. **Validate the email** format
2. **Check for duplicates** in the CSV file
3. **Add the email** to `newsletter_subscribers.csv` with timestamp
4. **Return success message** to the user

## File Structure

```
├── server.js                    # Main server file
├── package.json                 # Dependencies and scripts
├── newsletter_subscribers.csv   # Subscriber data (created automatically)
├── assets/
│   ├── main.js                 # Frontend JavaScript
│   └── styles.css              # Frontend CSS
└── README.md                   # This file
```

## Frontend Integration

The frontend JavaScript automatically:

- Validates email format
- Shows loading states during submission
- Displays success/error messages
- Handles network errors gracefully

## Security Features

- ✅ Email format validation
- ✅ Duplicate email prevention
- ✅ CORS configuration
- ✅ Input sanitization
- ✅ File system security

## File Structure

```
├── server.js              # Main server file
├── package.json           # Dependencies and scripts
├── env.example           # Environment variables template
├── newsletter.db         # SQLite database (created automatically)
├── assets/
│   ├── main.js          # Frontend JavaScript (updated)
│   └── styles.css       # Frontend CSS (updated)
└── README.md            # This file
```

## Troubleshooting

### Common Issues

1. **Email not sending**: Check your SMTP credentials and app password
2. **Database errors**: Ensure the server has write permissions in the directory
3. **CORS errors**: The server includes CORS middleware for cross-origin requests

### Logs

The server logs important events to the console:
- Database connections
- New subscriptions
- Email sending status
- Errors and warnings

## Production Deployment

For production deployment:

1. Set `NODE_ENV=production` in your environment
2. Use a production database (PostgreSQL recommended)
3. Set up proper logging
4. Configure reverse proxy (nginx)
5. Use PM2 or similar for process management
6. Set up SSL certificates

## Troubleshooting

### Common Issues

1. **CSV file not created**: Ensure the server has write permissions in the directory
2. **CORS errors**: The server includes CORS middleware for cross-origin requests
3. **Port conflicts**: Make sure port 3001 is available

### Logs

The server logs important events to the console:
- CSV file creation
- New subscriptions
- Errors and warnings

## Production Deployment

For production deployment:

1. Set `NODE_ENV=production` in your environment
2. Set up proper logging
3. Configure reverse proxy (nginx)
4. Use PM2 or similar for process management
5. Set up SSL certificates
6. Ensure CSV file backup strategy

## Support

For issues or questions, check the console logs and ensure the server has proper file permissions.
