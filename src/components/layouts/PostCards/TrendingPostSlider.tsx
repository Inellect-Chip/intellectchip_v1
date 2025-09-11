'use client'

import React, { useRef, useEffect, useState } from 'react'
import { PostType } from '@/types/postType'
import PostCard from '../PostCards/PostCard'
import LargeTitle from '@/components/ui/Titles/LargeTitle'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2'

const TrendingPostSlider = ({ posts, title }: { posts: PostType[], title: string }) => {
  const prevRef = useRef<HTMLButtonElement | null>(null)
  const nextRef = useRef<HTMLButtonElement | null>(null)
  const [isSwiperReady, setIsSwiperReady] = useState(false)

  // Mark when refs are ready
  useEffect(() => {
    if (prevRef.current && nextRef.current) {
      setIsSwiperReady(true)
    }
  }, [prevRef.current, nextRef.current])

  return (
    <div className="body mt-12 space-y-6 relative">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <LargeTitle title_text={title} />
        <div className="flex gap-2">
          <button ref={prevRef} className="slider-btn" aria-label="Previous slide">
            <HiChevronLeft />
          </button>
          <button ref={nextRef} className="slider-btn" aria-label="Next slide">
            <HiChevronRight />
          </button>
        </div>
      </div>

      {/* Only render Swiper once refs are ready */}
      {isSwiperReady && (
        <Swiper
          modules={[Navigation]}
          spaceBetween={16}
          loop={true}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1.2 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {posts.map((post) => (
            <SwiperSlide key={post.id}>
              <PostCard post={post} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  )
}

export default TrendingPostSlider
