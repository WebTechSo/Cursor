import { Permission } from '../types/user';
import { EngineType, FuelType, TransmissionType } from '../types/vehicle';
import { UnitSystem } from '../types/company';
import { SubscriptionFeature } from '../types/subscription';
import { DeviceProtocol, DeviceFeature } from '../types/device';
export declare const DEFAULT_USER_PERMISSIONS: {
    super_admin: Permission[];
    company_admin: Permission[];
    fleet_manager: Permission[];
    dispatcher: Permission[];
    driver: Permission[];
    viewer: Permission[];
};
export declare const DEFAULT_COMPANY_SETTINGS: {
    timezone: string;
    currency: string;
    units: UnitSystem;
    notifications: {
        emailEnabled: boolean;
        smsEnabled: boolean;
        pushEnabled: boolean;
        alertTypes: never[];
    };
    tracking: {
        updateInterval: number;
        storeRawData: boolean;
        dataRetentionDays: number;
        enableReports: boolean;
    };
};
export declare const SUBSCRIPTION_PLANS: {
    basic: {
        name: string;
        maxVehicles: number;
        maxUsers: number;
        maxGeofences: number;
        maxReports: number;
        dataRetentionDays: number;
        apiCallsPerMonth: number;
        features: SubscriptionFeature[];
    };
    professional: {
        name: string;
        maxVehicles: number;
        maxUsers: number;
        maxGeofences: number;
        maxReports: number;
        dataRetentionDays: number;
        apiCallsPerMonth: number;
        features: SubscriptionFeature[];
    };
    enterprise: {
        name: string;
        maxVehicles: number;
        maxUsers: number;
        maxGeofences: number;
        maxReports: number;
        dataRetentionDays: number;
        apiCallsPerMonth: number;
        features: SubscriptionFeature[];
    };
};
export declare const DEFAULT_VEHICLE_SPECIFICATIONS: {
    engineType: EngineType;
    fuelType: FuelType;
    transmission: TransmissionType;
    maxSpeed: number;
    weight: number;
    capacity: {
        passengers: number;
        cargo: number;
        fuel: number;
    };
    dimensions: {
        length: number;
        width: number;
        height: number;
    };
};
export declare const DEFAULT_FLEET_SETTINGS: {
    speedLimit: number;
    idleTimeLimit: number;
    fuelAlerts: boolean;
    maintenanceAlerts: boolean;
    driverScoring: boolean;
    autoDispatch: boolean;
};
export declare const DEFAULT_DEVICE_CONFIGURATION: {
    reportingInterval: number;
    gpsAccuracy: number;
    speedThreshold: number;
    idleThreshold: number;
    features: DeviceFeature[];
    sensors: never[];
    alerts: {
        speeding: boolean;
        harshDriving: boolean;
        geofence: boolean;
        maintenance: boolean;
        tampering: boolean;
        lowBattery: boolean;
        offline: boolean;
    };
};
export declare const SUPPORTED_DEVICE_PROTOCOLS: {
    teltonika: DeviceProtocol[];
    concox: DeviceProtocol[];
    queclink: DeviceProtocol[];
    calamp: DeviceProtocol[];
    ruptela: DeviceProtocol[];
    meitrack: DeviceProtocol[];
    gosafe: DeviceProtocol[];
    suntech: DeviceProtocol[];
    other: DeviceProtocol[];
};
export declare const GEOFENCE_DEFAULTS: {
    radius: number;
    alertsEnabled: boolean;
    notifyOnEntry: boolean;
    notifyOnExit: boolean;
};
export declare const ROUTE_DEFAULTS: {
    optimized: boolean;
    estimatedDuration: number;
    maxWaypoints: number;
};
export declare const TRACKING_DEFAULTS: {
    locationAccuracy: number;
    speedAccuracy: number;
    minMovementDistance: number;
    maxIdleTime: number;
};
export declare const REPORT_DEFAULTS: {
    pageSize: number;
    maxRecords: number;
    exportFormats: string[];
    cacheTimeout: number;
};
export declare const ALERT_DEFAULTS: {
    speedingThreshold: number;
    harshAccelerationThreshold: number;
    harshBrakingThreshold: number;
    harshCorneringThreshold: number;
    idleTimeThreshold: number;
    fuelTheftThreshold: number;
};
export declare const MAP_DEFAULTS: {
    center: {
        latitude: number;
        longitude: number;
    };
    zoom: number;
    style: string;
    showTraffic: boolean;
    showSatellite: boolean;
};
export declare const NOTIFICATION_DEFAULTS: {
    email: {
        enabled: boolean;
        frequency: string;
    };
    sms: {
        enabled: boolean;
        frequency: string;
    };
    push: {
        enabled: boolean;
        frequency: string;
    };
};
