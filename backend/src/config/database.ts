import mongoose from 'mongoose';
import { logger } from './logger';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/vehicle_tracking';

export const connectDB = async (): Promise<void> => {
  try {
    // In development without MongoDB, just log and continue
    if (process.env.NODE_ENV === 'development') {
      logger.info('Running in development mode - skipping MongoDB connection');
      logger.info('Using mock database for demonstration purposes');
      return;
    }

    const conn = await mongoose.connect(MONGODB_URI, {
      // Modern MongoDB driver options
      maxPoolSize: 10, // Maintain up to 10 socket connections
      serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      bufferCommands: false, // Disable mongoose buffering
      bufferMaxEntries: 0 // Disable mongoose buffering
    });

    logger.info(`MongoDB Connected: ${conn.connection.host}`);

    // Handle connection events
    mongoose.connection.on('connected', () => {
      logger.info('MongoDB connected successfully');
    });

    mongoose.connection.on('error', (err) => {
      logger.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      logger.warn('MongoDB disconnected');
    });

    // Graceful shutdown
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      logger.info('MongoDB connection closed through app termination');
      process.exit(0);
    });

  } catch (error) {
    logger.error('Database connection failed:', error);
    logger.warn('Continuing without database connection for demonstration...');
    // Don't exit in development mode without database
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
  }
};

export const disconnectDB = async (): Promise<void> => {
  try {
    await mongoose.connection.close();
    logger.info('MongoDB connection closed');
  } catch (error) {
    logger.error('Error closing MongoDB connection:', error);
  }
};

// Database health check
export const checkDBHealth = async (): Promise<boolean> => {
  try {
    if (process.env.NODE_ENV === 'development') {
      return true; // Mock success for development
    }
    const state = mongoose.connection.readyState;
    return state === 1; // 1 = connected
  } catch (error) {
    logger.error('Database health check failed:', error);
    return false;
  }
};

export default mongoose;