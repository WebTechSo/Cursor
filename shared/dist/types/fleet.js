"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeofenceAlertType = exports.GeofenceType = void 0;
var GeofenceType;
(function (GeofenceType) {
    GeofenceType["CIRCLE"] = "circle";
    GeofenceType["POLYGON"] = "polygon";
    GeofenceType["RECTANGLE"] = "rectangle";
})(GeofenceType || (exports.GeofenceType = GeofenceType = {}));
var GeofenceAlertType;
(function (GeofenceAlertType) {
    GeofenceAlertType["ENTRY"] = "entry";
    GeofenceAlertType["EXIT"] = "exit";
    GeofenceAlertType["BOTH"] = "both";
})(GeofenceAlertType || (exports.GeofenceAlertType = GeofenceAlertType = {}));
