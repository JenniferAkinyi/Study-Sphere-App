import React from "react";
import { useParams } from "react-router-dom";
import PostView from "./PostView";
import CommentList from "../Comment/CommentList";
import Sidebar from "../Sidebar/Sidebar";
import Topbar from "../Dashboard/Topbar";

const PostDetails = () => {
  const { id } = useParams();

  return (
    <div className="max-w-2xl mx-auto mt-6">
      <PostView postId={id} />

      <h3 className="mt-6 mb-2 font-semibold">Comments</h3>

      <CommentList postId={id} />
    </div>
  );
};

export default PostDetails;
