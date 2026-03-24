import React from "react";
import { FaClock } from "react-icons/fa";
import Avatar from "../../Authentication/Avatar";

const GroupCard = ({ group }) => {
  return (
    <div className="w-full p-6 bg-white border border-gray-200 sm:w-80 lg:w-80 ">
      <div className="flex items-center justify-between">
        <div className="flex -space-x-3">
          {group?.members?.slice(0, 2).map((member) => (
            <Avatar
              key={member.id}
              username={member.user?.name}
              profileImage={member.user?.profileImage}
              size={32}
            />
          ))}
          
          {group?.members?.length > 2 && (
            <span className="flex items-center justify-center w-8 h-8 text-xs font-semibold bg-gray-200 rounded-full">
              +{group.members.length - 2}
            </span>
          )}
        </div>
      </div>

      <div className="space-y-1">
        <h1 className="text-lg font-semibold">{group?.name}</h1>
        <p className="text-sm text-gray-500">{group?.topic}</p>
      </div>

      <div className="p-2 bg-gray-200 rounded-lg">
        <h1 className="text-sm text-gray-500">NEXT SESSION</h1>
        <div className="flex items-center gap-2">
          <FaClock className="text-indigo-500" />
          <p className="text-sm font-semibold">Coming soon</p>
        </div>
      </div>

    </div>
  );
};

export default GroupCard;