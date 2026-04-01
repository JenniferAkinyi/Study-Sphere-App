import React, { useState, useEffect } from "react";
import { IoSettings } from "react-icons/io5";
import AllFeed from "./Components/AllFeed";
import { fetchGroupId } from "../../services/api";
import { useParams } from "react-router-dom";

const Group = () => {
  const { groupId } = useParams();
  const [group, setGroup] = useState(null);
  const [active, setActive] = useState("All Feed");
  
  useEffect(() => {
    const getGroup = async () => {
      try {
        const data = await fetchGroupId(groupId);
        setGroup(data.details);
      } catch (error) {
        console.error(error);
      }
    };

    getGroup();
  }, [groupId]);
  
  return (
    <div className="p-4 mt-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-col ">
          <h1 className="text-2xl font-semibold ">{group?.name}</h1>
          <div className="flex gap-4 text-xs font-medium text-gray-500">
            <p>12 New Posts this week</p>
            <p>{(group?.members?.length )|| 0} Members</p>
            <p className="font-semibold text-indigo-500">{group?.privacy} Group</p>
          </div>
        </div>
        <div className="cursor-pointer hover:text-indigo-500">
          <IoSettings />
        </div>
      </div>
      <div className="mt-4">
        {["All Feed", "Essays", "Shared Notes", "Announcements"].map((page) => (
          <button
            key={page}
            className={`px-4 text-sm ${
              active === page ? "text-black" : "text-gray-500"
            }`}
            onClick={() => setActive(page)}
          >
            {page}
          </button>
        ))}
      </div>
      <AllFeed />
    </div>
  );
};

export default Group;
