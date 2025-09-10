'use client';

import React from 'react';

const VerticleCardSkeleton = () => {
  return (
    <div className="w-full h-full relative overflow-hidden rounded-lg bg-gray-200 animate-pulse">
      
      {/* Background Placeholder */}
      <div className="absolute inset-0 bg-gray-300" />

      {/* Gradient Overlay (same as original for consistency) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />

      {/* Bottom Content Placeholder */}
      <div className="absolute bottom-0 left-0 w-full z-20 p-6">
        <div className="h-5 bg-gray-400 rounded w-4/5 mb-3" /> {/* SmallTitle placeholder */}
        <div className="space-y-2">
          <div className="h-3 bg-gray-400 rounded w-full" />
          <div className="h-3 bg-gray-400 rounded w-11/12" />
          <div className="h-3 bg-gray-400 rounded w-9/12" />
        </div>
      </div>
      
    </div>
  );
};

export default VerticleCardSkeleton;
