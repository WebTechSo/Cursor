"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketEvents = void 0;
// Export all type definitions
__exportStar(require("./types/user"), exports);
__exportStar(require("./types/company"), exports);
__exportStar(require("./types/subscription"), exports);
__exportStar(require("./types/vehicle"), exports);
__exportStar(require("./types/location"), exports);
__exportStar(require("./types/fleet"), exports);
__exportStar(require("./types/device"), exports);
// Export utilities
__exportStar(require("./utils/validation"), exports);
__exportStar(require("./utils/helpers"), exports);
// Export constants
__exportStar(require("./constants/api"), exports);
__exportStar(require("./constants/defaults"), exports);
// WebSocket event types
var SocketEvents;
(function (SocketEvents) {
    // Connection events
    SocketEvents["CONNECT"] = "connect";
    SocketEvents["DISCONNECT"] = "disconnect";
    // Authentication
    SocketEvents["AUTHENTICATE"] = "authenticate";
    SocketEvents["AUTHENTICATED"] = "authenticated";
    // Real-time tracking
    SocketEvents["LOCATION_UPDATE"] = "location_update";
    SocketEvents["VEHICLE_STATUS_UPDATE"] = "vehicle_status_update";
    // Alerts
    SocketEvents["ALERT_CREATED"] = "alert_created";
    SocketEvents["ALERT_UPDATED"] = "alert_updated";
    // Geofence events
    SocketEvents["GEOFENCE_ENTRY"] = "geofence_entry";
    SocketEvents["GEOFENCE_EXIT"] = "geofence_exit";
    // Device events
    SocketEvents["DEVICE_ONLINE"] = "device_online";
    SocketEvents["DEVICE_OFFLINE"] = "device_offline";
    // System events
    SocketEvents["MAINTENANCE_ALERT"] = "maintenance_alert";
    SocketEvents["FUEL_ALERT"] = "fuel_alert";
    SocketEvents["SPEED_ALERT"] = "speed_alert";
})(SocketEvents || (exports.SocketEvents = SocketEvents = {}));
