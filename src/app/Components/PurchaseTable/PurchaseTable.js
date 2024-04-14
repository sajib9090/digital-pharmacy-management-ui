import {
  decreaseItemQuantity,
  increaseItemQuantity,
  removeSinglePurchaseItem,
} from "@/app/localDB/localDB";
import React from "react";
import { RiDeleteBack2Fill } from "react-icons/ri";

const PurchaseTable = ({ localCartData, fetchLocalData }) => {
  const handleQuantityIncrease = (item) => {
    increaseItemQuantity(item);
    fetchLocalData();
  };

  const handleQuantityDecrease = (item) => {
    decreaseItemQuantity(item);
    fetchLocalData();
  };

  const handleRemoveItem = (item) => {
    removeSinglePurchaseItem(item);
    fetchLocalData();
  };
  return (
    <>
      <table className="w-full absolute">
        <tr className="border-b border-r bg-blue-50 border-l rounded border-[#d0cfcf] h-[35px] w-full text-[14px]">
          <th className="w-[4%] text-start pl-4">No.</th>
          <th className="w-[48%] text-start pl-2">Medicine Name</th>
          <th className="w-[16%] text-center">Quantity</th>
          <th className="w-[15%] text-end">Price</th>
          <th className="w-[12%] text-end">Amount</th>
          <th className="w-[5%] text-start"></th>
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

            <td className="text-center min-h-[35px] flex items-center justify-center">
              <button
                onClick={() => handleQuantityDecrease(item)}
                disabled={item.purchase_quantity <= 1}
                className={`h-[20px] w-[22px] rounded border border-gray-300 flex items-center justify-center ${
                  item.purchase_quantity <= 1 ? "cursor-not-allowed" : ""
                }`}
              >
                -
              </button>
              <button className="min-w-[50px]">
                {item?.purchase_quantity}
              </button>
              <button
                onClick={() => handleQuantityIncrease(item)}
                className="h-[20px] w-[22px] rounded border border-gray-300 flex items-center justify-center"
              >
                +
              </button>
            </td>
            <td className="text-end text-[14px]">
              {Number(item?.purchase_price).toFixed(2).toLocaleString() +
                " " +
                "*" +
                " " +
                item?.purchase_quantity}
            </td>
            <td className="text-end">
              {Number(item?.purchase_quantity * item?.purchase_price)
                .toFixed(2)
                .toLocaleString()}
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
    </>
  );
};

export default PurchaseTable;
