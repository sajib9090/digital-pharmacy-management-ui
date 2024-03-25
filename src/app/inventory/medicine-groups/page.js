import Link from "next/link";
import React from "react";

const MedicineGroups = () => {
  return (
    <div className="pl-6 pt-2 container1">
      <div>
        <div className="text-[18px] font-bold capitalize">
          <Link href={"/inventory"} className="text-gray-400">
            Inventory {">"}{" "}
          </Link>{" "}
          <Link href={"/inventory/medicine-groups"}>Medicine groups</Link>
        </div>
        <p className="text-[14px] text-[#1D242E]">List of medicines groups</p>
      </div>
    </div>
  );
};

export default MedicineGroups;
