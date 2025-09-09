import { TagType } from '@/types/tagTypes'
import React from 'react'

const Tag = ({tag} : {
  tag: TagType
}) => {
  return (
    <div className='font-poppins text-[12px] px-1.5 bg-red-200 text-red-800 border-[1px] border-red-600 rounded-lg'>
        {tag.tag_name}
    </div>
  )
}

export default Tag