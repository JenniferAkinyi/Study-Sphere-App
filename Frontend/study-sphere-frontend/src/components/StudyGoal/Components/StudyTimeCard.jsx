import React from "react";
import { useUser } from "../../../context/userContext";
import { MdOutlineAccessTimeFilled } from "react-icons/md";

const StudyTimeCard = () => {
  const { user } = useUser();
  
  return (
    <div className="p-3 bg-white border border-gray-200 shadow-sm rounded-xl lg:w-64">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-500">Minutes Studied Today</p>
        <MdOutlineAccessTimeFilled size={14} className="text-red-600" />
      </div>
      <h1 className="mt-4 text-2xl font-extrabold">
        <span>{user?.dailyStudyMinutes ?? 0} </span> Minutes
      </h1>
    </div>
  );
};

export default StudyTimeCard;
