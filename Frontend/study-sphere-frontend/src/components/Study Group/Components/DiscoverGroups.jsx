import React, { useEffect, useState } from "react";
import { fetchDiscoveredGroups } from "../../../services/api";
import Avatar from "../../Authentication/Avatar";

const DiscoverGroups = () => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const getGroups = async () => {
      const data = await fetchDiscoveredGroups();
      setGroups(data);
    };

    getGroups();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2 lg:grid-cols-3">
      {groups.map((group) => (
        <div
          key={group.id}
          className="p-4 bg-white border rounded-xl"
        >
          <div className="flex -space-x-2">
            {group.members.slice(0, 3).map((member) => (
              <Avatar
                key={member.id}
                username={member.user?.name}
                profileImage={member.user?.profileImage}
                size={28}
              />
            ))}

            {group.members.length > 3 && (
              <div className="flex items-center justify-center text-xs bg-gray-200 border rounded-full w-7 h-7">
                +{group.members.length - 3}
              </div>
            )}
          </div>
          <div className="mt-3">
            <h2 className="font-semibold">{group.name}</h2>
            <p className="text-sm text-gray-500">{group.topic}</p>
          </div>
          <button className="w-full px-3 py-2 mt-4 text-sm font-semibold text-white bg-indigo-500 rounded-lg hover:bg-indigo-600">
            Join Group
          </button>
        </div>
      ))}
    </div>
  );
};

export default DiscoverGroups;