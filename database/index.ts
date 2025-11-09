/**
 * Database Models - Central Export
 * 
 * Exports all Mongoose models for use throughout the application
 * Import from here to ensure consistent model usage: import { Event, Booking } from '@/database'
 */

export { default as Event } from "./event.model";
export { default as Booking } from "./booking.model";

// Export TypeScript interfaces for type safety
export type { IEvent } from "./event.model";
export type { IBooking } from "./booking.model";

