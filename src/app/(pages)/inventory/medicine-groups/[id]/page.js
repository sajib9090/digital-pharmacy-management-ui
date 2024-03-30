"use client";
import DateFormatter from "@/app/Components/DateFormatter/DateFormatter";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { RiArrowRightDoubleFill, RiDeleteBin6Line } from "react-icons/ri";
import { LuLoader2 } from "react-icons/lu";

const SingleGroup = ({ params }) => {
  const [data, setData] = useState({});
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [sure, setSure] = useState(false);
  const router = useRouter();

  const handleDeleteGeneric = () => {
    setDeleteLoading(true);
    axios
      .delete(`http://localhost:8000/api/v1/generics/delete/${params?.id}`)
      .then((res) => {
        console.log(res);
        router.back();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setDeleteLoading(false);
      });
  };
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/v1/generics/get-generic?id=${params?.id}`)
      .then((res) => {
        setData(res?.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [params?.id]);

  return (
    <div className="pl-6 pt-2 container1">
      <div>
        <div className="text-[18px] font-bold capitalize">
          <Link href={"/inventory"} className="text-gray-400">
            Inventory {">"}{" "}
          </Link>
          <Link className="text-gray-400" href={"/inventory/medicine-groups"}>
            medicine-groups {">"}{" "}
          </Link>
          <Link href={"#"}>{data?.generic_slug}</Link>
        </div>
      </div>

      <div className="mt-4 h-[140px] w-[900px] border border-[#d0cfcf] rounded">
        <div className="h-[40px] w-full border-b border-[#d0cfcf] flex items-center px-4 font-semibold">
          <p>Details Info</p>
        </div>
        <div className="h-[100px] w-full flex items-center justify-between px-4">
          <div>
            <p className="font-bold">{data?.generic_id}</p>
            <p className="text-gray-500">Generic/Group Serial</p>
          </div>
          <div>
            <p className="font-bold capitalize">{data?.generic_name}</p>
            <p className="text-gray-500">Generic/Group Name</p>
          </div>
          <div>
            <p className="font-bold capitalize">
              <DateFormatter dateString={data?.createdAt} />
            </p>
            <p className="text-gray-500">Added At</p>
          </div>
          <div>
            <p className="font-bold">{data?.medicine_available?.length}</p>
            <p className="text-gray-500">Medicine Available</p>
          </div>
        </div>
      </div>

      {data?.medicine_available?.length > 0 ? (
        <div className="mt-8 w-full border border-[#d0cfcf] rounded bg-gray-50">
          {/* table */}
          <table className="w-full">
            <tr className="border-b border-[#d0cfcf] h-[35px] w-full text-[14px]">
              <th className="w-[5%] text-start pl-4">No.</th>
              <th className="w-[39%] text-start">Medicine Name</th>
              <th className="w-[9%] text-start">Medicine ID</th>
              <th className="w-[30%] text-start">Company Name</th>
              <th className="w-[9%] text-start">Stock In Qty</th>
              <th className="w-[8%] text-start">Action</th>
            </tr>

            {data?.medicine_available?.map((d, i) => {
              return (
                <tr
                  key={i}
                  className={`border-b border-[#ebebeb] min-h-[35px] w-full text-[14px]`}
                >
                  <td className="pl-4 py-2">{i + 1}</td>
                  <td className="capitalize">{d?.medicine_name}</td>
                  <td>0000000001</td>
                  <td>Company</td>
                  <td>1111</td>
                  <td>
                    <Link
                      href={`/inventory/list-of-medicines/${i}`}
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
      ) : (
        <div className="mt-8 w-full border border-[#d0cfcf] rounded bg-gray-50">
          <p className="text-center my-6">
            No details data available for this generic.
          </p>
        </div>
      )}

      {/* action button */}

      {sure ? (
        <button
          onClick={() => {
            handleDeleteGeneric();
            setSure(false);
          }}
          className="mt-3 w-[180px] h-[40px] border border-orange-600 text-orange-600 hover:text-white transition-all duration-500 hover:bg-orange-600 rounded flex items-center justify-center"
        >
          Are you sure?
        </button>
      ) : (
        <button
          onClick={(e) => setSure(true)}
          disabled={deleteLoading}
          className="mt-3 w-[180px] h-[40px] border border-red-600 text-red-600 hover:text-white transition-all duration-500 hover:bg-red-600 rounded flex items-center justify-center"
        >
          <RiDeleteBin6Line className="h-5 w-5 mr-2" />
          Delete Generic{" "}
          {deleteLoading && <LuLoader2 className="h-5 w-5 animate-spin ml-2" />}
        </button>
      )}
    </div>
  );
};

export default SingleGroup;