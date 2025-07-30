import { Request, Response, NextFunction } from 'express';
import { logger } from '../config/logger';
import { ApiResponse } from '@vehicle-tracking/shared';

export interface CustomError extends Error {
  statusCode?: number;
  code?: string;
  errors?: any;
}

// Not found middleware
export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error: CustomError = new Error(`Not found - ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
};

// Error handler middleware
export const errorHandler = (
  error: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = error.statusCode || 500;
  let message = error.message || 'Internal Server Error';

  // Log error
  logger.error('Error occurred:', {
    message: error.message,
    stack: error.stack,
    url: req.originalUrl,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent')
  });

  // MongoDB duplicate key error
  if (error.code === '11000') {
    statusCode = 409;
    const field = Object.keys((error as any).keyValue)[0];
    message = `${field} already exists`;
  }

  // MongoDB validation error
  if (error.name === 'ValidationError') {
    statusCode = 400;
    const errors = Object.values((error as any).errors).map((val: any) => val.message);
    message = 'Validation Error';
  }

  // MongoDB cast error
  if (error.name === 'CastError') {
    statusCode = 400;
    message = 'Invalid ID format';
  }

  // JWT errors
  if (error.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Invalid token';
  }

  if (error.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Token expired';
  }

  // Rate limit error
  if (statusCode === 429) {
    message = 'Too many requests, please try again later';
  }

  const response: ApiResponse = {
    success: false,
    message,
    error: process.env.NODE_ENV === 'production' ? undefined : error.stack
  };

  res.status(statusCode).json(response);
};

// Async error wrapper
export const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Custom error class
export class AppError extends Error {
  statusCode: number;
  code: string;
  isOperational: boolean;

  constructor(message: string, statusCode: number, code?: string) {
    super(message);
    this.statusCode = statusCode;
    this.code = code || 'GENERIC_ERROR';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

// Error factory functions
export const createValidationError = (message: string, errors?: any) => {
  const error = new AppError(message, 400, 'VALIDATION_ERROR');
  error.errors = errors;
  return error;
};

export const createNotFoundError = (resource: string) => {
  return new AppError(`${resource} not found`, 404, 'NOT_FOUND');
};

export const createUnauthorizedError = (message = 'Unauthorized') => {
  return new AppError(message, 401, 'UNAUTHORIZED');
};

export const createForbiddenError = (message = 'Forbidden') => {
  return new AppError(message, 403, 'FORBIDDEN');
};

export const createConflictError = (message: string) => {
  return new AppError(message, 409, 'CONFLICT');
};

export const createInternalServerError = (message = 'Internal Server Error') => {
  return new AppError(message, 500, 'INTERNAL_SERVER_ERROR');
};