import React from 'react'
import { FaSpinner } from 'react-icons/fa6'

const Loading = () => {
  return (
    <div className='p-4 bg-blue rounded'>
      <FaSpinner className='text-white text-2xl animate-spin z-50'  />
    </div>
  )
}

export default Loading
