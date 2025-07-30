export interface User {
    _id: string;
    email: string;
    password?: string;
    firstName: string;
    lastName: string;
    phone?: string;
    role: UserRole;
    companyId: string;
    isActive: boolean;
    permissions: Permission[];
    lastLogin?: Date;
    createdAt: Date;
    updatedAt: Date;
}
export declare enum UserRole {
    SUPER_ADMIN = "super_admin",
    COMPANY_ADMIN = "company_admin",
    FLEET_MANAGER = "fleet_manager",
    DISPATCHER = "dispatcher",
    DRIVER = "driver",
    VIEWER = "viewer"
}
export declare enum Permission {
    MANAGE_COMPANIES = "manage_companies",
    VIEW_COMPANIES = "view_companies",
    MANAGE_USERS = "manage_users",
    VIEW_USERS = "view_users",
    MANAGE_FLEETS = "manage_fleets",
    VIEW_FLEETS = "view_fleets",
    MANAGE_VEHICLES = "manage_vehicles",
    VIEW_VEHICLES = "view_vehicles",
    MANAGE_DEVICES = "manage_devices",
    VIEW_DEVICES = "view_devices",
    MANAGE_ROUTES = "manage_routes",
    VIEW_ROUTES = "view_routes",
    MANAGE_GEOFENCES = "manage_geofences",
    VIEW_GEOFENCES = "view_geofences",
    VIEW_REPORTS = "view_reports",
    EXPORT_REPORTS = "export_reports",
    VIEW_LIVE_TRACKING = "view_live_tracking",
    MANAGE_ALERTS = "manage_alerts",
    VIEW_ALERTS = "view_alerts"
}
export interface CreateUserRequest {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone?: string;
    role: UserRole;
    companyId: string;
    permissions: Permission[];
}
export interface UpdateUserRequest {
    firstName?: string;
    lastName?: string;
    phone?: string;
    role?: UserRole;
    permissions?: Permission[];
    isActive?: boolean;
}
export interface LoginRequest {
    email: string;
    password: string;
}
export interface LoginResponse {
    user: Omit<User, 'password'>;
    token: string;
    refreshToken: string;
}
export interface UserProfile {
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
    phone?: string;
    role: UserRole;
    companyId: string;
    permissions: Permission[];
}
