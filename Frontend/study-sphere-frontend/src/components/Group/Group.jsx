import React, { useState, useEffect } from "react";
import { IoSettings } from "react-icons/io5";
import AllFeed from "./Components/AllFeed";
import { fetchGroupId } from "../../services/api";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Group = () => {
  const { groupId } = useParams();
  const [group, setGroup] = useState(null);
  const [active, setActive] = useState("All Feed");
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();

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
    <>
      <div className="p-4 mt-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-col ">
            <h1 className="text-2xl font-semibold ">{group?.name}</h1>
            <div className="flex gap-4 text-xs font-medium text-gray-500">
              <p>12 New Posts this week</p>
              <p>{group?.members?.length || 0} Members</p>
              <p className="font-semibold text-indigo-500">
                {group?.privacy} GROUP
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div>
              <div className="relative">
                <button
                  onClick={() => setOpenMenu((prev) => !prev)}
                  className="px-5 py-2 text-white bg-indigo-500 rounded-xl"
                >
                  Create
                </button>
                {openMenu &&(
                  <div className="absolute right-0 w-40 mt-2 bg-white border shadow-md rounded-xl">
                    <button
                      onClick={() => navigate(`/groups/${groupId}/postessay`)}
                      className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                    >
                      Essay
                    </button>
                    <button className="block w-full px-4 py-2 text-left hover:bg-gray-100">
                      Post
                    </button>
                  </div>
                )}
              </div>
            </div>
            <IoSettings className="cursor-pointer hover:text-indigo-500" />
          </div>
        </div>
        <div className="mt-4">
          {["All Feed", "Essays", "Shared Notes", "Announcements"].map(
            (page) => (
              <button
                key={page}
                className={`px-4 text-sm ${
                  active === page ? "text-black" : "text-gray-500"
                }`}
                onClick={() => setActive(page)}
              >
                {page}
              </button>
            ),
          )}
        </div>
        <AllFeed />
      </div>
    </>
  );
};

export default Group;
