import { LocationData } from '../types/location';

export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
  unit: 'km' | 'miles' = 'km'
): number {
  const R = unit === 'km' ? 6371 : 3959; // Earth's radius in km or miles
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

export function formatDistance(distance: number, unit: 'km' | 'miles' = 'km'): string {
  if (distance < 1) {
    return `${Math.round(distance * 1000)}m`;
  }
  return `${distance.toFixed(1)} ${unit}`;
}

export function formatSpeed(speed: number, unit: 'km/h' | 'mph' = 'km/h'): string {
  return `${Math.round(speed)} ${unit}`;
}

export function formatDuration(minutes: number): string {
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

export function formatFuelConsumption(
  consumption: number,
  unit: 'l/100km' | 'mpg' = 'l/100km'
): string {
  return `${consumption.toFixed(1)} ${unit}`;
}

export function convertSpeed(speed: number, from: 'km/h' | 'mph', to: 'km/h' | 'mph'): number {
  if (from === to) return speed;
  
  if (from === 'km/h' && to === 'mph') {
    return speed * 0.621371;
  } else if (from === 'mph' && to === 'km/h') {
    return speed * 1.60934;
  }
  
  return speed;
}

export function convertDistance(distance: number, from: 'km' | 'miles', to: 'km' | 'miles'): number {
  if (from === to) return distance;
  
  if (from === 'km' && to === 'miles') {
    return distance * 0.621371;
  } else if (from === 'miles' && to === 'km') {
    return distance * 1.60934;
  }
  
  return distance;
}

export function isPointInGeofence(
  point: { latitude: number; longitude: number },
  geofence: {
    type: 'circle' | 'polygon';
    center?: { latitude: number; longitude: number };
    radius?: number;
    points?: Array<{ latitude: number; longitude: number }>;
  }
): boolean {
  if (geofence.type === 'circle' && geofence.center && geofence.radius) {
    const distance = calculateDistance(
      point.latitude,
      point.longitude,
      geofence.center.latitude,
      geofence.center.longitude,
      'km'
    );
    return distance <= geofence.radius / 1000; // Convert meters to km
  }
  
  if (geofence.type === 'polygon' && geofence.points) {
    return isPointInPolygon(point, geofence.points);
  }
  
  return false;
}

function isPointInPolygon(
  point: { latitude: number; longitude: number },
  polygon: Array<{ latitude: number; longitude: number }>
): boolean {
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

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

export function formatDateTime(date: Date, timezone?: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: timezone
  };
  
  return new Intl.DateTimeFormat('en-US', options).format(date);
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

export function sanitizeFilename(filename: string): string {
  return filename.replace(/[^a-z0-9\-_.]/gi, '_').toLowerCase();
}

export function calculateBounds(locations: LocationData[]): {
  north: number;
  south: number;
  east: number;
  west: number;
} {
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