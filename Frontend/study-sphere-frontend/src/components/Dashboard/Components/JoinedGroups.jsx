import React, { useEffect, useState } from "react";
import GroupCard from "./GroupCard";
import { fetchMyGroups } from "../../../services/api";

const JoinedGroups = () => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const getGroups = async () => {
      try {
        const data = await fetchMyGroups();
        setGroups(data);
      } catch (error) {
        console.log(error);
      }
    };
    getGroups();
  }, []);

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-lg font-bold">Joined Study Groups</h1>
        <p className="font-semibold text-indigo-500">View all</p>
      </div>
      <div className="flex flex-row gap-4 mt-3 px-7">
         {groups.length === 0 ? (
          <p className="mt-3 text-sm text-gray-500 px-7">
            No groups joined yet
          </p>
        ) : (
          groups.map((group) => <GroupCard key={group.id} group={group} />)
        )}
      </div>
    </>
  );
};

export default JoinedGroups;
