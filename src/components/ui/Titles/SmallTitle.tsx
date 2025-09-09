import React from 'react'

const SmallTitle = ({title_text} : {
    title_text: string
}) => {
  return (
    <div>
        <h3 className='font-poppins text-xl font-bold line-clamp-2 lg:text-2xl'>{title_text}</h3>
    </div>
  )
}

export default SmallTitle