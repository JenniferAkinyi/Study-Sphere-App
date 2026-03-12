import React, { useEffect, useState } from "react";
import Avatar from "../Authentication/Avatar";
import CommentModal from "../Comment/CommentModal";
import { useUser } from "../../context/userContext";
// import useCommentCount from "../../hooks/useCommentCount";
// import useComments from "../../hooks/useComments";
import { FaRegComment, FaShare, FaHeart } from "react-icons/fa";
import CommentComposer from "../Comment/CommentComposer";

const PostView = ({ postId }) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { userData, user } = useUser();
  const [likes, setLikes] = useState([]);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const userLiked = likes.includes(userData?.uid);
  const commentCount = useCommentCount(postId);
  const openCommentModal = () => setIsCommentModalOpen(true);
  const closeCommentModal = () => setIsCommentModalOpen(false);
  const formatNumber = (num) => new Intl.NumberFormat().format(num || 0);
  useEffect(() => {
    const ref = doc(db, "posts", postId);

    const unsubscribe = onSnapshot(ref, (snap) => {
      if (snap.exists()) {
        const data = snap.data();

        setPost({ id: snap.id, ...data });
        setLikes(Array.isArray(data.likes) ? data.likes : []);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [postId]);

  if (loading) return <p>Loading post...</p>;
  if (!post) return <p>Post not found</p>;

  const handleLike = async () => {
    if (!userData?.uid) return;

    let updatedLikes = userLiked
      ? likes.filter((id) => id !== userData.uid)
      : [...likes, userData.uid];

    await updateDoc(doc(db, "posts", post.id), {
      likes: updatedLikes,
    });
    setLikes(updatedLikes);
  };
  const handleAddComment = async (text, parentId = null) => {
    if (!user || !user.uid || !userData) return;

    try {
      await addDoc(collection(db, "posts", post.id, "comments"), {
        text,
        uid: user.uid,
        username: userData.username,
        profileImage: userData.profileImage || "",
        createdAt: serverTimestamp(),
        parentId: parentId || null,
        likes: []
      });

      closeCommentModal();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="flex items-center mb-3">
        <Avatar
          username={post?.username}
          profileImage={post?.userImage}
          size={40}
        />
        <div className="ml-3">
          <h3 className="font-semibold">{post?.username}</h3>

          <p className="text-sm text-gray-500">
            {post.createdAt?.seconds
              ? new Date(post.createdAt.seconds * 1000).toLocaleString()
              : "Just now"}
          </p>
        </div>
      </div>

      <p className="mb-3">{post?.content}</p>
      <div className="flex items-center gap-4 mb-3">
        <button onClick={handleLike} className="flex items-center gap-2">
          <FaHeart className={userLiked ? "text-red-500" : "text-gray-500"} />
          {likes.length}
        </button>

        <button onClick={openCommentModal} className="flex items-center gap-2">
          <FaRegComment />
          {commentCount}
        </button>

        <button className="flex items-center gap-2">
          <FaShare />
          {post?.shares || 0}
        </button>
      </div>
      {isCommentModalOpen && (
        <CommentModal
          post={post}
          userData={userData}
          onClose={closeCommentModal}
          onSubmit={handleAddComment}
        />
      )}
      <div className="text-sm text-gray-600">
        {formatNumber(likes.length)} likes • {formatNumber(commentCount)}{" "}
        comments • {formatNumber(post.shares)} shares
      </div>
      <CommentComposer post={post} onSubmit={handleAddComment} />
    </div>
  );
};

export default PostView;
