import React, { useState } from "react";
import { FaRegComment, FaShare, FaHeart } from "react-icons/fa";
import Avatar from "../../Authentication/Avatar";
import { doc, updateDoc, addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../../../../backend/firebase";
import { useUser } from "../../../context/userContext";
import CommentModal from "../../Comment/CommentModal";
import useCommentCount from "../../../hooks/useCommentCount";
import { useNavigate } from "react-router-dom"

const PostCard = ({ post }) => {
  const { userData, user } = useUser();
  const [likes, setLikes] = useState(
    Array.isArray(post.likes) ? post.likes : []
  );
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const userLiked = likes.includes(userData?.uid);
  const openCommentModal = () => setIsCommentModalOpen(true);
  const closeCommentModal = () => setIsCommentModalOpen(false);
  const commentCount = useCommentCount(post.id)
  const navigate = useNavigate()

  const goToPostPage = () => {
    navigate(`/post/${post.id}`)
  }
  const handleLike = async () => {
    if (!userData?.uid)
      return console.log("userData or uid missing, cannot like post");

    let updatedLikes = userLiked
      ? likes.filter((id) => id !== userData.uid)
      : [...likes, userData.uid];

    try {
      await updateDoc(doc(db, "posts", post.id), { likes: updatedLikes });
      setLikes(updatedLikes);
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleAddComment = async (commentText) => {
    if (!user || !user.uid || !userData) {
      console.error("No user data cannot post comment");
      return;
    }

    try {
      await addDoc(collection(db, "posts", post.id, "comments"), {
        text: commentText,
        uid: user.uid,
        username: userData.username,
        profileImage: userData.profileImage || "",
        createdAt: serverTimestamp(),
        parentId: null,
      });
      closeCommentModal();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div 
        onClick={goToPostPage}
        className="w-[60%] mx-auto bg-white rounded-lg shadow-sm p-4 mb-4 border border-gray-200 mt-4"
      >
        <div className="flex items-center mb-3">
          <Avatar
            username={post?.username}
            profileImage={post?.userImage}
            size={40}
          />
          <div className="ml-3">
            <h3 className="font-semibold text-gray-800">{post?.username}</h3>
            <p className="text-sm text-gray-500">
              {post.createdAt?.seconds
                ? new Date(post.createdAt.seconds * 1000).toLocaleString()
                : "Just Now"}
            </p>
          </div>
        </div>
        <p className="mb-3 text-gray-700">{post?.content}</p>
        {post?.image && (
          <img
            src={post.image}
            alt="Post"
            className="object-cover w-full mb-3 rounded-lg max-h-96"
          />
        )}
        {post?.link && (
          <a
            href={post.link}
            target="_blank"
            className="text-indigo-600 underline"
          >
            {post.link}
          </a>
        )}

        <hr className="mt-4 mb-4 border-gray-200" />
        <div className="flex items-center justify-between mb-3 text-sm text-gray-500">
          <button 
            className="flex items-center gap-2" 
            onClick={(e) =>{
              e.stopPropagation()
              handleLike()
            }}
          >
            <FaHeart className={userLiked ? "text-red-500" : "text-gray-500"} />
            <span>{likes.length}</span>
          </button>

          <button
            className="flex items-center gap-2 hover:text-indigo-600"
            onClick={(e) => {
              e.stopPropagation()
              openCommentModal()
            }}
          >
            <FaRegComment />
            <span>{commentCount}</span>
          </button>

          <button className="flex items-center gap-2 hover:text-indigo-600">
            <FaShare />
            <span>{post?.shares || 0}</span>
          </button>
        </div>
      </div>
      {isCommentModalOpen && (
        <CommentModal
          post={post}
          userData={userData}
          onClose={closeCommentModal}
          onSubmit={handleAddComment}
        />
      )}
    </>
  );
};

export default PostCard;
