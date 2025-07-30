export interface TrackingSettings {
  updateInterval: number; // seconds
  storeRawData: boolean;
  dataRetentionDays: number;
  enableReports: boolean;
}

export interface Subscription {
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  startDate: Date;
  endDate: Date;
  features: SubscriptionFeature[];
  limits: SubscriptionLimits;
}

export enum SubscriptionPlan {
  BASIC = 'basic',
  PROFESSIONAL = 'professional',
  ENTERPRISE = 'enterprise',
  CUSTOM = 'custom'
}

export enum SubscriptionStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
  CANCELLED = 'cancelled',
  TRIAL = 'trial'
}

export enum SubscriptionFeature {
  REAL_TIME_TRACKING = 'real_time_tracking',
  ROUTE_OPTIMIZATION = 'route_optimization',
  GEOFENCING = 'geofencing',
  REPORTS = 'reports',
  MOBILE_APP = 'mobile_app',
  API_ACCESS = 'api_access',
  MAINTENANCE_TRACKING = 'maintenance_tracking',
  FUEL_MONITORING = 'fuel_monitoring',
  DRIVER_SCORING = 'driver_scoring',
  CUSTOM_ALERTS = 'custom_alerts'
}

export interface SubscriptionLimits {
  maxVehicles: number;
  maxUsers: number;
  maxGeofences: number;
  maxReports: number;
  dataRetentionDays: number;
  apiCallsPerMonth: number;
}

export interface CreateCompanyRequest {
  name: string;
  description?: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  phone?: string;
  email?: string;
  website?: string;
  subscription: {
    plan: SubscriptionPlan;
    features: SubscriptionFeature[];
  };
}

export interface UpdateCompanyRequest {
  name?: string;
  description?: string;
  phone?: string;
  email?: string;
  website?: string;
  logo?: string;
  isActive?: boolean;
}