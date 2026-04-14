import React, { useState, useEffect } from "react";
import Avatar from "../../Authentication/Avatar";
import { GoClock } from "react-icons/go";
import { CiBookmark, CiShare2 } from "react-icons/ci";
import { groupEssay } from "../../../services/api";
import { useParams } from "react-router-dom";
import timeAgo from "../../../utils/timeAgo";
import { getReadingTime } from "../../../utils/readingTime";
import { useNavigate } from "react-router-dom";

const AllFeed = () => {
  const { groupId } = useParams();
  const [essays, setEssays] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    const getEssays = async () => {
      try {
        const data = await groupEssay(groupId);
        setEssays(data.details);
      } catch (error) {
        console.log(error);
      }
    };
    getEssays();
  }, [groupId]);
  return (
    <>
      <div className="space-y-4">
        {essays.length === 0 ? (
          <div className="p-4 text-sm">
            Nothing on the Feed. Be the first to post
          </div>
        ) : (
          essays.map((essay) => (
            <div key={essay.id} className="p-4 bg-indigo-100 rounded-xl">
              <div className="flex items-center gap-2">
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
              <div>
                <div onClick={() => navigate(`/groups/${groupId}/${essay.id}`)}>
                  <h1 className="text-3xl font-bold">{essay?.title}</h1>
                  <div
                    className="prose prose-lg cursor-pointer max-w-none prose-headings:font-bold prose-p:text-gray-700 prose-strong:text-black line-clamp-3"
                    dangerouslySetInnerHTML={{ __html: essay?.content }}
                  />
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-1">
                    <GoClock className="hover:text-indigo-500" />
                    <p className="text-sm text-gray-500">
                      {getReadingTime(essay.content)}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <CiBookmark className="hover:text-indigo-500" />
                    <CiShare2 className="hover:text-indigo-500" />
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default AllFeed;
