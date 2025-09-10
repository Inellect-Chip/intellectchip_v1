'use client'

import Link from 'next/link'
import SmallTitle from '@/components/ui/Titles/SmallTitle'
import Image from 'next/image'
import { PostType } from '@/types/postType'
import PostCardTagSection from './PostCardTagSection'
import { MdAccessTime } from "react-icons/md";

const PostCard = ({post} : {
  post: PostType
}) => {

  return (
    post && (
      <Link href= {`/post/${post.id}`} className="block h-full">
        <div className="rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm hover:shadow-md transition h-full flex flex-col">
          
          {/* Top image and category badge */}
          <div className="relative flex-shrink-0">
            <Image
              src= {post.post_thumbnail_link!}
              width={400}
              height={300}
              alt="course cover"
              className="w-full h-[180px] sm:h-[200px] md:h-[220px] object-cover object-center"
            />
          </div>

          {/* Text section */}
          <div className="p-3 sm:p-4 space-y-3 flex-1 flex flex-col">
            <SmallTitle title_text= {post.post_title} />

            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed flex-1 line-clamp-3">{post.post_short_description}</p>

            {/* Tags and metadata */}
            <div className="flex flex-wrap items-center gap-2 pt-2 mt-auto">
              <div className='flex gap-1 sm:gap-2 flex-wrap'>
                <PostCardTagSection post_id={post.id} />
              </div>
              
              <div className="flex gap-1 items-center text-xs sm:text-sm text-gray-500 ml-auto flex-shrink-0">
                <MdAccessTime className="text-xl" />
                <p>{post.post_reading_time} mins</p>
              </div>

            </div>
          </div>
        </div>
      </Link>
    )
  )
}
export default PostCard
