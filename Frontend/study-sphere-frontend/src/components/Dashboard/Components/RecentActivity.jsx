import React from "react";
import Avatar from "../../Authentication/Avatar";
import { useUser } from "../../../context/userContext";
import { FaFileAlt } from "react-icons/fa";

/* =========================
   Activity Item Component
========================= */
const ActivityItem = ({ activity }) => {
  return (
    <div className="flex gap-3 px-2 py-3 transition hover:bg-gray-50 rounded-xl">
      <div>
        {activity.type === "upload" ? (
          <FaFileAlt className="text-indigo-500" size={28} />
        ) : (
          <Avatar
            username={activity.user}
            profileImage={activity.profileImage}
            size={32}
          />
        )}
      </div>

      <div className="flex-1">
        <p className="text-sm">
          <span className="font-medium">{activity.user}</span>{" "}
          {activity.type === "post" && "posted in"}
          {activity.type === "upload" && "uploaded notes on"}{" "}
          <span className="font-medium text-indigo-500">
            {activity.group}
          </span>
        </p>

        <p className="mt-1 text-sm text-gray-500">
          {activity.content}
        </p>

        <p className="mt-1 text-xs text-gray-400">
          {activity.time}
        </p>
      </div>
    </div>
  );
};

/* =========================
   Recent Activity Component
========================= */
const RecentActivity = () => {
  const { user } = useUser();

  // 🔹 Temporary static data (replace with API later)
  const activities = [
    {
      id: 1,
      type: "post",
      user: user?.name || "Guest",
      profileImage: user?.profileImage || null,
      group: "Python Programming",
      content:
        "Hello guys I have posted an essay on Introduction to Python group. I hope you enjoy reading it!",
      time: "11 minutes ago",
    },
    {
      id: 2,
      type: "upload",
      user: user?.name || "Guest",
      profileImage: user?.profileImage || null,
      group: "Python Programming",
      content: "Hello guys, new lecturer's notes!",
      time: "11 minutes ago",
    },
  ];

  return (
    <div>
      {/* Title */}
      <p className="mb-3 text-lg font-semibold">Recent activity</p>

      {/* Activity Feed */}
      <div className="w-full max-w-2xl p-4 bg-white shadow-md rounded-2xl">
        {activities.length === 0 ? (
          <p className="text-sm text-gray-500">
            No recent activity yet.
          </p>
        ) : (
          activities.map((activity) => (
            <ActivityItem key={activity.id} activity={activity} />
          ))
        )}
      </div>
    </div>
  );
};

export default RecentActivity;