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
    <div className="flex gap-1">
      {
        !isLoading && !error && hasTag && (
          tagDetails.slice(0, 3).map((tagDetail, index) => (
            <Tag tag={tagDetail} key={index} />
          ))
        )
      }
    </div>
  );
};

export default PostCardTagSection;
