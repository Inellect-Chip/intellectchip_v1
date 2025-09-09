'use client'

import React from 'react'

const PostCardSkeleton = () => {
  return (
    <div className="block h-full animate-pulse">
      <div className="rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm h-full flex flex-col">
        
        {/* Image skeleton */}
        <div className="relative flex-shrink-0 w-full h-[180px] sm:h-[200px] md:h-[220px] bg-gray-300" />

        {/* Text section skeleton */}
        <div className="p-3 sm:p-4 space-y-3 flex-1 flex flex-col">
          {/* Title placeholder */}
          <div className="h-4 bg-gray-300 rounded w-3/4" />

          {/* Description placeholder */}
          <div className="space-y-2 flex-1">
            <div className="h-3 bg-gray-300 rounded w-full" />
            <div className="h-3 bg-gray-300 rounded w-5/6" />
            <div className="h-3 bg-gray-300 rounded w-2/3" />
          </div>

          {/* Tags and metadata skeleton */}
          <div className="flex flex-wrap items-center gap-2 pt-2 mt-auto">
            <div className="flex gap-2 flex-wrap">
              <div className="h-5 w-12 bg-gray-300 rounded-full" />
              <div className="h-5 w-16 bg-gray-300 rounded-full" />
            </div>
            <div className="h-4 w-20 bg-gray-300 rounded ml-auto" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostCardSkeleton
