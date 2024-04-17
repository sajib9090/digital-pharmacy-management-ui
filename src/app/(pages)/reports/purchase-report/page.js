"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoIosAdd } from "react-icons/io";
import { CiFilter } from "react-icons/ci";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { RiArrowRightDoubleFill } from "react-icons/ri";
import { usePurchaseStore } from "@/app/stores/purchaseStore";
import DateFormatter from "@/app/Components/DateFormatter/DateFormatter";
import { useCompanyStore } from "@/app/stores/companyStore";

const PurchaseReport = () => {
  const shopName = "rayan pharmacy";
  const { purchases, getAllPurchases, purchaseLoading } = usePurchaseStore();
  const { companies, getAllCompanies, companyLoading } = useCompanyStore();
  const [resultPerPage, setResultPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [companyValue, setCompanyValue] = useState("");
  const [priceValue, setPriceValue] = useState("");
  const [categoryValue, setCategoryValue] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    getAllPurchases(
      shopName,
      companyValue,
      page,
      resultPerPage,
      priceValue,
      categoryValue,
      startDate,
      endDate,
      searchValue
    );

    getAllCompanies(shopName);
  }, [
    resultPerPage,
    page,
    companyValue,
    priceValue,
    categoryValue,
    startDate,
    endDate,
    searchValue,
  ]);
  return (
    <div className="pl-6 pt-2 container1">
      <div className="flex justify-between">
        <div className="text-[18px] font-bold capitalize">
          <Link href={"/reports"} className="text-gray-400">
            Reports {">"}{" "}
          </Link>
          <Link href={"/reports/purchase-report"}>Purchase-report</Link>
        </div>
        <div>
          <Link
            href={"/reports/purchase-report/medicine-purchase"}
            prefetch={true}
            className="capitalize flex items-center justify-center h-[44px] w-[180px] bg-[#f0483e] text-white rounded"
          >
            <IoIosAdd className="h-6 w-6" />
            medicine purchase
          </Link>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="search">
          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="rounded"
            type="search"
            placeholder="Search by id, company name or category..."
          />
        </div>
        <div>date</div>
        <div>
          <div className="selectOp flex items-center">
            <CiFilter className="h-6 w-6 mr-2" />
            <select
              name=""
              id=""
              className="rounded"
              value={companyValue}
              onChange={(e) => setCompanyValue(e.target.value)}
            >
              <option value="" disabled selected>
                {companyLoading ? "Please wait..." : "Choose a company"}
              </option>
              {companies?.data?.map((data) => (
                <option key={data?._id} value={data?.company_name}>
                  {data?.company_name}
                </option>
              ))}
            </select>
          </div>
          <div className="selectOp flex items-center mt-2">
            <CiFilter className="h-6 w-6 mr-2" />
            <select
              name=""
              id=""
              className="rounded"
              value={categoryValue}
              onChange={(e) => setCategoryValue(e.target.value)}
            >
              <option value="" disabled selected>
                Choose a category
              </option>

              <option value="medicine">Medicine</option>
              <option value="surgical">Surgical</option>
            </select>
          </div>
          <div className="selectOp flex items-center mt-2">
            <CiFilter className="h-6 w-6 mr-2" />
            <select
              name=""
              id=""
              className="rounded"
              value={priceValue}
              onChange={(e) => setPriceValue(e.target.value)}
            >
              <option value="" disabled selected>
                Filter with price
              </option>

              <option value="low-to-high">Low to High</option>
              <option value="high-to-low">High to Low</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mt-4 w-full border border-[#d0cfcf] rounded bg-gray-50">
        {/* table */}
        <table className="w-full">
          <tr className="border-b border-[#d0cfcf] h-[35px] w-full text-[14px]">
            <th className="w-[5%] text-start pl-4">No.</th>
            <th className="w-[25%] text-start">Invoice ID</th>
            <th className="w-[15%] text-start">Company</th>
            <th className="w-[15%] text-start">Category</th>
            <th className="w-[20%] text-start">Time</th>
            <th className="w-[10%] text-start">Bill</th>
            <th className="w-[10%] text-start">Action</th>
          </tr>

          {purchases?.data?.map((d, i) => {
            return (
              <tr
                key={i}
                className={`border-b border-[#ebebeb] min-h-[35px] w-full text-[14px]`}
              >
                <td className="pl-4 py-2">
                  {i +
                    1 +
                    purchases?.pagination?.currentPage * resultPerPage -
                    resultPerPage}
                </td>
                <td>{d?._id}</td>
                <td className="capitalize">
                  {d?.company_name?.length > 10
                    ? d?.company_name?.slice(0, 10) + "..."
                    : d?.company_name}
                </td>
                <td className="capitalize">{d?.category}</td>
                <td>
                  <DateFormatter dateString={d?.createdAt} />
                </td>
                <td>{Number(d?.total_price).toLocaleString()}</td>
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

      {/* pagination */}
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
          <button
            onClick={() => setPage(page - 1)}
            disabled={
              purchases?.pagination?.previousPage == null || purchaseLoading
            }
            className={`h-[27px] w-[27px] flex items-center justify-center border border-gray-300 rounded ${
              purchases?.pagination?.previousPage != null
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
                length: purchases?.pagination?.totalPages,
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
              purchases?.pagination?.nextPage == null || purchaseLoading
            }
            className={`h-[27px] w-[27px] flex items-center justify-center border border-gray-300 rounded ${
              purchases?.pagination?.nextPage != null
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

export default PurchaseReport;
