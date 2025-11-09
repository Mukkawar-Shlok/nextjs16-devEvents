import mongoose, { Schema, Document, Model, Types } from "mongoose";

/**
 * TypeScript interface for Booking document
 * Extends Mongoose Document to include _id and other Mongoose properties
 */
export interface IBooking extends Document {
  eventId: Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Booking Schema definition
 * Includes email validation and event reference verification
 */
const BookingSchema = new Schema<IBooking>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: [true, "Event ID is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
      validate: {
        validator: (v: string) => {
          // RFC 5322 compliant email validation
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailRegex.test(v);
        },
        message: "Please provide a valid email address",
      },
    },
  },
  {
    timestamps: true, // Auto-generate createdAt and updatedAt
  }
);

/**
 * Pre-save hook to verify referenced Event exists
 * Prevents orphaned bookings by validating eventId before save
 */
BookingSchema.pre("save", async function (next) {
  // Only validate eventId if it's new or modified
  if (this.isModified("eventId")) {
    try {
      // Dynamically import Event model to avoid circular dependency issues
      const Event = mongoose.models.Event || (await import("./event.model")).default;
      
      const eventExists = await Event.exists({ _id: this.eventId });
      
      if (!eventExists) {
        return next(
          new Error(`Event with ID ${this.eventId} does not exist`)
        );
      }
    } catch (error) {
      if (error instanceof Error) {
        return next(error);
      }
      return next(new Error("Failed to validate event reference"));
    }
  }

  next();
});

// Create index on eventId for efficient queries (e.g., finding all bookings for an event)
BookingSchema.index({ eventId: 1 });

// Create compound index for preventing duplicate bookings
BookingSchema.index({ eventId: 1, email: 1 });

/**
 * Booking Model
 * Uses singleton pattern to prevent model recompilation in development
 */
const Booking: Model<IBooking> =
  mongoose.models.Booking || mongoose.model<IBooking>("Booking", BookingSchema);

export default Booking;

