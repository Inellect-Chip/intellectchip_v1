import { search_posts } from "@/utils/databaseActions/posts";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {

    const body = await request.formData();
    const query = body.get("query");
    const posts = await search_posts(query as string);

    return NextResponse.json( posts, { status: 200 });
    
}