import React, { useState } from "react";
import Avatar from "../Authentication/Avatar";

const CommentModal = ({ post, userData, onClose, onSubmit }) => {
  const [commentText, setCommentText] = useState("");

  const handleSubmit = () => {
    if (!commentText.trim()) return;
    onSubmit(commentText);
    setCommentText("");
  };

  const handleBackdropClick = (e) => {
    if (e.target.id === "modal-backdrop") onClose();
  };

  return (
    <div
      id="modal-backdrop"
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
    >
      <div className="bg-white rounded-xl w-[90%] md:w-[500px] p-5 shadow-xl">
        <div className="pb-4 mb-4 border-b">
          <h2 className="text-lg font-semibold">{post.username}</h2>
          <p className="mt-2">{post.content}</p>
          {post.image && (
            <img src={post.image} className="mt-3 rounded-lg" alt="post" />
          )}
        </div>
        <div className="flex items-start gap-3">
          <Avatar
            username={userData?.username}
            profileImage={userData?.profileImage}
            size={40}
          />
          <textarea
            className="flex-1 p-2 border rounded-lg resize-none"
            placeholder="Leave a reply..."
            rows={3}
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
        </div>
        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 border rounded-lg hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentModal;
