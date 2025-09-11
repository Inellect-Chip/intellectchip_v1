import Tag from "@/components/ui/Tag/Tag";
import { PostTagType, TagType } from "@/types/tagTypes";
import React, { useEffect, useState } from "react";

const PostCardTagSection = ({ post_id }: { post_id: number }) => {
  const [tagDetails, setTagDetails] = useState<TagType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchTagData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tags/post/${post_id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch tags");
        }

        console.log("Fetched tags:", data);
        setTagDetails(data as TagType[]);
        
      } catch (err) {
        console.error("Error loading tags:", err);
        setError(new Error(String(err)));
      } finally {
        setIsLoading(false);
      }
    };

    fetchTagData();
  }, []);



  const hasTag = tagDetails && tagDetails.length > 0
  
  return (
    <div className="flex flex-wrap ">
      {!isLoading && !error && hasTag &&
        tagDetails.slice(0, 3).map((tag: any) => {
          const bgColor = tag.tag_bg_color || "#f3f4f6";
          const textColor = tag.tag_text_color || "#374151";
          const borderColor = tag.tag_border_color || "#d1d5db";
          return (
            <span
              key={tag.id}
              style={{
                backgroundColor: bgColor,
                color: textColor,
                border: `1px solid ${borderColor}`,
              }}
              className="text-xs font-medium mr-2 px-2.5 py-0.5 rounded"
            >
              {tag.tag_name}
            </span>
          );
        })
      }
    </div>
  );
};

export default PostCardTagSection;
