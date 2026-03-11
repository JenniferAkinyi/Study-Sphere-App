import React from "react";
import { FaFire } from "react-icons/fa";
import { MdNavigateNext } from "react-icons/md";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useUser } from "../../../context/userContext";

const GoalCard = () => {
  const { userData, loading } = useUser();
  const completed = userData?.hoursCompleted || 0;
  const goal = userData?.dailyGoalHours || 5;
  const streak = userData?.streak || 0;
  const percentage = Math.round((completed / goal) * 100);

  return (
    <div className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg max-w-80">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12">
          <CircularProgressbar value={percentage} text={`${percentage}%`} />
        </div>
        <div className="space-y-1">
          <h1 className="font-semibold">
            Daily Study Goal <span className="text-indigo-500">4/5 hrs</span>
          </h1>
          <div className="flex items-center gap-1">
            <FaFire size={14} className="text-red-600" />
            <p className="text-xs font-semibold text-gray-500">
              {streak} Day Streak
            </p>
          </div>
        </div>
      </div>
      <div className="p-2 bg-indigo-500 rounded-lg">
        <MdNavigateNext size={24} className="text-white" />
      </div>
    </div>
  );
};

export default GoalCard;
