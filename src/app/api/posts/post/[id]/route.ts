import { access_single_post } from "@/utils/databaseActions/posts";
import { NextApiRequest } from "next";

export const POST = async (request: NextApiRequest, context : any) => {
    const {id} = await context.params;
    const post = await access_single_post(Number(id));

    return Response.json(post, { status: 200 });
}