import React from 'react'

const SmallerTitle = ({title_text}: {
    title_text:string
}) => {
  return (
    <div>
        <h4 className='text-xl font-poppins font-semibold'>{title_text}</h4>
    </div>
  )
}

export default SmallerTitle