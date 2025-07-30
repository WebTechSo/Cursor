"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateDistance = calculateDistance;
exports.toRadians = toRadians;
exports.formatDistance = formatDistance;
exports.formatSpeed = formatSpeed;
exports.formatDuration = formatDuration;
exports.formatFuelConsumption = formatFuelConsumption;
exports.convertSpeed = convertSpeed;
exports.convertDistance = convertDistance;
exports.isPointInGeofence = isPointInGeofence;
exports.generateId = generateId;
exports.formatDateTime = formatDateTime;
exports.debounce = debounce;
exports.throttle = throttle;
exports.sanitizeFilename = sanitizeFilename;
exports.calculateBounds = calculateBounds;
function calculateDistance(lat1, lon1, lat2, lon2, unit = 'km') {
    const R = unit === 'km' ? 6371 : 3959; // Earth's radius in km or miles
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}
function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}
function formatDistance(distance, unit = 'km') {
    if (distance < 1) {
        return `${Math.round(distance * 1000)}m`;
    }
    return `${distance.toFixed(1)} ${unit}`;
}
function formatSpeed(speed, unit = 'km/h') {
    return `${Math.round(speed)} ${unit}`;
}
function formatDuration(minutes) {
    if (minutes < 60) {
        return `${minutes}m`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (hours < 24) {
        return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
    }
    const days = Math.floor(hours / 24);
    const remainingHours = hours % 24;
    return remainingHours > 0 ? `${days}d ${remainingHours}h` : `${days}d`;
}
function formatFuelConsumption(consumption, unit = 'l/100km') {
    return `${consumption.toFixed(1)} ${unit}`;
}
function convertSpeed(speed, from, to) {
    if (from === to)
        return speed;
    if (from === 'km/h' && to === 'mph') {
        return speed * 0.621371;
    }
    else if (from === 'mph' && to === 'km/h') {
        return speed * 1.60934;
    }
    return speed;
}
function convertDistance(distance, from, to) {
    if (from === to)
        return distance;
    if (from === 'km' && to === 'miles') {
        return distance * 0.621371;
    }
    else if (from === 'miles' && to === 'km') {
        return distance * 1.60934;
    }
    return distance;
}
function isPointInGeofence(point, geofence) {
    if (geofence.type === 'circle' && geofence.center && geofence.radius) {
        const distance = calculateDistance(point.latitude, point.longitude, geofence.center.latitude, geofence.center.longitude, 'km');
        return distance <= geofence.radius / 1000; // Convert meters to km
    }
    if (geofence.type === 'polygon' && geofence.points) {
        return isPointInPolygon(point, geofence.points);
    }
    return false;
}
function isPointInPolygon(point, polygon) {
    let inside = false;
    const x = point.latitude;
    const y = point.longitude;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const xi = polygon[i].latitude;
        const yi = polygon[i].longitude;
        const xj = polygon[j].latitude;
        const yj = polygon[j].longitude;
        if (((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi)) {
            inside = !inside;
        }
    }
    return inside;
}
function generateId() {
    return Math.random().toString(36).substr(2, 9);
}
function formatDateTime(date, timezone) {
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: timezone
    };
    return new Intl.DateTimeFormat('en-US', options).format(date);
}
function debounce(func, delay) {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
}
function throttle(func, limit) {
    let inThrottle;
    return (...args) => {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}
function sanitizeFilename(filename) {
    return filename.replace(/[^a-z0-9\-_.]/gi, '_').toLowerCase();
}
function calculateBounds(locations) {
    if (locations.length === 0) {
        return { north: 0, south: 0, east: 0, west: 0 };
    }
    let north = locations[0].latitude;
    let south = locations[0].latitude;
    let east = locations[0].longitude;
    let west = locations[0].longitude;
    locations.forEach(location => {
        north = Math.max(north, location.latitude);
        south = Math.min(south, location.latitude);
        east = Math.max(east, location.longitude);
        west = Math.min(west, location.longitude);
    });
    return { north, south, east, west };
}
