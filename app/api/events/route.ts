import Event from "@/database/event.model";
import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

export async function POST(request: NextRequest) {
    try{
        await connectDB();
        const formData = await request.formData();

        let event;

        try{
            event = Object.fromEntries(formData.entries());
        }catch(error){
            console.error(error);
            return NextResponse.json({ message: "Invalid json data format" },{ status: 400 });
        }
        const file = formData.get("image") as File;
        if(!file){
            return NextResponse.json({ message: "Image is required" },{ status: 400 });
        }

        // Validate file type
        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json({ message: "Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed" }, { status: 400 });
        }

        // Validate file size (e.g., 5MB max)
        const maxSize = 5 * 1024 * 1024;
        if (file.size > maxSize) {
            return NextResponse.json({ message: "File size exceeds 5MB limit" }, { status: 400 });
        }
        let tags, agenda;
        try {
          tags = JSON.parse(event.tags as string);
          agenda = JSON.parse(event.agenda as string);
        } catch (parseError) {
          return NextResponse.json({ message: "Invalid tags or agenda format" }, { status: 400 });
        }


        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        
        const uploadResult = await new Promise((resolve, reject)=>{
            cloudinary.uploader.upload_stream({ resource_type: 'image', folder: 'events' }, (error, result)=>{
                if(error){
                    reject(error);
                }else{
                    resolve(result);
                }
            }).end(buffer);
        });
        event.image = (uploadResult as { secure_url: string }).secure_url as string;

        const createdEvent = await Event.create({
            ...event,
            tags,
            agenda
        });

        return NextResponse.json({ message: "Event created successfully", event: createdEvent }, { status: 201 });

    }catch(error){
        console.error(error);
        return NextResponse.json({ message: "Failed to create event", error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 });
    }

}

export async function GET(){
    try{
        await connectDB();
        const events = await Event.find().limit(20).sort({ createdAt: -1 });
        return NextResponse.json({ message: "Events fetched successfully", events }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Failed to fetch events", error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 });
    }
}


