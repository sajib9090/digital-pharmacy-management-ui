"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { MdCancel } from "react-icons/md";
import { LuLoader2 } from "react-icons/lu";
import axios from "axios";
import { baseUrl } from "@/secrets.js";

const AddNewCompany = () => {
  const shop_name = "rayan pharmacy";
  const router = useRouter();
  const [companyValue, setCompanyValue] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleCreateCompany = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = {
        shop_name: shop_name,
        company_name: companyValue,
      };

      const res = await axios.post(
        `${baseUrl}/api/v1/companies/create/company`,
        data
      );

      if (res) {
        setError("");
        setCompanyValue("");
        setSuccess(res?.data?.message);
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
          <Link href={"/inventory/list-of-companies"} className="text-gray-400">
            List-of-companies {">"}{" "}
          </Link>
          <Link href={"#"}>Add New company</Link>
        </div>
        <p>*All fields are mandatory, except mentioned as (optional).</p>
      </div>

      {/* form */}
      <div className="w-[760px]">
        <div onClick={() => router.back()} className="flex justify-end">
          <MdCancel className="h-6 w-6 text-[#f0483e] cursor-pointer" />
        </div>
        <form onSubmit={handleCreateCompany} className="w-full">
          <div className="mt-6">
            <label className="text-[14px]">Company/Supplier Name *</label>
            <input
              type="text"
              value={companyValue}
              onChange={(e) => setCompanyValue(e.target.value)}
              placeholder="Enter company/supplier name max 100 characters"
              className="h-[35px] w-full border border-[#c1c1c1] rounded px-2 mt-1"
            />
          </div>

          {success && <p className="-mb-3 mt-1 text-blue-600">{success}</p>}
          {error && <p className="-mb-3 mt-1 text-red-600">{error}</p>}

          <div className="mt-4 flex items-center justify-between gap-4">
            <button
              disabled={!companyValue || loading}
              className={`h-[35px] w-[150px] rounded text-white flex items-center justify-center ${
                companyValue
                  ? "bg-[#f0483e]"
                  : "cursor-not-allowed bg-[#474747]"
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

export default AddNewCompany;
