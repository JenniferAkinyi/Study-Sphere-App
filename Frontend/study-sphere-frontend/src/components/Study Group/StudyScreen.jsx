import React from "react";
import { FaPlus } from "react-icons/fa6";
import CreateGroup from "./Components/CreateGroup";

const StudyScreen = () => {
  return (
    <>
      <div className="flex items-center justify-between p-4 mx-auto max-w-7xl">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold">My Groups</h1>
          <p className="text-xs font-semibold text-gray-500">
            Collaborate, share resources and study together with your academic peers
          </p>
        </div>
        <div className="">
          <button className="flex items-center gap-1 p-2 text-sm font-semibold text-white bg-indigo-500 rounded-xl">
            <FaPlus className="text-white" />
            Create New Group
          </button>
        </div>
      </div>
      <CreateGroup />
    </>
  );
};

export default StudyScreen;
