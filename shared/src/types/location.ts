export interface LocationData {
  latitude: number;
  longitude: number;
  altitude?: number;
  accuracy?: number;
  speed?: number; // km/h or mph
  heading?: number; // degrees
  timestamp: Date;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
}

export interface TrackingData {
  _id: string;
  vehicleId: string;
  deviceId: string;
  location: LocationData;
  engine: EngineData;
  fuel?: FuelData;
  temperature?: TemperatureData;
  sensors?: SensorData;
  events?: TrackingEvent[];
  rawData?: any;
  processed: boolean;
  createdAt: Date;
}

export interface EngineData {
  status: EngineStatus;
  rpm?: number;
  coolantTemperature?: number;
  oilPressure?: number;
  batteryVoltage?: number;
  fuelLevel?: number;
  engineHours?: number;
}

export enum EngineStatus {
  OFF = 'off',
  ON = 'on',
  IDLE = 'idle',
  RUNNING = 'running'
}

export interface FuelData {
  level: number; // percentage
  consumption: number; // l/h or gal/h
  efficiency: number; // km/l or mpg
}

export interface TemperatureData {
  engine?: number;
  cabin?: number;
  cargo?: number;
  ambient?: number;
}

export interface SensorData {
  doors?: DoorStatus[];
  seatbelt?: boolean;
  panic?: boolean;
  harsh_acceleration?: boolean;
  harsh_braking?: boolean;
  harsh_cornering?: boolean;
}

export interface DoorStatus {
  door: string;
  open: boolean;
}

export interface TrackingEvent {
  type: EventType;
  description: string;
  severity: EventSeverity;
  data?: any;
  timestamp: Date;
}

export enum EventType {
  IGNITION_ON = 'ignition_on',
  IGNITION_OFF = 'ignition_off',
  SPEEDING = 'speeding',
  HARSH_ACCELERATION = 'harsh_acceleration',
  HARSH_BRAKING = 'harsh_braking',
  HARSH_CORNERING = 'harsh_cornering',
  GEOFENCE_ENTER = 'geofence_enter',
  GEOFENCE_EXIT = 'geofence_exit',
  IDLE_START = 'idle_start',
  IDLE_END = 'idle_end',
  PANIC_BUTTON = 'panic_button',
  MAINTENANCE_ALERT = 'maintenance_alert',
  FUEL_THEFT = 'fuel_theft',
  UNAUTHORIZED_MOVEMENT = 'unauthorized_movement',
  DEVICE_OFFLINE = 'device_offline',
  DEVICE_ONLINE = 'device_online'
}

export enum EventSeverity {
  INFO = 'info',
  WARNING = 'warning',
  ALERT = 'alert',
  CRITICAL = 'critical'
}

export interface Route {
  _id: string;
  companyId: string;
  name: string;
  description?: string;
  startLocation: LocationData;
  endLocation: LocationData;
  waypoints: LocationData[];
  distance: number; // km or miles
  estimatedDuration: number; // minutes
  optimized: boolean;
  active: boolean;
  assignedVehicles: string[];
  schedule?: RouteSchedule;
  createdAt: Date;
  updatedAt: Date;
}

export interface RouteSchedule {
  days: DayOfWeek[];
  startTime: string; // HH:mm
  frequency: ScheduleFrequency;
  recurring: boolean;
}

export enum DayOfWeek {
  MONDAY = 'monday',
  TUESDAY = 'tuesday',
  WEDNESDAY = 'wednesday',
  THURSDAY = 'thursday',
  FRIDAY = 'friday',
  SATURDAY = 'saturday',
  SUNDAY = 'sunday'
}

export enum ScheduleFrequency {
  ONCE = 'once',
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly'
}