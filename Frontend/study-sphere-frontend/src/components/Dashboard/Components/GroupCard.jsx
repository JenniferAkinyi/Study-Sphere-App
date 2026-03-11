import React from "react";
import { FaClock } from "react-icons/fa";
import Avatar from "../../Authentication/Avatar";
import { useUser } from "../../../context/userContext";

const GroupCard = ({ Icon, name, category, institution, nextSession, isOngoing, sessionStatus }) => {
  const { userData } = useUser();
  return (
    <div className="flex">
      <div className="w-full p-6 bg-white border border-gray-200 sm:w-80 lg:w-80">
        <div className="flex items-center justify-between">
          <Icon size={24} className="p-1 bg-indigo-300 rounded-full" />
          <div className="flex -space-x-3">
            <Avatar
              username={userData?.username || "Guest User"}
              profileImage={userData?.profileImage}
              size={32}
            />
            <Avatar
              username={userData?.username || "Guest User"}
              profileImage={userData?.profileImage}
              size={32}
            />
            <span className="flex items-center justify-center w-8 h-8 text-xs font-semibold bg-gray-200 rounded-full">+12</span>
          </div>
        </div>
        <div className="space-y-1">
          <h1 className="text-lg font-semibold">{name}</h1>
          <p className="text-sm text-gray-500">
            {category}
            <span className="items-center">.</span>
            {institution}
          </p>
        </div>
        <div className="p-2 bg-gray-200 rounded-lg">
          {isOngoing ? (
            <button className="px-3 py-1 text-white bg-indigo-500 rounded-lg">Join Session</button>
          ) : (
          <div>
            <h1 className="text-sm text-gray-500">NEXT SESSION</h1>
            <div className="flex items-center gap-2">
              <FaClock className="text-indigo-500" />
              <p className="text-sm font-semibold">{nextSession}</p>
            </div>
          </div>  
          )}
        </div>
      </div>
    </div>
  );
};

export default GroupCard;
