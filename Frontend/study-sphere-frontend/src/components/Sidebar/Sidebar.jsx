import React, { useContext, useRef, useEffect } from "react";
import {
  MdOutlineMenu,
  MdOutlineGridView,
  MdOutlinePeople,
} from "react-icons/md";
import { LuGoal } from "react-icons/lu";
import { NavLink } from "react-router-dom";
import { SidebarContext } from "../../context/SidebarContext";

const Sidebar = () => {
  const { isSidebarOpen, closeSidebar } = useContext(SidebarContext);
  const navbarRef = useRef(null);

  const handleClickOutside = (event) => {
    if (
      navbarRef.current &&
      !navbarRef.current.contains(event.target) &&
      !event.target.classList.contains("sidebar-open-btn")
    ) {
      closeSidebar();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <aside
      ref={navbarRef}
      className={`fixed top-0 left-0 z-40 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        -translate-x-full md:translate-x-0`}
    >
      <div className="flex items-center p-4 border-b border-gray-200 justify-evenly">
        <MdOutlineMenu
          size={24}
          className="text-gray-700 cursor-pointer md:hidden"
          onClick={closeSidebar}
        />
        <p className="text-2xl font-semibold text-primary-light">
          Study Sphere
        </p>
      </div>
      <div className="p-4">
        <ul className="space-y-2">
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `flex items-center gap-3 p-2 rounded-lg transition-colors duration-200 ${
                  isActive
                    ? "bg-indigo-100 text-indigo-600"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              <MdOutlineGridView size={18} />
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/studygroup"
              className={({ isActive }) =>
                `flex items-center gap-3 p-2 rounded-lg transition-colors duration-200 ${
                  isActive
                    ? "bg-indigo-100 text-indigo-600"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              <MdOutlinePeople size={18} />
              <span>Study Group</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/studygoals"
              className={({ isActive }) =>
                `flex items-center gap-3 p-2 rounded-lg transition-colors duration-200 ${
                  isActive
                    ? "bg-indigo-100 text-indigo-600"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              <LuGoal size={18} />
              <span>Study Goals</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
