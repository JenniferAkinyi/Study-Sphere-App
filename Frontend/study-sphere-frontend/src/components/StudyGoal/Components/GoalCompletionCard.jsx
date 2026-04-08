import React from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import ProgressBar from "@ramonak/react-progress-bar";
import { useUser } from "../../../context/userContext";

const GoalCompletionCard = () => {
  const { user} = useUser();
  const completed = user?.dailyGoalHours
    ? (user?.dailyStudyMinutes / 60 / user?.dailyGoalHours) * 100
    : 0;
  const completedRounded = Math.min(100, completed.toFixed(1));
  return (
    <div className="p-3 bg-white border border-gray-200 shadow-sm rounded-xl lg:w-64">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-500">Goal Completion</p>
        <IoMdCheckmarkCircleOutline size={14} className="text-red-600" />
      </div>
      <h1 className="mt-1 mb-1 text-2xl font-extrabold">
        <span>{completedRounded}</span>%
      </h1>
      <ProgressBar
        completed={completedRounded}
        height="10px"
        bgColor="#615FFF" 
        baseBgColor="#e5e7eb"
        isLabelVisible={false}
      />
    </div>
  );
};

export default GoalCompletionCard;
