import React from 'react'
import { useUser } from "../../../context/userContext"

const WelcomeHeader = () => {
  const { loading } =  useUser()
  const user = JSON.parse(localStorage.getItem('user'))
  
  return (
    <div className='space-y-2'>
        <h1 className='text-2xl font-bold '>
          Welcome back,{" "}
          <span className='text-indigo-500'>
            {loading ? "...": user?.name|| "Guest"}!
          </span>
        </h1>
        <p className='text-sm text-gray-500'>Here's what's happening in your study circle today</p>
    </div>
  )
}

export default WelcomeHeader