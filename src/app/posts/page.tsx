'use client'

import PostCard from '@/components/layouts/PostCards/PostCard';
import PostCardSkeleton from '@/components/skeloton/PostCardSkeleton';
import React, { useEffect, useState } from 'react'

const page = () => {

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
                    throw new Error("Failed to fetch posts");
                }
                const data = await res.json();
                setPosts(data);

            } catch (err) {
                console.error(err);
                setError(new Error(String(err)));
            
            } finally {
                setIsLoading(false);
            }
        }

        fetchPosts();
    }, [])
    
  return (
    <div className='body-content mt-8'>
        {
            isLoading ? (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    <PostCardSkeleton />
                    <PostCardSkeleton />
                    <PostCardSkeleton />
                </div>
            ) : error ? (
                <p>Error: {error.message}</p>
            ) : (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {
                        posts.map((post) => (
                            <PostCard key={post.id} post={post} />
                        ))
                    }
                </div>
            )
        }
    </div>
  )
}

export default page