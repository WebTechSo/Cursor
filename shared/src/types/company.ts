export interface Company {
  _id: string;
  name: string;
  description?: string;
  address: Address;
  phone?: string;
  email?: string;
  website?: string;
  logo?: string;
  settings: CompanySettings;
  subscription: Subscription;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

export interface CompanySettings {
  timezone: string;
  currency: string;
  units: UnitSystem;
  notifications: NotificationSettings;
  tracking: TrackingSettings;
}

export enum UnitSystem {
  METRIC = 'metric',
  IMPERIAL = 'imperial'
}

export interface NotificationSettings {
  emailEnabled: boolean;
  smsEnabled: boolean;
  pushEnabled: boolean;
  alertTypes: AlertType[];
}

export enum AlertType {
  SPEEDING = 'speeding',
  GEOFENCE_ENTRY = 'geofence_entry',
  GEOFENCE_EXIT = 'geofence_exit',
  IDLE_TIME = 'idle_time',
  MAINTENANCE_DUE = 'maintenance_due',
  DEVICE_OFFLINE = 'device_offline',
  PANIC_BUTTON = 'panic_button',
  HARSH_DRIVING = 'harsh_driving',
  FUEL_THEFT = 'fuel_theft'
}