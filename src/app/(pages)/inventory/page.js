"use client";
import React, { useEffect } from "react";
import Card from "../../Components/Card/Card";
import { IoBagAddOutline } from "react-icons/io5";
import { BiErrorAlt } from "react-icons/bi";
import { useGenericStore } from "@/app/stores/genericStore";
import { HiOutlineBuildingLibrary } from "react-icons/hi2";
import { useCompanyStore } from "@/app/stores/companyStore";
import { useMedicineStore } from "@/app/stores/medicineStore";

const Inventory = () => {
  const shopName = "rayan pharmacy";
  const { generics, getAllGenerics, genericLoading } = useGenericStore();
  const { companies, getAllCompanies, companyLoading } = useCompanyStore();
  const { medicines, getAllMedicines, medicineLoading } = useMedicineStore();

  const shortageMedicine =
    medicines && medicines?.data?.filter((m) => m?.stock_left < 10);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchAllData = async () => {
      try {
        await getAllGenerics(shopName, { signal: abortController.signal });
        await getAllCompanies(shopName, { signal: abortController.signal });
        await getAllMedicines(shopName, { signal: abortController.signal });
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllData();

    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <div className="pl-6 pt-2 container1">
      <div>
        <p className="text-[18px] font-bold capitalize">Inventory</p>
      </div>

      <div className="mt-4 grid grid-cols-4 gap-6">
        <Card
          title={medicines?.data_found}
          info={"medicines available"}
          icon={<IoBagAddOutline className="h-10 w-10 text-[#03A9F5]" />}
          linkTitle={"view full list"}
          link={"/inventory/list-of-medicines"}
          primaryBorderColor={"border-[#03A9F5]"}
          primaryBg={"bg-[#03a8f512]"}
          secondaryBg={"bg-[#03a8f55f]"}
          secondaryBorderColor={"border-[#03A9F5]"}
          fetchingLoading={medicineLoading}
        />
        <Card
          title={generics?.data_found}
          info={"medicine groups"}
          icon={<IoBagAddOutline className="h-10 w-10 text-[#01A768]" />}
          linkTitle={"view groups"}
          link={"/inventory/medicine-groups"}
          primaryBorderColor={"border-[#01A768]"}
          primaryBg={"bg-[#01a76723]"}
          secondaryBg={"bg-[#01a76779]"}
          secondaryBorderColor={"border-[#01A768]"}
          fetchingLoading={genericLoading}
        />
        <Card
          title={companies?.data_found}
          info={"companies/suppliers"}
          icon={
            <HiOutlineBuildingLibrary className="h-10 w-10 text-[#b7a324]" />
          }
          linkTitle={"view companies"}
          link={"/inventory/list-of-companies"}
          primaryBorderColor={"border-[#b7a324]"}
          primaryBg={"bg-[#b7a32429]"}
          secondaryBg={"bg-[#b7a32442]"}
          secondaryBorderColor={"border-[#b7a324]"}
          fetchingLoading={companyLoading}
        />
        <Card
          title={shortageMedicine?.length}
          info={"medicine shortage"}
          icon={<BiErrorAlt className="h-10 w-10 text-[#F0483E]" />}
          linkTitle={"view medicines"}
          link={"/inventory/list-of-medicines"}
          primaryBorderColor={"border-[#F0483E]"}
          primaryBg={"bg-[#f0473e14]"}
          secondaryBg={"bg-[#f0473e62]"}
          secondaryBorderColor={"border-[#F0483E]"}
          fetchingLoading={medicineLoading}
        />
      </div>
    </div>
  );
};

export default Inventory;
