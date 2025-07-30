import { 
  UserRole, 
  Permission, 
  VehicleType, 
  VehicleStatus, 
  EngineType, 
  FuelType, 
  TransmissionType,
  UnitSystem,
  SubscriptionPlan,
  SubscriptionFeature,
  DeviceManufacturer,
  DeviceProtocol,
  DeviceFeature
} from '../types';

export const DEFAULT_USER_PERMISSIONS = {
  [UserRole.SUPER_ADMIN]: [
    Permission.MANAGE_COMPANIES,
    Permission.VIEW_COMPANIES,
    Permission.MANAGE_USERS,
    Permission.VIEW_USERS,
    Permission.MANAGE_FLEETS,
    Permission.VIEW_FLEETS,
    Permission.MANAGE_VEHICLES,
    Permission.VIEW_VEHICLES,
    Permission.MANAGE_DEVICES,
    Permission.VIEW_DEVICES,
    Permission.MANAGE_ROUTES,
    Permission.VIEW_ROUTES,
    Permission.MANAGE_GEOFENCES,
    Permission.VIEW_GEOFENCES,
    Permission.VIEW_REPORTS,
    Permission.EXPORT_REPORTS,
    Permission.VIEW_LIVE_TRACKING,
    Permission.MANAGE_ALERTS,
    Permission.VIEW_ALERTS
  ],
  [UserRole.COMPANY_ADMIN]: [
    Permission.MANAGE_USERS,
    Permission.VIEW_USERS,
    Permission.MANAGE_FLEETS,
    Permission.VIEW_FLEETS,
    Permission.MANAGE_VEHICLES,
    Permission.VIEW_VEHICLES,
    Permission.MANAGE_DEVICES,
    Permission.VIEW_DEVICES,
    Permission.MANAGE_ROUTES,
    Permission.VIEW_ROUTES,
    Permission.MANAGE_GEOFENCES,
    Permission.VIEW_GEOFENCES,
    Permission.VIEW_REPORTS,
    Permission.EXPORT_REPORTS,
    Permission.VIEW_LIVE_TRACKING,
    Permission.MANAGE_ALERTS,
    Permission.VIEW_ALERTS
  ],
  [UserRole.FLEET_MANAGER]: [
    Permission.VIEW_USERS,
    Permission.MANAGE_FLEETS,
    Permission.VIEW_FLEETS,
    Permission.MANAGE_VEHICLES,
    Permission.VIEW_VEHICLES,
    Permission.VIEW_DEVICES,
    Permission.MANAGE_ROUTES,
    Permission.VIEW_ROUTES,
    Permission.MANAGE_GEOFENCES,
    Permission.VIEW_GEOFENCES,
    Permission.VIEW_REPORTS,
    Permission.VIEW_LIVE_TRACKING,
    Permission.VIEW_ALERTS
  ],
  [UserRole.DISPATCHER]: [
    Permission.VIEW_FLEETS,
    Permission.VIEW_VEHICLES,
    Permission.VIEW_DEVICES,
    Permission.VIEW_ROUTES,
    Permission.VIEW_GEOFENCES,
    Permission.VIEW_REPORTS,
    Permission.VIEW_LIVE_TRACKING,
    Permission.VIEW_ALERTS
  ],
  [UserRole.DRIVER]: [
    Permission.VIEW_VEHICLES,
    Permission.VIEW_ROUTES,
    Permission.VIEW_LIVE_TRACKING
  ],
  [UserRole.VIEWER]: [
    Permission.VIEW_VEHICLES,
    Permission.VIEW_LIVE_TRACKING,
    Permission.VIEW_ALERTS
  ]
};

export const DEFAULT_COMPANY_SETTINGS = {
  timezone: 'UTC',
  currency: 'USD',
  units: UnitSystem.METRIC,
  notifications: {
    emailEnabled: true,
    smsEnabled: false,
    pushEnabled: true,
    alertTypes: []
  },
  tracking: {
    updateInterval: 60,
    storeRawData: true,
    dataRetentionDays: 365,
    enableReports: true
  }
};

export const SUBSCRIPTION_PLANS = {
  [SubscriptionPlan.BASIC]: {
    name: 'Basic',
    maxVehicles: 10,
    maxUsers: 5,
    maxGeofences: 10,
    maxReports: 50,
    dataRetentionDays: 90,
    apiCallsPerMonth: 10000,
    features: [
      SubscriptionFeature.REAL_TIME_TRACKING,
      SubscriptionFeature.MOBILE_APP,
      SubscriptionFeature.REPORTS
    ]
  },
  [SubscriptionPlan.PROFESSIONAL]: {
    name: 'Professional',
    maxVehicles: 50,
    maxUsers: 25,
    maxGeofences: 100,
    maxReports: 500,
    dataRetentionDays: 365,
    apiCallsPerMonth: 100000,
    features: [
      SubscriptionFeature.REAL_TIME_TRACKING,
      SubscriptionFeature.ROUTE_OPTIMIZATION,
      SubscriptionFeature.GEOFENCING,
      SubscriptionFeature.REPORTS,
      SubscriptionFeature.MOBILE_APP,
      SubscriptionFeature.MAINTENANCE_TRACKING,
      SubscriptionFeature.FUEL_MONITORING
    ]
  },
  [SubscriptionPlan.ENTERPRISE]: {
    name: 'Enterprise',
    maxVehicles: 500,
    maxUsers: 100,
    maxGeofences: 1000,
    maxReports: -1, // unlimited
    dataRetentionDays: -1, // unlimited
    apiCallsPerMonth: -1, // unlimited
    features: [
      SubscriptionFeature.REAL_TIME_TRACKING,
      SubscriptionFeature.ROUTE_OPTIMIZATION,
      SubscriptionFeature.GEOFENCING,
      SubscriptionFeature.REPORTS,
      SubscriptionFeature.MOBILE_APP,
      SubscriptionFeature.API_ACCESS,
      SubscriptionFeature.MAINTENANCE_TRACKING,
      SubscriptionFeature.FUEL_MONITORING,
      SubscriptionFeature.DRIVER_SCORING,
      SubscriptionFeature.CUSTOM_ALERTS
    ]
  }
};

export const DEFAULT_VEHICLE_SPECIFICATIONS = {
  engineType: EngineType.GASOLINE,
  fuelType: FuelType.GASOLINE,
  transmission: TransmissionType.AUTOMATIC,
  maxSpeed: 120,
  weight: 1500,
  capacity: {
    passengers: 5,
    cargo: 500,
    fuel: 50
  },
  dimensions: {
    length: 4.5,
    width: 1.8,
    height: 1.6
  }
};

export const DEFAULT_FLEET_SETTINGS = {
  speedLimit: 80,
  idleTimeLimit: 15,
  fuelAlerts: true,
  maintenanceAlerts: true,
  driverScoring: false,
  autoDispatch: false
};

export const DEFAULT_DEVICE_CONFIGURATION = {
  reportingInterval: 60,
  gpsAccuracy: 10,
  speedThreshold: 80,
  idleThreshold: 300,
  features: [DeviceFeature.GPS],
  sensors: [],
  alerts: {
    speeding: true,
    harshDriving: false,
    geofence: true,
    maintenance: true,
    tampering: false,
    lowBattery: true,
    offline: true
  }
};

export const SUPPORTED_DEVICE_PROTOCOLS = {
  [DeviceManufacturer.TELTONIKA]: [DeviceProtocol.TELTONIKA],
  [DeviceManufacturer.CONCOX]: [DeviceProtocol.GT06, DeviceProtocol.H02],
  [DeviceManufacturer.QUECLINK]: [DeviceProtocol.GT06],
  [DeviceManufacturer.CALAMP]: [DeviceProtocol.TRACCAR],
  [DeviceManufacturer.RUPTELA]: [DeviceProtocol.TELTONIKA],
  [DeviceManufacturer.MEITRACK]: [DeviceProtocol.GT06],
  [DeviceManufacturer.GOSAFE]: [DeviceProtocol.GT06],
  [DeviceManufacturer.SUNTECH]: [DeviceProtocol.TRACCAR],
  [DeviceManufacturer.OTHER]: [DeviceProtocol.OSMAND, DeviceProtocol.CUSTOM]
};

export const GEOFENCE_DEFAULTS = {
  radius: 100, // meters
  alertsEnabled: true,
  notifyOnEntry: true,
  notifyOnExit: true
};

export const ROUTE_DEFAULTS = {
  optimized: false,
  estimatedDuration: 0,
  maxWaypoints: 25
};

export const TRACKING_DEFAULTS = {
  locationAccuracy: 10, // meters
  speedAccuracy: 5, // km/h
  minMovementDistance: 50, // meters
  maxIdleTime: 300 // seconds
};

export const REPORT_DEFAULTS = {
  pageSize: 100,
  maxRecords: 10000,
  exportFormats: ['pdf', 'excel', 'csv'],
  cacheTimeout: 300 // seconds
};

export const ALERT_DEFAULTS = {
  speedingThreshold: 10, // km/h over limit
  harshAccelerationThreshold: 8, // m/s²
  harshBrakingThreshold: -8, // m/s²
  harshCorneringThreshold: 8, // m/s²
  idleTimeThreshold: 300, // seconds
  fuelTheftThreshold: 10 // liters
};

export const MAP_DEFAULTS = {
  center: {
    latitude: 40.7128,
    longitude: -74.0060 // New York City
  },
  zoom: 10,
  style: 'roadmap',
  showTraffic: false,
  showSatellite: false
};

export const NOTIFICATION_DEFAULTS = {
  email: {
    enabled: true,
    frequency: 'immediate'
  },
  sms: {
    enabled: false,
    frequency: 'immediate'
  },
  push: {
    enabled: true,
    frequency: 'immediate'
  }
};