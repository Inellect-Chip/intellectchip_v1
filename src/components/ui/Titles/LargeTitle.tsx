import React from 'react'

const LargeTitle = ({title_text} : {
    title_text : string
}) => {
  return (
    <div>
        <h1 className='font-poppins text-2xl md:text-4xl font-bold'>{title_text}</h1>
    </div>
  )
}

export default LargeTitle