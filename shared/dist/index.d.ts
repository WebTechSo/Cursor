export * from './types/user';
export * from './types/company';
export * from './types/subscription';
export * from './types/vehicle';
export * from './types/location';
export * from './types/fleet';
export * from './types/device';
export * from './utils/validation';
export * from './utils/helpers';
export * from './constants/api';
export * from './constants/defaults';
export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    message?: string;
    error?: string;
    pagination?: PaginationInfo;
}
export interface PaginationInfo {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
}
export interface QueryOptions {
    page?: number;
    limit?: number;
    sort?: string;
    order?: 'asc' | 'desc';
    search?: string;
    filters?: Record<string, any>;
}
export interface ErrorDetails {
    code: string;
    message: string;
    field?: string;
    details?: any;
}
export declare enum SocketEvents {
    CONNECT = "connect",
    DISCONNECT = "disconnect",
    AUTHENTICATE = "authenticate",
    AUTHENTICATED = "authenticated",
    LOCATION_UPDATE = "location_update",
    VEHICLE_STATUS_UPDATE = "vehicle_status_update",
    ALERT_CREATED = "alert_created",
    ALERT_UPDATED = "alert_updated",
    GEOFENCE_ENTRY = "geofence_entry",
    GEOFENCE_EXIT = "geofence_exit",
    DEVICE_ONLINE = "device_online",
    DEVICE_OFFLINE = "device_offline",
    MAINTENANCE_ALERT = "maintenance_alert",
    FUEL_ALERT = "fuel_alert",
    SPEED_ALERT = "speed_alert"
}
export interface SocketMessage<T = any> {
    event: SocketEvents;
    data: T;
    timestamp: Date;
    userId?: string;
    companyId?: string;
}
