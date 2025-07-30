export declare const API_ENDPOINTS: {
    AUTH: {
        LOGIN: string;
        REGISTER: string;
        REFRESH: string;
        LOGOUT: string;
        FORGOT_PASSWORD: string;
        RESET_PASSWORD: string;
        VERIFY_EMAIL: string;
    };
    USERS: {
        BASE: string;
        PROFILE: string;
        UPDATE_PROFILE: string;
        CHANGE_PASSWORD: string;
    };
    COMPANIES: {
        BASE: string;
        SETTINGS: string;
        STATISTICS: string;
        SUBSCRIPTION: string;
    };
    VEHICLES: {
        BASE: string;
        ASSIGN_DRIVER: string;
        LOCATION: string;
        HISTORY: string;
        STATISTICS: string;
        MAINTENANCE: string;
    };
    FLEETS: {
        BASE: string;
        VEHICLES: string;
        STATISTICS: string;
    };
    DEVICES: {
        BASE: string;
        ASSIGN: string;
        COMMANDS: string;
        STATUS: string;
        DATA: string;
    };
    ROUTES: {
        BASE: string;
        OPTIMIZE: string;
        ASSIGN: string;
    };
    GEOFENCES: {
        BASE: string;
        VEHICLES: string;
        EVENTS: string;
    };
    TRACKING: {
        LIVE: string;
        HISTORY: string;
        EVENTS: string;
    };
    REPORTS: {
        BASE: string;
        VEHICLE: string;
        FLEET: string;
        DRIVER: string;
        FUEL: string;
        MAINTENANCE: string;
        EXPORT: string;
    };
    ALERTS: {
        BASE: string;
        MARK_READ: string;
        SETTINGS: string;
    };
};
export declare const HTTP_STATUS: {
    readonly OK: 200;
    readonly CREATED: 201;
    readonly NO_CONTENT: 204;
    readonly BAD_REQUEST: 400;
    readonly UNAUTHORIZED: 401;
    readonly FORBIDDEN: 403;
    readonly NOT_FOUND: 404;
    readonly CONFLICT: 409;
    readonly UNPROCESSABLE_ENTITY: 422;
    readonly INTERNAL_SERVER_ERROR: 500;
    readonly SERVICE_UNAVAILABLE: 503;
};
export declare const API_ERRORS: {
    readonly INVALID_CREDENTIALS: "INVALID_CREDENTIALS";
    readonly TOKEN_EXPIRED: "TOKEN_EXPIRED";
    readonly TOKEN_INVALID: "TOKEN_INVALID";
    readonly EMAIL_NOT_VERIFIED: "EMAIL_NOT_VERIFIED";
    readonly ACCOUNT_LOCKED: "ACCOUNT_LOCKED";
    readonly INSUFFICIENT_PERMISSIONS: "INSUFFICIENT_PERMISSIONS";
    readonly COMPANY_SUSPENDED: "COMPANY_SUSPENDED";
    readonly SUBSCRIPTION_EXPIRED: "SUBSCRIPTION_EXPIRED";
    readonly FEATURE_NOT_AVAILABLE: "FEATURE_NOT_AVAILABLE";
    readonly VALIDATION_ERROR: "VALIDATION_ERROR";
    readonly DUPLICATE_EMAIL: "DUPLICATE_EMAIL";
    readonly DUPLICATE_LICENSE_PLATE: "DUPLICATE_LICENSE_PLATE";
    readonly DUPLICATE_IMEI: "DUPLICATE_IMEI";
    readonly RESOURCE_NOT_FOUND: "RESOURCE_NOT_FOUND";
    readonly RESOURCE_ALREADY_EXISTS: "RESOURCE_ALREADY_EXISTS";
    readonly RESOURCE_IN_USE: "RESOURCE_IN_USE";
    readonly DATABASE_ERROR: "DATABASE_ERROR";
    readonly EXTERNAL_SERVICE_ERROR: "EXTERNAL_SERVICE_ERROR";
    readonly RATE_LIMIT_EXCEEDED: "RATE_LIMIT_EXCEEDED";
    readonly DEVICE_OFFLINE: "DEVICE_OFFLINE";
    readonly DEVICE_NOT_RESPONDING: "DEVICE_NOT_RESPONDING";
    readonly INVALID_DEVICE_DATA: "INVALID_DEVICE_DATA";
};
export declare const SOCKET_EVENTS: {
    readonly CONNECTION: "connection";
    readonly DISCONNECT: "disconnect";
    readonly AUTHENTICATE: "authenticate";
    readonly AUTHENTICATED: "authenticated";
    readonly LOCATION_UPDATE: "location_update";
    readonly VEHICLE_STATUS_UPDATE: "vehicle_status_update";
    readonly DEVICE_STATUS_UPDATE: "device_status_update";
    readonly ALERT_CREATED: "alert_created";
    readonly GEOFENCE_EVENT: "geofence_event";
    readonly MAINTENANCE_ALERT: "maintenance_alert";
    readonly SPEED_ALERT: "speed_alert";
    readonly USER_ACTIVITY: "user_activity";
    readonly SYSTEM_NOTIFICATION: "system_notification";
};
export declare const REQUEST_TIMEOUT = 30000;
export declare const DEFAULT_PAGE_SIZE = 20;
export declare const MAX_PAGE_SIZE = 100;
