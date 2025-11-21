import Event from "@/database/event.model"; 
import connectDB from "@/lib/mongoosecnt";
import { NextRequest, NextResponse } from "next/server";

type RouteParams = {
  params: Promise<{
    slug: string;
  }>;
};

export async function GET(
  req: NextRequest,
  { params }: RouteParams
): Promise<NextResponse> {
  try {
    await connectDB();

    const { slug } = await params;

    if (!slug || typeof slug != "string" || slug.trim() === "") {
      return NextResponse.json(
        {
          message: "Invalid slug parameter",
        },
        { status: 501 }
      );
    }
    const sanitizeSlug = slug.trim().toLowerCase();

    const data = await Event.findOne({
      slug: sanitizeSlug,
    }).lean();
    if (!data) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }
    return NextResponse.json({ data }, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { message: "Error while fetching", error: e },
      { status: 500 }
    );
  }
}
