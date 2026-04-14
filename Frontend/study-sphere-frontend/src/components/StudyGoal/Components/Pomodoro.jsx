import React, { useEffect, useState, useRef } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useUser } from "../../../context/userContext";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";

const Pomodoro = () => {
  const navigate = useNavigate();
  const FOCUS_TIME = 25 * 60;
  const BREAK_TIME = 5 * 60;
  const [timeLeft, setTimeLeft] = useState(FOCUS_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState("focus");
  const hasLogged = useRef(false);
  const totalTime = mode === "focus" ? FOCUS_TIME : BREAK_TIME;
  const progress = ((totalTime - timeLeft) / totalTime) * 100;
  const { addStudyMinutes } = useUser();
  const handleSessionComplete = async () => {
    if (mode !== "focus") return;
    const minutesStudied = Math.floor(FOCUS_TIME / 60);
    try {
      await addStudyMinutes(minutesStudied);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          if (!hasLogged.current && mode === "focus") {
            hasLogged.current = true;
            handleSessionComplete();
          }
          if (mode === "focus") {
            setMode("break");
            return BREAK_TIME;
          } else {
            setMode("focus");
            return FOCUS_TIME;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, mode]);
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };
  const handleStart = () => {
    hasLogged.current = false;
    setIsRunning(true);
  };
  const handlePause = () => setIsRunning(false);

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(mode === "focus" ? FOCUS_TIME : BREAK_TIME);
  };

  const switchMode = (newMode) => {
    setIsRunning(false);
    if (mode !== newMode) {
      setMode(newMode);
      setTimeLeft(newMode === "focus" ? FOCUS_TIME : BREAK_TIME);
    }
  };

  return (
    <div>
      <div className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-gray-100">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-sm font-semibold text-gray-500 hover:text-black"
        >
          <IoMdArrowRoundBack /> Back
        </button>
      </div>
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="w-full max-w-md p-8 bg-white shadow-md rounded-2xl">
          <h1 className="mb-6 text-xl font-bold text-center text-gray-800">
            Pomodoro Timer
          </h1>
          <div className="flex mb-6 bg-gray-100 rounded-xl">
            <button
              onClick={() => switchMode("focus")}
              className={`flex-1 py-2 text-sm font-semibold rounded-xl ${
                mode === "focus" ? "bg-indigo-600 text-white" : "text-gray-600"
              }`}
            >
              Focus
            </button>
            <button
              onClick={() => switchMode("break")}
              className={`flex-1 py-2 text-sm font-semibold rounded-xl ${
                mode === "break" ? "bg-indigo-600 text-white" : "text-gray-600"
              }`}
            >
              Break
            </button>
          </div>
          <div className="mb-8 text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="w-32 h-32">
                <CircularProgressbar
                  value={progress}
                  text={`${formatTime(timeLeft)}`}
                  styles={buildStyles({
                    pathColor: "#4f46e5",
                    trailColor: "#e5e7eb",
                    textColor: "#111827",
                    textSize: "30px",
                    pathTransitionDuration: 0.5,
                  })}
                />
              </div>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              {mode === "focus" ? "Stay focused" : "Take a break"}
            </p>
          </div>
          <div className="flex gap-3">
            {!isRunning ? (
              <button
                onClick={handleStart}
                className="flex-1 py-3 text-sm font-semibold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700"
              >
                Start
              </button>
            ) : (
              <button
                onClick={handlePause}
                className="flex-1 py-3 text-sm font-semibold text-white bg-yellow-500 rounded-xl hover:bg-yellow-600"
              >
                Pause
              </button>
            )}

            <button
              onClick={handleReset}
              className="flex-1 py-3 text-sm font-semibold text-gray-700 bg-gray-200 rounded-xl hover:bg-gray-300"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pomodoro;
