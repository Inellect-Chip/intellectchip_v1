export interface PostType {
  id: number;
  created_at: string; // ISO 8601 date string
  post_title: string;
  post_content: string; // HTML content
  post_short_description: string;
  post_thumbnail_link: string | null;
  post_voice_recorde_link?: string | null; // Note: "recorde" appears to be a typo in the original
  post_youtube_video_link?: string | null;
  post_like_count?: number;
  post_dislike_count?: number;
  post_comment_count?: number;
  view_count?: number;
  post_reading_time?: number
}