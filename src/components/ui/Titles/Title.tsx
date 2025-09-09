import React from 'react'

const Title = ({title_text} : {
    title_text : string
}) => {
  return (
    <div>
        <h1 className='text-2xl md:text-3xl font-poppins font-bold'>{title_text}</h1>
    </div>
  )
}

export default Title