import Event from "@/database/event.model";
import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

/**
 * Type-safe interface for route parameters
 */
interface RouteParams {
  params: Promise<{
    slug: string;
  }>;
}

/**
 * GET /api/events/[slug]
 * Fetches a single event by its slug
 * 
 * @param request - Next.js request object (unused but required for route signature)
 * @param context - Route context containing dynamic parameters
 * @returns JSON response with event data or error message
 */
export async function GET(
  request: NextRequest,
  context: RouteParams
): Promise<NextResponse> {
  try {
    // Await the params promise to get the actual slug value
    const { slug } = await context.params;

    // Validate slug parameter
    if (!slug) {
      return NextResponse.json(
        { message: "Slug parameter is required" },
        { status: 400 }
      );
    }

    // Validate slug format (alphanumeric, hyphens only)
    const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
    if (!slugRegex.test(slug)) {
      return NextResponse.json(
        { 
          message: "Invalid slug format. Slug must contain only lowercase letters, numbers, and hyphens" 
        },
        { status: 400 }
      );
    }

    // Connect to database
    await connectDB();

    // Query event by slug
    const event = await Event.findOne({ slug }).lean();

    // Handle event not found
    if (!event) {
      return NextResponse.json(
        { message: `Event with slug '${slug}' not found` },
        { status: 404 }
      );
    }

    // Return successful response
    return NextResponse.json(
      { 
        message: "Event fetched successfully", 
        event 
      },
      { status: 200 }
    );

  } catch (error) {
    // Log error for debugging
    console.error("Error fetching event by slug:", error);

    // Handle Mongoose CastError (invalid ObjectId format, though unlikely with slug)
    if (error instanceof Error && error.name === "CastError") {
      return NextResponse.json(
        { message: "Invalid slug format" },
        { status: 400 }
      );
    }

    // Handle unexpected errors
    return NextResponse.json(
      { 
        message: "Failed to fetch event", 
        error: error instanceof Error ? error.message : "Unknown error" 
      },
      { status: 500 }
    );
  }
}

