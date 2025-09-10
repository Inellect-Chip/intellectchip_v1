import { most_liked_posts, post_filter } from "@/utils/databaseActions/posts";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {

    const posts = await most_liked_posts();

    if (!posts) {
        return NextResponse.json({ message: "No posts found" }, { status: 404 });
    }

    return NextResponse.json(posts, { status: 200 });
}