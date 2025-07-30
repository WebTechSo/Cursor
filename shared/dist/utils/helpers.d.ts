import { LocationData } from '../types/location';
export declare function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number, unit?: 'km' | 'miles'): number;
export declare function toRadians(degrees: number): number;
export declare function formatDistance(distance: number, unit?: 'km' | 'miles'): string;
export declare function formatSpeed(speed: number, unit?: 'km/h' | 'mph'): string;
export declare function formatDuration(minutes: number): string;
export declare function formatFuelConsumption(consumption: number, unit?: 'l/100km' | 'mpg'): string;
export declare function convertSpeed(speed: number, from: 'km/h' | 'mph', to: 'km/h' | 'mph'): number;
export declare function convertDistance(distance: number, from: 'km' | 'miles', to: 'km' | 'miles'): number;
export declare function isPointInGeofence(point: {
    latitude: number;
    longitude: number;
}, geofence: {
    type: 'circle' | 'polygon';
    center?: {
        latitude: number;
        longitude: number;
    };
    radius?: number;
    points?: Array<{
        latitude: number;
        longitude: number;
    }>;
}): boolean;
export declare function generateId(): string;
export declare function formatDateTime(date: Date, timezone?: string): string;
export declare function debounce<T extends (...args: any[]) => any>(func: T, delay: number): (...args: Parameters<T>) => void;
export declare function throttle<T extends (...args: any[]) => any>(func: T, limit: number): (...args: Parameters<T>) => void;
export declare function sanitizeFilename(filename: string): string;
export declare function calculateBounds(locations: LocationData[]): {
    north: number;
    south: number;
    east: number;
    west: number;
};
