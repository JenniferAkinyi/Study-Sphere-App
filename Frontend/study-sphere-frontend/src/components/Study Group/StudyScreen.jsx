import React, { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import CreateGroup from "./Components/CreateGroup";

const StudyScreen = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between p-4 mx-auto max-w-7xl">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold">My Groups</h1>
          <p className="text-xs font-semibold text-gray-500">
            Collaborate, share resources and study together with your academic peers
          </p>
        </div>

        <button
          onClick={() => setOpenModal(true)}
          className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-indigo-500 rounded-xl hover:bg-indigo-600"
        >
          <FaPlus />
          Create New Group
        </button>
      </div>

      {openModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
          onClick={() => setOpenModal(false)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <CreateGroup closeModal={() => setOpenModal(false)} />
          </div>
        </div>
      )}
    </>
  );
};

export default StudyScreen;