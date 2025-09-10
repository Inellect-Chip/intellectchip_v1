"use client";

import LargePostCardSkeleton from "@/components/skeloton/LargePostCardSkeleton";
import VerticleCardSkeleton from "@/components/skeloton/VerticleCardSkeleton";
import React, { useEffect, useState } from "react";
import LargePostCard from "../PostCards/LargePostCard";
import VerticleCard from "../PostCards/VerticleCard";

const HeroSection = () => {
  const [posts, setPost] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/posts/recent-posts`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await res.json();

        setPost(data);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const hasPosts = posts && posts.length > 0;

  return (
    <div>
      <div className="body mt-10 h-screen md:h-[calc(100vh-200px)] flex flex-col gap-4 lg:flex-row">
        {isLoading ? (
          <>
            {/* Show skeletons during loading */}
            <div className="w-full lg:w-1/2 h-full">
              <LargePostCardSkeleton />
            </div>
            <div className="w-full lg:w-1/2 h-full flex flex-col gap-4">
              <VerticleCardSkeleton />
              <VerticleCardSkeleton />
            </div>
          </>
        ) : hasPosts && !error ? (
          <>
            {/* Show cards when posts are available */}
            <div className="w-full lg:w-1/2 h-full">
              <LargePostCard post={posts[0]} />
            </div>
            <div className="w-full lg:w-1/2 h-full flex flex-col gap-4">
              {posts[1] && <VerticleCard post={posts[1]} />}
              {posts[2] && <VerticleCard post={posts[2]} />}
            </div>
          </>
        ) : (
          // Empty state
          <div className="w-full text-center text-gray-600 text-xl mt-10">
            There are no posts yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroSection;
