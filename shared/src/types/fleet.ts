export interface Fleet {
  _id: string;
  companyId: string;
  name: string;
  description?: string;
  managerId?: string; // User ID of fleet manager
  vehicles: string[]; // Vehicle IDs
  geofences: string[]; // Geofence IDs
  routes: string[]; // Route IDs
  settings: FleetSettings;
  statistics: FleetStatistics;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface FleetSettings {
  speedLimit: number;
  idleTimeLimit: number; // minutes
  fuelAlerts: boolean;
  maintenanceAlerts: boolean;
  driverScoring: boolean;
  autoDispatch: boolean;
}

export interface FleetStatistics {
  totalVehicles: number;
  activeVehicles: number;
  totalDistance: number; // km or miles
  totalFuelConsumption: number;
  averageSpeed: number;
  totalDriverScore: number;
  alertsCount: {
    speeding: number;
    maintenance: number;
    fuel: number;
    geofence: number;
  };
  lastUpdated: Date;
}

export interface CreateFleetRequest {
  name: string;
  description?: string;
  managerId?: string;
  settings?: Partial<FleetSettings>;
}

export interface UpdateFleetRequest {
  name?: string;
  description?: string;
  managerId?: string;
  settings?: Partial<FleetSettings>;
  isActive?: boolean;
}

export interface AssignVehicleToFleetRequest {
  vehicleId: string;
  fleetId: string;
}

export interface Geofence {
  _id: string;
  companyId: string;
  name: string;
  description?: string;
  type: GeofenceType;
  coordinates: GeofenceCoordinates;
  radius?: number; // for circular geofences, in meters
  alerts: GeofenceAlert[];
  assignedVehicles: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export enum GeofenceType {
  CIRCLE = 'circle',
  POLYGON = 'polygon',
  RECTANGLE = 'rectangle'
}

export interface GeofenceCoordinates {
  center?: {
    latitude: number;
    longitude: number;
  };
  points?: Array<{
    latitude: number;
    longitude: number;
  }>;
}

export interface GeofenceAlert {
  type: GeofenceAlertType;
  enabled: boolean;
  recipients: string[]; // User IDs
  message?: string;
}

export enum GeofenceAlertType {
  ENTRY = 'entry',
  EXIT = 'exit',
  BOTH = 'both'
}

export interface CreateGeofenceRequest {
  name: string;
  description?: string;
  type: GeofenceType;
  coordinates: GeofenceCoordinates;
  radius?: number;
  alerts: GeofenceAlert[];
  assignedVehicles?: string[];
}

export interface UpdateGeofenceRequest {
  name?: string;
  description?: string;
  coordinates?: GeofenceCoordinates;
  radius?: number;
  alerts?: GeofenceAlert[];
  assignedVehicles?: string[];
  isActive?: boolean;
}