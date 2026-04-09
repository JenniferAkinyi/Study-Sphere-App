import React, {useState, useEffect} from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { FaArrowUpLong } from "react-icons/fa6";
import { weeklyStudyData } from "../../../services/api";
import { useUser } from "../../../context/userContext";

const WeeklyActivityChart = () => {
  const [data, setData] = useState([]);
  const {user} = useUser()
  const goal = user?.dailyGoalHours * 60 || 0

  useEffect(() => {
    if (!user) return
    const fetchData = async () => {
      try {
        const res = await weeklyStudyData(user.id);
        const sessions = res.data || [];

        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

        const last7Days = Array.from({ length: 7 }).map((_, i) => {
          const date = new Date();
          date.setDate(date.getDate() - (6 - i));

          return {
            date: date.toDateString(),
            day: days[date.getDay()],
            achieved: 0,
          };
        });

        sessions.forEach((session) => {
          const sessionDate = new Date(session.date).toDateString();
          const dayData = last7Days.find((d) => d.date === sessionDate);

          if (dayData) {
            dayData.achieved += session.minutes;
          }
        });
        const formatted = last7Days.map((item) => ({
          day: item.day,
          achieved: item.achieved,
          remaining: Math.max(goal - item.achieved, 0),
        }));

        setData(formatted);
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchData();
  }, [user, goal]);
  const formatTooltipValue = (value, name) => {
    if (name === "achieved") return [`${value} min`, "Studied"];
    if (name === "remaining") return [`${value} min`, "Remaining"];
    return value;
  };

  const formatYAxisLabel = (value) => `${value}m`;

  return (
    <div className="relative w-full p-4 bg-white rounded-lg shadow-md md:p-6">
      <div className="mb-6">
        <h5 className="mb-2 text-lg font-bold text-gray-800">
          Weekly Study Activity
        </h5>

        <div className="flex items-center gap-4">
          <div className="text-2xl font-bold text-gray-900">
            {goal} min goal
          </div>

          <div className="flex items-center gap-1 text-sm font-semibold text-green-500">
            <FaArrowUpLong />
            <p>Keep it up this week</p>
          </div>
        </div>
      </div>
      <div className="w-full h-60 md:h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 5, right: 10, left: -10, bottom: 5 }}
          >
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6b7280", fontSize: 14 }}
            />
            <YAxis
              domain={[0, goal]}
              tickFormatter={formatYAxisLabel}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6b7280", fontSize: 12 }}
            />
            <Tooltip
              formatter={formatTooltipValue}
              cursor={{ fill: "transparent" }}
            />
            <Bar
              dataKey="achieved"
              stackId="a"
              fill="#4f46e5"
              barSize={22}
              radius={[6, 6, 0, 0]}
            />
            <Bar
              dataKey="remaining"
              stackId="a"
              fill="#e5e7eb"
              barSize={22}
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WeeklyActivityChart;
