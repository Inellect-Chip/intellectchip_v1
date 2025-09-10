import { access_all_posts } from "@/utils/databaseActions/posts";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    const posts = await access_all_posts(false)
    return NextResponse.json(posts, { status: 200 });
}