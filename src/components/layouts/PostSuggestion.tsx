"use client";

import React, { useEffect, useState } from "react";
import Title from "../ui/Titles/Title";
import PostCard from "./PostCards/PostCard";
import TrendingPostSlider from "./PostCards/TrendingPostSlider";

const PostSuggestion = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/posts`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!res.ok) {
          throw new Error(`Failed to fetch posts: ${res.statusText}`);
        }

        const data = await res.json();

        let suggestion_post = [];

        if (Array.isArray(data)) {
          if (data.length > 5) {
            suggestion_post = data
              .map((value) => ({ value, sort: Math.random() }))
              .sort((a, b) => a.sort - b.sort)
              .slice(0, 5)
              .map(({ value }) => value);
          } else {
            suggestion_post = data;
          }
        }

        if (!suggestion_post || suggestion_post.length === 0) {
          throw new Error("No posts found.");
        } else {
          setPosts(suggestion_post);
        }
      } catch (err) {
        console.error(err);
        setError(new Error(String(err)));
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, []);

  console.log("posts in suggestion", posts);

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <div>
            <TrendingPostSlider posts={posts} title="Suggested Posts" />
        </div>
      )}
    </div>
  );
};

export default PostSuggestion;
