'use client'

import PostCardSkeleton from '@/components/skeloton/PostCardSkeleton'
import React, { useEffect, useState } from 'react'
import TrendingPostSlider from '../PostCards/TrendingPostSlider'

const TrendingReadingSection = () => {

    const [trendingArticles, setTrendingArticles] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<Error | null >(null)
    
    useEffect(() => {

        const fetchTrendingArticles = async () => {
            try{
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/most-popular`, {
                    method : "POST",
                    headers : {
                        'Content-Type' : 'application/json'
                    },
                })
                const data  = await res.json()
                setTrendingArticles(data)
            }
            catch (err) {
                setError(err as Error)
            }
            finally {
                setIsLoading(false)
            }
        }
        
        fetchTrendingArticles()
    }, [])
    
    const hasPosts = trendingArticles && trendingArticles.length > 0
    
  return (
        <div className='mt-10'>

      {
        isLoading ? (
          <div className='body grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            <PostCardSkeleton />
            <PostCardSkeleton />
            <PostCardSkeleton />
          </div>
        ) : hasPosts && !error ? (
          <TrendingPostSlider posts={trendingArticles} />
        ) : (
          <p className="text-gray-500 text-center py-10">There are no valid posts yet.</p>
        )
      }
    </div>
  )
}

export default TrendingReadingSection