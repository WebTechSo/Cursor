"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlertType = exports.UnitSystem = void 0;
var UnitSystem;
(function (UnitSystem) {
    UnitSystem["METRIC"] = "metric";
    UnitSystem["IMPERIAL"] = "imperial";
})(UnitSystem || (exports.UnitSystem = UnitSystem = {}));
var AlertType;
(function (AlertType) {
    AlertType["SPEEDING"] = "speeding";
    AlertType["GEOFENCE_ENTRY"] = "geofence_entry";
    AlertType["GEOFENCE_EXIT"] = "geofence_exit";
    AlertType["IDLE_TIME"] = "idle_time";
    AlertType["MAINTENANCE_DUE"] = "maintenance_due";
    AlertType["DEVICE_OFFLINE"] = "device_offline";
    AlertType["PANIC_BUTTON"] = "panic_button";
    AlertType["HARSH_DRIVING"] = "harsh_driving";
    AlertType["FUEL_THEFT"] = "fuel_theft";
})(AlertType || (exports.AlertType = AlertType = {}));
