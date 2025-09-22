'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import LargeTitle from '@/components/ui/Titles/LargeTitle'
import { PostType } from '@/types/postType'
import SinglePostSkeleton from '@/components/skeloton/SinglePostSkeleton'
import { useParams, useRouter } from 'next/navigation'
// import { auth } from "@clerk/nextjs/server";
import { useUser} from "@clerk/nextjs";
import PostSuggestion from '@/components/layouts/PostSuggestion'
import { Heart } from 'lucide-react';


const SinglePostPage = () => {
  const [post, setPost] = useState<PostType | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [user, setUser] = useState<string | null>(null);
  const [tags, setTags] = useState([]);
  
  const { id } = useParams()
  const router = useRouter()

  const handleLike = async () => {
    try {
      const res = await fetch(`/api/posts/post-like/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Error liking post:", error);
    }
  }

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const res = await fetch(`/api/posts/post/${id}`, {
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

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await fetch(`/api/tags/post/${id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        })

        if (!res.ok) {
          throw new Error("Something went wrong in the data fetching process.")
        }

        const data = await res.json()
        setTags(data || [])
      } catch (err) {
        console.error(err)
      }
    }

    fetchTags()
    
  }, [])

  const { user: currentUser } = useUser();
  
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

        <div className="px-4 md:px-8 mx-auto space-y-8">
          
          {/* head section */}
          <div>
            {/* Title */}
            <LargeTitle title_text={post?.post_title!} />

            <div className='flex justify-between items-center mt-4'>

              {/* Tags */}
              {
              tags && tags.length > 0 && (
                <div className="flex flex-wrap mt-3">
                {tags.map((tag: any, index) => {
                  const bgColor = tag.tag_bg_color || "#f3f4f6";
                  const textColor = tag.tag_text_color || "#374151";
                  const borderColor = tag.tag_border_color || "#d1d5db";


                  return (
                  <span
                    key={index}
                    className="text-xs font-medium mr-2 px-2.5 py-1 rounded-xl  border text-blue-900 border-blue-300 bg-blue-50"
                  >
                    {tag.tag_name}
                  </span>
                  );
                })}
                </div>
              )
              }

              {/* upvote section */}
              <div>
                <button
                  className="flex items-center gap-2 px-3 py-1 rounded-full cursor-pointer"
                  onClick={() => {
                    // handle upvote logic here
                  }}
                  aria-label="Upvote"
                >
                  <div className='text-foreground text-sm flex items-center gap-5'>
                    <p>{post?.post_reading_time} mins reading</p>

                    <div className='text-pink-900 p-2 bg-pink-50 rounded-full border border-pink-200 hover:bg-pink-600 hover:text-white transition-colors duration-300'>
                      <Heart className='h-5 w-5' />
                    </div>
                  </div>
                  {/* <span className="font-semibold text-blue-900">{post?.post_like_count}</span> */}
                </button>
              </div>
              
            </div>
          </div>

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
        
        {/* conntent suggesion */}
        <PostSuggestion />
        
      </div>
    ) : (
      <p>There is no valid post</p>
    )
  )
}

export default SinglePostPage
