"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Permission = exports.UserRole = void 0;
var UserRole;
(function (UserRole) {
    UserRole["SUPER_ADMIN"] = "super_admin";
    UserRole["COMPANY_ADMIN"] = "company_admin";
    UserRole["FLEET_MANAGER"] = "fleet_manager";
    UserRole["DISPATCHER"] = "dispatcher";
    UserRole["DRIVER"] = "driver";
    UserRole["VIEWER"] = "viewer";
})(UserRole || (exports.UserRole = UserRole = {}));
var Permission;
(function (Permission) {
    // Company management
    Permission["MANAGE_COMPANIES"] = "manage_companies";
    Permission["VIEW_COMPANIES"] = "view_companies";
    // User management
    Permission["MANAGE_USERS"] = "manage_users";
    Permission["VIEW_USERS"] = "view_users";
    // Fleet management
    Permission["MANAGE_FLEETS"] = "manage_fleets";
    Permission["VIEW_FLEETS"] = "view_fleets";
    // Vehicle management
    Permission["MANAGE_VEHICLES"] = "manage_vehicles";
    Permission["VIEW_VEHICLES"] = "view_vehicles";
    // Device management
    Permission["MANAGE_DEVICES"] = "manage_devices";
    Permission["VIEW_DEVICES"] = "view_devices";
    // Route management
    Permission["MANAGE_ROUTES"] = "manage_routes";
    Permission["VIEW_ROUTES"] = "view_routes";
    // Geofence management
    Permission["MANAGE_GEOFENCES"] = "manage_geofences";
    Permission["VIEW_GEOFENCES"] = "view_geofences";
    // Reports
    Permission["VIEW_REPORTS"] = "view_reports";
    Permission["EXPORT_REPORTS"] = "export_reports";
    // Real-time tracking
    Permission["VIEW_LIVE_TRACKING"] = "view_live_tracking";
    // Alerts and notifications
    Permission["MANAGE_ALERTS"] = "manage_alerts";
    Permission["VIEW_ALERTS"] = "view_alerts";
})(Permission || (exports.Permission = Permission = {}));
