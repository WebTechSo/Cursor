"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlertPriority = exports.MaintenanceAlertType = exports.TransmissionType = exports.FuelType = exports.EngineType = exports.VehicleStatus = exports.VehicleType = void 0;
var VehicleType;
(function (VehicleType) {
    VehicleType["CAR"] = "car";
    VehicleType["TRUCK"] = "truck";
    VehicleType["VAN"] = "van";
    VehicleType["MOTORCYCLE"] = "motorcycle";
    VehicleType["BUS"] = "bus";
    VehicleType["TRAILER"] = "trailer";
    VehicleType["CONSTRUCTION"] = "construction";
    VehicleType["AGRICULTURAL"] = "agricultural";
    VehicleType["OTHER"] = "other";
})(VehicleType || (exports.VehicleType = VehicleType = {}));
var VehicleStatus;
(function (VehicleStatus) {
    VehicleStatus["ACTIVE"] = "active";
    VehicleStatus["INACTIVE"] = "inactive";
    VehicleStatus["IN_MAINTENANCE"] = "in_maintenance";
    VehicleStatus["OUT_OF_SERVICE"] = "out_of_service";
    VehicleStatus["MOVING"] = "moving";
    VehicleStatus["PARKED"] = "parked";
    VehicleStatus["IDLE"] = "idle";
})(VehicleStatus || (exports.VehicleStatus = VehicleStatus = {}));
var EngineType;
(function (EngineType) {
    EngineType["GASOLINE"] = "gasoline";
    EngineType["DIESEL"] = "diesel";
    EngineType["ELECTRIC"] = "electric";
    EngineType["HYBRID"] = "hybrid";
    EngineType["NATURAL_GAS"] = "natural_gas";
})(EngineType || (exports.EngineType = EngineType = {}));
var FuelType;
(function (FuelType) {
    FuelType["GASOLINE"] = "gasoline";
    FuelType["DIESEL"] = "diesel";
    FuelType["ELECTRIC"] = "electric";
    FuelType["HYBRID"] = "hybrid";
    FuelType["CNG"] = "cng";
    FuelType["LPG"] = "lpg";
})(FuelType || (exports.FuelType = FuelType = {}));
var TransmissionType;
(function (TransmissionType) {
    TransmissionType["MANUAL"] = "manual";
    TransmissionType["AUTOMATIC"] = "automatic";
    TransmissionType["CVT"] = "cvt";
})(TransmissionType || (exports.TransmissionType = TransmissionType = {}));
var MaintenanceAlertType;
(function (MaintenanceAlertType) {
    MaintenanceAlertType["OIL_CHANGE"] = "oil_change";
    MaintenanceAlertType["BRAKE_CHECK"] = "brake_check";
    MaintenanceAlertType["TIRE_ROTATION"] = "tire_rotation";
    MaintenanceAlertType["INSPECTION"] = "inspection";
    MaintenanceAlertType["GENERAL_SERVICE"] = "general_service";
})(MaintenanceAlertType || (exports.MaintenanceAlertType = MaintenanceAlertType = {}));
var AlertPriority;
(function (AlertPriority) {
    AlertPriority["LOW"] = "low";
    AlertPriority["MEDIUM"] = "medium";
    AlertPriority["HIGH"] = "high";
    AlertPriority["CRITICAL"] = "critical";
})(AlertPriority || (exports.AlertPriority = AlertPriority = {}));
