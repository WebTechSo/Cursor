export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    REFRESH: '/auth/refresh',
    LOGOUT: '/auth/logout',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    VERIFY_EMAIL: '/auth/verify-email'
  },
  
  // Users
  USERS: {
    BASE: '/users',
    PROFILE: '/users/profile',
    UPDATE_PROFILE: '/users/profile',
    CHANGE_PASSWORD: '/users/change-password'
  },
  
  // Companies
  COMPANIES: {
    BASE: '/companies',
    SETTINGS: '/companies/:id/settings',
    STATISTICS: '/companies/:id/statistics',
    SUBSCRIPTION: '/companies/:id/subscription'
  },
  
  // Vehicles
  VEHICLES: {
    BASE: '/vehicles',
    ASSIGN_DRIVER: '/vehicles/:id/assign-driver',
    LOCATION: '/vehicles/:id/location',
    HISTORY: '/vehicles/:id/history',
    STATISTICS: '/vehicles/:id/statistics',
    MAINTENANCE: '/vehicles/:id/maintenance'
  },
  
  // Fleets
  FLEETS: {
    BASE: '/fleets',
    VEHICLES: '/fleets/:id/vehicles',
    STATISTICS: '/fleets/:id/statistics'
  },
  
  // Devices
  DEVICES: {
    BASE: '/devices',
    ASSIGN: '/devices/:id/assign',
    COMMANDS: '/devices/:id/commands',
    STATUS: '/devices/:id/status',
    DATA: '/devices/:id/data'
  },
  
  // Routes
  ROUTES: {
    BASE: '/routes',
    OPTIMIZE: '/routes/:id/optimize',
    ASSIGN: '/routes/:id/assign'
  },
  
  // Geofences
  GEOFENCES: {
    BASE: '/geofences',
    VEHICLES: '/geofences/:id/vehicles',
    EVENTS: '/geofences/:id/events'
  },
  
  // Tracking
  TRACKING: {
    LIVE: '/tracking/live',
    HISTORY: '/tracking/history',
    EVENTS: '/tracking/events'
  },
  
  // Reports
  REPORTS: {
    BASE: '/reports',
    VEHICLE: '/reports/vehicle',
    FLEET: '/reports/fleet',
    DRIVER: '/reports/driver',
    FUEL: '/reports/fuel',
    MAINTENANCE: '/reports/maintenance',
    EXPORT: '/reports/export'
  },
  
  // Alerts
  ALERTS: {
    BASE: '/alerts',
    MARK_READ: '/alerts/:id/read',
    SETTINGS: '/alerts/settings'
  }
};

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503
} as const;

export const API_ERRORS = {
  // Authentication errors
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  TOKEN_EXPIRED: 'TOKEN_EXPIRED',
  TOKEN_INVALID: 'TOKEN_INVALID',
  EMAIL_NOT_VERIFIED: 'EMAIL_NOT_VERIFIED',
  ACCOUNT_LOCKED: 'ACCOUNT_LOCKED',
  
  // Authorization errors
  INSUFFICIENT_PERMISSIONS: 'INSUFFICIENT_PERMISSIONS',
  COMPANY_SUSPENDED: 'COMPANY_SUSPENDED',
  SUBSCRIPTION_EXPIRED: 'SUBSCRIPTION_EXPIRED',
  FEATURE_NOT_AVAILABLE: 'FEATURE_NOT_AVAILABLE',
  
  // Validation errors
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  DUPLICATE_EMAIL: 'DUPLICATE_EMAIL',
  DUPLICATE_LICENSE_PLATE: 'DUPLICATE_LICENSE_PLATE',
  DUPLICATE_IMEI: 'DUPLICATE_IMEI',
  
  // Resource errors
  RESOURCE_NOT_FOUND: 'RESOURCE_NOT_FOUND',
  RESOURCE_ALREADY_EXISTS: 'RESOURCE_ALREADY_EXISTS',
  RESOURCE_IN_USE: 'RESOURCE_IN_USE',
  
  // System errors
  DATABASE_ERROR: 'DATABASE_ERROR',
  EXTERNAL_SERVICE_ERROR: 'EXTERNAL_SERVICE_ERROR',
  RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED',
  
  // Device errors
  DEVICE_OFFLINE: 'DEVICE_OFFLINE',
  DEVICE_NOT_RESPONDING: 'DEVICE_NOT_RESPONDING',
  INVALID_DEVICE_DATA: 'INVALID_DEVICE_DATA'
} as const;

export const SOCKET_EVENTS = {
  CONNECTION: 'connection',
  DISCONNECT: 'disconnect',
  AUTHENTICATE: 'authenticate',
  AUTHENTICATED: 'authenticated',
  
  // Real-time updates
  LOCATION_UPDATE: 'location_update',
  VEHICLE_STATUS_UPDATE: 'vehicle_status_update',
  DEVICE_STATUS_UPDATE: 'device_status_update',
  
  // Alerts
  ALERT_CREATED: 'alert_created',
  GEOFENCE_EVENT: 'geofence_event',
  MAINTENANCE_ALERT: 'maintenance_alert',
  SPEED_ALERT: 'speed_alert',
  
  // System events
  USER_ACTIVITY: 'user_activity',
  SYSTEM_NOTIFICATION: 'system_notification'
} as const;

export const REQUEST_TIMEOUT = 30000; // 30 seconds
export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 100;