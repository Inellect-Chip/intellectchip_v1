import { supabase } from "@/lib/supabase/supabase"

export const access_all_tags = async() => {

    try{
        let { data: tags, error } = await supabase
            .from('tags')
            .select('*')
        
        if(error) throw error

        console.log("Tags fetched:", tags)
        return tags
    }
    catch(error){
        console.error("Error fetching tags:", error)
        return null
    }
    
}


export const access_single_tag = async(tag_id : number) => {
    try{
        let { data: tag, error } = await supabase
            .from('tags')
            .select('*')
            .eq('id', tag_id)
            .single()

        if(error) throw error

        return tag
    }
   catch(error){
       console.error("Error fetching tag:", error)
       return null
   }
}


export const access_tags_for_post = async(post_id : number) => {

    try{
        let { data: post_tag, error } = await supabase
            .from('post_tag')
            .select('*')
            .eq('post_id', post_id)
        
        if(error) throw error

        let post_tags: any[] = []

        if(!post_tag || post_tag.length === 0) {
            return post_tags
        }

        for (const pt of post_tag) {
            const tag = await access_single_tag(pt.tag_id)
            if (tag) {
                post_tags.push(tag)
            }
        }
        console.log("Tags for post fetched:", post_tags)
        
        return post_tags
    }
    catch(error){
        console.error("Error fetching tags for post:", error)
        return null
    }

}