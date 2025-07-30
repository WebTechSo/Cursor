import express from 'express';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { asyncHandler } from '../middleware/errorHandler';
import { ApiResponse, LoginRequest, LoginResponse } from '@vehicle-tracking/shared';

const router = express.Router();

// @desc    Register a new user
// @route   POST /api/v1/auth/register
// @access  Public
router.post('/register', [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 8 }),
  body('firstName').notEmpty().trim(),
  body('lastName').notEmpty().trim(),
  body('companyId').notEmpty()
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
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({
      success: false,
      message: 'User already exists with this email'
    } as ApiResponse);
  }

  // Create user
  const user = new User({
    email,
    password,
    firstName,
    lastName,
    companyId,
    role: role || 'viewer',
    permissions: permissions || [],
    isActive: true
  });

  await user.save();

  // Generate JWT token
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
    message: 'User registered successfully',
    data: {
      user: {
        _id: user._id.toString(),
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        role: user.role,
        companyId: user.companyId.toString(),
        permissions: user.permissions
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

  // Find user and include password
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return res.status(401).json({
      success: false,
      message: 'Invalid credentials'
    } as ApiResponse);
  }

  // Check if account is locked
  if (user.isLocked) {
    return res.status(423).json({
      success: false,
      message: 'Account is temporarily locked due to too many failed login attempts'
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
  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    await user.incLoginAttempts();
    return res.status(401).json({
      success: false,
      message: 'Invalid credentials'
    } as ApiResponse);
  }

  // Reset login attempts on successful login
  if (user.loginAttempts > 0) {
    await user.resetLoginAttempts();
  }

  // Update last login
  user.lastLogin = new Date();
  await user.save();

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
        _id: user._id.toString(),
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        role: user.role,
        companyId: user.companyId.toString(),
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
  // This would need auth middleware which we'll implement later
  res.json({
    success: true,
    message: 'Profile endpoint - requires authentication middleware'
  });
}));

export default router;