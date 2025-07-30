"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandStatus = exports.DeviceCommandType = exports.InstallationLocation = exports.SensorType = exports.DeviceFeature = exports.DeviceStatus = exports.DeviceProtocol = exports.DeviceManufacturer = void 0;
var DeviceManufacturer;
(function (DeviceManufacturer) {
    DeviceManufacturer["TELTONIKA"] = "teltonika";
    DeviceManufacturer["CONCOX"] = "concox";
    DeviceManufacturer["QUECLINK"] = "queclink";
    DeviceManufacturer["CALAMP"] = "calamp";
    DeviceManufacturer["RUPTELA"] = "ruptela";
    DeviceManufacturer["MEITRACK"] = "meitrack";
    DeviceManufacturer["GOSAFE"] = "gosafe";
    DeviceManufacturer["SUNTECH"] = "suntech";
    DeviceManufacturer["OTHER"] = "other";
})(DeviceManufacturer || (exports.DeviceManufacturer = DeviceManufacturer = {}));
var DeviceProtocol;
(function (DeviceProtocol) {
    DeviceProtocol["TELTONIKA"] = "teltonika";
    DeviceProtocol["GT06"] = "gt06";
    DeviceProtocol["TK103"] = "tk103";
    DeviceProtocol["H02"] = "h02";
    DeviceProtocol["OSMAND"] = "osmand";
    DeviceProtocol["TRACCAR"] = "traccar";
    DeviceProtocol["CUSTOM"] = "custom";
})(DeviceProtocol || (exports.DeviceProtocol = DeviceProtocol = {}));
var DeviceStatus;
(function (DeviceStatus) {
    DeviceStatus["ONLINE"] = "online";
    DeviceStatus["OFFLINE"] = "offline";
    DeviceStatus["MAINTENANCE"] = "maintenance";
    DeviceStatus["ERROR"] = "error";
    DeviceStatus["UNKNOWN"] = "unknown";
})(DeviceStatus || (exports.DeviceStatus = DeviceStatus = {}));
var DeviceFeature;
(function (DeviceFeature) {
    DeviceFeature["GPS"] = "gps";
    DeviceFeature["ACCELEROMETER"] = "accelerometer";
    DeviceFeature["FUEL_SENSOR"] = "fuel_sensor";
    DeviceFeature["TEMPERATURE_SENSOR"] = "temperature_sensor";
    DeviceFeature["PANIC_BUTTON"] = "panic_button";
    DeviceFeature["DOOR_SENSOR"] = "door_sensor";
    DeviceFeature["CAMERA"] = "camera";
    DeviceFeature["RFID"] = "rfid";
    DeviceFeature["OBD"] = "obd";
    DeviceFeature["CAN_BUS"] = "can_bus";
})(DeviceFeature || (exports.DeviceFeature = DeviceFeature = {}));
var SensorType;
(function (SensorType) {
    SensorType["FUEL_LEVEL"] = "fuel_level";
    SensorType["TEMPERATURE"] = "temperature";
    SensorType["DOOR"] = "door";
    SensorType["SEATBELT"] = "seatbelt";
    SensorType["ACCELERATION"] = "acceleration";
    SensorType["TILT"] = "tilt";
    SensorType["IMPACT"] = "impact";
})(SensorType || (exports.SensorType = SensorType = {}));
var InstallationLocation;
(function (InstallationLocation) {
    InstallationLocation["DASHBOARD"] = "dashboard";
    InstallationLocation["ENGINE_BAY"] = "engine_bay";
    InstallationLocation["UNDER_SEAT"] = "under_seat";
    InstallationLocation["TRUNK"] = "trunk";
    InstallationLocation["EXTERIOR"] = "exterior";
    InstallationLocation["OBD_PORT"] = "obd_port";
    InstallationLocation["OTHER"] = "other";
})(InstallationLocation || (exports.InstallationLocation = InstallationLocation = {}));
var DeviceCommandType;
(function (DeviceCommandType) {
    DeviceCommandType["GET_LOCATION"] = "get_location";
    DeviceCommandType["SET_INTERVAL"] = "set_interval";
    DeviceCommandType["REBOOT"] = "reboot";
    DeviceCommandType["SET_SPEED_LIMIT"] = "set_speed_limit";
    DeviceCommandType["ENABLE_IMMOBILIZER"] = "enable_immobilizer";
    DeviceCommandType["DISABLE_IMMOBILIZER"] = "disable_immobilizer";
    DeviceCommandType["SET_GEOFENCE"] = "set_geofence";
    DeviceCommandType["GET_STATUS"] = "get_status";
})(DeviceCommandType || (exports.DeviceCommandType = DeviceCommandType = {}));
var CommandStatus;
(function (CommandStatus) {
    CommandStatus["PENDING"] = "pending";
    CommandStatus["SENT"] = "sent";
    CommandStatus["ACKNOWLEDGED"] = "acknowledged";
    CommandStatus["FAILED"] = "failed";
    CommandStatus["TIMEOUT"] = "timeout";
})(CommandStatus || (exports.CommandStatus = CommandStatus = {}));
