export declare const emailRegex: RegExp;
export declare const phoneRegex: RegExp;
export declare const licensePlateRegex: RegExp;
export declare const vinRegex: RegExp;
export declare const imeiRegex: RegExp;
export declare function validateEmail(email: string): boolean;
export declare function validatePhone(phone: string): boolean;
export declare function validateLicensePlate(plate: string): boolean;
export declare function validateVIN(vin: string): boolean;
export declare function validateIMEI(imei: string): boolean;
export declare function validateCoordinates(lat: number, lng: number): boolean;
export declare function validatePassword(password: string): {
    valid: boolean;
    errors: string[];
};
export interface ValidationResult {
    valid: boolean;
    errors: {
        [key: string]: string;
    };
}
export declare function validateUser(user: any): ValidationResult;
export declare function validateVehicle(vehicle: any): ValidationResult;
