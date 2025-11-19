import connectDB from "@/lib/mongoosecnt";
import { NextRequest, NextResponse } from "next/server";
import Event from "@/database/event.model";
import { resolve } from "path";
import { v2 as cloudinary } from "cloudinary";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const formData = await req.formData();

    let event;

    try {
      event = Object.fromEntries(formData.entries());
    } catch (e) {
      console.error(e);
      return NextResponse.json(
        { message: "Invalid JSON data format" },
        { status: 404 }
      );
    }
    const file = formData.get("image") as File | null;
    if (!file) {
      return NextResponse.json(
        { message: "Image file is required" },
        { status: 400 }
      );
    }
    const imageArray = await file.arrayBuffer();
    const imageBuffer = Buffer.from(imageArray);

    const imageData = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { resource_type: "image", folder: "events" },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        )
        .end(imageBuffer);
    });

    event.imageUrl = (imageData as { secure_url: string }).secure_url;

    const createdEvent = await Event.create(event);
    return NextResponse.json(
      {
        message: "Event created successfully",
        event: createdEvent,
      },
      { status: 201 }
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      {
        message: "Event Creation fail",
        error: e instanceof Error ? e.message : "Unknown",
      },
      { status: 500 }
    );
  }
}
