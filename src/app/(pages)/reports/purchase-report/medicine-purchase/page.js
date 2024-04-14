"use client";
import PrimaryError from "@/app/Components/PrimaryError/PrimaryError";
import {
  cartData,
  increaseItemQuantity,
  removeSinglePurchaseItem,
  updatePurchaseCart,
} from "@/app/localDB/localDB";
import { useMedicineStore } from "@/app/stores/medicineStore";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { RiDeleteBack2Fill } from "react-icons/ri";

const MedicinePurchase = () => {
  const shopName = "rayan pharmacy";
  const { medicines, getAllMedicines, medicineLoading } = useMedicineStore();
  const [searchValue, setSearchValue] = useState("");
  const [error, setError] = useState("");
  const [localCartData, setLocalCartData] = useState([]);

  const searchResultData =
    medicines &&
    searchValue &&
    medicines?.data?.filter((medicine) =>
      medicine?.medicine_name?.includes(searchValue)
    );

  const fetchLocalData = () => {
    setLocalCartData(cartData("purchase_cart"));
  };

  const handlePurchase = (data, quantity) => {
    updatePurchaseCart(data, quantity);
    fetchLocalData();
    setSearchValue("");
  };

  const handleQuantityIncrease = (item) => {
    increaseItemQuantity(item);
    fetchLocalData();
  };

  const handleRemoveItem = (item) => {
    console.log(item);
    removeSinglePurchaseItem(item);
    fetchLocalData();
  };

  useEffect(() => {
    const abortController = new AbortController();

    const fetchAllData = async () => {
      try {
        await getAllMedicines(shopName, { signal: abortController.signal });
      } catch (error) {
        setError(error?.response?.data?.message || "Server Error!");
      }
    };

    fetchAllData();
    fetchLocalData();

    return () => {
      abortController.abort();
    };
  }, []);
  return (
    <div className="pl-6 pt-2 container1">
      <div className="text-[18px] font-bold capitalize">
        <Link href={"/reports"} className="text-gray-400">
          Reports {">"}{" "}
        </Link>
        <Link href={"/reports/purchase-report"} className="text-gray-400">
          Purchase-report {">"}{" "}
        </Link>
        <Link href={"/reports/purchase-report/medicine-purchase"}>
          Medicine-purchase
        </Link>
      </div>
      <div className="mt-4 relative">
        <div className="search-medicine">
          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="rounded"
            type="search"
            placeholder="Search medicine..."
          />
        </div>
        {searchResultData?.length > 0 && (
          <table className="w-full bg-white absolute z-50">
            <tr className="border-b border-r border-l rounded border-[#d0cfcf] h-[35px] w-full text-[14px]">
              <th className="w-[40%] text-start pl-4">Medicine Name</th>
              <th className="w-[22%] text-start">Group/Generic Name</th>
              <th className="w-[18%] text-start">Company Name</th>
              <th className="w-[8%] text-start">Stock</th>
              <th className="w-[12%] text-start">Action</th>
            </tr>
            {searchResultData &&
              searchResultData?.map((m) => {
                return (
                  <tr
                    key={m?._id}
                    className={`border-b border-r border-l border-[#ebebeb] min-h-[35px] w-full text-[14px]`}
                  >
                    <td className="pl-4 py-2">
                      <Link href={`/inventory/list-of-medicines/${m?._id}`}>
                        <span className="capitalize">
                          {m?.dosage_form?.length > 6
                            ? m?.dosage_form?.slice(0, 6) + ".."
                            : m?.dosage_form}
                        </span>
                        <span className="capitalize ml-2">
                          {m?.medicine_name?.length > 25
                            ? m?.medicine_name?.slice(0, 25) + ".."
                            : m?.medicine_name}
                        </span>
                        <span className="ml-2">
                          {m?.strength?.length > 20
                            ? m?.strength?.slice(0, 20) + ".."
                            : m?.strength}
                        </span>
                      </Link>
                    </td>
                    <td className="text-gray-500">
                      {m?.generic_name?.length > 25
                        ? m?.generic_name?.slice(0, 25) + "..."
                        : m?.generic_name}
                    </td>
                    <td className="text-gray-500">
                      {m?.company_name?.length > 20
                        ? m?.company_name?.slice(0, 20) + "..."
                        : m?.company_name}
                    </td>
                    <td>{m?.stock_left}</td>
                    <td>
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          handlePurchase(m, parseInt(e.target.quantity.value));
                        }}
                        className="flex items-center justify-start h-[35px]"
                      >
                        <input
                          name="quantity"
                          type="number"
                          className="h-[20px] rounded-l border-gray-300 border-b border-t border-l w-[50%] px-2"
                          min={1}
                          defaultValue={1}
                        />
                        <button className="h-[20px] w-[50px] border border-gray-300 flex items-center justify-center rounded-r">
                          add
                        </button>
                      </form>
                    </td>
                  </tr>
                );
              })}
          </table>
        )}

        <>
          {localCartData?.length > 0 && (
            <table className="w-full absolute">
              <tr className="border-b border-r bg-blue-50 border-l rounded border-[#d0cfcf] h-[35px] w-full text-[14px]">
                <th className="w-[4%] text-start pl-4">No.</th>
                <th className="w-[40%] text-start pl-2">Medicine Name</th>
                <th className="w-[22%] text-start">Group/Generic Name</th>
                <th className="w-[18%] text-start">Company Name</th>
                <th className="w-[11%] text-center">Quantity</th>
                <th className="w-[5%] text-start">Action</th>
              </tr>
              {localCartData?.map((item, index) => (
                <tr
                  key={index}
                  className={`border-b border-r border-l border-[#ebebeb] min-h-[35px] w-full text-[14px]`}
                >
                  <td className="pl-4 py-2">{index + 1}.</td>
                  <td className="pl-2">
                    <span className="capitalize">
                      {item?.dosage_form?.length > 6
                        ? item?.dosage_form?.slice(0, 6) + ".."
                        : item?.dosage_form}
                    </span>
                    <span className="capitalize ml-2">
                      {item?.medicine_name?.length > 25
                        ? item?.medicine_name?.slice(0, 25) + ".."
                        : item?.medicine_name}
                    </span>
                    <span className="ml-2">
                      {item?.strength?.length > 20
                        ? item?.strength?.slice(0, 20) + ".."
                        : item?.strength}
                    </span>
                  </td>
                  <td>
                    {" "}
                    {item?.generic_name?.length > 25
                      ? item?.generic_name?.slice(0, 25) + "..."
                      : item?.generic_name}
                  </td>
                  <td>
                    {item?.company_name?.length > 20
                      ? item?.company_name?.slice(0, 20) + "..."
                      : item?.company_name}
                  </td>
                  <td className="text-center min-h-[35px] flex items-center justify-center">
                    <button
                      // onClick={() => handleQuantityDecrease(item)}
                      className="h-[20px] w-[22px] rounded border border-gray-300 flex items-center justify-center"
                    >
                      -
                    </button>
                    <button className="min-w-[40px]">
                      {item?.purchase_quantity}
                    </button>
                    <button
                      onClick={() => handleQuantityIncrease(item)}
                      className="h-[20px] w-[22px] rounded border border-gray-300 flex items-center justify-center"
                    >
                      +
                    </button>
                  </td>
                  <td className="">
                    <RiDeleteBack2Fill
                      onClick={() => handleRemoveItem(item)}
                      title="remove"
                      className="mx-auto h-5 w-5 cursor-pointer text-black hover:text-opacity-70"
                    ></RiDeleteBack2Fill>
                  </td>
                </tr>
              ))}
            </table>
          )}
        </>
      </div>
    </div>
  );
};

export default MedicinePurchase;
