#!/usr/bin/env node

// Simple API test script to demonstrate the vehicle tracking system
const express = require('express');
const app = express();
const PORT = 4000;

app.use(express.json());

// Mock vehicle data
const vehicles = [
  {
    id: 1,
    licensePlate: "ABC-123",
    make: "Toyota",
    model: "Camry",
    status: "active",
    location: {
      lat: 40.7128,
      lng: -74.0060,
      address: "New York, NY",
      timestamp: new Date().toISOString()
    }
  },
  {
    id: 2,
    licensePlate: "XYZ-789", 
    make: "Honda",
    model: "Civic",
    status: "moving",
    location: {
      lat: 34.0522,
      lng: -118.2437,
      address: "Los Angeles, CA",
      timestamp: new Date().toISOString()
    }
  }
];

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Vehicle Tracking API Demo',
    timestamp: new Date().toISOString(),
    totalVehicles: vehicles.length
  });
});

// Get all vehicles
app.get('/api/vehicles', (req, res) => {
  res.json({
    success: true,
    data: vehicles,
    message: `Found ${vehicles.length} vehicles`
  });
});

// Demo login
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  if (email === 'admin@demo.com' && password === 'password123') {
    res.json({
      success: true,
      message: 'Login successful',
      user: {
        id: 1,
        email: 'admin@demo.com',
        name: 'Demo Admin',
        role: 'admin'
      },
      token: 'demo-jwt-token-123'
    });
  } else {
    res.status(401).json({
      success: false,
      message: 'Invalid credentials'
    });
  }
});

// Dashboard stats
app.get('/api/dashboard', (req, res) => {
  res.json({
    success: true,
    data: {
      totalVehicles: vehicles.length,
      activeVehicles: vehicles.filter(v => v.status === 'active').length,
      movingVehicles: vehicles.filter(v => v.status === 'moving').length,
      lastUpdate: new Date().toISOString()
    }
  });
});

app.listen(PORT, () => {
  console.log(`\n🚀 Vehicle Tracking API Demo`);
  console.log(`📍 Server: http://localhost:${PORT}`);
  console.log(`🔧 Health: http://localhost:${PORT}/health`);
  console.log(`🚗 Vehicles: http://localhost:${PORT}/api/vehicles`);
  console.log(`📊 Dashboard: http://localhost:${PORT}/api/dashboard`);
  console.log(`\n📋 Test login:`);
  console.log(`   Email: admin@demo.com`);
  console.log(`   Password: password123`);
  console.log(`\n✅ API is ready for testing!`);
});