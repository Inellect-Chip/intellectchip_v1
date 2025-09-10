'use client'

import React, { useEffect, useState } from 'react'
import PostCard from '../PostCards/PostCard'
import LargeTitle from '@/components/ui/Titles/LargeTitle'
import { PostType } from '@/types/postType'
import PostCardSkeleton from '@/components/skeloton/PostCardSkeleton'


const SugessionReadingSection = () => {

  const [posts, setPosts] = useState<PostType[] | null>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)


  useEffect(() => {
    const recentLikedPosts = async () => {

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/post-like`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        })

        if (!res.ok) {
          throw new Error("Something went wrong in data fetching...")
        }

        const posts = await res.json()
        setPosts(posts)

      }
      catch (err) {
        console.error("Occur unusual behavior.. " + err)
        setError(new Error(String(err)))
      }
      finally {
        setIsLoading(false)
      }

    }

    recentLikedPosts()
  }, [])

  const hasPosts = posts && posts.length > 0

  return (
    <div className="body mt-16 space-y-6">
      {/* Section Title */}
      <div className="flex items-center justify-between">
        <LargeTitle title_text="Suggested for You" />
      </div>

      {/* Grid of PostCards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {
          isLoading ? (
            <>
              <PostCardSkeleton />
              <PostCardSkeleton />
              <PostCardSkeleton />
            </>
          ) : hasPosts && !error ? (

            posts.map((post, index) => (
              <PostCard key={index} post={post} />
            ))

          ) : (
            <p>There is no posts yet</p>
          )
        }
      </div>
    </div>
  )
}

export default SugessionReadingSection
