import { API_URL, AUTH_SECRET } from '../.env';
import { Goal } from '../utils/types'; 

export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
export const AUTH_SECRET = process.env.NEXT_PUBLIC_AUTH_SECRET || 'your_secret_key_here'; 
export const DEFAULT_GOAL_TYPE = 'Weight Loss';
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
export const ERROR_CODES = {
    AUTH_ERROR: 'AUTH_ERROR',
    INVALID_INPUT: 'INVALID_INPUT',
    NOT_FOUND: 'NOT_FOUND',
};

export function validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    return emailRegex.test(email); 
}

export function validateDate(date: string): boolean {
    // Implement date validation logic here
    // For example, check if the date is in a valid format (e.g., YYYY-MM-DD)
    // or if it's within a specific range. 
}