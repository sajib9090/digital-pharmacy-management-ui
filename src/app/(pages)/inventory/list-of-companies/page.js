/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoIosAdd } from "react-icons/io";
import { RiArrowRightDoubleFill } from "react-icons/ri";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useCompanyStore } from "@/app/stores/companyStore";
import PrimaryError from "@/app/Components/PrimaryError/PrimaryError";
import PrimaryLoading from "@/app/Components/PrimaryLoading/PrimaryLoading";

const ListOfCompanies = () => {
  const shopName = "rayan pharmacy";
  const { companies, getAllCompanies, companyLoading, companyError } =
    useCompanyStore();
  const [searchValue, setSearchValue] = useState("");
  const [resultPerPage, setResultPerPage] = useState("10");
  const [page, setPage] = useState(companies.pagination?.currentPage || 1);

  useEffect(() => {
    getAllCompanies(shopName, page, resultPerPage, searchValue);
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
              List-of-companies ({companies?.data_found})
            </Link>
          </div>
          <p className="text-[14px] capitalize">
            list of Pharmaceuticals companies
          </p>
        </div>
        <div>
          <Link
            href={"/inventory/list-of-companies/add-new-company"}
            className="capitalize flex items-center justify-center h-[44px] w-[175px] bg-[#f0483e] text-white rounded"
          >
            <IoIosAdd className="h-6 w-6" /> add new company
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
          placeholder="Search suppliers..."
        />
      </div>

      {companyError ? (
        <PrimaryError message={"Oops! Something went wrong!"} refresh={true} />
      ) : (
        <>
          <div className="mt-4 w-full border border-[#d0cfcf] rounded bg-gray-50 relative">
            {/* table */}
            <table className="w-full">
              <tr className="border-b border-[#d0cfcf] h-[35px] w-full text-[14px]">
                <th className="w-[5%] text-start pl-4">No.</th>
                <th className="w-[70%] text-start">
                  Company/Pharmaceuticals Name
                </th>
                <th className="w-[15%] text-start">No of Medicines</th>
                <th className="w-[10%] text-start">Action</th>
              </tr>

              {companies?.data?.map((company, i) => {
                return (
                  <tr
                    key={i}
                    className={`border-b border-[#ebebeb] min-h-[35px] w-full text-[14px]`}
                  >
                    <td className="pl-4 py-2">
                      {i +
                        1 +
                        companies?.pagination?.currentPage * resultPerPage -
                        resultPerPage}
                    </td>
                    <td className="capitalize">{company?.company_name}</td>
                    <td>{company?.medicine_available}</td>

                    <td>
                      <Link
                        href={`/inventory/list-of-companies/${company?._id}`}
                        className="flex items-center text-[12px] text-blue-600"
                      >
                        View Detail <RiArrowRightDoubleFill />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </table>

            {companyLoading && (
              <div className="absolute left-[45%] top-10">
                <PrimaryLoading message={"Please wait..."} />
              </div>
            )}
          </div>

          <div className="flex items-center justify-between mt-2 mb-4">
            <div>
              <label>Result Per Page :</label>
              <select
                value={resultPerPage}
                onChange={(e) => setResultPerPage(e.target.value)}
                className="h-[27px] w-[80px] border border-gray-300 rounded ml-2"
              >
                {Array.from({ length: 10 }).map((_, i) => (
                  <option key={i} value={i * 10 + 10}>
                    {i * 10 + 10}
                  </option>
                ))}
              </select>
            </div>
            {/* pagination */}
            <div className="flex items-center">
              <button
                onClick={() => setPage(page - 1)}
                disabled={
                  companies?.pagination?.previousPage == null || companyLoading
                }
                className={`h-[27px] w-[27px] flex items-center justify-center border border-gray-300 rounded ${
                  companies?.pagination?.previousPage != null
                    ? "border border-gray-300 text-black"
                    : "border border-gray-300 text-gray-300 cursor-not-allowed"
                }`}
              >
                <MdKeyboardArrowLeft className="h-5 w-5" />
              </button>
              <div className="flex items-center px-4">
                <p className="mr-2">Page</p>
                <select
                  value={page}
                  onChange={(e) => setPage(e.target.value)}
                  className="w-[40px]"
                >
                  {Array.from({
                    length: companies?.pagination?.totalPages,
                  }).map((_, index) => (
                    <option key={index} value={index + 1}>
                      {index + 1}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={(e) => setPage(page + 1)}
                disabled={
                  companies?.pagination?.nextPage == null || companyLoading
                }
                className={`h-[27px] w-[27px] flex items-center justify-center border border-gray-300 rounded ${
                  companies?.pagination?.nextPage != null
                    ? "border border-gray-300 text-black"
                    : "border border-gray-300 text-gray-300 cursor-not-allowed"
                }`}
              >
                <MdKeyboardArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ListOfCompanies;
