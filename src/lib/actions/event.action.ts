"use server";
import connectDB from "@/lib/mongoosecnt";
import Event from "@/database/event.model";
import { v2 as cloudinary } from "cloudinary";
import { IEvent } from "@/database/event.model";

export const getSimilarEventsBySlug = async (slug: string) => {
  try {
    await connectDB();

    const event = await Event.findOne({ slug });
    return await Event.find({
      _id: {
        $ne: event._id,
        tags: { $in: event.tags },
      },
    });
  } catch (e) {
    console.log(e);
    return [];
  }
};

export type FormState = {
  error: SubErrors;
};
export type SubErrors = IEvent;

export async function createEvents(prevState: FormState, formdata: FormData) {
  try {
    await connectDB();

    let event = Object.fromEntries(formdata.entries());

    const error: SubErrors = {};

    if (Object.keys(error).length > 0) {
      return { error };
    }

    const file = formdata.get("image") as File | null;
    if (!file) {
    }
    let tags = JSON.parse(formdata.get("tags") as string);
    let agenda = JSON.parse(formdata.get("agenda") as string);

    const imageArray = await file?.arrayBuffer();
    const imageBuffer = Buffer.from(imageArray);

    const imageData = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { resource_type: "image", folder: "events" },
          (error, results) => {
            if (error) return reject(error);
            resolve(results);
          }
        )
        .end(imageBuffer);
    });

    event.image = (imageData as { secure_url: string }).secure_url;

    const createdEvent = await Event.create({
      ...event,
      tags: tags,
      agenda: agenda,
    });
    return createdEvent;
  } catch (e) {
    console.error(e);
  }
}
