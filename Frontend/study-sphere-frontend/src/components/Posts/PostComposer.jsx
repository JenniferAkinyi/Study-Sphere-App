import React, { useState } from "react";
import Avatar from "../Authentication/Avatar";
import PostModal from "./PostModal";
import { useUser } from "../../context/userContext"

const PostComposer = () => {
  const [isModalOpen, setModalOpen] = useState(false)
  const { userData } = useUser()
  return (
    <>
      <div
        onClick={() => setModalOpen(true)}
        className="mx-auto mt-4 w-[50%] h-20 rounded-2xl bg-white border-gray-300 border
         cursor-pointer flex items-center gap-3 px-4 transition"
      >
        <Avatar
          username={userData?.username || "Guest User"}
          profileImage={userData?.profileImage}
          size={32}
        />
        <p className="text-gray-500">Share your thoughts</p>
      </div>
      {isModalOpen && <PostModal onClose={() => setModalOpen(false)} />}
    </>
  );
};

export default PostComposer;
