import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useUser } from "../../../context/userContext";
import { useNavigate } from "react-router-dom";

const ProgressCard = () => {
  const { user } = useUser();
  const navigate = useNavigate()
  const minutes = user?.dailyStudyMinutes || 0;
  const goalHours = user?.dailyGoalHours || 0;
  const completedHours = (minutes / 60).toFixed(1);
  const percentage =
    goalHours > 0 ? Math.min((completedHours / goalHours) * 100, 100) : 0;

  return (
    <div className="w-full p-6 bg-white shadow-md rounded-2xl">
      <p className="mb-4 text-lg font-semibold text-center text-gray-800">
        Today’s Progress
      </p>
      <div className="flex items-center justify-center mb-6">
        <div className="w-32 h-32">
          <CircularProgressbar
            value={percentage}
            text={`${completedHours}/${goalHours}h`}
            styles={buildStyles({
              pathColor: "#4f46e5", 
              trailColor: "#e5e7eb", 
              textColor: "#111827",
              textSize: "12px",
              pathTransitionDuration: 0.5,
            })}
          />
        </div>
      </div>
      <div className="mb-6 text-center">
        <p className="text-base text-gray-600">
          You’re{" "}
          <span className="font-semibold text-gray-900">
            {percentage.toFixed(0)}%
          </span>{" "}
          through today’s goal
        </p>
        <p className="mt-1 text-xs text-gray-400">
          Keep the momentum going
        </p>
      </div>

      <button 
        onClick={() => navigate(`/pomodoro`)}
        className="w-full py-3 text-sm font-semibold text-white transition-all duration-200 bg-indigo-600 rounded-xl hover:bg-indigo-700"
      >
        Start Focus Timer
      </button>
    </div>
  );
};

export default ProgressCard;