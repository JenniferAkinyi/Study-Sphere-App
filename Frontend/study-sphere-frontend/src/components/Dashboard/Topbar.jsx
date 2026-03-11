import React, { useContext } from "react";
import {
  MdOutlineMenu,
  MdNotificationsNone,
  MdOutlineSearch,
} from "react-icons/md";
import Avatar from "../Authentication/Avatar";
import { SidebarContext } from "../../context/SidebarContext";
import { useUser } from "../../context/userContext";

const Topbar = () => {
  const { toggleSidebar } = useContext(SidebarContext);
  const { userData } = useUser();

  return (
    <header className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between gap-4 px-4 py-2 bg-white shadow-sm md:left-64 md:px-6">
      <div className="flex items-center gap-3">
        <MdOutlineMenu
          size={24}
          className="text-gray-700 cursor-pointer md:hidden"
          onClick={toggleSidebar}
        />
      </div>
      <div className="flex-1 px-4 md:px-6">
        <div className="relative transition-all duration-300 ease-in-out group">
          <MdOutlineSearch
            size={20}
            className="absolute text-gray-400 transition-colors duration-200 -translate-y-1/2 left-4 top-1/2 group-focus-within:text-indigo-500"
          />
          <input
            type="text"
            placeholder="Search for groups, sessions or notes..."
            className="w-full pl-12 pr-4 py-2.5 bg-gray-100 rounded-full outline-none transition-all duration-300 focus:bg-white focus:shadow-md focus:ring-2 focus:ring-indigo-400 md:max-w-md focus:md:max-w-lg"/>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="relative text-gray-600 hover:text-gray-900">
          <MdNotificationsNone size={24} />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <span className="text-gray-400">|</span>
        <div className="flex items-center gap-2">
          <span className="hidden font-medium sm:block">
            {userData?.username || "Guest"}
          </span>
          <Avatar
            username={userData?.username || "Guest"}
            profileImage={userData?.profileImage}
            size={32}
          />
        </div>
      </div>
    </header>
  );
};

export default Topbar;
