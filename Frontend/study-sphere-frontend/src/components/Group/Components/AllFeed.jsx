import React from "react";
import Avatar from "../../Authentication/Avatar";
import { GoClock } from "react-icons/go";
import { CiBookmark, CiShare2 } from "react-icons/ci";
import { useUser } from "../../../context/userContext";

const AllFeed = () => {
  const { user } = useUser();
  return (
    <div className="p-4 bg-indigo-100">
      <div className="flex items-center">
        <div className="flex">
          <Avatar
            username={user?.name || "Guest"}
            profileImage={user?.profileImage}
            size={32}
          />
        </div>
        <div>
            <p>{user?.name}</p>
        </div>
      </div>
      <div>
        <div>        
            <h1>Comprehensive guide to Schrodinger's Cat Paradox</h1>
            <p>If the atom decays (a 50% probability within an hour), the Geiger
                counter triggers the hammer to break the flask, releasing poison 
                and killing the cat; if it does not decay, the cat lives. 
                According to quantum superposition, until the box is opened, 
                the atom is in a state of being both decayed and not decayed,
                which mathematically entangles the cat into a superposition of 
                being both alive and dead.
            </p>
        </div>
        <div className="flex ">
            <div>
                <p><GoClock />12 min read</p>
            </div>
            <div>
                <CiBookmark />
                <CiShare2 />
            </div>
        </div>
      </div>
    </div>
  );
};

export default AllFeed;
