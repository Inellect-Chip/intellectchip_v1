import { access_tags_for_post } from "@/utils/databaseActions/tags";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest, context: { params: Promise<{ id: string }> }) => {

    const {id} = await context.params;
    const post_tag = await access_tags_for_post(Number(id));

    if((!post_tag) || (post_tag === null)) {
        return NextResponse.json("No tags found for this post", { status: 404 });
    }
    
    return NextResponse.json(post_tag, { status: 200 });
}