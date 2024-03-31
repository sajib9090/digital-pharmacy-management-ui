"use client";
import DateFormatter from "@/app/Components/DateFormatter/DateFormatter";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { RiArrowRightDoubleFill, RiDeleteBin6Line } from "react-icons/ri";
import { LuLoader2 } from "react-icons/lu";
import PrimaryError from "@/app/Components/PrimaryError/PrimaryError";
import { baseUrl } from "@/secrets.js";

const SingleCompany = ({ params }) => {
  const [searchValue, setSearchValue] = useState("");
  const [data, setData] = useState({});
  const [filteredData, setFilteredData] = useState([]);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const [sure, setSure] = useState(false);
  const [dataLength, setDataLength] = useState(10);
  const router = useRouter();

  useEffect(() => {
    const filter = data?.medicine_available?.filter((item) =>
      item?.medicine_name.includes(searchValue)
    );

    setFilteredData(filter);
  }, [searchValue]);

  const handleDeleteCompany = async () => {
    try {
      setDeleteLoading(true);
      const res = await axios.delete(
        `${baseUrl}/api/v1/companies/delete/${params?.id}`
      );
      if (res) {
        setDeleteError("");
        router.back();
      }
    } catch (err) {
      if (err) {
        setDeleteError("Something went wrong");
      }
    } finally {
      setDeleteLoading(false);
    }
  };

  useEffect(() => {
    axios
      .get(`${baseUrl}/api/v1/companies/get-company?id=${params?.id}`)
      .then((res) => {
        setData(res?.data?.data);
        setFilteredData(res?.data.data?.medicine_available);
      })
      .catch((err) => {
        if (err) {
          setDeleteError("Something went wrong");
        }
      });
  }, [params?.id]);
  return (
    <div className="pl-6 pt-2 container1">
      <div>
        <div className="text-[18px] font-bold capitalize">
          <Link href={"/inventory"} className="text-gray-400">
            Inventory {">"}{" "}
          </Link>
          <Link className="text-gray-400" href={"/inventory/list-of-companies"}>
            list-of-companies {">"}{" "}
          </Link>
          <Link href={"#"}>{data?.company_slug}</Link>
        </div>
      </div>

      <div className="mt-4 h-[140px] w-full border border-[#d0cfcf] rounded">
        <div className="h-[40px] w-full border-b border-[#d0cfcf] flex items-center px-4 font-semibold">
          <p>Details Info</p>
        </div>
        <div className="h-[100px] w-full flex items-center justify-between px-4">
          <div>
            <p className="font-bold">{data?.company_id}</p>
            <p className="text-gray-500">Company/Supplier Serial</p>
          </div>
          <div>
            <p className="font-bold capitalize">{data?.company_name}</p>
            <p className="text-gray-500">Company/Supplier Name</p>
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

      <div className="search mt-4 -mb-4">
        <input
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
          className="rounded"
          type="search"
          placeholder="Search medicine within this group..."
        />
      </div>

      {filteredData?.length > 0 ? (
        <>
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

              {filteredData?.slice(0, dataLength)?.map((d, i) => {
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
          {filteredData?.length > 10 && dataLength == 10 && (
            <p
              onClick={() => setDataLength(filteredData?.length)}
              className="text-center my-3 cursor-pointer underline"
            >
              See More
            </p>
          )}
        </>
      ) : (
        <PrimaryError message={"No such details found"} refresh={false} />
      )}

      <p className="mt-3 text-red-600">{deleteError}</p>

      {/* action button */}

      {sure ? (
        <button
          onClick={() => {
            handleDeleteCompany();
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
          Delete Company{" "}
          {deleteLoading && <LuLoader2 className="h-5 w-5 animate-spin ml-2" />}
        </button>
      )}
    </div>
  );
};

export default SingleCompany;
