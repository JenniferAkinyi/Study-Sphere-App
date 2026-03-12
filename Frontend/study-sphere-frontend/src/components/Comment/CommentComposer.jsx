import React, { useState } from "react";
import Avatar from "../Authentication/Avatar";
import { useUser } from "../../context/userContext";
import CommentModal from "./CommentModal";

const CommentComposer = ({ post, onSubmit }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const { userData } = useUser();
  const handleSubmit = async (text) =>{
    await onSubmit(text)
    setModalOpen(false)
  }
  return (
    <>
      <div
        onClick={() => setModalOpen(true)}
        className="mx-auto mt-4 w-[100%] h-20 rounded-2xl bg-white border-gray-300 border
         cursor-pointer flex items-center gap-3 px-4 transition"
      >
        <Avatar
          username={userData?.username || "Guest User"}
          profileImage={userData?.profileImage}
          size={32}
        />
        <p className="text-gray-500">Leave a comment</p>
      </div>
      {isModalOpen && (
        <CommentModal
          post={post}
          userData={userData}
          onClose={() => setModalOpen(false)}
          onSubmit={handleSubmit}
        />
      )}
    </>
  );
};

export default CommentComposer;
