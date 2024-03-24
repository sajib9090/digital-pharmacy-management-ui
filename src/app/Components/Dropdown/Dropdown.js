"use client";
import React from "react";
import { CgProfile } from "react-icons/cg";
import { MdOutlineLogout } from "react-icons/md";

const Dropdown = ({ handleLogoutClick }) => {
  return (
    <div className="w-[125px] bg-white py-3 rounded space-y-2">
      <div
        title="Profile"
        className="flex items-center px-3 cursor-pointer hover:text-blue-600"
      >
        <CgProfile className="mr-2" />
        <p>My Profile</p>
      </div>
      <div className="border-b border-black"></div>
      <div
        onClick={handleLogoutClick}
        title="Logout"
        className="flex items-center text-red-600 px-3 cursor-pointer"
      >
        <MdOutlineLogout className="mr-2" />
        <p>Log Out</p>
      </div>
    </div>
  );
};

export default Dropdown;
