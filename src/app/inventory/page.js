import React from "react";
import Card from "../Components/Card/Card";
import { IoBagAddOutline } from "react-icons/io5";
import { BiErrorAlt } from "react-icons/bi";

const Inventory = () => {
  return (
    <div className="pl-6 pt-2 container1">
      <div>
        <p className="text-[18px] font-bold capitalize">Inventory</p>
      </div>

      <div className="mt-4 grid grid-cols-4 gap-6">
        <Card
          title={"298"}
          info={"medicines available"}
          icon={<IoBagAddOutline className="h-10 w-10 text-[#03A9F5]" />}
          linkTitle={"view full list"}
          link={"#"}
          primaryBorderColor={"border-[#03A9F5]"}
          primaryBg={"bg-[#03a8f512]"}
          secondaryBg={"bg-[#03a8f55f]"}
          secondaryBorderColor={"border-[#03A9F5]"}
        />
        <Card
          title={"98"}
          info={"medicine groups"}
          icon={<IoBagAddOutline className="h-10 w-10 text-[#01A768]" />}
          linkTitle={"view groups"}
          link={"#"}
          primaryBorderColor={"border-[#01A768]"}
          primaryBg={"bg-[#01a76723]"}
          secondaryBg={"bg-[#01a76779]"}
          secondaryBorderColor={"border-[#01A768]"}
        />
        <Card
          title={"9"}
          info={"medicine shortage"}
          icon={<BiErrorAlt className="h-10 w-10 text-[#F0483E]" />}
          linkTitle={"view groups"}
          link={"#"}
          primaryBorderColor={"border-[#F0483E]"}
          primaryBg={"bg-[#f0473e14]"}
          secondaryBg={"bg-[#f0473e62]"}
          secondaryBorderColor={"border-[#F0483E]"}
        />
      </div>
    </div>
  );
};

export default Inventory;
