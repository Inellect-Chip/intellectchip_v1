import React from 'react'

const SinglePostSkeleton = () => {
  return (
    <div className="animate-pulse space-y-6 mt-8 px-4 md:px-8 max-w-4xl mx-auto">

      {/* Image Skeleton */}
      <div className="w-full h-[250px] md:h-[400px] bg-gray-300 rounded-lg" />

      {/* Title Skeleton */}
      <div className="h-8 w-3/4 bg-gray-300 rounded" />

      {/* Short Description Skeleton */}
      <div className="space-y-2">
        <div className="h-4 w-full bg-gray-300 rounded" />
        <div className="h-4 w-5/6 bg-gray-300 rounded" />
        <div className="h-4 w-4/6 bg-gray-300 rounded" />
      </div>

      {/* Audio Player Skeleton */}
      <div className="h-10 bg-gray-300 rounded w-full" />

      {/* Content Skeleton */}
      <div className="space-y-3 mt-6">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div key={idx} className="h-4 bg-gray-300 rounded w-full" />
        ))}
        <div className="h-4 bg-gray-300 rounded w-3/4" />
        <div className="h-4 bg-gray-300 rounded w-2/4" />
      </div>
      
    </div>
  )
}

export default SinglePostSkeleton
