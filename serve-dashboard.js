const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3001;

// Enable CORS for all requests
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

// Serve the dashboard
app.get('/', (req, res) => {
  const htmlPath = path.join(__dirname, 'dashboard.html');
  res.sendFile(htmlPath);
});

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    service: 'Vehicle Tracking Web Admin Dashboard',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`\n🌐 Vehicle Tracking Web Admin Dashboard`);
  console.log(`📍 Dashboard: http://localhost:${PORT}`);
  console.log(`🔧 Health: http://localhost:${PORT}/health`);
  console.log(`🔗 Connects to API: http://localhost:4000`);
  console.log(`✅ Web Admin Dashboard is ready!`);
  console.log(`\nOpen your browser and go to: http://localhost:${PORT}`);
});