"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { MdCancel } from "react-icons/md";

const AddNewGroup = () => {
  const router = useRouter();
  return (
    <div className="pl-6 pt-2 container1">
      <div className="">
        <div className="text-[18px] font-bold capitalize">
          <Link href={"/inventory"} className="text-gray-400">
            Inventory {">"} {""}{" "}
          </Link>
          <Link href={"/inventory/list-of-medicines"} className="text-gray-400">
            Medicine-groups {">"}{" "}
          </Link>
          <Link href={"#"}>Add New Group</Link>
        </div>
        <p>*All fields are mandatory, except mentioned as (optional).</p>
      </div>

      {/* form */}
      <div className="w-[760px]">
        <div onClick={() => router.back()} className="flex justify-end">
          <MdCancel className="h-6 w-6 text-[#f0483e] cursor-pointer" />
        </div>
        <form className="w-full">
          <div className="mt-6">
            <label className="text-[14px]">Group/Generic Name *</label>
            <input
              type="text"
              name=""
              id=""
              placeholder="Enter group/generic name max 100 characters"
              className="h-[35px] w-full border border-[#c1c1c1] rounded px-2 mt-1"
            />
          </div>

          <div className="mt-4 flex items-center justify-between gap-4">
            <button className="h-[35px] w-[150px] bg-[#f0483e] rounded text-white">
              Save Details
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewGroup;
