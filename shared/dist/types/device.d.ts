export interface Device {
    _id: string;
    companyId: string;
    vehicleId?: string;
    imei: string;
    serialNumber: string;
    manufacturer: DeviceManufacturer;
    model: string;
    firmware: string;
    protocol: DeviceProtocol;
    status: DeviceStatus;
    configuration: DeviceConfiguration;
    lastSeen?: Date;
    batteryLevel?: number;
    signalStrength?: number;
    simCard?: SimCardInfo;
    installation: InstallationInfo;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export declare enum DeviceManufacturer {
    TELTONIKA = "teltonika",
    CONCOX = "concox",
    QUECLINK = "queclink",
    CALAMP = "calamp",
    RUPTELA = "ruptela",
    MEITRACK = "meitrack",
    GOSAFE = "gosafe",
    SUNTECH = "suntech",
    OTHER = "other"
}
export declare enum DeviceProtocol {
    TELTONIKA = "teltonika",
    GT06 = "gt06",
    TK103 = "tk103",
    H02 = "h02",
    OSMAND = "osmand",
    TRACCAR = "traccar",
    CUSTOM = "custom"
}
export declare enum DeviceStatus {
    ONLINE = "online",
    OFFLINE = "offline",
    MAINTENANCE = "maintenance",
    ERROR = "error",
    UNKNOWN = "unknown"
}
export interface DeviceConfiguration {
    reportingInterval: number;
    gpsAccuracy: number;
    speedThreshold: number;
    idleThreshold: number;
    features: DeviceFeature[];
    sensors: SensorConfiguration[];
    alerts: DeviceAlertSettings;
}
export declare enum DeviceFeature {
    GPS = "gps",
    ACCELEROMETER = "accelerometer",
    FUEL_SENSOR = "fuel_sensor",
    TEMPERATURE_SENSOR = "temperature_sensor",
    PANIC_BUTTON = "panic_button",
    DOOR_SENSOR = "door_sensor",
    CAMERA = "camera",
    RFID = "rfid",
    OBD = "obd",
    CAN_BUS = "can_bus"
}
export interface SensorConfiguration {
    type: SensorType;
    enabled: boolean;
    threshold?: number;
    calibration?: SensorCalibration;
}
export declare enum SensorType {
    FUEL_LEVEL = "fuel_level",
    TEMPERATURE = "temperature",
    DOOR = "door",
    SEATBELT = "seatbelt",
    ACCELERATION = "acceleration",
    TILT = "tilt",
    IMPACT = "impact"
}
export interface SensorCalibration {
    minValue: number;
    maxValue: number;
    unit: string;
    formula?: string;
}
export interface DeviceAlertSettings {
    speeding: boolean;
    harshDriving: boolean;
    geofence: boolean;
    maintenance: boolean;
    tampering: boolean;
    lowBattery: boolean;
    offline: boolean;
}
export interface SimCardInfo {
    iccid: string;
    msisdn?: string;
    carrier: string;
    plan: string;
    dataUsage: {
        used: number;
        limit: number;
        period: string;
    };
    expiryDate?: Date;
}
export interface InstallationInfo {
    installedBy: string;
    installationDate: Date;
    location: InstallationLocation;
    notes?: string;
    warrantyExpiry?: Date;
}
export declare enum InstallationLocation {
    DASHBOARD = "dashboard",
    ENGINE_BAY = "engine_bay",
    UNDER_SEAT = "under_seat",
    TRUNK = "trunk",
    EXTERIOR = "exterior",
    OBD_PORT = "obd_port",
    OTHER = "other"
}
export interface CreateDeviceRequest {
    imei: string;
    serialNumber: string;
    manufacturer: DeviceManufacturer;
    model: string;
    protocol: DeviceProtocol;
    configuration?: Partial<DeviceConfiguration>;
    simCard?: Omit<SimCardInfo, 'dataUsage'>;
    installation: Omit<InstallationInfo, 'installedBy' | 'installationDate'>;
}
export interface UpdateDeviceRequest {
    manufacturer?: DeviceManufacturer;
    model?: string;
    firmware?: string;
    protocol?: DeviceProtocol;
    configuration?: Partial<DeviceConfiguration>;
    simCard?: Partial<SimCardInfo>;
    isActive?: boolean;
}
export interface AssignDeviceRequest {
    deviceId: string;
    vehicleId: string;
    installation: Omit<InstallationInfo, 'installedBy' | 'installationDate'>;
}
export interface DeviceCommand {
    _id: string;
    deviceId: string;
    command: DeviceCommandType;
    parameters?: any;
    status: CommandStatus;
    sentAt: Date;
    responseAt?: Date;
    response?: any;
    timeout: number;
}
export declare enum DeviceCommandType {
    GET_LOCATION = "get_location",
    SET_INTERVAL = "set_interval",
    REBOOT = "reboot",
    SET_SPEED_LIMIT = "set_speed_limit",
    ENABLE_IMMOBILIZER = "enable_immobilizer",
    DISABLE_IMMOBILIZER = "disable_immobilizer",
    SET_GEOFENCE = "set_geofence",
    GET_STATUS = "get_status"
}
export declare enum CommandStatus {
    PENDING = "pending",
    SENT = "sent",
    ACKNOWLEDGED = "acknowledged",
    FAILED = "failed",
    TIMEOUT = "timeout"
}
