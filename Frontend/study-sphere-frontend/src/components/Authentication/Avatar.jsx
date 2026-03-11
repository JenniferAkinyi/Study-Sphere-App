import React from "react";

const Avatar = ({ username, profileImage, size = 40 }) => {
  const getInitials = (name) => {
    if (!name) return ""
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  };

  const colors = [
    "bg-indigo-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-orange-500",
  ];
  const colorIndex = username ? username.charCodeAt(0) % colors.length : 0
  const bgColor = colors[colorIndex]

  return profileImage ? (
    <img
      src={profileImage}
      alt={username}
      className="border border-gray-300 rounded-full"
      style={{ width: size, height: size }}
    />
  ) : (
    <div
      className={`flex items-center justify-center text-white font-semibold rounded-full ${bgColor}`}
      style={{ width: size, height: size }}
    >
      {getInitials(username)}
    </div>
  );
};

export default Avatar;
