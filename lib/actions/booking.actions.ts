'use server';
import { Booking, IBooking } from "@/database";
import connectDB from "../mongodb";
import mongoose from "mongoose";

export const bookEvent = async ( eventId: string, eventSlug: string, email: string) => {
    try {
        await connectDB();
        await Booking.create({ eventId: new mongoose.Types.ObjectId(eventId), slug: eventSlug, email });
        return { success: true, message: "Event booked successfully" };
    } catch (error) {
        console.error(error);
        return { success: false, message: "Failed to book event" };
    }
}