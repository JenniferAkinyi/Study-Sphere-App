import React from "react";
import GroupCard from "./GroupCard";
import { MdLaptopMac } from 'react-icons/md'
import { Si365Datascience } from "react-icons/si";

const JoinedGroups = () => {
  return (
    <>
      <div className="flex justify-between px-7">
        <h1 className="text-lg font-bold">Joined Study Groups</h1>
        <p className="font-semibold text-indigo-500">View all</p>
      </div>
      <div className="flex flex-row justify-between gap-2">
        <GroupCard
          name="Introduction to Python"
          category="Programming"
          institution="University of Nairobi"
          nextSession="Today, 4:00PM"
          Icon={MdLaptopMac}
        />
        <GroupCard
          name="Data Science 101"
          category="Data"
          institution="Dedan Kimathi University"
          nextSession="Tomorrow, 3:00PM"
          Icon={Si365Datascience}
        />
      </div>
    </>
  );
};

export default JoinedGroups;
