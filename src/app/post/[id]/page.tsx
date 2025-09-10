'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import LargeTitle from '@/components/ui/Titles/LargeTitle'
import { PostType } from '@/types/postType'
import SinglePostSkeleton from '@/components/skeloton/SinglePostSkeleton'
import { useParams, useRouter } from 'next/navigation'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL

const SinglePostPage = () => {
  const [post, setPost] = useState<PostType | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const { id } = useParams()
  const router = useRouter()

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/post/${id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        })

        if (!res.ok) {
          throw new Error("Something went wrong in the data fetching process.")
        }

        const postData = await res.json()

        if (!postData || !postData.post_title) {
          throw new Error("No valid post content found.")
        }

        setPost(postData)
      } catch (err) {
        console.error(err)
        setError(new Error(String(err)))
      } finally {
        setIsLoading(false)
      }
    }

    fetchPostData()
  }, [id])

  useEffect(() => {
    if (!isLoading && (error || !post)) {
      router.back()
    }
  }, [isLoading, error, post, router])

  return (
    isLoading ? (
      <SinglePostSkeleton />
    ) : post && !error ? (
      <div className="post-body mt-8 flex flex-col gap-8 pb-16">
        
        {/* Header Image */}
        {post?.post_thumbnail_link && (
          <div className="w-full h-[250px] md:h-[400px] relative">
            <Image
              src={post.post_thumbnail_link}
              alt="Post Header"
              fill
              className="object-cover object-center rounded-lg"
              priority
            />
          </div>
        )}

        <div className="px-4 md:px-8 mx-auto space-y-6">
          
          {/* Title */}
          <LargeTitle title_text={post?.post_title!} />

          {/* Short Description */}
          <p className="text-sm text-gray-600 leading-relaxed">{post?.post_short_description}</p>

          {/* Voice Player */}
          {post?.post_voice_recorde_link && (
            <div className="rounded-lg p-4 bg-gray-50 border border-gray-200">
              <p className="text-sm text-gray-500 mb-2">Listen to this article</p>
              <audio controls className="w-full">
                <source src={post?.post_voice_recorde_link} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="post font-poppins text-sm px-4 md:px-8 mx-auto">
          <div dangerouslySetInnerHTML={{ __html: post?.post_content! }} />
        </div>
      </div>
    ) : (
      <p>There is no valid post</p>
    )
  )
}

export default SinglePostPage
