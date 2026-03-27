import React, { useState } from 'react'
import { IoSettings } from "react-icons/io5";
import AllFeed from './Components/AllFeed';

const Group = () => {
  const [active, setActive] = useState('All Feed')
  return (
    <div className='p-4 mt-4'>
      <div className='flex items-center justify-between'>
        <div className='flex flex-col '>
          <h1 className='text-2xl font-semibold '>Quantum Physics 101</h1>
          <div className='flex gap-4 text-xs font-medium text-gray-500'>
            <p>12 New Posts this week</p>
            <p>45 Members</p>
            <p className='text-indigo-500'>Public Group</p>
          </div>
        </div>
        <div className='cursor-pointer hover:text-indigo-500'><IoSettings/></div>
      </div>
      <div className='mt-4'>
        {['All Feed', 'Essays', 'Shared Notes', 'Announcements'].map((page) => (
          <a
            key={page}
            href={`#${page.toLowerCase()}`}
            className={`px-4 text-sm ${
              active === page
              ? 'text-black'
              : 'text-gray-500'
            }`}
            onClick={() => setActive(page)}
          >
            {page}
          </a>
        ))}
      </div>
      <AllFeed />
    </div>
  )
}

export default Group