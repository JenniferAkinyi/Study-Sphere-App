import React, { useEffect, useState } from "react";
import { FaHeart, FaRegComment, FaShare } from "react-icons/fa";
import Avatar from "../Authentication/Avatar";
import { useUser } from "../../context/userContext";
import CommentModal from "./CommentModal"; 

const CommentList = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [replyTo, setReplyTo] = useState(null);

  const { userData } = useUser();

  useEffect(() => {
    if (!postId) return;

    const ref = collection(db, "posts", postId, "comments");
    const q = query(ref, orderBy("createdAt", "asc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const allComments = snapshot.docs.map((doc) => ({
        commentId: doc.id,
        ...doc.data(),
      }));

      const parents = allComments.filter((c) => !c.parentId);
      const replies = allComments.filter((c) => c.parentId);

      const threaded = parents.map((parent) => ({
        ...parent,
        replies: replies.filter((r) => r.parentId === parent.commentId),
      }));

      setComments(threaded);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [postId]);

  if (loading) return <p>Loading comments...</p>;
  if (!comments || comments.length === 0)
    return <p className="text-gray-500">No comments yet</p>;
  const handleCommentLike = async (comment) => {
    if (!userData?.uid) return;

    const liked = comment.likes?.includes(userData.uid);
    const commentRef = doc(db, "posts", postId, "comments", comment.commentId);

    try {
      await updateDoc(commentRef, {
        likes: liked ? arrayRemove(userData.uid) : arrayUnion(userData.uid),
      });
    } catch (err) {
      console.error(err);
    }
  };

  const openReplyModal = (commentId) => {
    setReplyTo(commentId);
    setIsCommentModalOpen(true);
  };

  const closeReplyModal = () => {
    setReplyTo(null);
    setIsCommentModalOpen(false);
  };
  const handleAddComment = async (text, parentId = null) => {
    if (!userData?.uid) return;

    try {
      await addDoc(collection(db, "posts", postId, "comments"), {
        text,
        uid: userData.uid,
        username: userData.username,
        profileImage: userData.profileImage || "",
        createdAt: serverTimestamp(),
        parentId: parentId || null,
      });
      closeReplyModal();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <div key={comment.commentId} className="p-3 bg-white border rounded-lg">
          <div className="flex items-center gap-2">
            <Avatar
              username={comment.username}
              profileImage={comment.profileImage}
              size={32}
            />
            <span className="font-medium">{comment.username}</span>
          </div>
          <p className="ml-10 text-gray-700">{comment.text}</p>

          <div className="flex gap-5 ml-10 text-sm text-gray-500">
            <button
              className="flex items-center gap-2"
              onClick={() => handleCommentLike(comment)}
            >
              <FaHeart
                className={
                  comment.likes?.includes(userData?.uid)
                    ? "text-red-500"
                    : "text-gray-500"
                }
              />
              <span>{comment.likes?.length || 0}</span>
            </button>

            <button
              className="flex items-center gap-2 hover:text-indigo-600"
              onClick={() => openReplyModal(comment.commentId)}
            >
              <FaRegComment />
              <span>{comment.replies?.length || 0}</span>
            </button>

            <button className="flex items-center gap-2 hover:text-indigo-600">
              <FaShare />
            </button>
          </div>
          {comment.replies?.length > 0 && (
            <div className="pl-10 mt-3 space-y-3 border-l">
              {comment.replies.map((reply) => (
                <div key={reply.commentId} className="p-2 rounded bg-gray-50">
                  <div className="flex items-center gap-2">
                    <Avatar
                      username={reply.username}
                      profileImage={reply.profileImage}
                      size={28}
                    />
                    <span className="text-sm font-medium">
                      {reply.username}
                    </span>
                  </div>
                  <p className="ml-8 text-sm">{reply.text}</p>

                  <div className="flex gap-2 mt-1 ml-8 text-xs text-gray-500">
                    <button
                      className="flex items-center gap-1"
                      onClick={() => handleCommentLike(reply)}
                    >
                      <FaHeart
                        className={
                          reply.likes?.includes(userData?.uid)
                            ? "text-red-500"
                            : "text-gray-500"
                        }
                      />
                      <span>{reply.likes?.length || 0}</span>
                    </button>

                    <button
                      className="ml-2 text-xs text-indigo-600"
                      onClick={() => openReplyModal(comment.commentId)}
                    >
                      Reply
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
      {isCommentModalOpen && (
        <CommentModal
          post={{ id: postId }}
          userData={userData}
          parentId={replyTo}
          onClose={closeReplyModal}
          onSubmit={(text) => handleAddComment(text, replyTo)}
        />
      )}
    </div>
  );
};

export default CommentList;
