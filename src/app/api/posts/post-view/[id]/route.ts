import { upadte_view_count } from "@/utils/databaseActions/posts";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, content : any) => {

    const {id} = await content.params;
    const posts = await upadte_view_count(id);

    return NextResponse.json(posts, { status: 200 });
}