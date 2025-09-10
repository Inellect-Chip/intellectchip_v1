"use client"

import PostCard from '@/components/layouts/PostCards/PostCard'
import PostCardSkeleton from '@/components/skeloton/PostCardSkeleton'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const page = () => {

    const {tag_slug} = useParams()
    
    // fetch post data
    const [posts, setPosts] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {

        const fetchPostDetails = async() => {
            try{
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/tag/${tag_slug}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                })

                if (!res.ok){
                    throw new Error("Something went wrong in data access process..")
                }

                const posts = await res.json()
                setPosts(posts)
            }
            catch(err) {
                console.log(err)
                setError(new Error(String(err)))
            }
            finally{
                setIsLoading(false)
            }
        }

        fetchPostDetails()
        
    }, [])

    const hasPost = posts && posts.length > 0
    
  return (
    <div className='body-content mt-10'>
        <div className='grid grid-cols-1 grid-rows-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {
                isLoading ? (
                    <>
                        <PostCardSkeleton />
                        <PostCardSkeleton />
                        <PostCardSkeleton />
                        <PostCardSkeleton />
                        <PostCardSkeleton />
                        <PostCardSkeleton />
                    </>
                ): hasPost && !error ? (
                    posts.map((post, index) => (
                        <PostCard key={index} post={post} />
                    ))
                ) : (
                    <p>There is no valid posts</p>
                )
            }
        </div>
    </div>
  )
}

export default page