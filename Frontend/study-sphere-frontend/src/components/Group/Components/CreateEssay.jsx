import React, { useState } from "react";
import { postEssay } from "../../../services/api";
import { MdArrowBackIosNew } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { readingTime } from "reading-time-estimator";

const CreateEssay = () => {
  const navigate = useNavigate();
  const { groupId } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) return;

    try {
      await postEssay({ title, content, groupId });
      navigate(`/groups/${groupId}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between">
        <MdArrowBackIosNew
          className="cursor-pointer hover:text-indigo-500"
          onClick={() => navigate(`/groups/${groupId}`)}
        />
        <button className="px-4 py-2 font-semibold text-white bg-indigo-500 rounded-xl">
          Publish
        </button>
      </div>
      <div className="max-w-3xl px-6 py-10 mx-auto">
        <input
          type="text"
          placeholder="Title"
          className="w-full mb-6 text-4xl font-bold placeholder-gray-300 outline-none"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Start writing your essay..."
          className="w-full h-[500px] text-lg leading-relaxed outline-none resize-none placeholder-gray-400"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={1}
          onInput={(e) => {
            e.target.style.height = "auto";
            e.target.style.height = e.target.scrollHeight + "px";
          }}
        />
        <p className="text-sm text-gray-400">
          {readingTime(content || "", 200).text}
        </p>
      </div>
    </div>
  );
};

export default CreateEssay;
