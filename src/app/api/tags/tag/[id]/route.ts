import { access_single_tag } from "@/utils/databaseActions/tags";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest, context: any) => {

    const {id} = await context.params;
    const tag = await access_single_tag(Number(id));

    if((!tag) || (tag === null)) {
        return NextResponse.json({ message: "Tag not found" }, { status: 404 });
    }
    
    return NextResponse.json(tag, { status: 200 });
}