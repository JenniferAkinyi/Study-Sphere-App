import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { FaArrowUpLong } from "react-icons/fa6";

const data = [
  { month: "Mon", loss: 70, profit: 100 },
  { month: "Tue", loss: 55, profit: 85 },
  { month: "Wed", loss: 35, profit: 90 },
  { month: "Thur", loss: 90, profit: 70 },
  { month: "Fri", loss: 55, profit: 80 },
  { month: "Sat", loss: 30, profit: 50 },
  { month: "Sun", loss: 32, profit: 75 },
];

const WeeklyActivityChart = () => {
  const formatTooltipValue = (value) => `${value}k`;
  const formatYAxisLabel = (value) => `${value}k`;
  const formatLegendValue = (value) =>
    value.charAt(0).toUpperCase() + value.slice(1);

  return (
    <div className="relative w-full p-4 bg-white rounded-lg shadow-md md:p-6">
      <div className="mb-6">
        <h5 className="mb-3 text-lg font-bold text-gray-800">Total Revenue</h5>
        <div className="flex items-center gap-4">
          <div className="text-2xl font-bold text-gray-900">$50.4K</div>
          <div className="flex items-center gap-1 text-sm font-semibold text-green-500">
            <FaArrowUpLong />
            <p>5% than last month.</p>
          </div>
        </div>
      </div>
      <div className="w-full h-60 md:h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
          >
            <XAxis
              dataKey="month"
              padding={{ left: 10 }}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6b7280", fontSize: 14 }}
            />
            <YAxis
              padding={{ top: 10, bottom: 10 }}
              tickFormatter={formatYAxisLabel}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6b7280", fontSize: 12 }}
              tickCount={6}
            />
            <Tooltip formatter={formatTooltipValue} cursor={{ fill: "transparent" }} />
            <Legend
              iconType="circle"
              iconSize={10}
              verticalAlign="top"
              align="right"
              formatter={formatLegendValue}
            />
            <Bar
              dataKey="profit"
              fill="#475be8"
              isAnimationActive={false}
              barSize={24}
              radius={[4, 4, 4, 4]}
            />
            <Bar
              dataKey="loss"
              fill="#e3e7fc"
              isAnimationActive={false}
              barSize={24}
              radius={[4, 4, 4, 4]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WeeklyActivityChart;
