"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoIosAdd } from "react-icons/io";
import { RiArrowRightDoubleFill } from "react-icons/ri";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";

const MedicineGroups = () => {
  const [resultPerPage, setResultPerPage] = useState("10");

  return (
    <div className="pl-6 pt-2 container1">
      <div className="flex justify-between">
        <div>
          <div className="text-[18px] font-bold capitalize">
            <Link href={"/inventory"} className="text-gray-400">
              Inventory {">"}{" "}
            </Link>
            <Link href={"/inventory/medicine-groups"}>
              Medicine-groups (111)
            </Link>
          </div>
          <p className="text-[14px] capitalize">list of medicines groups</p>
        </div>
        <div>
          <Link
            href={"/inventory/medicine-groups/add-new-group"}
            className="capitalize flex items-center justify-center h-[44px] w-[175px] bg-[#f0483e] text-white rounded"
          >
            <IoIosAdd className="h-6 w-6" /> add new group
          </Link>
        </div>
      </div>

      <div className="search mt-4">
        <input
          className="rounded"
          type="search"
          placeholder="Search medicine group..."
        />
      </div>

      <div className="mt-4 w-full border border-[#d0cfcf] rounded bg-gray-50">
        {/* table */}
        <table className="w-full">
          <tr className="border-b border-[#d0cfcf] h-[35px] w-full text-[14px]">
            <th className="w-[7%] text-start pl-4">No.</th>
            <th className="w-[58%] text-start">Group Name</th>
            <th className="w-[25%] text-start">No of Medicines</th>
            <th className="w-[10%] text-start">Action</th>
          </tr>

          {Array.from({ length: resultPerPage }).map((d, i) => {
            return (
              <tr
                key={i}
                className={`border-b border-[#ebebeb] min-h-[35px] w-full text-[14px]`}
              >
                <td className="pl-4 py-2">{i + 1}</td>
                <td>Cardiac</td>
                <td>100</td>
                <td>
                  <Link
                    href={"#"}
                    className="flex items-center text-[12px] text-blue-600"
                  >
                    View Detail <RiArrowRightDoubleFill />
                  </Link>
                </td>
              </tr>
            );
          })}
        </table>
      </div>

      <div className="flex items-center justify-between mt-2 mb-4">
        <div>
          <label>Result Per Page :</label>
          <select
            value={resultPerPage}
            onChange={(e) => setResultPerPage(e.target.value)}
            className="h-[27px] w-[70px] border border-gray-300 rounded ml-2"
          >
            {Array.from({ length: 10 }).map((a, i) => (
              <option key={i} value={i * 10 + 10}>
                {i * 10 + 10}
              </option>
            ))}
          </select>
        </div>
        {/* pagination */}
        <div className="flex items-center">
          <span className="h-[27px] w-[27px] flex items-center justify-center border border-gray-300 rounded cursor-pointer">
            <MdKeyboardArrowLeft className="h-5 w-5" />
          </span>
          <div className="flex items-center px-4">
            <p className="mr-2">Page</p>
            <select name="" id="">
              <option value="">1</option>
              <option value="">1</option>
              <option value="">1</option>
              <option value="">1</option>
            </select>
          </div>
          <span className="h-[27px] w-[27px] flex items-center justify-center border border-gray-300 rounded cursor-pointer">
            <MdKeyboardArrowRight className="h-5 w-5" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default MedicineGroups;
