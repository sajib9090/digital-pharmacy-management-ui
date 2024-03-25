"use client";
import React, { useEffect, useState } from "react";
import { IoIosAdd } from "react-icons/io";
import { CiFilter } from "react-icons/ci";
import Link from "next/link";
import { RiArrowRightDoubleFill } from "react-icons/ri";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { RiArrowGoBackLine } from "react-icons/ri";
import { MdCancel } from "react-icons/md";

const ListOfMedicines = () => {
  const [addFormVisible, setAddFormVisible] = useState(false);

  return (
    <>
      {!addFormVisible ? (
        <div className="pl-6 pt-2 container1">
          <div className="flex justify-between">
            <div>
              <div className="text-[18px] font-bold capitalize">
                <Link href={"/inventory"} className="text-gray-400">
                  Inventory {">"}{" "}
                </Link>
                <Link href={"/inventory/list-of-medicines"}>
                  List-of-medicines
                </Link>
              </div>
              <p className="text-[14px] capitalize">
                list of medicines available for sale
              </p>
            </div>
            <div>
              <button
                onClick={() => setAddFormVisible(!addFormVisible)}
                className="capitalize flex items-center justify-center h-[44px] w-[175px] bg-[#f0483e] text-white rounded"
              >
                <IoIosAdd className="h-6 w-6" /> add new medicine
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="search">
              <input
                className="rounded"
                type="search"
                placeholder="Search medicine..."
              />
            </div>
            <div className="selectOp flex items-center">
              <CiFilter className="h-6 w-6 mr-2" />
              <select name="" id="" className="rounded">
                <option value="">Choose a category</option>
                <option value="">category</option>
                <option value="">category</option>
                <option value="">category</option>
              </select>
            </div>
          </div>

          <div className="mt-4 w-full border border-[#d0cfcf] rounded bg-gray-50">
            {/* table */}
            <table className="w-full">
              <tr className="border-b border-[#d0cfcf] h-[35px] w-full text-[14px]">
                <th className="w-[5%] text-start pl-4">No.</th>
                <th className="w-[39%] text-start">Medicine Name</th>
                <th className="w-[9%] text-start">Medicine ID</th>
                <th className="w-[30%] text-start">Group Name</th>
                <th className="w-[9%] text-start">Stock In Qty</th>
                <th className="w-[8%] text-start">Action</th>
              </tr>

              {Array.from({ length: 9 }).map((d, i) => {
                return (
                  <tr
                    key={i}
                    className={`border-b border-[#ebebeb] min-h-[35px] w-full text-[14px]`}
                  >
                    <td className="pl-4 py-2">{i + 1}</td>
                    <td>Augmentin 625 Duo Tablet</td>
                    <td>0000000001</td>
                    <td>Generic Name</td>
                    <td>1111</td>
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

          <div className="flex items-center justify-end mt-2">
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
      ) : null}

      {/* Add New Medicine form */}
      {addFormVisible && (
        <div className="pl-6 pt-2 container1">
          <div className="">
            <div className="text-[18px] font-bold capitalize">
              <Link href={"/inventory"} className="text-gray-400">
                Inventory {">"} {""}{" "}
              </Link>
              <Link
                href={"/inventory/list-of-medicines"}
                className="text-gray-400"
              >
                List-of-medicines {">"}{" "}
              </Link>
              <Link href={"#"}>Add New Medicine</Link>
            </div>
            <p>*All fields are mandatory, except mentioned as (optional).</p>
          </div>

          {/* form */}
          <div className="w-[760px]">
            <div
              onClick={() => setAddFormVisible(!addFormVisible)}
              className="flex justify-end"
            >
              <MdCancel className="h-6 w-6 text-[#f0483e] cursor-pointer" />
            </div>
            <form className="w-full">
              <div className="mt-6">
                <label className="text-[14px]">Medicine Name *</label>
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="Enter medicine name max 100 characters"
                  className="h-[35px] w-full border border-[#c1c1c1] rounded px-2 mt-1"
                />
              </div>
              <div className="mt-6 flex items-center justify-between gap-4">
                <div className="w-full">
                  <label className="text-[14px]">Generic Name *</label>
                  <select className="h-[35px] w-full border border-[#c1c1c1] rounded px-2 mt-1">
                    <option value="" disabled selected>
                      Choose a Generic
                    </option>
                    <option value="volvo">Volvo</option>
                    <option value="volvo">Volvo</option>
                    <option value="bmw">bmw</option>
                  </select>
                </div>
                <div className="w-full">
                  <label className="text-[14px]">Company Name *</label>
                  <select className="h-[35px] w-full border border-[#c1c1c1] rounded px-2 mt-1">
                    <option value="" disabled selected>
                      Choose a Company
                    </option>
                    <option value="beximco">Beximco</option>
                    <option value="volvo">Volvo</option>
                    <option value="bmw">bmw</option>
                  </select>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between gap-4">
                <div className="w-full">
                  <label className="text-[14px]">Strength/Weight *</label>
                  <input
                    type="text"
                    name=""
                    id=""
                    placeholder="Enter strength 100 mg+200 mg+200 mcg"
                    className="h-[35px] w-full border border-[#c1c1c1] rounded px-2 mt-1"
                  />
                </div>
                <div className="w-full">
                  <label className="text-[14px]">Dosage Form *</label>
                  <select className="h-[35px] w-full border border-[#c1c1c1] rounded px-2 mt-1">
                    <option value="" disabled selected>
                      Choose a dosage form
                    </option>
                    <option value="tablet">tablet</option>capsule
                    <option value="capsule">capsule</option>syrup
                    <option value="syrup">syrup</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between gap-4">
                <div className="w-full">
                  <label className="text-[14px]">
                    Purchase Price in Number*
                  </label>
                  <input
                    type="number"
                    name=""
                    id=""
                    placeholder="Enter purchase price"
                    className="h-[35px] w-full border border-[#c1c1c1] rounded px-2 mt-1"
                  />
                </div>
                <div className="w-full">
                  <label className="text-[14px]">Sell Price in Number*</label>
                  <input
                    type="number"
                    name=""
                    id=""
                    placeholder="Enter sell price"
                    className="h-[35px] w-full border border-[#c1c1c1] rounded px-2 mt-1"
                  />
                </div>
                <div className="w-full">
                  <label className="text-[14px]">Quantity in Number*</label>
                  <input
                    type="number"
                    name=""
                    id=""
                    placeholder="Enter quantity"
                    className="h-[35px] w-full border border-[#c1c1c1] rounded px-2 mt-1"
                  />
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between gap-4">
                <button className="h-[35px] w-[150px] bg-[#f0483e] rounded text-white">
                  Save Details
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ListOfMedicines;
