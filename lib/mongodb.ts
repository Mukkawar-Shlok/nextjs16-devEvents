import mongoose from "mongoose";

/**
 * Global type declaration for caching the MongoDB connection
 * This is necessary to prevent TypeScript errors when accessing global properties
 */
declare global {
  // eslint-disable-next-line no-var
  var mongoose: {
    conn: mongoose.Connection | null;
    promise: Promise<mongoose.Connection> | null;
  };
}

/**
 * MongoDB connection URI from environment variables
 * Ensure MONGODB_URI is set in your .env.local file
 */
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

/**
 * Global cache object to store the connection
 * In development, Next.js hot-reloads can cause multiple connections
 * This cache prevents creating new connections on every hot-reload
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

/**
 * Establishes and returns a cached MongoDB connection using Mongoose
 * 
 * Connection caching strategy:
 * - In development: Prevents multiple connections due to hot-reloading
 * - In production: Reuses existing connections for better performance
 * 
 * @returns {Promise<mongoose.Connection>} The active MongoDB connection
 */
async function connectDB(): Promise<mongoose.Connection> {
  // Return existing connection if available
  if (cached.conn) {
    return cached.conn;
  }

  // Return existing promise if connection is in progress
  if (!cached.promise) {
    const opts = {
      bufferCommands: false, // Disable Mongoose buffering to fail fast if connection fails
    };

    /**
     * Create a new connection promise
     * mongoose.connect returns a Mongoose instance, we extract the connection object
     * Type assertion is safe here because we've already checked MONGODB_URI exists above
     */
    cached.promise = mongoose.connect(MONGODB_URI as string, opts).then((mongoose) => {
      return mongoose.connection;
    });
  }

  try {
    // Await the connection promise and cache the result
    cached.conn = await cached.promise;
  } catch (error) {
    // Reset promise on error to allow retry on next call
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}

export default connectDB;

