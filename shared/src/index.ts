// Export all type definitions
export * from './types/user';
export * from './types/company';
export * from './types/subscription';
export * from './types/vehicle';
export * from './types/location';
export * from './types/fleet';
export * from './types/device';

// Export utilities
export * from './utils/validation';
export * from './utils/helpers';

// Export constants
export * from './constants/api';
export * from './constants/defaults';

// Common interfaces
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  pagination?: PaginationInfo;
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface QueryOptions {
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
  search?: string;
  filters?: Record<string, any>;
}

export interface ErrorDetails {
  code: string;
  message: string;
  field?: string;
  details?: any;
}

// WebSocket event types
export enum SocketEvents {
  // Connection events
  CONNECT = 'connect',
  DISCONNECT = 'disconnect',
  
  // Authentication
  AUTHENTICATE = 'authenticate',
  AUTHENTICATED = 'authenticated',
  
  // Real-time tracking
  LOCATION_UPDATE = 'location_update',
  VEHICLE_STATUS_UPDATE = 'vehicle_status_update',
  
  // Alerts
  ALERT_CREATED = 'alert_created',
  ALERT_UPDATED = 'alert_updated',
  
  // Geofence events
  GEOFENCE_ENTRY = 'geofence_entry',
  GEOFENCE_EXIT = 'geofence_exit',
  
  // Device events
  DEVICE_ONLINE = 'device_online',
  DEVICE_OFFLINE = 'device_offline',
  
  // System events
  MAINTENANCE_ALERT = 'maintenance_alert',
  FUEL_ALERT = 'fuel_alert',
  SPEED_ALERT = 'speed_alert'
}

export interface SocketMessage<T = any> {
  event: SocketEvents;
  data: T;
  timestamp: Date;
  userId?: string;
  companyId?: string;
}