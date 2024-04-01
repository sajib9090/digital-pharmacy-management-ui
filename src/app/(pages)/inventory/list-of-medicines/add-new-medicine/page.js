"use client";
import { useCompanyStore } from "@/app/stores/companyStore";
import { useDosageStore } from "@/app/stores/dosageStore";
import { useGenericStore } from "@/app/stores/genericStore";
import { baseUrl } from "@/secrets";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { MdCancel } from "react-icons/md";
import { LuLoader2 } from "react-icons/lu";

const AddNewMedicineForm = () => {
  const shopName = "rayan pharmacy";
  const router = useRouter();
  const { dosageForms, getAllDosageForms } = useDosageStore();
  const { companies, getAllCompanies } = useCompanyStore();
  const { generics, getAllGenerics } = useGenericStore();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [name, setName] = useState("");
  const [strength, setStrength] = useState("");
  const [dosageForm, setDosageForm] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreateMedicine = (e) => {
    e.preventDefault();

    const name = e.target.medicineName.value;
    const generic = e.target.generic.value;
    const company = e.target.company.value;
    const strength = e.target.strength.value;
    const dosage = e.target.dosageForm.value;
    const purchasePrice = e.target.purchasePrice.value;
    const sellPrice = e.target.sellPrice.value;

    const data = {
      medicine_name: name,
      shop_name: shopName,
      generic_name: generic,
      company_name: company,
      strength: strength,
      dosage_form: dosage,
      purchase_price: purchasePrice,
      sell_price: sellPrice,
    };
    setLoading(true);
    axios
      .post(`${baseUrl}/api/v1/medicines/create/medicine`, data)
      .then((res) => {
        if (res) {
          setError("");
          setSuccess(res.data.message);
        }
      })
      .catch((err) => {
        setError(err?.response?.data?.message);
        setSuccess("");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getAllGenerics(shopName);
    getAllCompanies(shopName);
    getAllDosageForms(shopName);
  }, []);

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
        <form onSubmit={handleCreateMedicine} className="w-full relative">
          <div className="mt-6">
            <label className="text-[14px]">Medicine Title</label>
            <input
              type="text"
              value={dosageForm + " " + name + " " + strength}
              disabled
              className="h-[35px] w-full border border-[#c1c1c1] rounded px-2 mt-1"
            />
          </div>
          <div className="mt-6">
            <label className="text-[14px]">Medicine Name *</label>
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              name="medicineName"
              required
              placeholder="Enter medicine name max 100 characters"
              className="h-[35px] w-full border border-[#c1c1c1] rounded px-2 mt-1"
            />
            {error?.toLowerCase()?.includes("medicine") && (
              <p className="text-red-600 absolute">{error}</p>
            )}
          </div>
          <div className="mt-6 flex items-center justify-between gap-4">
            <div className="w-full">
              <label className="text-[14px]">Group/Generic Name *</label>
              <div className="my-1 text-[14px]">
                <p className="text-purple-600">Generic/Group not found?</p>
                <Link
                  href={"/inventory/medicine-groups/add-new-group"}
                  className="underline hover:text-blue-600"
                >
                  Add a new group/generic{" "}
                  <span className="animate-pulse text-blue-600">
                    click here
                  </span>
                </Link>
              </div>
              <select
                required
                name="generic"
                className="h-[35px] w-full border border-[#c1c1c1] rounded px-2 mt-1"
              >
                <option value="" disabled selected>
                  Choose a Generic
                </option>
                {generics?.data?.map((generic) => (
                  <option
                    key={generic?._id}
                    value={generic?.generic_name}
                    className="capitalize"
                  >
                    {generic?.generic_name}
                  </option>
                ))}
              </select>
              {error?.toLowerCase()?.includes("generic") && (
                <p className="text-red-600 absolute">{error}</p>
              )}
            </div>
            <div className="w-full">
              <label className="text-[14px]">Company/Supplier Name *</label>
              <div className="my-1 text-[14px]">
                <p className="text-purple-600">Company/Supplier not found?</p>
                <Link
                  href={"/inventory/list-of-companies/add-new-company"}
                  className="underline hover:text-blue-600"
                >
                  Add a new Company/Supplier{" "}
                  <span className="animate-pulse text-blue-600">
                    click here
                  </span>
                </Link>
              </div>
              <select
                required
                name="company"
                className="h-[35px] w-full border border-[#c1c1c1] rounded px-2 mt-1"
              >
                <option value="" disabled selected>
                  Choose a Company
                </option>
                {companies?.data?.map((company) => (
                  <option
                    key={company?._id}
                    value={company?.company_name}
                    className="capitalize"
                  >
                    {company?.company_name}
                  </option>
                ))}
              </select>
              {error?.toLowerCase()?.includes("company") && (
                <p className="text-red-600 absolute">{error}</p>
              )}
            </div>
          </div>
          <div className="mt-6 flex items-center justify-between gap-4">
            <div className="w-full">
              <label className="text-[14px]">Strength/Weight *</label>
              <div className="my-1 text-[14px]">
                <p className="text-purple-600">Write details strength/weight</p>
              </div>
              <input
                onChange={(e) => setStrength(e.target.value)}
                type="text"
                name="strength"
                required
                placeholder="Enter strength 100 mg+200 mg+200 mcg"
                className="h-[35px] w-full border border-[#c1c1c1] rounded px-2 mt-1"
              />
              {error?.toLowerCase()?.includes("strength") && (
                <p className="text-red-600 absolute">{error}</p>
              )}
            </div>
            <div className="w-full">
              <label className="text-[14px]">Dosage Form *</label>
              <div className="my-1 text-[14px]">
                <Link
                  href={"/inventory/dosage-forms/add-new-dosage"}
                  className="underline hover:text-blue-600"
                >
                  Add a new Dosage form{" "}
                  <span className="animate-pulse text-blue-600">
                    click here
                  </span>
                </Link>
              </div>
              <select
                required
                onChange={(e) => setDosageForm(e.target.value)}
                name="dosageForm"
                className="h-[35px] w-full border border-[#c1c1c1] rounded px-2 mt-1"
              >
                <option value="" disabled selected>
                  Choose a dosage form
                </option>
                {dosageForms?.data?.map((dosage) => (
                  <option
                    key={dosage?._id}
                    value={dosage?.dosage_form}
                    className="capitalize"
                  >
                    {dosage?.dosage_form}
                  </option>
                ))}
              </select>
              {error?.toLowerCase()?.includes("dosage") && (
                <p className="text-red-600 absolute">{error}</p>
              )}
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between gap-4">
            <div className="w-full">
              <label className="text-[14px]">Purchase Price in Number*</label>
              <input
                required
                type="number"
                name="purchasePrice"
                placeholder="Enter purchase price"
                className="h-[35px] w-full border border-[#c1c1c1] rounded px-2 mt-1"
              />
              {error?.toLowerCase()?.includes("purchase") && (
                <p className="text-red-600 absolute">{error}</p>
              )}
            </div>
            <div className="w-full">
              <label className="text-[14px]">Sell Price in Number*</label>
              <input
                required
                type="number"
                name="sellPrice"
                placeholder="Enter sell price"
                className="h-[35px] w-full border border-[#c1c1c1] rounded px-2 mt-1"
              />
              {error?.toLowerCase()?.includes("sell") && (
                <p className="text-red-600 absolute">{error}</p>
              )}
            </div>
          </div>

          {success && <p className=" text-blue-600 absolute">{success}</p>}

          <div className="mt-7 mb-4 flex items-center justify-between gap-4">
            <button
              disabled={loading}
              className="h-[35px] w-[150px] bg-[#f0483e] rounded text-white flex items-center justify-center"
            >
              Save Details{" "}
              {loading && <LuLoader2 className="h-5 w-5 animate-spin ml-2" />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewMedicineForm;
