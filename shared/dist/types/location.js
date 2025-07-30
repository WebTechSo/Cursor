"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduleFrequency = exports.DayOfWeek = exports.EventSeverity = exports.EventType = exports.EngineStatus = void 0;
var EngineStatus;
(function (EngineStatus) {
    EngineStatus["OFF"] = "off";
    EngineStatus["ON"] = "on";
    EngineStatus["IDLE"] = "idle";
    EngineStatus["RUNNING"] = "running";
})(EngineStatus || (exports.EngineStatus = EngineStatus = {}));
var EventType;
(function (EventType) {
    EventType["IGNITION_ON"] = "ignition_on";
    EventType["IGNITION_OFF"] = "ignition_off";
    EventType["SPEEDING"] = "speeding";
    EventType["HARSH_ACCELERATION"] = "harsh_acceleration";
    EventType["HARSH_BRAKING"] = "harsh_braking";
    EventType["HARSH_CORNERING"] = "harsh_cornering";
    EventType["GEOFENCE_ENTER"] = "geofence_enter";
    EventType["GEOFENCE_EXIT"] = "geofence_exit";
    EventType["IDLE_START"] = "idle_start";
    EventType["IDLE_END"] = "idle_end";
    EventType["PANIC_BUTTON"] = "panic_button";
    EventType["MAINTENANCE_ALERT"] = "maintenance_alert";
    EventType["FUEL_THEFT"] = "fuel_theft";
    EventType["UNAUTHORIZED_MOVEMENT"] = "unauthorized_movement";
    EventType["DEVICE_OFFLINE"] = "device_offline";
    EventType["DEVICE_ONLINE"] = "device_online";
})(EventType || (exports.EventType = EventType = {}));
var EventSeverity;
(function (EventSeverity) {
    EventSeverity["INFO"] = "info";
    EventSeverity["WARNING"] = "warning";
    EventSeverity["ALERT"] = "alert";
    EventSeverity["CRITICAL"] = "critical";
})(EventSeverity || (exports.EventSeverity = EventSeverity = {}));
var DayOfWeek;
(function (DayOfWeek) {
    DayOfWeek["MONDAY"] = "monday";
    DayOfWeek["TUESDAY"] = "tuesday";
    DayOfWeek["WEDNESDAY"] = "wednesday";
    DayOfWeek["THURSDAY"] = "thursday";
    DayOfWeek["FRIDAY"] = "friday";
    DayOfWeek["SATURDAY"] = "saturday";
    DayOfWeek["SUNDAY"] = "sunday";
})(DayOfWeek || (exports.DayOfWeek = DayOfWeek = {}));
var ScheduleFrequency;
(function (ScheduleFrequency) {
    ScheduleFrequency["ONCE"] = "once";
    ScheduleFrequency["DAILY"] = "daily";
    ScheduleFrequency["WEEKLY"] = "weekly";
    ScheduleFrequency["MONTHLY"] = "monthly";
})(ScheduleFrequency || (exports.ScheduleFrequency = ScheduleFrequency = {}));
