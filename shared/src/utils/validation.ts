export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const phoneRegex = /^\+?[\d\s\-\(\)]+$/;
export const licensePlateRegex = /^[A-Z0-9\-\s]{2,10}$/i;
export const vinRegex = /^[A-HJ-NPR-Z0-9]{17}$/i;
export const imeiRegex = /^\d{15}$/;

export function validateEmail(email: string): boolean {
  return emailRegex.test(email);
}

export function validatePhone(phone: string): boolean {
  return phoneRegex.test(phone);
}

export function validateLicensePlate(plate: string): boolean {
  return licensePlateRegex.test(plate);
}

export function validateVIN(vin: string): boolean {
  return vinRegex.test(vin);
}

export function validateIMEI(imei: string): boolean {
  return imeiRegex.test(imei);
}

export function validateCoordinates(lat: number, lng: number): boolean {
  return lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
}

export function validatePassword(password: string): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  
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

export interface ValidationResult {
  valid: boolean;
  errors: { [key: string]: string };
}

export function validateUser(user: any): ValidationResult {
  const errors: { [key: string]: string } = {};
  
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

export function validateVehicle(vehicle: any): ValidationResult {
  const errors: { [key: string]: string } = {};
  
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