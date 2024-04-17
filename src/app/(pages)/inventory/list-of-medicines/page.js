/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from "react";
import { IoIosAdd } from "react-icons/io";
import { CiFilter } from "react-icons/ci";
import Link from "next/link";
import { RiArrowRightDoubleFill } from "react-icons/ri";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useMedicineStore } from "@/app/stores/medicineStore";
import { useGenericStore } from "@/app/stores/genericStore";
import PrimaryError from "@/app/Components/PrimaryError/PrimaryError";
import PrimaryLoading from "@/app/Components/PrimaryLoading/PrimaryLoading";

const ListOfMedicines = () => {
  const shopName = "rayan pharmacy";
  const { medicines, getAllMedicines, medicineLoading, medicineError } =
    useMedicineStore();
  const { generics, getAllGenerics, genericError, genericLoading } =
    useGenericStore();

  const [searchValue, setSearchValue] = useState("");
  const [genericValue, setGenericValue] = useState("");
  const [stockLeftValue, setStockLeftValue] = useState("");
  const [resultPerPage, setResultPerPage] = useState("10");
  const [page, setPage] = useState(1);
  const [error, setError] = useState("");

  useEffect(() => {
    const abortController = new AbortController();

    const fetchMedicines = async () => {
      try {
        await getAllMedicines(
          shopName,
          genericValue,
          stockLeftValue,
          page,
          resultPerPage,
          searchValue,
          abortController.signal
        );
        setError("");
      } catch (error) {
        setError("Something went wrong");
      }
    };
    const fetchGenerics = async () => {
      try {
        await getAllGenerics(shopName, abortController.signal);
        setError("");
      } catch (error) {
        setError("Something went wrong");
      }
    };

    fetchMedicines();
    fetchGenerics();

    return () => {
      abortController.abort();
    };
  }, [
    resultPerPage,
    page,
    searchValue,
    genericValue,
    stockLeftValue,
    getAllMedicines,
    shopName,
  ]);

  return (
    <div className="pl-6 pt-2 container1">
      <div className="flex justify-between">
        <div>
          <div className="text-[18px] font-bold capitalize">
            <Link href={"/inventory"} className="text-gray-400">
              Inventory {">"}{" "}
            </Link>
            <Link href={"/inventory/list-of-medicines"}>
              List-of-medicines ({medicines?.data_found})
            </Link>
          </div>
          <p className="text-[14px] capitalize">
            list of medicines available for sale
          </p>
        </div>
        <div>
          <Link
            href={"/inventory/list-of-medicines/add-new-medicine"}
            className="capitalize flex items-center justify-center h-[44px] w-[175px] bg-[#f0483e] text-white rounded"
          >
            <IoIosAdd className="h-6 w-6" /> add new medicine
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
            placeholder="Search medicine..."
          />
        </div>

        <div className="selectOp flex items-center">
          <CiFilter className="h-6 w-6 mr-2" />
          <select
            value={stockLeftValue}
            onChange={(e) => setStockLeftValue(e.target.value)}
            name=""
            id=""
            className="rounded"
          >
            <option value="" selected disabled>
              Filter with Stock Left
            </option>
            <option value="high-to-low">High To Low</option>
            <option value="low-to-high">Low To High</option>
          </select>
        </div>
        <div className="selectOp flex items-center">
          <CiFilter className="h-6 w-6 mr-2" />
          <select
            value={genericValue}
            onChange={(e) => setGenericValue(e.target.value)}
            name=""
            id=""
            className="rounded"
          >
            <option value="" selected disabled>
              Filter with group/generic
            </option>
            {generics &&
              generics?.data?.map((g, i) => (
                <option key={g?._id} value={g?.generic_name}>
                  {g?.generic_name}
                </option>
              ))}
          </select>
        </div>
      </div>

      {genericValue || stockLeftValue || searchValue ? (
        <div className="mt-2 flex items-center justify-end">
          <button
            onClick={() => {
              setSearchValue("");
              setGenericValue("");
              setStockLeftValue("");
            }}
            className="flex items-center justify-center text-red-600 underline"
            title="reset filter"
          >
            <CiFilter className="h-6 w-6 mr-1" /> Reset filter
          </button>
        </div>
      ) : null}

      {medicineError || genericError || error ? (
        <PrimaryError message={"Oops! Something went wrong!"} refresh={true} />
      ) : (
        <>
          <div className="mt-4 w-full border border-[#d0cfcf] rounded bg-gray-50 relative">
            {/* table */}
            <table className="w-full">
              <tr className="border-b border-[#d0cfcf] h-[35px] w-full text-[14px]">
                <th className="w-[5%] text-start pl-4">No.</th>
                <th className="w-[43%] text-start">Medicine Name</th>
                <th className="w-[10%] text-start">Medicine ID</th>
                <th className="w-[25%] text-start">Group/Generic Name</th>
                <th className="w-[9%] text-start">Stock In Qty</th>
                <th className="w-[8%] text-start">Action</th>
              </tr>

              {medicines?.data?.map((medicine, i) => {
                return (
                  <tr
                    key={medicine?._id}
                    className={`border-b border-[#ebebeb] min-h-[35px] w-full text-[14px]`}
                  >
                    <td className="pl-4 py-2">
                      {i +
                        1 +
                        medicines?.pagination?.currentPage * resultPerPage -
                        resultPerPage}
                    </td>
                    <td className="capitalize">
                      <span className="mr-2 text-gray-500">
                        {medicine?.dosage_form?.length > 6
                          ? medicine?.dosage_form?.slice(0, 6) + ".."
                          : medicine?.dosage_form}
                        .
                      </span>
                      <span>
                        {medicine?.medicine_name?.length > 30
                          ? medicine?.medicine_name?.slice(0, 30) + ".."
                          : medicine?.medicine_name}
                      </span>
                      <span className="ml-2 text-gray-500">
                        {medicine?.strength}
                      </span>
                    </td>
                    <td className="text-gray-500 text-xs">
                      {medicine?.medicine_id}
                    </td>
                    <td className="capitalize">
                      {medicine?.generic_name?.length > 30
                        ? medicine?.generic_name?.slice(0, 30) + ".."
                        : medicine?.generic_name}
                    </td>
                    <td
                      className={`${
                        medicine?.stock_left ? "text-green-700" : "text-red-600"
                      } font-medium`}
                    >
                      {medicine?.stock_left}
                    </td>
                    <td>
                      <Link
                        href={`/inventory/list-of-medicines/${medicine?._id}`}
                        className="flex items-center text-[12px] text-blue-600"
                      >
                        View Detail <RiArrowRightDoubleFill />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </table>
            {medicineLoading && (
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
                  medicines?.pagination?.previousPage == null || medicineLoading
                }
                className={`h-[27px] w-[27px] flex items-center justify-center border border-gray-300 rounded ${
                  medicines?.pagination?.previousPage != null
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
                    length: medicines?.pagination?.totalPages,
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
                  medicines?.pagination?.nextPage == null || medicineLoading
                }
                className={`h-[27px] w-[27px] flex items-center justify-center border border-gray-300 rounded ${
                  medicines?.pagination?.nextPage != null
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

export default ListOfMedicines;
