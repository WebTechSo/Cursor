import { Socket } from 'socket.io';
import jwt from 'jsonwebtoken';
import { ExtendedError } from 'socket.io/dist/namespace';
import { User } from '../models/User';
import { logger } from '../config/logger';

interface SocketWithUser extends Socket {
  user?: {
    id: string;
    email: string;
    companyId: string;
    role: string;
    permissions: string[];
  };
}

export const socketAuth = async (socket: SocketWithUser, next: (err?: ExtendedError) => void) => {
  try {
    // Get token from handshake auth or query
    const token = socket.handshake.auth.token || socket.handshake.query.token;

    if (!token) {
      return next(new Error('Authentication token missing'));
    }

    // Verify JWT token
    const decoded = jwt.verify(token as string, process.env.JWT_SECRET!) as any;

    // Find user in database
    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
      return next(new Error('User not found'));
    }

    if (!user.isActive) {
      return next(new Error('Account is deactivated'));
    }

    // Add user info to socket
    socket.user = {
      id: user._id.toString(),
      email: user.email,
      companyId: user.companyId.toString(),
      role: user.role,
      permissions: user.permissions
    };

    logger.info(`Socket authenticated for user: ${user.email}`);
    next();

  } catch (error) {
    logger.error('Socket authentication error:', error);
    next(new Error('Authentication failed'));
  }
};