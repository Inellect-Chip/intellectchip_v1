import { access_single_post } from "@/utils/databaseActions/posts";
import { NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
    // Get id from request body or query params since this is not a dynamic route
    const body = await request.json();
    const id = body.id;
    
    if (!id) {
        return Response.json({ error: "ID is required" }, { status: 400 });
    }
    
    const post = await access_single_post(Number(id));

    return Response.json(post, { status: 200 });
}