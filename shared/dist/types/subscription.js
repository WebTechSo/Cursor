"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionFeature = exports.SubscriptionStatus = exports.SubscriptionPlan = void 0;
var SubscriptionPlan;
(function (SubscriptionPlan) {
    SubscriptionPlan["BASIC"] = "basic";
    SubscriptionPlan["PROFESSIONAL"] = "professional";
    SubscriptionPlan["ENTERPRISE"] = "enterprise";
    SubscriptionPlan["CUSTOM"] = "custom";
})(SubscriptionPlan || (exports.SubscriptionPlan = SubscriptionPlan = {}));
var SubscriptionStatus;
(function (SubscriptionStatus) {
    SubscriptionStatus["ACTIVE"] = "active";
    SubscriptionStatus["INACTIVE"] = "inactive";
    SubscriptionStatus["SUSPENDED"] = "suspended";
    SubscriptionStatus["CANCELLED"] = "cancelled";
    SubscriptionStatus["TRIAL"] = "trial";
})(SubscriptionStatus || (exports.SubscriptionStatus = SubscriptionStatus = {}));
var SubscriptionFeature;
(function (SubscriptionFeature) {
    SubscriptionFeature["REAL_TIME_TRACKING"] = "real_time_tracking";
    SubscriptionFeature["ROUTE_OPTIMIZATION"] = "route_optimization";
    SubscriptionFeature["GEOFENCING"] = "geofencing";
    SubscriptionFeature["REPORTS"] = "reports";
    SubscriptionFeature["MOBILE_APP"] = "mobile_app";
    SubscriptionFeature["API_ACCESS"] = "api_access";
    SubscriptionFeature["MAINTENANCE_TRACKING"] = "maintenance_tracking";
    SubscriptionFeature["FUEL_MONITORING"] = "fuel_monitoring";
    SubscriptionFeature["DRIVER_SCORING"] = "driver_scoring";
    SubscriptionFeature["CUSTOM_ALERTS"] = "custom_alerts";
})(SubscriptionFeature || (exports.SubscriptionFeature = SubscriptionFeature = {}));
