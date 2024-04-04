"use client";
import Link from "next/link";
import React, { useState } from "react";

const MedicinePurchase = () => {
  const [searchValue, setSearchValue] = useState("");
  return (
    <div className="pl-6 pt-2 container1">
      <div className="text-[18px] font-bold capitalize">
        <Link href={"/purchase"} className="text-gray-400">
          Purchase {">"}{" "}
        </Link>
        <Link href={"/purchase/medicine-purchase"}>Medicine-purchase</Link>
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
        <table className="w-full absolute">
          <tr className="border-b border-r border-l rounded border-[#d0cfcf] h-[35px] w-full text-[14px]">
            <th className="w-[35%] text-start pl-4">Medicine Name</th>
            <th className="w-[25%] text-start">Group Name</th>
            <th className="w-[20%] text-start">Company Name</th>
            <th className="w-[8%] text-start">Stock</th>
            <th className="w-[12%] text-start">Action</th>
          </tr>
          {Array.from({ length: 9 }).map((d, i) => {
            return (
              <tr
                key={i}
                className={`border-b border-r border-l border-[#ebebeb] min-h-[35px] w-full text-[14px]`}
              >
                <td className="pl-4 py-2">Augmentin 625 Duo Tablet</td>
                <td>Augmentin 625 Duo Tablet</td>
                <td>incepta pharmaceuticals</td>
                <td>111</td>
                <td>
                  <button>add</button>
                </td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
};

export default MedicinePurchase;
