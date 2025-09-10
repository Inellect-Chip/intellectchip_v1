import { post_filter } from "@/utils/databaseActions/posts";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
    const posts = await post_filter(
        "post_reading_time", false
    )

    return NextResponse.json( posts, { status: 200 });
}