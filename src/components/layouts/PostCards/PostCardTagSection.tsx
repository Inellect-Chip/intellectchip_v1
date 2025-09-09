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
        // Fetch tag IDs for the post
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/tags/tag/post/${post_id}`
        );
        if (!res.ok) throw new Error("Failed to fetch tag IDs");

        const tagList: PostTagType[] = await res.json();
        const tagIds = tagList.map((tag) => tag.tag_id); // Adjust key as needed

        // Fetch details for each tag ID
        const detailRequests = tagIds.map((id) =>
          fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tags/tag/${id}`).then(
            async (res) => {
              if (!res.ok) throw new Error(`Failed fetching tag ${id}`);
              return await res.json();
            }
          )
        );

        const detailResponses = await Promise.all(detailRequests);
        const flattenedDetails = detailResponses.flat(); // Handle nested arrays
        setTagDetails(flattenedDetails);
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
