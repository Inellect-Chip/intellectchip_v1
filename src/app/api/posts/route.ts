import { supabase } from "@/lib/supabase/supabase";
import { access_all_posts } from "@/utils/databaseActions/posts";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
    const posts = await access_all_posts();
    return NextResponse.json( posts, { status: 200 });
}
