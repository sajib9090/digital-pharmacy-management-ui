"use client";
import PrimaryError from "@/app/Components/PrimaryError/PrimaryError";
import { baseUrl } from "@/secrets";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { LuLoader2 } from "react-icons/lu";

const SingleMedicine = ({ params }) => {
  const [data, setData] = useState({});
  const [deleteAction, setDeleteAction] = useState(false);
  const [error, setError] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async (id) => {
    setDeleteLoading(true);
    try {
      const response = await axios.delete(
        `${baseUrl}/api/v1/medicines/delete-medicine/${id}`
      );
      if (response) {
        setError("");
        router.back();
      }
    } catch (error) {
      setError(
        error?.response?.data?.message
          ? error?.response?.data?.message
          : "Something went wrong"
      );
    } finally {
      setDeleteLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/api/v1/medicines/get-medicine?id=${params?.id}`
        );
        setData(response?.data?.data);
      } catch (error) {
        setError(
          error?.response?.data?.message
            ? error?.response?.data?.message
            : "Something went wrong"
        );
      }
    };

    fetchData();
  }, [params]);

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
            <Link href={"#"}>{data?.medicine_title_slug}</Link>
          </div>
        </div>
        <div>
          <Link
            href={`/inventory/list-of-medicines/${params?.id}/update?id=${params?.id}`}
            className="capitalize flex items-center justify-center h-[44px] w-[175px] bg-[#03a9f5] text-white rounded"
          >
            <CiEdit className="h-6 w-6" /> edit details
          </Link>
        </div>
      </div>

      {error ? (
        <PrimaryError message={error} refresh={true} />
      ) : (
        <>
          <div className="mt-4 h-[140px] w-[450px] border border-[#d0cfcf] rounded">
            <div className="h-[40px] w-full border-b border-[#d0cfcf] flex items-center px-4 font-semibold">
              <p>Inventory in QTY</p>
            </div>
            <div className="h-[100px] w-full flex items-center justify-between px-4">
              <div>
                <p className="font-bold">{data?.lifetime_supply}</p>
                <p className="text-gray-500">Lifetime Supply</p>
              </div>
              <div>
                <p className="font-bold">{data?.lifetime_sells}</p>
                <p className="text-gray-500">Lifetime Sales</p>
              </div>
              <div>
                <p className="font-bold">{data?.stock_left}</p>
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
                  {data?.medicine_id}
                </td>
              </tr>
              <tr className="border-b border-[#d0cfcf] h-[35px] w-full text-[14px]">
                <th className="border-collapse w-[20%] text-left pl-4 border-r border-[#d0cfcf]">
                  Medicine Name:
                </th>
                <td className="border-collapse w-[80%] text-left pl-4">
                  {data?.medicine_name}
                </td>
              </tr>
              <tr className="border-b border-[#d0cfcf] h-[35px] w-full text-[14px]">
                <th className="border-collapse w-[20%] text-left pl-4 border-r border-[#d0cfcf]">
                  Generic Name:
                </th>
                <td className="border-collapse w-[80%] text-left pl-4">
                  {data?.generic_name}
                </td>
              </tr>
              <tr className="border-b border-[#d0cfcf] h-[35px] w-full text-[14px]">
                <th className="border-collapse w-[20%] text-left pl-4 border-r border-[#d0cfcf]">
                  Company Name :
                </th>
                <td className="border-collapse w-[80%] text-left pl-4">
                  {data?.company_name}
                </td>
              </tr>
              <tr className="border-b border-[#d0cfcf] h-[35px] w-full text-[14px]">
                <th className="border-collapse w-[20%] text-left pl-4 border-r border-[#d0cfcf]">
                  Strength/Weight :
                </th>
                <td className="border-collapse w-[80%] text-left pl-4">
                  {data?.strength}
                </td>
              </tr>
              <tr className="border-b border-[#d0cfcf] h-[35px] w-full text-[14px]">
                <th className="border-collapse w-[20%] text-left pl-4 border-r border-[#d0cfcf]">
                  Dosage Form :
                </th>
                <td className="border-collapse w-[80%] text-left pl-4">
                  {data?.dosage_form}
                </td>
              </tr>
              <tr className="border-b border-[#d0cfcf] h-[35px] w-full text-[14px]">
                <th className="border-collapse w-[20%] text-left pl-4 border-r border-[#d0cfcf]">
                  Purchase Price :
                </th>
                <td className="border-collapse w-[80%] text-left pl-4">
                  {data?.purchase_price}
                </td>
              </tr>
              <tr className="border-b border-[#d0cfcf] h-[35px] w-full text-[14px]">
                <th className="border-collapse w-[20%] text-left pl-4 border-r border-[#d0cfcf]">
                  Sell Price :
                </th>
                <td className="border-collapse w-[80%] text-left pl-4">
                  {data?.sell_price}
                </td>
              </tr>
              <tr className="h-[35px] w-full text-[14px]">
                <th className="border-collapse w-[20%] text-left pl-4 border-r border-[#d0cfcf]">
                  Left Stock :
                </th>
                <td className="border-collapse w-[80%] text-left pl-4">
                  {data?.stock_left}
                </td>
              </tr>
            </table>
          </div>
          {/* action button */}
          {deleteAction ? (
            <div className="mt-3 mb-4 w-[180px] h-[40px]">
              <p className="text-center">Are you sure?</p>
              <div className="flex items-center justify-between">
                <button
                  disabled={deleteLoading}
                  onClick={() => handleDelete(data?._id)}
                  className="w-[70px] h-[22px] border border-red-600 text-red-600 hover:text-white transition-all duration-500 hover:bg-red-600 rounded flex items-center justify-center"
                >
                  {deleteLoading ? (
                    <LuLoader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Yes"
                  )}
                </button>
                <button
                  onClick={() => setDeleteAction(!deleteAction)}
                  className="w-[70px] h-[22px] border border-blue-600 text-blue-600 hover:text-white transition-all duration-500 hover:bg-blue-600 rounded flex items-center justify-center"
                >
                  No
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setDeleteAction(!deleteAction)}
              className="mt-3 mb-4 w-[180px] h-[40px] border border-red-600 text-red-600 hover:text-white transition-all duration-500 hover:bg-red-600 rounded flex items-center justify-center"
            >
              <RiDeleteBin6Line className="h-5 w-5 mr-2" />
              Delete Item
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default SingleMedicine;
