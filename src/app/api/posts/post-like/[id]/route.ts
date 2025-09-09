import { like_post } from "@/utils/databaseActions/posts";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest, context:any) => {

    const {id} = await context.params;
    const post = await like_post(id)
    
    return NextResponse.json( post , { status: 200 });
}