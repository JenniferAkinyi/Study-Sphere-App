import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { postEssay } from "../../../services/api";
import { IoMdArrowRoundBack } from "react-icons/io";
import Editor from "./Editor";

const Essay = () => {
  const [content, setContent] = useState("");
  const { groupId } = useParams();
  const navigate = useNavigate();
  const extractTitle = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    const h3 = div.querySelector("h3");
    return h3 ? h3.textContent : "";
  };

  const handlePublish = async () => {
    const title = extractTitle(content);
    if (!title.trim() || !content.trim()) return;

    try {
      await postEssay({ title, content, groupId });
      navigate(`/groups/${groupId}`);
    } catch (err) {
      console.error(err);
    }
  };
  const wordCount = content
    .replace(/<[^>]+>/g, "")
    .split(/\s+/)
    .filter(Boolean).length;
  const readTime = Math.ceil(wordCount / 200);

  return (
    <div>
      <div className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-gray-100">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-sm font-semibold text-gray-500 hover:text-black"
        >
          <IoMdArrowRoundBack /> Back
        </button>
        <button
          onClick={handlePublish}
          className="px-4 py-2 text-sm text-white bg-indigo-600 rounded-full hover:bg-indigo-700"
        >
          Publish
        </button>
      </div>
      <div className="flex gap-4 px-2 py-6 mx-auto max-w-7xl">
        
        <div className="w-5/6">
          <Editor content={content} setContent={setContent} />
        </div>
        <div className="text-xs text-gray-400 w-1/8">
          <div className="sticky p-4 space-y-4 bg-white rounded-lg shadow top-24">
            <div>
              <p className="uppercase text-[10px] tracking-wide text-gray-300">
                Word count
              </p>
              <p className="text-xs font-normal text-gray-500">{wordCount}</p>
            </div>
            <div>
              <p className="uppercase text-[10px] tracking-wide text-gray-300">
                Read time
              </p>
              <p className="text-xs font-normal text-gray-500">
                {readTime} min
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Essay;
