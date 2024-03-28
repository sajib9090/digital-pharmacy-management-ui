"use client";
import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  MdOutlineSpaceDashboard,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
} from "react-icons/md";
import { IoHomeOutline, IoBugSharp } from "react-icons/io5";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { SlCalculator } from "react-icons/sl";
import { TbCoinTaka } from "react-icons/tb";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Dropdown from "../Dropdown/Dropdown";

const Sidebar = () => {
  const navigationMenu = [
    {
      title: "Home",
      icon: <IoHomeOutline className="h-4 w-4" />,
      href: "/",
    },
    {
      title: "Dashboard",
      icon: <MdOutlineSpaceDashboard className="h-4 w-4" />,
      href: "/dashboard",
    },
    {
      title: "Inventory",
      icon: <SlCalculator className="h-4 w-4" />,
      href: "/inventory",
      upArrow: <MdKeyboardArrowUp className="h-4 w-4 absolute right-4" />,
      downArrow: <MdKeyboardArrowDown className="h-4 w-4 absolute right-4" />,
      subNav: [
        {
          title: "List of Medicines",
          link: "/list-of-medicines",
        },
        {
          title: "Medicine Groups",
          link: "/medicine-groups",
        },
      ],
    },
    {
      title: "Reports",
      icon: <HiOutlineDocumentReport className="h-4 w-4" />,
      href: "/reports",
      upArrow: <MdKeyboardArrowUp className="h-4 w-4 absolute right-4" />,
      downArrow: <MdKeyboardArrowDown className="h-4 w-4 absolute right-4" />,
      subNav: [
        {
          title: "Sales Report",
          link: "/sales-report",
        },
      ],
    },
    {
      title: "Sell",
      icon: <TbCoinTaka className="h-4 w-4" />,
      href: "/sell",
    },
  ];
  const [dropdown, setDropdown] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const pathname = usePathname();

  const handleLogoutClick = () => {
    console.log("logout");
  };

  const handleSubNav = (index) => {
    setActiveSubMenu(index === activeSubMenu ? null : index);
  };

  return (
    <div className="w-[200px] min-h-screen bg-[#283342] flex flex-col justify-between sticky top-0 left-0">
      <div className="h-[60px] bg-[#1d242e] flex items-center justify-center text-white font-bold">
        Pharma One
      </div>
      <div className="flex-1 relative">
        <div className="h-[42px] flex items-center justify-between mt-[25px] pl-4 pr-2">
          <div>
            <p className="font-semibold text-white">Sajib Hossain</p>
            <p className="text-yellow-600 text-[12px]">Super Admin</p>
          </div>
          <BsThreeDotsVertical
            title="dropdown"
            onClick={() => setDropdown(!dropdown)}
            className="text-white h-6 w-6 cursor-pointer"
          />
        </div>
        <div className="absolute right-2">
          {dropdown && <Dropdown handleLogoutClick={handleLogoutClick} />}
        </div>

        {/* navigation */}
        <div className="mt-10">
          {navigationMenu?.map((n, index) => {
            const isActiveSubMenu = activeSubMenu === index;
            const activeLink = pathname == n?.href;

            return (
              <div
                onMouseEnter={() => handleSubNav(index)}
                key={n?.href}
                className="bg-[#1d242e]"
              >
                <div
                  className={`h-[46px] flex items-center cursor-pointer  hover:bg-[#009099] ${
                    activeLink ? "bg-[#009099]" : "bg-[#283342]"
                  }`}
                >
                  <Link
                    href={n?.href}
                    className="flex items-center text-[14px] text-white pl-4"
                  >
                    {n?.icon}
                    <p className="ml-3">{n?.title}</p>
                    {isActiveSubMenu ? n?.upArrow : n?.downArrow}
                  </Link>
                </div>
                {isActiveSubMenu &&
                  n?.subNav &&
                  n?.subNav?.map((sn) => {
                    const activeSubLink = pathname == n?.href + sn?.link;
                    return (
                      <div
                        key={sn?.link}
                        className={`h-[46px] hover:bg-[#009099] flex items-center ${
                          activeSubLink || pathname.includes(sn.link)
                            ? "bg-[#009099]"
                            : ""
                        }`}
                      >
                        <Link
                          href={n?.href + sn?.link}
                          onClick={(e) => e.stopPropagation()}
                          className="text-white text-[14px] pl-11"
                        >
                          <p>{sn?.title}</p>
                        </Link>
                      </div>
                    );
                  })}
              </div>
            );
          })}
        </div>

        {/* bug report */}

        <div className="border-t border-white mt-8">
          <div
            className={`h-[46px] hover:bg-[#009099] flex items-center ${
              pathname == "/report-bugs" ? "bg-[#009099]" : ""
            }`}
          >
            <Link
              href={"/report-bugs"}
              className="flex items-center text-white text-[14px] pl-4"
            >
              <IoBugSharp className="h-4 w-4" />
              <p className="ml-3">Report Bugs</p>
            </Link>
          </div>
        </div>
      </div>
      <div className="h-[34px] bg-[#1d242e] flex items-center justify-center text-[#808489] text-[12px] px-2">
        Developed by Sajib &copy;{new Date().getFullYear()}{" "}
        <span className="ml-2">v1.1</span>
      </div>
    </div>
  );
};

export default Sidebar;
