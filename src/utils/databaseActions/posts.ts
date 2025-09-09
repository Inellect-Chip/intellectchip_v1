import { supabase } from "@/lib/supabase/supabase";

export const access_all_posts = async (ascending = true) => {

    try{

        let { data: post_view, error } = await supabase
            .from('posts')
            .select('*')
            .order('created_at', { ascending: ascending })

        if(error){
            console.log("Error accessing all posts:", error);
            throw error;
        }

        return post_view;
    }
    catch(error){
        console.log("Error accessing all posts:", error);
        return null;
    }   
}

export const access_single_post = async (post_id: number) => {
    try {
        let { data: post, error } = await supabase
            .from('posts')
            .select('*')
            .eq('id', post_id)
            .single();

        if (error) {
            console.log("Error accessing single post:", error);
            throw error;
        }
        
        return post;
    } catch (error) {
        console.log("Error accessing single post:", error);
        return null;
    }
}

export const post_filter = async (key: string, ascending = true) => {

    try{
        let { data: filtered_posts, error } = await supabase
            .from('posts')
            .select('*')
            .order( key, { ascending: ascending });

        if (error) {
            console.log("Error filtering posts:", error);
            return null;
        }

        return filtered_posts;
    } catch (error) {
        console.log("Error filtering posts:", error);
        return null;
    }
    
}

export const search_posts = async (query: string) => {
    try {
        let { data: searched_posts, error } = await supabase
            .from('posts')
            .select('*')
            .ilike('post_title', `%${query}%`);

        if (error) {
            console.log("Error searching posts:", error);
            return null;
        }

        return searched_posts;
    } catch (error) {
        console.log("Error searching posts:", error);
        return null;
    }
}


export const like_post = async (postId: number) => {
    try {

        const post = await access_single_post(postId);
        if (!post) {
            throw new Error("Post not found");
        }

        const updatedLikes = post.post_like_count ? post.post_like_count + 1 : 1;

        const { data, error } = await supabase
            .from('posts')
            .update({ post_like_count: updatedLikes })
            .eq('id', postId)
            .select()

        console.log("Liked post:", data, error);

        return data
    }
    catch (error) {
        console.log("Error liking post:", error);
        return null;
    }
}


export const upadte_view_count = async (postId: number) => {
    try {

        const post = await access_single_post(postId);
        if (!post) {
            throw new Error("Post not found");
        }

        const updatedLikes = post.post_reading_time ? post.post_reading_time + 1 : 1;

        const { data, error } = await supabase
            .from('posts')
            .update({ post_reading_time: updatedLikes })
            .eq('id', postId)
            .select()

        return data
    }
    catch (error) {
        console.log("Error liking post:", error);
        return null;
    }
}



