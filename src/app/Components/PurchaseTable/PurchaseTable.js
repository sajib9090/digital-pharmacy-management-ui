"use client";
import {
  decreaseItemQuantity,
  increaseItemQuantity,
  removeAllItems,
  removeSinglePurchaseItem,
} from "@/app/localDB/localDB";
import { baseUrl } from "@/secrets";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { LuLoader2 } from "react-icons/lu";
import { RiDeleteBack2Fill } from "react-icons/ri";

const PurchaseTable = ({
  localCartData,
  fetchLocalData,
  setSubmitError,
  setSubmitSuccess,
  getAllMedicines,
}) => {
  const shopName = "rayan pharmacy";
  const [discountValue, setDiscountValue] = useState("");
  const [discountedAmount, setDiscountedAmount] = useState(0);
  const [taxValue, setTaxValue] = useState("");
  const [taxAmount, setTaxAmount] = useState(0);
  const [submitAction, setSubmitAction] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

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

  const totalPrice =
    localCartData &&
    localCartData?.reduce((accumulator, item) => {
      return accumulator + item?.purchase_price * item?.purchase_quantity;
    }, 0);

  const handleDiscount = (price) => {
    if (discountValue) {
      const totalDiscount = price * (discountValue / 100);
      setDiscountedAmount(totalDiscount);
    } else {
      setDiscountedAmount(0);
    }
  };
  const handleTax = (price) => {
    if (taxValue) {
      const totalTax = price * (taxValue / 100);
      setTaxAmount(totalTax);
    } else {
      setTaxAmount(0);
    }
  };

  const handleSubmit = () => {
    setSubmitLoading(true);

    const data = {
      shop_name: shopName,
      category: "medicine",
      total_price: totalPrice,
      total_discount: discountedAmount,
      total_tax: taxAmount,
      items: localCartData,
    };

    axios
      .post(
        `${baseUrl}/api/v1/purchases/create/purchase?shop_name=${shopName}`,
        data
      )
      .then((res) => {
        if (res) {
          removeAllItems();
          fetchLocalData();
          setSubmitError(false);
          setSubmitSuccess(res?.data?.message);
          getAllMedicines(shopName);
        }
      })
      .catch((err) => {
        setSubmitError(err?.response?.data?.message || "Something went wrong");
      })
      .finally(() => {
        setSubmitLoading(false);
      });
  };

  useEffect(() => {
    handleDiscount(totalPrice || 0);
    handleTax(totalPrice || 0);
  }, [totalPrice, discountValue, taxValue]);
  return (
    <>
      <table className="w-full">
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
              {Number(
                item?.purchase_quantity * item?.purchase_price
              ).toLocaleString()}
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

      <div className="max-w-lg mt-4 ml-auto grid grid-cols-2 border-b border-gray-500">
        <div className="w-[100%] space-y-2">
          <div className="flex items-center justify-between">
            <p>Total Price</p>
            <p>:</p>
          </div>
          <div className="flex items-center justify-between">
            <p>Vat/Tax (+)</p>
            <div className="flex items-center justify-center">
              <input
                value={taxValue}
                onChange={(e) => setTaxValue(parseFloat(e.target.value))}
                className="w-[110px] border border-gray-300 rounded pl-2 "
                placeholder="Tax/Vat %"
                type="number"
                pattern="[0-9]+(\.[0-9]+)?"
              />
              %<p className="ml-3">:</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <p>Discount (-)</p>
            <div className="flex items-center justify-center">
              <input
                value={discountValue}
                onChange={(e) => setDiscountValue(parseFloat(e.target.value))}
                className="w-[110px] border border-gray-300 rounded pl-2 "
                placeholder="Discount %"
                type="number"
                pattern="[0-9]+(\.[0-9]+)?"
              />
              %<p className="ml-3">:</p>
            </div>
          </div>
          <div className="flex items-center justify-between font-bold">
            <p>Net Price</p>
            <p>:</p>
          </div>
        </div>
        <div className="w-[100%] pr-4 space-y-2">
          <div className="flex items-center justify-end">
            <p>{Number(totalPrice).toLocaleString()}</p>
          </div>
          <div className="flex items-center justify-end">
            <p>{Number(taxAmount).toLocaleString()}</p>
          </div>
          <div className="flex items-center justify-end">
            <p>{Number(discountedAmount).toLocaleString()}</p>
          </div>
          <div className="flex items-center justify-end font-bold">
            <p>
              {Number(
                totalPrice - discountedAmount + taxAmount
              ).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
      <>
        {submitAction ? (
          <div className="mt-2 mb-4 w-[180px] h-[40px] ml-auto">
            <p className="text-center">Want to submit?</p>
            <div className="flex items-center justify-between">
              <button
                onClick={handleSubmit}
                disabled={submitLoading}
                className="w-[70px] h-[22px] border border-red-600 text-red-600 hover:text-white transition-all duration-500 hover:bg-red-600 rounded flex items-center justify-center"
              >
                {submitLoading ? (
                  <LuLoader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Yes"
                )}
              </button>
              <button
                onClick={() => setSubmitAction(!submitAction)}
                className="w-[70px] h-[22px] border border-blue-600 text-blue-600 hover:text-white transition-all duration-500 hover:bg-blue-600 rounded flex items-center justify-center"
              >
                No
              </button>
            </div>
          </div>
        ) : (
          <div className="text-end mr-4">
            <button
              onClick={() => setSubmitAction(!submitAction)}
              className="mt-2 bg-[#03A9F5] rounded text-white h-[35px] w-[140px] hover:bg-opacity-80"
            >
              Submit
            </button>
          </div>
        )}
      </>
    </>
  );
};

export default PurchaseTable;
