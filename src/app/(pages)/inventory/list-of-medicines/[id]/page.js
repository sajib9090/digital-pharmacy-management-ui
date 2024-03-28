"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";

const SingleMedicine = () => {
  const { id } = useParams();

  return (
    <div className="pl-6 pt-2 container1">
      <div className="flex justify-between">
        <div>
          <div className="text-[18px] font-bold capitalize">
            <Link href={"/inventory"} className="text-gray-400">
              Inventory {">"}{" "}
            </Link>
            <Link
              className="text-gray-400"
              href={"/inventory/list-of-medicines"}
            >
              List-of-medicines {">"}{" "}
            </Link>
            <Link href={"#"}>{id}</Link>
          </div>
        </div>
        <div>
          <Link
            href={`/inventory/list-of-medicines/${id}/update?id=${id}`}
            className="capitalize flex items-center justify-center h-[44px] w-[175px] bg-[#03a9f5] text-white rounded"
          >
            <CiEdit className="h-6 w-6" /> edit details
          </Link>
        </div>
      </div>

      <div className="mt-4 h-[140px] w-[450px] border border-[#d0cfcf] rounded">
        <div className="h-[40px] w-full border-b border-[#d0cfcf] flex items-center px-4 font-semibold">
          <p>Inventory in QTY</p>
        </div>
        <div className="h-[100px] w-full flex items-center justify-between px-4">
          <div>
            <p className="font-bold">333</p>
            <p className="text-gray-500">Lifetime Supply</p>
          </div>
          <div>
            <p className="font-bold">333</p>
            <p className="text-gray-500">Lifetime Sales</p>
          </div>
          <div>
            <p className="font-bold">333</p>
            <p className="text-gray-500">Stock Left</p>
          </div>
        </div>
      </div>

      <div className="mt-4 min-h-[300px] w-full border border-[#d0cfcf] rounded">
        <table className="w-full">
          <tr className="border-b border-[#d0cfcf] h-[35px] w-full text-[14px]">
            <th className="border-collapse w-[20%] text-left pl-4 border-r border-[#d0cfcf]">
              Medicine ID:
            </th>
            <td className="border-collapse w-[80%] text-left pl-4">
              00000000001
            </td>
          </tr>
          <tr className="border-b border-[#d0cfcf] h-[35px] w-full text-[14px]">
            <th className="border-collapse w-[20%] text-left pl-4 border-r border-[#d0cfcf]">
              Medicine Name:
            </th>
            <td className="border-collapse w-[80%] text-left pl-4">
              Augmentin 625 Duo Tablet
            </td>
          </tr>
          <tr className="border-b border-[#d0cfcf] h-[35px] w-full text-[14px]">
            <th className="border-collapse w-[20%] text-left pl-4 border-r border-[#d0cfcf]">
              Generic Name:
            </th>
            <td className="border-collapse w-[80%] text-left pl-4">
              Augmentin 625 Duo Tablet
            </td>
          </tr>
          <tr className="border-b border-[#d0cfcf] h-[35px] w-full text-[14px]">
            <th className="border-collapse w-[20%] text-left pl-4 border-r border-[#d0cfcf]">
              Company Name :
            </th>
            <td className="border-collapse w-[80%] text-left pl-4">
              Augmentin 625 Duo Tablet
            </td>
          </tr>
          <tr className="border-b border-[#d0cfcf] h-[35px] w-full text-[14px]">
            <th className="border-collapse w-[20%] text-left pl-4 border-r border-[#d0cfcf]">
              Strength/Weight :
            </th>
            <td className="border-collapse w-[80%] text-left pl-4">200mg</td>
          </tr>
          <tr className="border-b border-[#d0cfcf] h-[35px] w-full text-[14px]">
            <th className="border-collapse w-[20%] text-left pl-4 border-r border-[#d0cfcf]">
              Dosage Form :
            </th>
            <td className="border-collapse w-[80%] text-left pl-4">Tablet</td>
          </tr>
          <tr className="border-b border-[#d0cfcf] h-[35px] w-full text-[14px]">
            <th className="border-collapse w-[20%] text-left pl-4 border-r border-[#d0cfcf]">
              Purchase Price :
            </th>
            <td className="border-collapse w-[80%] text-left pl-4">111</td>
          </tr>
          <tr className="border-b border-[#d0cfcf] h-[35px] w-full text-[14px]">
            <th className="border-collapse w-[20%] text-left pl-4 border-r border-[#d0cfcf]">
              Sell Price :
            </th>
            <td className="border-collapse w-[80%] text-left pl-4">111</td>
          </tr>
          <tr className="h-[35px] w-full text-[14px]">
            <th className="border-collapse w-[20%] text-left pl-4 border-r border-[#d0cfcf]">
              Left Stock :
            </th>
            <td className="border-collapse w-[80%] text-left pl-4">111</td>
          </tr>
        </table>
      </div>

      {/* action button */}
      <button className="mt-3 w-[180px] h-[40px] border border-red-600 text-red-600 hover:text-white transition-all duration-500 hover:bg-red-600 rounded flex items-center justify-center">
        <RiDeleteBin6Line className="h-5 w-5 mr-2" />
        Delete Item
      </button>
    </div>
  );
};

export default SingleMedicine;
