import { access_posts_for_tag } from "@/utils/databaseActions/posts";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req:NextRequest, context : any) => {

    const { tag_slug } = await context.params;

    console.log("tag slug from route", tag_slug)
    const posts = await access_posts_for_tag(tag_slug)

    if(!posts) {
        return NextResponse.json({ message: "No posts found for this tag" }, { status: 404 });
    }

    return NextResponse.json(posts, { status: 200 });   
}