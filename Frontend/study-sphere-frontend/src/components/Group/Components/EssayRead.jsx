import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { essayById } from "../../../services/api";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import timeAgo from "../../../utils/timeAgo";
import { GoClock } from "react-icons/go";
import Avatar from "../../Authentication/Avatar";
import { getReadingTime } from "../../../utils/readingTime";
import { IoMdArrowDropdown } from "react-icons/io";
import { useUser } from "../../../context/userContext";

const EssayRead = () => {
  const { groupId, id } = useParams();
  const [essay, setEssay] = useState(null);
  const navigate = useNavigate();
  const { user } = useUser();
  const [comment, setComment] = useState();

  useEffect(() => {
    const getEssay = async () => {
      try {
        const data = await essayById(groupId, id);
        setEssay(data.details);
      } catch (error) {
        console.log(error);
      }
    };
    getEssay();
  }, [id, groupId]);

  if (!essay) return <p className="p-4">Loading...</p>;

  return (
    <>
      <div className="z-50 flex items-center justify-between px-6 py-4 op-0 ">
        <button
          onClick={() => navigate(`/groups/${groupId}`)}
          className="flex items-center text-sm font-semibold text-gray-500 hover:text-black"
        >
          <IoMdArrowRoundBack /> Back
        </button>
      </div>
      <div className="max-w-3xl p-6 mx-auto">
        <h1 className="mb-4 text-3xl font-bold">{essay.title}</h1>
        <div className="flex items-center justify-between gap-2 mt-8">
          <div className="flex gap-2">
            <div className="flex">
              <Avatar
                username={essay?.author.name}
                profileImage={essay?.author?.profileImage}
                size={32}
              />
            </div>
            <div className="-space-y-1">
              <p className="text-sm font-semibold">{essay?.author?.name}</p>
              <p className="text-xs text-gray-500">
                {timeAgo.format(new Date(essay?.createdAt))}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <GoClock />
            <p className="text-sm text-gray-700">
              {getReadingTime(essay.content)}
            </p>
          </div>
        </div>
        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: essay.content }}
        />
      </div>
      <div className="max-w-3xl p-6 mx-auto">
        <div className="flex justify-between">
          <p className="text-lg font-medium">Responses(42)</p>
          <p className="flex items-center gap-2 text-sm text-indigo-500">
            Sort by Latest <IoMdArrowDropdown />
          </p>
        </div>
        <div>
          <div className="flex gap-2 mt-2">
            <div>
              <Avatar
                username={user?.name}
                profileImage={user?.profileImage}
                size={32}
              />
            </div>
            <input
              type="text"
              placeholder="Add to the discussion"
              className="w-full h-24 text-sm text-gray-500 placeholder-gray-300 border rounded-lg outline-none border-ray-300"
              value={comment}
            />
          </div>
          <div className="flex flex-row-reverse gap-3 mt-3">
            <button className="p-1 text-white bg-indigo-500 rounded-lg">Comment</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EssayRead;
