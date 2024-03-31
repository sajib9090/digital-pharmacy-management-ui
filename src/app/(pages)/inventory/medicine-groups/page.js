/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoIosAdd } from "react-icons/io";
import { RiArrowRightDoubleFill } from "react-icons/ri";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useGenericStore } from "@/app/stores/genericStore";

const MedicineGroups = () => {
  const shopName = "rayan pharmacy";
  const { generics, getAllGenerics, loading, error } = useGenericStore();
  const [searchValue, setSearchValue] = useState("");
  const [resultPerPage, setResultPerPage] = useState("10");
  const [page, setPage] = useState(generics.pagination?.currentPage || 1);

  useEffect(() => {
    getAllGenerics(shopName, page, resultPerPage, searchValue);
  }, [resultPerPage, page, searchValue]);

  return (
    <div className="pl-6 pt-2 container1">
      <div className="flex justify-between">
        <div>
          <div className="text-[18px] font-bold capitalize">
            <Link href={"/inventory"} className="text-gray-400">
              Inventory {">"}{" "}
            </Link>
            <Link href={"/inventory/medicine-groups"}>
              Medicine-groups (
              {generics?.data_found ? generics?.data_found : "00"})
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
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
            setPage(1);
          }}
          className="rounded"
          type="search"
          placeholder="Search medicine group..."
        />
      </div>

      {loading || error ? (
        <div className="mt-8 w-full border border-[#d0cfcf] rounded bg-gray-50">
          {loading && <p className="text-center my-6 ">Please wait...</p>}
          {error && (
            <p className="text-center my-6 text-red-600">
              Something went wrong.{" "}
              <span
                onClick={() => window.location.reload()}
                className="ml-2 underline cursor-pointer"
              >
                Please Refresh
              </span>
            </p>
          )}
        </div>
      ) : (
        <div className="mt-4 w-full border border-[#d0cfcf] rounded bg-gray-50">
          <table className="w-full">
            <tr className="border-b border-[#d0cfcf] h-[35px] w-full text-[14px]">
              <th className="w-[7%] text-start pl-4">No.</th>
              <th className="w-[58%] text-start">Group Name</th>
              <th className="w-[25%] text-start">No of Medicines</th>
              <th className="w-[10%] text-start">Action</th>
            </tr>

            {generics?.data?.map((generic, i) => {
              return (
                <tr
                  key={generic?._id}
                  className={`border-b border-[#ebebeb] min-h-[35px] w-full text-[14px]`}
                >
                  <td className="pl-4 py-2">
                    {i +
                      1 +
                      generics?.pagination?.currentPage * resultPerPage -
                      resultPerPage}
                  </td>
                  <td className="capitalize">{generic?.generic_name}</td>
                  <td>{generic?.medicine_available}</td>
                  <td>
                    <Link
                      href={`/inventory/medicine-groups/${generic?._id}`}
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
      )}

      <div className="flex items-center justify-between mt-2 mb-4">
        <div>
          <label>Result Per Page :</label>
          <select
            value={resultPerPage}
            onChange={(e) => {
              setResultPerPage(e.target.value);
              setPage(1);
            }}
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
          <button
            onClick={(e) => setPage(page - 1)}
            disabled={generics?.pagination?.previousPage == null}
            className={`h-[27px] w-[27px] flex items-center justify-center border border-gray-300 rounded ${
              generics?.pagination?.previousPage != null
                ? "border border-gray-300 text-black"
                : "border border-gray-300 text-gray-300 cursor-not-allowed"
            }`}
          >
            <MdKeyboardArrowLeft className="h-5 w-5" />
          </button>
          <div className="flex items-center px-4">
            <p className="mr-2">Page</p>
            <select value={page} onChange={(e) => setPage(e.target.value)}>
              {Array.from({ length: generics?.pagination?.totalPages }).map(
                (_, index) => (
                  <option key={index} value={index + 1}>
                    {index + 1}
                  </option>
                )
              )}
            </select>
          </div>
          <button
            onClick={(e) => setPage(page + 1)}
            disabled={generics?.pagination?.nextPage == null}
            className={`h-[27px] w-[27px] flex items-center justify-center border border-gray-300 rounded ${
              generics?.pagination?.nextPage != null
                ? "border border-gray-300 text-black"
                : "border border-gray-300 text-gray-300 cursor-not-allowed"
            }`}
          >
            <MdKeyboardArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MedicineGroups;
