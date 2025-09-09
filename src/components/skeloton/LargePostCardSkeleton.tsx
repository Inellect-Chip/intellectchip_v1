'use client';

import React from 'react';

const LargePostCardSkeleton = () => {
  return (
    <div className="w-full h-full relative overflow-hidden rounded-lg bg-gray-200 animate-pulse">
      
      {/* Background Placeholder */}
      <div className="absolute inset-0 bg-gray-300" />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />

      {/* Bottom Text Skeleton */}
      <div className="absolute bottom-0 left-0 w-full z-20 p-6 text-white">
        <div className="h-6 bg-gray-400 rounded w-3/4 mb-4" /> {/* Title placeholder */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-400 rounded w-full" />
          <div className="h-4 bg-gray-400 rounded w-5/6" />
          <div className="h-4 bg-gray-400 rounded w-2/3" />
        </div>
      </div>

    </div>
  );
};

export default LargePostCardSkeleton;
