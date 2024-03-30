"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { MdCancel } from "react-icons/md";
import { LuLoader2 } from "react-icons/lu";

const AddNewGroup = () => {
  const shop_name = "rayan pharmacy";
  const router = useRouter();
  const [groupValue, setGroupValue] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleCreateGroup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = {
        shop_name: shop_name,
        generic_name: groupValue,
      };

      const res = await axios.post(
        "http://localhost:8000/api/v1/generics/create/generic",
        data
      );

      if (res) {
        setError("");
        setGroupValue("");
        setSuccess(res.data.message);
      }
    } catch (err) {
      setError(
        err?.response?.data?.message
          ? err?.response?.data?.message
          : "Something went wrong"
      );
      setSuccess("");
    } finally {
      setLoading(false);
    }
  };

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
        <form onSubmit={handleCreateGroup} className="w-full">
          <div className="mt-6">
            <label className="text-[14px]">Group/Generic Name *</label>
            <input
              type="text"
              value={groupValue}
              onChange={(e) => setGroupValue(e.target.value)}
              placeholder="Enter group/generic name max 100 characters"
              className="h-[35px] w-full border border-[#c1c1c1] rounded px-2 mt-1"
            />
          </div>

          {success && <p className="-mb-3 mt-1 text-blue-600">{success}</p>}
          {error && <p className="-mb-3 mt-1 text-red-600">{error}</p>}

          <div className="mt-4 flex items-center justify-between gap-4">
            <button
              disabled={!groupValue || loading}
              className={`h-[35px] w-[150px] rounded text-white flex items-center justify-center ${
                groupValue ? "bg-[#f0483e]" : "cursor-not-allowed bg-[#474747]"
              }`}
            >
              Save Details
              {loading && <LuLoader2 className="h-5 w-5 animate-spin ml-2" />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewGroup;
