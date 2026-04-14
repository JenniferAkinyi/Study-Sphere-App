import React from 'react'
import { FaPlus } from 'react-icons/fa'

const UpcomingSessions = () => {
  return (
    <div>
      <div className='flex justify-between'>
        <p className='text-lg font-semibold'>Upcoming Sessions</p>
        <FaPlus 
          className='text-indigo-500'
        />
      </div>
      <div>
        <div className='flex items-center w-full gap-2 p-2 mt-2 bg-white rounded-lg shadow-sm'>
          <div className='flex flex-col items-center p-2 bg-gray-200 rounded-lg h-14'> 
            <p className='text-sm font-light text-gray-500'>Sept</p>
            <p className='text-lg font-extrabold'>24</p>
          </div>
          <div>          
            <p className='font-medium'>Linear Algebra Review</p>
            <p className='text-sm text-gray-500'>Study- 4:00 PM - 5:00 PM</p>
            <p className='text-xs text-gray-500'>Study Session</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpcomingSessions