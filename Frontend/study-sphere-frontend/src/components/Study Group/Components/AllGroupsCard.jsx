import React from "react";
import Avatar from "../../Authentication/Avatar";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AllGroupsCard = ({ group }) => {
  const navigate = useNavigate()
  return (
    <div className="w-full p-5 bg-white border border-gray-200 sm:w-60 lg:w-60 rounded-xl">
      <div className="space-y-1">
        <h1 className="text-base font-semibold text-gray-700">{group?.name}</h1>
        <p className="text-sm text-gray-500">{group?.description}</p>
      </div>
      <div className="flex items-center justify-between mt-4">
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
        <p 
          onClick={() => navigate(`/groups/${group.id}`)}
          className="flex items-center gap-1 text-sm text-indigo-500 cursor-pointer"
        >
          View Group <FaArrowRight/>
        </p>
      </div>
      <div></div>
    </div>
  );
};

export default AllGroupsCard;
