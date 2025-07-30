export interface Vehicle {
  _id: string;
  companyId: string;
  fleetId?: string;
  deviceId?: string;
  licensePlate: string;
  vin?: string;
  make: string;
  model: string;
  year: number;
  color?: string;
  type: VehicleType;
  status: VehicleStatus;
  driver?: {
    userId: string;
    name: string;
    assignedAt: Date;
  };
  specifications: VehicleSpecifications;
  maintenance: MaintenanceInfo;
  fuel: FuelInfo;
  insurance: InsuranceInfo;
  location?: {
    latitude: number;
    longitude: number;
    timestamp: Date;
    address?: string;
  };
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export enum VehicleType {
  CAR = 'car',
  TRUCK = 'truck',
  VAN = 'van',
  MOTORCYCLE = 'motorcycle',
  BUS = 'bus',
  TRAILER = 'trailer',
  CONSTRUCTION = 'construction',
  AGRICULTURAL = 'agricultural',
  OTHER = 'other'
}

export enum VehicleStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  IN_MAINTENANCE = 'in_maintenance',
  OUT_OF_SERVICE = 'out_of_service',
  MOVING = 'moving',
  PARKED = 'parked',
  IDLE = 'idle'
}

export interface VehicleSpecifications {
  engineType: EngineType;
  fuelType: FuelType;
  transmission: TransmissionType;
  maxSpeed: number;
  weight: number;
  capacity: {
    passengers?: number;
    cargo?: number; // in kg or lbs
    fuel?: number; // in liters or gallons
  };
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
}

export enum EngineType {
  GASOLINE = 'gasoline',
  DIESEL = 'diesel',
  ELECTRIC = 'electric',
  HYBRID = 'hybrid',
  NATURAL_GAS = 'natural_gas'
}

export enum FuelType {
  GASOLINE = 'gasoline',
  DIESEL = 'diesel',
  ELECTRIC = 'electric',
  HYBRID = 'hybrid',
  CNG = 'cng',
  LPG = 'lpg'
}

export enum TransmissionType {
  MANUAL = 'manual',
  AUTOMATIC = 'automatic',
  CVT = 'cvt'
}

export interface MaintenanceInfo {
  lastService?: Date;
  nextService?: Date;
  mileage: number;
  serviceInterval: number; // in km or miles
  alerts: MaintenanceAlert[];
}

export interface MaintenanceAlert {
  type: MaintenanceAlertType;
  description: string;
  dueDate?: Date;
  dueMileage?: number;
  priority: AlertPriority;
}

export enum MaintenanceAlertType {
  OIL_CHANGE = 'oil_change',
  BRAKE_CHECK = 'brake_check',
  TIRE_ROTATION = 'tire_rotation',
  INSPECTION = 'inspection',
  GENERAL_SERVICE = 'general_service'
}

export enum AlertPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

export interface FuelInfo {
  currentLevel?: number; // percentage
  capacity: number; // in liters or gallons
  efficiency: number; // km/l or mpg
  lastRefuel?: Date;
  monthlyConsumption: number;
}

export interface InsuranceInfo {
  provider: string;
  policyNumber: string;
  startDate: Date;
  endDate: Date;
  coverage: string[];
  premium: number;
}