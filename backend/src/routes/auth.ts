import express from 'express';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { asyncHandler } from '../middleware/errorHandler';
import { ApiResponse, LoginRequest, LoginResponse } from '@vehicle-tracking/shared';

const router = express.Router();

// Mock user data for demonstration (in real app, this would be in MongoDB)
const mockUsers: any[] = [
  {
    _id: '507f1f77bcf86cd799439011',
    email: 'admin@demo.com',
    password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LdKxjK7lL.1L.KqPq', // password123
    firstName: 'Admin',
    lastName: 'User',
    role: 'company_admin',
    companyId: '507f1f77bcf86cd799439012',
    permissions: ['manage_users', 'view_users', 'manage_vehicles', 'view_vehicles'],
    isActive: true,
    lastLogin: new Date()
  }
];

// @desc    Register a new user
// @route   POST /api/v1/auth/register
// @access  Public
router.post('/register', [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 8 }),
  body('firstName').notEmpty().trim(),
  body('lastName').notEmpty().trim(),
  body('companyId').optional()
], asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation errors',
      errors: errors.array()
    } as ApiResponse);
  }

  const { email, password, firstName, lastName, companyId, role, permissions } = req.body;

  // Check if user already exists
  const existingUser = mockUsers.find(user => user.email === email);
  if (existingUser) {
    return res.status(409).json({
      success: false,
      message: 'User already exists with this email'
    } as ApiResponse);
  }

  // Hash password
  const saltRounds = parseInt(process.env.BCRYPT_ROUNDS || '12');
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // Create mock user
  const newUser = {
    _id: Date.now().toString(), // Simple ID generation for demo
    email,
    password: hashedPassword,
    firstName,
    lastName,
    companyId: companyId || '507f1f77bcf86cd799439012',
    role: role || 'viewer',
    permissions: permissions || [],
    isActive: true,
    lastLogin: new Date()
  };

  mockUsers.push(newUser);

  // Generate JWT token
  const token = jwt.sign(
    { userId: newUser._id, companyId: newUser.companyId },
    process.env.JWT_SECRET!,
    { expiresIn: process.env.JWT_EXPIRE || '24h' }
  );

  const refreshToken = jwt.sign(
    { userId: newUser._id },
    process.env.JWT_REFRESH_SECRET!,
    { expiresIn: process.env.JWT_REFRESH_EXPIRE || '7d' }
  );

  const response: ApiResponse<LoginResponse> = {
    success: true,
    message: 'User registered successfully',
    data: {
      user: {
        _id: newUser._id,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        phone: newUser.phone,
        role: newUser.role,
        companyId: newUser.companyId,
        permissions: newUser.permissions
      },
      token,
      refreshToken
    }
  };

  res.status(201).json(response);
}));

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
router.post('/login', [
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty()
], asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation errors',
      errors: errors.array()
    } as ApiResponse);
  }

  const { email, password }: LoginRequest = req.body;

  // Find user in mock data
  const user = mockUsers.find(u => u.email === email);
  if (!user) {
    return res.status(401).json({
      success: false,
      message: 'Invalid credentials'
    } as ApiResponse);
  }

  // Check if account is active
  if (!user.isActive) {
    return res.status(403).json({
      success: false,
      message: 'Account is deactivated'
    } as ApiResponse);
  }

  // Check password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({
      success: false,
      message: 'Invalid credentials'
    } as ApiResponse);
  }

  // Update last login
  user.lastLogin = new Date();

  // Generate JWT tokens
  const token = jwt.sign(
    { userId: user._id, companyId: user.companyId },
    process.env.JWT_SECRET!,
    { expiresIn: process.env.JWT_EXPIRE || '24h' }
  );

  const refreshToken = jwt.sign(
    { userId: user._id },
    process.env.JWT_REFRESH_SECRET!,
    { expiresIn: process.env.JWT_REFRESH_EXPIRE || '7d' }
  );

  const response: ApiResponse<LoginResponse> = {
    success: true,
    message: 'Login successful',
    data: {
      user: {
        _id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        role: user.role,
        companyId: user.companyId,
        permissions: user.permissions
      },
      token,
      refreshToken
    }
  };

  res.json(response);
}));

// @desc    Get current user profile
// @route   GET /api/v1/auth/me
// @access  Private
router.get('/me', asyncHandler(async (req, res) => {
  res.json({
    success: true,
    message: 'Profile endpoint - requires authentication middleware',
    data: {
      info: 'This endpoint would return the current user profile when auth middleware is implemented'
    }
  });
}));

// @desc    Demo credentials endpoint
// @route   GET /api/v1/auth/demo
// @access  Public
router.get('/demo', asyncHandler(async (req, res) => {
  res.json({
    success: true,
    message: 'Demo credentials for testing',
    data: {
      email: 'admin@demo.com',
      password: 'password123',
      note: 'Use these credentials to test the login endpoint'
    }
  });
}));

export default router;