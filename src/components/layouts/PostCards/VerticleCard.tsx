'use client';

import SmallTitle from '@/components/ui/Titles/SmallTitle';
import Title from '@/components/ui/Titles/Title';
import { PostType } from '@/types/postType';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const VerticleCard = ({post} : {
  post: PostType
}) => {
  return (
    post && (
      <Link href={`/post/${post.id}`} className="block w-full h-full">
        <div className="w-full h-full relative overflow-hidden rounded-lg cursor-pointer group">
          
          {/* Background Image */}
          <Image 
            src= {post?.post_thumbnail_link!}
            width={800}
            height={800}
            alt="post name background image"
            className="w-full h-full object-cover object-center absolute z-0"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />

          {/* Bottom Text Content */}
          <div className="absolute bottom-0 left-0 w-full z-20 p-6 text-white">
            <SmallTitle title_text={post?.post_title!} />
            <p className='line-clamp-2 text-sm text-mute-foreground'>{post?.post_short_description}</p>
          </div>

        </div>
      </Link>
    )
  );
};

export default VerticleCard;
