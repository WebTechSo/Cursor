const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Mock data
const mockVehicles = [
  {
    id: '1',
    licensePlate: 'ABC-123',
    make: 'Toyota',
    model: 'Camry',
    year: 2022,
    status: 'active',
    location: {
      latitude: 40.7128,
      longitude: -74.0060,
      address: 'New York, NY',
      timestamp: new Date()
    }
  },
  {
    id: '2',
    licensePlate: 'XYZ-789',
    make: 'Honda',
    model: 'Civic',
    year: 2023,
    status: 'moving',
    location: {
      latitude: 34.0522,
      longitude: -118.2437,
      address: 'Los Angeles, CA',
      timestamp: new Date()
    }
  }
];

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    message: 'Vehicle Tracking API is running!'
  });
});

// API info endpoint
app.get('/api/v1', (req, res) => {
  res.json({
    name: 'Vehicle Tracking Management System API',
    version: '1.0.0',
    description: 'Simple demo version',
    endpoints: {
      health: '/health',
      vehicles: '/api/v1/vehicles',
      login: '/api/v1/auth/demo'
    }
  });
});

// Demo credentials endpoint
app.get('/api/v1/auth/demo', (req, res) => {
  res.json({
    success: true,
    message: 'Demo credentials for testing',
    data: {
      email: 'admin@demo.com',
      password: 'password123',
      note: 'This is a demo API with mock data'
    }
  });
});

// Simple login endpoint
app.post('/api/v1/auth/login', (req, res) => {
  const { email, password } = req.body;

  if (email === 'admin@demo.com' && password === 'password123') {
    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: '1',
          email: 'admin@demo.com',
          firstName: 'Admin',
          lastName: 'User',
          role: 'company_admin'
        },
        token: 'demo-token-123'
      }
    });
  } else {
    res.status(401).json({
      success: false,
      message: 'Invalid credentials'
    });
  }
});

// Get vehicles endpoint
app.get('/api/v1/vehicles', (req, res) => {
  res.json({
    success: true,
    message: 'Vehicles retrieved successfully',
    data: mockVehicles,
    count: mockVehicles.length
  });
});

// Dashboard stats
app.get('/api/v1/dashboard/stats', (req, res) => {
  res.json({
    success: true,
    data: {
      totalVehicles: mockVehicles.length,
      activeVehicles: 1,
      movingVehicles: 1,
      totalUsers: 1,
      alerts: 2
    }
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Cannot ${req.method} ${req.originalUrl}`
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Vehicle Tracking API Server running on port ${PORT}`);
  console.log(`📱 API: http://localhost:${PORT}/api/v1`);
  console.log(`🔧 Health: http://localhost:${PORT}/health`);
  console.log(`📋 Demo: http://localhost:${PORT}/api/v1/auth/demo`);
  console.log('✅ Server is ready for testing!');
});

module.exports = app;