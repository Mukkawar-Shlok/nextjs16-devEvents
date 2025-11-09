'use server';

import { Booking, Event, IEvent } from "@/database";
import connectDB from "../mongodb";
import mongoose from "mongoose";

export const getSimilarEventsBySlug = async (slug: string): Promise<IEvent[]> => {
    try {
        await connectDB();
        const event = await Event.findOne({ slug });
        if (!event) return [];
        
        const similarEvents = await Event.find({ 
            _id: { $ne: event._id }, 
            tags: { $in: event.tags } 
        }).lean() as unknown as IEvent[];
        
        return similarEvents;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const getBookingsByEventId = async (eventId: string): Promise<number> => {
    try {
        await connectDB();
        const bookings = await Booking.countDocuments({ eventId: new mongoose.Types.ObjectId(eventId) });
        return bookings;
    } catch (error) {
        console.error(error);
        return 0;
    }
}