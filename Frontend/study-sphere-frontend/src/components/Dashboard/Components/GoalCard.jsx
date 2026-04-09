import React from "react";
import { FaFire } from "react-icons/fa";
import { MdNavigateNext } from "react-icons/md";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useUser } from "../../../context/userContext";

const GoalCard = () => {
  const { user } = useUser();
  const completedMinutes = user?.dailyStudyMinutes || 0;
  const completedHours = completedMinutes / 60;
  const goal = user?.dailyGoalHours || 0;
  const streak = user?.currentStreak || 0;
  const percentage =
    goal > 0 ? (completedHours / goal) * 100 : 0;

  return (
    <div className="flex items-center justify-between max-w-sm p-4 bg-white border border-gray-200 shadow-sm rounded-xl">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14">
          <CircularProgressbar
            value={percentage}
            text={`${percentage.toFixed(0)}%`}
          />
        </div>
        <div className="space-y-1">
          <h1 className="text-sm font-semibold text-gray-800">
            Daily Study Goal{" "}
            <span className="text-indigo-600">
              {completedHours.toFixed(1)}/{goal}h
            </span>
          </h1>

          <div className="flex items-center gap-1">
            <FaFire size={14} className="text-red-500" />
            <p className="text-xs font-semibold text-gray-500">
              {streak} Day Streak
            </p>
          </div>
        </div>
      </div>
      <div className="p-2 transition bg-indigo-600 rounded-lg cursor-pointer hover:bg-indigo-700">
        <MdNavigateNext size={22} className="text-white" />
      </div>
    </div>
  );
};

export default GoalCard;