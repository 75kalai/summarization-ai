const express = require('express');
const path = require('path');
const os = require('os');

const app = express();
const PORT = 3000;

// Middleware to log details of GET requests
app.use((req, res, next) => {
  console.log("----------------------------------------------------------------------------------------------")
  if (req.method === 'GET') {
    const clientIP = req.ip || req.connection.remoteAddress;
    const clientOS = req.headers['user-agent'] || 'Unknown OS';
    const requestTime = new Date().toISOString();

    console.log(`[${requestTime}] GET Request - Route: ${req.originalUrl}, IP: ${clientIP}, OS: ${clientOS}`);
  }
  next();
});

// Serve static files from the "dist" folder (where your built Astro files are)
app.use(express.static(path.join(__dirname, 'dist')));

// Fallback to index.html for single-page applications
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
