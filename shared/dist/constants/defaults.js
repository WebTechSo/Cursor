"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NOTIFICATION_DEFAULTS = exports.MAP_DEFAULTS = exports.ALERT_DEFAULTS = exports.REPORT_DEFAULTS = exports.TRACKING_DEFAULTS = exports.ROUTE_DEFAULTS = exports.GEOFENCE_DEFAULTS = exports.SUPPORTED_DEVICE_PROTOCOLS = exports.DEFAULT_DEVICE_CONFIGURATION = exports.DEFAULT_FLEET_SETTINGS = exports.DEFAULT_VEHICLE_SPECIFICATIONS = exports.SUBSCRIPTION_PLANS = exports.DEFAULT_COMPANY_SETTINGS = exports.DEFAULT_USER_PERMISSIONS = void 0;
const user_1 = require("../types/user");
const vehicle_1 = require("../types/vehicle");
const company_1 = require("../types/company");
const subscription_1 = require("../types/subscription");
const device_1 = require("../types/device");
exports.DEFAULT_USER_PERMISSIONS = {
    [user_1.UserRole.SUPER_ADMIN]: [
        user_1.Permission.MANAGE_COMPANIES,
        user_1.Permission.VIEW_COMPANIES,
        user_1.Permission.MANAGE_USERS,
        user_1.Permission.VIEW_USERS,
        user_1.Permission.MANAGE_FLEETS,
        user_1.Permission.VIEW_FLEETS,
        user_1.Permission.MANAGE_VEHICLES,
        user_1.Permission.VIEW_VEHICLES,
        user_1.Permission.MANAGE_DEVICES,
        user_1.Permission.VIEW_DEVICES,
        user_1.Permission.MANAGE_ROUTES,
        user_1.Permission.VIEW_ROUTES,
        user_1.Permission.MANAGE_GEOFENCES,
        user_1.Permission.VIEW_GEOFENCES,
        user_1.Permission.VIEW_REPORTS,
        user_1.Permission.EXPORT_REPORTS,
        user_1.Permission.VIEW_LIVE_TRACKING,
        user_1.Permission.MANAGE_ALERTS,
        user_1.Permission.VIEW_ALERTS
    ],
    [user_1.UserRole.COMPANY_ADMIN]: [
        user_1.Permission.MANAGE_USERS,
        user_1.Permission.VIEW_USERS,
        user_1.Permission.MANAGE_FLEETS,
        user_1.Permission.VIEW_FLEETS,
        user_1.Permission.MANAGE_VEHICLES,
        user_1.Permission.VIEW_VEHICLES,
        user_1.Permission.MANAGE_DEVICES,
        user_1.Permission.VIEW_DEVICES,
        user_1.Permission.MANAGE_ROUTES,
        user_1.Permission.VIEW_ROUTES,
        user_1.Permission.MANAGE_GEOFENCES,
        user_1.Permission.VIEW_GEOFENCES,
        user_1.Permission.VIEW_REPORTS,
        user_1.Permission.EXPORT_REPORTS,
        user_1.Permission.VIEW_LIVE_TRACKING,
        user_1.Permission.MANAGE_ALERTS,
        user_1.Permission.VIEW_ALERTS
    ],
    [user_1.UserRole.FLEET_MANAGER]: [
        user_1.Permission.VIEW_USERS,
        user_1.Permission.MANAGE_FLEETS,
        user_1.Permission.VIEW_FLEETS,
        user_1.Permission.MANAGE_VEHICLES,
        user_1.Permission.VIEW_VEHICLES,
        user_1.Permission.VIEW_DEVICES,
        user_1.Permission.MANAGE_ROUTES,
        user_1.Permission.VIEW_ROUTES,
        user_1.Permission.MANAGE_GEOFENCES,
        user_1.Permission.VIEW_GEOFENCES,
        user_1.Permission.VIEW_REPORTS,
        user_1.Permission.VIEW_LIVE_TRACKING,
        user_1.Permission.VIEW_ALERTS
    ],
    [user_1.UserRole.DISPATCHER]: [
        user_1.Permission.VIEW_FLEETS,
        user_1.Permission.VIEW_VEHICLES,
        user_1.Permission.VIEW_DEVICES,
        user_1.Permission.VIEW_ROUTES,
        user_1.Permission.VIEW_GEOFENCES,
        user_1.Permission.VIEW_REPORTS,
        user_1.Permission.VIEW_LIVE_TRACKING,
        user_1.Permission.VIEW_ALERTS
    ],
    [user_1.UserRole.DRIVER]: [
        user_1.Permission.VIEW_VEHICLES,
        user_1.Permission.VIEW_ROUTES,
        user_1.Permission.VIEW_LIVE_TRACKING
    ],
    [user_1.UserRole.VIEWER]: [
        user_1.Permission.VIEW_VEHICLES,
        user_1.Permission.VIEW_LIVE_TRACKING,
        user_1.Permission.VIEW_ALERTS
    ]
};
exports.DEFAULT_COMPANY_SETTINGS = {
    timezone: 'UTC',
    currency: 'USD',
    units: company_1.UnitSystem.METRIC,
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
exports.SUBSCRIPTION_PLANS = {
    [subscription_1.SubscriptionPlan.BASIC]: {
        name: 'Basic',
        maxVehicles: 10,
        maxUsers: 5,
        maxGeofences: 10,
        maxReports: 50,
        dataRetentionDays: 90,
        apiCallsPerMonth: 10000,
        features: [
            subscription_1.SubscriptionFeature.REAL_TIME_TRACKING,
            subscription_1.SubscriptionFeature.MOBILE_APP,
            subscription_1.SubscriptionFeature.REPORTS
        ]
    },
    [subscription_1.SubscriptionPlan.PROFESSIONAL]: {
        name: 'Professional',
        maxVehicles: 50,
        maxUsers: 25,
        maxGeofences: 100,
        maxReports: 500,
        dataRetentionDays: 365,
        apiCallsPerMonth: 100000,
        features: [
            subscription_1.SubscriptionFeature.REAL_TIME_TRACKING,
            subscription_1.SubscriptionFeature.ROUTE_OPTIMIZATION,
            subscription_1.SubscriptionFeature.GEOFENCING,
            subscription_1.SubscriptionFeature.REPORTS,
            subscription_1.SubscriptionFeature.MOBILE_APP,
            subscription_1.SubscriptionFeature.MAINTENANCE_TRACKING,
            subscription_1.SubscriptionFeature.FUEL_MONITORING
        ]
    },
    [subscription_1.SubscriptionPlan.ENTERPRISE]: {
        name: 'Enterprise',
        maxVehicles: 500,
        maxUsers: 100,
        maxGeofences: 1000,
        maxReports: -1, // unlimited
        dataRetentionDays: -1, // unlimited
        apiCallsPerMonth: -1, // unlimited
        features: [
            subscription_1.SubscriptionFeature.REAL_TIME_TRACKING,
            subscription_1.SubscriptionFeature.ROUTE_OPTIMIZATION,
            subscription_1.SubscriptionFeature.GEOFENCING,
            subscription_1.SubscriptionFeature.REPORTS,
            subscription_1.SubscriptionFeature.MOBILE_APP,
            subscription_1.SubscriptionFeature.API_ACCESS,
            subscription_1.SubscriptionFeature.MAINTENANCE_TRACKING,
            subscription_1.SubscriptionFeature.FUEL_MONITORING,
            subscription_1.SubscriptionFeature.DRIVER_SCORING,
            subscription_1.SubscriptionFeature.CUSTOM_ALERTS
        ]
    }
};
exports.DEFAULT_VEHICLE_SPECIFICATIONS = {
    engineType: vehicle_1.EngineType.GASOLINE,
    fuelType: vehicle_1.FuelType.GASOLINE,
    transmission: vehicle_1.TransmissionType.AUTOMATIC,
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
exports.DEFAULT_FLEET_SETTINGS = {
    speedLimit: 80,
    idleTimeLimit: 15,
    fuelAlerts: true,
    maintenanceAlerts: true,
    driverScoring: false,
    autoDispatch: false
};
exports.DEFAULT_DEVICE_CONFIGURATION = {
    reportingInterval: 60,
    gpsAccuracy: 10,
    speedThreshold: 80,
    idleThreshold: 300,
    features: [device_1.DeviceFeature.GPS],
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
exports.SUPPORTED_DEVICE_PROTOCOLS = {
    [device_1.DeviceManufacturer.TELTONIKA]: [device_1.DeviceProtocol.TELTONIKA],
    [device_1.DeviceManufacturer.CONCOX]: [device_1.DeviceProtocol.GT06, device_1.DeviceProtocol.H02],
    [device_1.DeviceManufacturer.QUECLINK]: [device_1.DeviceProtocol.GT06],
    [device_1.DeviceManufacturer.CALAMP]: [device_1.DeviceProtocol.TRACCAR],
    [device_1.DeviceManufacturer.RUPTELA]: [device_1.DeviceProtocol.TELTONIKA],
    [device_1.DeviceManufacturer.MEITRACK]: [device_1.DeviceProtocol.GT06],
    [device_1.DeviceManufacturer.GOSAFE]: [device_1.DeviceProtocol.GT06],
    [device_1.DeviceManufacturer.SUNTECH]: [device_1.DeviceProtocol.TRACCAR],
    [device_1.DeviceManufacturer.OTHER]: [device_1.DeviceProtocol.OSMAND, device_1.DeviceProtocol.CUSTOM]
};
exports.GEOFENCE_DEFAULTS = {
    radius: 100, // meters
    alertsEnabled: true,
    notifyOnEntry: true,
    notifyOnExit: true
};
exports.ROUTE_DEFAULTS = {
    optimized: false,
    estimatedDuration: 0,
    maxWaypoints: 25
};
exports.TRACKING_DEFAULTS = {
    locationAccuracy: 10, // meters
    speedAccuracy: 5, // km/h
    minMovementDistance: 50, // meters
    maxIdleTime: 300 // seconds
};
exports.REPORT_DEFAULTS = {
    pageSize: 100,
    maxRecords: 10000,
    exportFormats: ['pdf', 'excel', 'csv'],
    cacheTimeout: 300 // seconds
};
exports.ALERT_DEFAULTS = {
    speedingThreshold: 10, // km/h over limit
    harshAccelerationThreshold: 8, // m/s²
    harshBrakingThreshold: -8, // m/s²
    harshCorneringThreshold: 8, // m/s²
    idleTimeThreshold: 300, // seconds
    fuelTheftThreshold: 10 // liters
};
exports.MAP_DEFAULTS = {
    center: {
        latitude: 40.7128,
        longitude: -74.0060 // New York City
    },
    zoom: 10,
    style: 'roadmap',
    showTraffic: false,
    showSatellite: false
};
exports.NOTIFICATION_DEFAULTS = {
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
