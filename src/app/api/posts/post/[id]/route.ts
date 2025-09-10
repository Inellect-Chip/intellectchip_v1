import { access_single_post } from "@/utils/databaseActions/posts";
import { NextRequest } from "next/server";

export const POST = async (request: NextRequest, context: { params: Promise<{ id: string }> }) => {
    const {id} = await context.params;
    const post = await access_single_post(Number(id));

    return Response.json(post, { status: 200 });
}