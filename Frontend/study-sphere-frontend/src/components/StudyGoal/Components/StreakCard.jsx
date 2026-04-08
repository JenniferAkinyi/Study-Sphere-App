import React from "react";
import { FaFire } from "react-icons/fa";
import { MdOutlineTrendingDown, MdOutlineTrendingFlat, MdOutlineTrendingUp  } from "react-icons/md";
import { useUser } from "../../../context/userContext";

const StreakCard = () => {
  const { user } = useUser();
  let trend = "flat"
  if(user?.previousStreak != null){
    if(user?.currentStreak > user?.previousStreak){
      trend = 'up'
    } else if(user?.currentStreak < user?.previousStreak){
      trend = 'down'
    }
  }
  return (
    <div className="p-3 bg-white border border-gray-200 shadow-sm rounded-xl lg:w-64">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-500">Current Streak</p>
        <FaFire size={14} className="text-red-600" />
      </div>
      <h1 className="text-2xl font-extrabold">
        <span>{user?.currentStreak ?? 0} </span>Days
      </h1>
      <div className="flex items-center gap-2 mt-2">
        {trend === 'up' &&(
          <>
            <MdOutlineTrendingUp className="text-green-500"/>
            <span className="text-sm font-medium text-green-500">Streak Increase</span>
          </>
        )}
        {trend === 'down' &&( 
          <>
            <MdOutlineTrendingDown className="text-red-500"/>
            <span className="text-sm font-medium text-red-500">Streak Decrease</span>
          </>
        )}
        {trend === 'flat' &&(
          <>
            <MdOutlineTrendingFlat className="text-indigo-500"/>
            <span className="text-sm font-medium text-indigo-500">No streak change</span>
          </>
        )}
      </div>
    </div>
  );
};

export default StreakCard;
