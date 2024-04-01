"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoIosAdd } from "react-icons/io";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import PrimaryError from "@/app/Components/PrimaryError/PrimaryError";
import PrimaryLoading from "@/app/Components/PrimaryLoading/PrimaryLoading";
import { useDosageStore } from "@/app/stores/dosageStore";
import axios from "axios";
import { baseUrl } from "@/secrets";

const DosageForms = () => {
  const shopName = "rayan pharmacy";
  const { dosageForms, getAllDosageForms, dosageLoading, dosageError } =
    useDosageStore();
  const [searchValue, setSearchValue] = useState("");
  const [resultPerPage, setResultPerPage] = useState("10");
  const [page, setPage] = useState(dosageForms.pagination?.currentPage || 1);

  const [removeAlert, setRemoveAlert] = useState("");
  const [error, setError] = useState("");

  const handleRemove = async (id) => {
    try {
      const res = await axios.delete(
        `${baseUrl}/api/v1/dosage-forms/delete/${id}`
      );
      if (res) {
        setError("");
        await getAllDosageForms(shopName, page, resultPerPage, searchValue);
      }
    } catch (err) {
      if (err) {
        setError("Something went wrong");
      }
    }
  };

  useEffect(() => {
    getAllDosageForms(shopName, page, resultPerPage, searchValue);
  }, [resultPerPage, page, searchValue]);

  return (
    <div className="pl-6 pt-2 container1">
      <div className="flex justify-between">
        <div>
          <div className="text-[18px] font-bold capitalize">
            <Link href={"/inventory"} className="text-gray-400">
              Inventory {">"}{" "}
            </Link>
            <Link href={"/inventory/dosage-forms"}>
              Dosage-forms ({dosageForms?.data_found})
            </Link>
          </div>
          <p className="text-[14px] capitalize">list of Dosage forms</p>
        </div>
        <div>
          <Link
            href={"/inventory/dosage-forms/add-new-dosage"}
            className="capitalize flex items-center justify-center h-[44px] w-[175px] bg-[#f0483e] text-white rounded"
          >
            <IoIosAdd className="h-6 w-6" /> add new dosage
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
          placeholder="Search dosage form..."
        />
      </div>

      {dosageError || error ? (
        <PrimaryError message={"Oops! Something went wrong!"} refresh={true} />
      ) : (
        <>
          <div className="mt-4 w-full border border-[#d0cfcf] rounded bg-gray-50 relative">
            {/* table */}
            <table className="w-full">
              <tr className="border-b border-[#d0cfcf] h-[35px] w-full text-[14px]">
                <th className="w-[5%] text-start pl-4">No.</th>
                <th className="w-[60%] text-start">Dosage form title</th>
                <th className="w-[15%] text-start">No of Medicines</th>
                <th className="w-[20%] text-start">Action</th>
              </tr>

              {dosageForms?.data?.map((d, i) => {
                return (
                  <tr
                    key={i}
                    className={`border-b border-[#ebebeb] h-[40px] w-full text-[14px]`}
                  >
                    <td className="pl-4 py-2">
                      {" "}
                      {i +
                        1 +
                        dosageForms?.pagination?.currentPage * resultPerPage -
                        resultPerPage}
                    </td>
                    <td className="capitalize">{d?.dosage_form}</td>
                    <td>{d?.medicine_available}</td>

                    <td>
                      {removeAlert == d?._id ? (
                        <span>
                          <span className="text-[12px]">
                            Are you sure want to remove?
                          </span>
                          <span className="flex items-center justify-between mr-14">
                            <button
                              onClick={() => {
                                handleRemove(d?._id);
                                setRemoveAlert(!removeAlert);
                              }}
                              className="flex items-center text-[12px] text-red-600"
                              disabled={dosageLoading}
                            >
                              Yes
                            </button>
                            <button
                              onClick={() => setRemoveAlert(!removeAlert)}
                              className="flex items-center text-[12px] text-blue-600"
                            >
                              No
                            </button>
                          </span>
                        </span>
                      ) : (
                        <button
                          onClick={() => setRemoveAlert(d?._id)}
                          className="flex items-center text-[12px] text-red-600"
                          disabled={dosageLoading}
                        >
                          Remove
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </table>

            {dosageLoading && (
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
                disabled={
                  dosageForms?.pagination?.previousPage == null || dosageLoading
                }
                className={`h-[27px] w-[27px] flex items-center justify-center border border-gray-300 rounded ${
                  dosageForms?.pagination?.previousPage != null
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
                    length: dosageForms?.pagination?.totalPages,
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
                  dosageForms?.pagination?.nextPage == null || dosageLoading
                }
                className={`h-[27px] w-[27px] flex items-center justify-center border border-gray-300 rounded ${
                  dosageForms?.pagination?.nextPage != null
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

export default DosageForms;
