"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { MdCancel } from "react-icons/md";

const AddNewMedicineForm = () => {
  const router = useRouter();

  return (
    <div className="pl-6 pt-2 container1">
      <div className="">
        <div className="text-[18px] font-bold capitalize">
          <Link href={"/inventory"} className="text-gray-400">
            Inventory {">"} {""}{" "}
          </Link>
          <Link href={"/inventory/list-of-medicines"} className="text-gray-400">
            List-of-medicines {">"}{" "}
          </Link>
          <Link href={"#"}>Add New Medicine</Link>
        </div>
        <p>*All fields are mandatory, except mentioned as (optional).</p>
      </div>

      {/* form */}
      <div className="w-[760px]">
        <div onClick={() => router.back()} className="flex justify-end">
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
              <label className="text-[14px]">Group/Generic Name *</label>
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
              <label className="text-[14px]">Purchase Price in Number*</label>
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
  );
};

export default AddNewMedicineForm;
