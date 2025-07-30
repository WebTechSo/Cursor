"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imeiRegex = exports.vinRegex = exports.licensePlateRegex = exports.phoneRegex = exports.emailRegex = void 0;
exports.validateEmail = validateEmail;
exports.validatePhone = validatePhone;
exports.validateLicensePlate = validateLicensePlate;
exports.validateVIN = validateVIN;
exports.validateIMEI = validateIMEI;
exports.validateCoordinates = validateCoordinates;
exports.validatePassword = validatePassword;
exports.validateUser = validateUser;
exports.validateVehicle = validateVehicle;
exports.emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
exports.phoneRegex = /^\+?[\d\s\-\(\)]+$/;
exports.licensePlateRegex = /^[A-Z0-9\-\s]{2,10}$/i;
exports.vinRegex = /^[A-HJ-NPR-Z0-9]{17}$/i;
exports.imeiRegex = /^\d{15}$/;
function validateEmail(email) {
    return exports.emailRegex.test(email);
}
function validatePhone(phone) {
    return exports.phoneRegex.test(phone);
}
function validateLicensePlate(plate) {
    return exports.licensePlateRegex.test(plate);
}
function validateVIN(vin) {
    return exports.vinRegex.test(vin);
}
function validateIMEI(imei) {
    return exports.imeiRegex.test(imei);
}
function validateCoordinates(lat, lng) {
    return lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
}
function validatePassword(password) {
    const errors = [];
    if (password.length < 8) {
        errors.push('Password must be at least 8 characters long');
    }
    if (!/[A-Z]/.test(password)) {
        errors.push('Password must contain at least one uppercase letter');
    }
    if (!/[a-z]/.test(password)) {
        errors.push('Password must contain at least one lowercase letter');
    }
    if (!/\d/.test(password)) {
        errors.push('Password must contain at least one number');
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        errors.push('Password must contain at least one special character');
    }
    return {
        valid: errors.length === 0,
        errors
    };
}
function validateUser(user) {
    const errors = {};
    if (!user.email || !validateEmail(user.email)) {
        errors.email = 'Valid email is required';
    }
    if (!user.firstName || user.firstName.trim().length < 2) {
        errors.firstName = 'First name must be at least 2 characters';
    }
    if (!user.lastName || user.lastName.trim().length < 2) {
        errors.lastName = 'Last name must be at least 2 characters';
    }
    if (user.phone && !validatePhone(user.phone)) {
        errors.phone = 'Invalid phone number format';
    }
    return {
        valid: Object.keys(errors).length === 0,
        errors
    };
}
function validateVehicle(vehicle) {
    const errors = {};
    if (!vehicle.licensePlate || !validateLicensePlate(vehicle.licensePlate)) {
        errors.licensePlate = 'Valid license plate is required';
    }
    if (vehicle.vin && !validateVIN(vehicle.vin)) {
        errors.vin = 'Invalid VIN format';
    }
    if (!vehicle.make || vehicle.make.trim().length < 2) {
        errors.make = 'Vehicle make is required';
    }
    if (!vehicle.model || vehicle.model.trim().length < 2) {
        errors.model = 'Vehicle model is required';
    }
    if (!vehicle.year || vehicle.year < 1900 || vehicle.year > new Date().getFullYear() + 1) {
        errors.year = 'Valid year is required';
    }
    return {
        valid: Object.keys(errors).length === 0,
        errors
    };
}
