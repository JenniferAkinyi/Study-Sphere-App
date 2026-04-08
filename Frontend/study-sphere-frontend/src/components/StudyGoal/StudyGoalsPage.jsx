import React from 'react'
import { MdEdit } from "react-icons/md";
import { useUser } from "../../context/userContext"
import StreakCard from './Components/StreakCard';
import StudyTimeCard from './Components/StudyTimeCard';
import GoalCompletionCard from './Components/GoalCompletionCard';
import WeeklyActivityChart from './Components/WeeklyActivityChart';
import ProgressCard from './Components/ProgressCard';

const StudyGoalsPage = () => {
    const { user, loading } = useUser()
    if(loading){
        return <div className='p-4'>Loading...</div>
    }
  return (
    <div>
        <div className='flex items-center justify-between p-4 mx-auto max-w-7xl'>
            <div className='space-y-1'>
                <h1 className='text-2xl font-bold'>Study Goals & Progress</h1>
                <p className='text-xs text-gray-500'>Target: <span className='font-bold text-indigo-500'>{user?.dailyGoalHours ?? 0} hours</span> per day</p>
            </div>
            <div className=''>
                <button className='flex items-center gap-1 p-2 text-sm font-semibold text-white bg-indigo-500 rounded-xl'>
                    <MdEdit className='text-white'/>
                    Edit Daily Goal
                </button>
            </div>
        </div>
        <div className='grid grid-cols-1 px-3 lg:grid-cols-3'>
            <StreakCard />
            <StudyTimeCard />
            <GoalCompletionCard />
        </div>
        <div className='grid grid-cols-1 px-3 lg:grid-cols-[7fr_3fr] gap-4'>
            <div className='bg-red-300'>
                <WeeklyActivityChart />
            </div>
            <div className='bg-red-300'>
                <ProgressCard />
            </div>
        </div>
        
    </div>
  )
}

export default StudyGoalsPage