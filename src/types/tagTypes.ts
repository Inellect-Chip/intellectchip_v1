
export interface TagType{
    id: number,
    created_at: string,
    tag_name: string,
    tag_slug: string,
    tag_border_color: string,
    tag_bg_color: string,
    tag_text_color: string
}


export interface PostTagType{
    id:number,
    created_at : string,
    tag_id : number,
    post_id : number
}