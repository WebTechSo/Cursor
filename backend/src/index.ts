import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';

import { connectDB } from './config/database';
import { logger, morganStream } from './config/logger';
import { errorHandler, notFound } from './middleware/errorHandler';
import { socketAuth } from './middleware/socketAuth';

// Import routes (will be created)
// import authRoutes from './routes/auth';
// import userRoutes from './routes/users';
// import companyRoutes from './routes/companies';
// import vehicleRoutes from './routes/vehicles';
// import fleetRoutes from './routes/fleets';
// import deviceRoutes from './routes/devices';
// import routeRoutes from './routes/routes';
// import geofenceRoutes from './routes/geofences';
// import trackingRoutes from './routes/tracking';
// import reportRoutes from './routes/reports';

const app = express();
const server = createServer(app);
const PORT = process.env.PORT || 3000;

// Socket.IO setup
const io = new SocketIOServer(server, {
  cors: {
    origin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:3000', 'http://localhost:3001'],
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Trust proxy (for rate limiting behind reverse proxy)
app.set('trust proxy', 1);

// Security middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' }
}));

// CORS configuration
app.use(cors({
  origin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-company-id']
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX || '100'), // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/', limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Compression middleware
app.use(compression());

// HTTP request logging
app.use(morgan('combined', { stream: morganStream }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// API routes
app.use('/api/v1', (req, res, next) => {
  // Add API version middleware
  req.apiVersion = 'v1';
  next();
});

// Route handlers (uncomment as routes are created)
// app.use('/api/v1/auth', authRoutes);
// app.use('/api/v1/users', userRoutes);
// app.use('/api/v1/companies', companyRoutes);
// app.use('/api/v1/vehicles', vehicleRoutes);
// app.use('/api/v1/fleets', fleetRoutes);
// app.use('/api/v1/devices', deviceRoutes);
// app.use('/api/v1/routes', routeRoutes);
// app.use('/api/v1/geofences', geofenceRoutes);
// app.use('/api/v1/tracking', trackingRoutes);
// app.use('/api/v1/reports', reportRoutes);

// Basic API info endpoint
app.get('/api/v1', (req, res) => {
  res.json({
    name: 'Vehicle Tracking Management System API',
    version: '1.0.0',
    description: 'Comprehensive vehicle tracking and fleet management API',
    endpoints: {
      auth: '/api/v1/auth',
      users: '/api/v1/users',
      companies: '/api/v1/companies',
      vehicles: '/api/v1/vehicles',
      fleets: '/api/v1/fleets',
      devices: '/api/v1/devices',
      routes: '/api/v1/routes',
      geofences: '/api/v1/geofences',
      tracking: '/api/v1/tracking',
      reports: '/api/v1/reports'
    }
  });
});

// Socket.IO connection handling
io.use(socketAuth);

io.on('connection', (socket) => {
  logger.info(`User connected: ${socket.user?.id} from company: ${socket.user?.companyId}`);

  // Join company room for company-specific updates
  socket.join(`company_${socket.user?.companyId}`);

  // Join user-specific room
  socket.join(`user_${socket.user?.id}`);

  // Handle real-time location updates
  socket.on('location_update', (data) => {
    // Broadcast to company members
    socket.to(`company_${socket.user?.companyId}`).emit('location_update', data);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    logger.info(`User disconnected: ${socket.user?.id}`);
  });
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Graceful shutdown
const gracefulShutdown = (signal: string) => {
  logger.info(`Received ${signal}. Shutting down gracefully...`);
  
  server.close(() => {
    logger.info('HTTP server closed.');
    
    // Close database connection
    // mongoose.connection.close() is handled in database.ts
    
    process.exit(0);
  });

  // Force close after 30 seconds
  setTimeout(() => {
    logger.error('Could not close connections in time, forcefully shutting down');
    process.exit(1);
  }, 30000);
};

// Listen for termination signals
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Start server
async function startServer() {
  try {
    // Connect to database
    await connectDB();
    
    // Start HTTP server
    server.listen(PORT, () => {
      logger.info(`🚀 Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
      logger.info(`📱 API available at http://localhost:${PORT}/api/v1`);
      logger.info(`🔧 Health check at http://localhost:${PORT}/health`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Initialize server
startServer();

export { app, io };
export default app;