import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Mock data for demonstration
const mockUsers: any[] = [
  {
    id: '1',
    email: 'admin@demo.com',
    password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LdKxjK7lL.1L.KqPq', // password123
    firstName: 'Admin',
    lastName: 'User',
    role: 'company_admin',
    companyId: '1',
    permissions: ['manage_users', 'view_vehicles', 'manage_fleets'],
    isActive: true
  }
];

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
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// API info endpoint
app.get('/api/v1', (req, res) => {
  res.json({
    name: 'Vehicle Tracking Management System API',
    version: '1.0.0',
    description: 'Demo version with mock data',
    endpoints: {
      auth: '/api/v1/auth',
      vehicles: '/api/v1/vehicles',
      demo: '/api/v1/auth/demo'
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
      note: 'Use these credentials to test the login endpoint'
    }
  });
});

// Login endpoint
app.post('/api/v1/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    // Find user
    const user = mockUsers.find(u => u.email === email);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check password
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Generate token
    const token = jwt.sign(
      { userId: user.id, companyId: user.companyId },
      process.env.JWT_SECRET || 'demo-secret',
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          companyId: user.companyId,
          permissions: user.permissions
        },
        token
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Register endpoint
app.post('/api/v1/auth/register', async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Check if user exists
    const existingUser = mockUsers.find(u => u.email === email);
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'User already exists'
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      email,
      password: hashedPassword,
      firstName,
      lastName,
      role: 'viewer',
      companyId: '1',
      permissions: ['view_vehicles'],
      isActive: true
    };

    mockUsers.push(newUser);

    // Generate token
    const token = jwt.sign(
      { userId: newUser.id, companyId: newUser.companyId },
      process.env.JWT_SECRET || 'demo-secret',
      { expiresIn: '24h' }
    );

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: {
          id: newUser.id,
          email: newUser.email,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          role: newUser.role,
          companyId: newUser.companyId,
          permissions: newUser.permissions
        },
        token
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Get vehicles endpoint
app.get('/api/v1/vehicles', (req, res) => {
  res.json({
    success: true,
    message: 'Vehicles retrieved successfully',
    data: mockVehicles,
    pagination: {
      page: 1,
      limit: 10,
      total: mockVehicles.length,
      totalPages: 1
    }
  });
});

// Get single vehicle endpoint
app.get('/api/v1/vehicles/:id', (req, res) => {
  const vehicle = mockVehicles.find(v => v.id === req.params.id);
  
  if (!vehicle) {
    return res.status(404).json({
      success: false,
      message: 'Vehicle not found'
    });
  }

  res.json({
    success: true,
    message: 'Vehicle retrieved successfully',
    data: vehicle
  });
});

// Dashboard stats endpoint
app.get('/api/v1/dashboard/stats', (req, res) => {
  res.json({
    success: true,
    message: 'Dashboard stats retrieved successfully',
    data: {
      totalVehicles: mockVehicles.length,
      activeVehicles: mockVehicles.filter(v => v.status === 'active').length,
      movingVehicles: mockVehicles.filter(v => v.status === 'moving').length,
      totalUsers: mockUsers.length,
      alerts: 3,
      lastUpdated: new Date().toISOString()
    }
  });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!'
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
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📱 API available at http://localhost:${PORT}/api/v1`);
  console.log(`🔧 Health check at http://localhost:${PORT}/health`);
  console.log(`📋 Demo credentials at http://localhost:${PORT}/api/v1/auth/demo`);
});

export default app;