import { access_all_tags } from "@/utils/databaseActions/tags";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
    
    const tags = await access_all_tags()

    if(!tags) return NextResponse.json({message : "Error fetching tags"}, {status : 500});

    return NextResponse.json(tags, {status : 200});
}