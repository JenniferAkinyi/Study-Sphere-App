import React from 'react'
import { FaPlus } from 'react-icons/fa'

const UpcomingSessions = () => {
  return (
    <div>
      <div className='flex justify-between'>
        <h1>Upcoming Sessions</h1>
        <FaPlus 
          className='text-indigo-500'
        />
      </div>
    </div>
  )
}

export default UpcomingSessions