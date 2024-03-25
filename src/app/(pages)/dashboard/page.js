import Link from "next/link";
import React from "react";
import { RiShieldCrossLine, RiArrowRightDoubleFill } from "react-icons/ri";
import { TbCashBanknote } from "react-icons/tb";
import { IoBagAddOutline } from "react-icons/io5";
import { BiErrorAlt } from "react-icons/bi";
import Card from "../../Components/Card/Card";

const Dashboard = () => {
  return (
    <div className="pl-6 pt-2 container1">
      <div>
        <Link
          href={"/dashboard"}
          className="text-[18px] font-bold capitalize text-gray-400"
        >
          Dashboard
        </Link>
        <p className="text-[14px] text-[#1D242E]">
          A quick data overview of the inventory
        </p>
      </div>

      <div className="mt-4 grid grid-cols-4 gap-6">
        <Card
          title={"Good"}
          info={"Inventory Status"}
          icon={<RiShieldCrossLine className="h-10 w-10 text-[#01A768]" />}
          linkTitle={"view detailed report"}
          link={"/inventory"}
          primaryBorderColor={"border-[#01A768]"}
          primaryBg={"bg-[#01a76723]"}
          secondaryBg={"bg-[#01a76779]"}
          secondaryBorderColor={"border-[#01A768]"}
        />

        <div className="h-[152px] border border-[#FED600] bg-[#fed80013] rounded flex flex-col justify-between">
          <div className="flex flex-col justify-center items-center mt-4">
            <TbCashBanknote className="h-10 w-10 text-[#FED600]" />
            <h1 className="text-[20px] font-bold">TK. 5,133</h1>
            <p>Revenue: jan 2024</p>
          </div>
          <div className="h-[25px] bg-[#fed8007f] w-full border-t border-[#FED600] flex items-center justify-center">
            <Link
              href={"/reports"}
              className="text-[14px] capitalize text-black flex items-center"
            >
              view detailed report{" "}
              <RiArrowRightDoubleFill className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <Card
          title={"333"}
          info={"Medicine Available"}
          icon={<IoBagAddOutline className="h-10 w-10 text-[#03A9F5]" />}
          linkTitle={"view detailed report"}
          link={"/inventory"}
          primaryBorderColor={"border-[#03A9F5]"}
          primaryBg={"bg-[#03a8f512]"}
          secondaryBg={"bg-[#03a8f55f]"}
          secondaryBorderColor={"border-[#03A9F5]"}
        />

        <Card
          title={"10"}
          info={"Medicine Shortage"}
          icon={<BiErrorAlt className="h-10 w-10 text-[#F0483E]" />}
          linkTitle={"view detailed report"}
          link={"/inventory"}
          primaryBorderColor={"border-[#F0483E]"}
          primaryBg={"bg-[#f0473e14]"}
          secondaryBg={"bg-[#f0473e62]"}
          secondaryBorderColor={"border-[#F0483E]"}
        />
      </div>

      <div className="mt-10 grid grid-cols-2 gap-6">
        <div className="h-[130px] rounded border border-[#c3c4c4]">
          <div className="h-[30px] border-b border-[#c3c4c4] flex items-center justify-between px-6">
            <p className="font-bold">Inventory</p>
            <Link href={"#"} className="flex items-center text-[12px]">
              Go to configuration{" "}
              <RiArrowRightDoubleFill className="h-4 w-4 mt-1" />{" "}
            </Link>
          </div>
          <div className="h-[100px] px-6 flex items-center justify-between">
            <div>
              <p className="font-bold mb-1 text-[18px]">298</p>
              <p className="text-[14px]">Total no of medicines</p>
            </div>
            <div>
              <p className="font-bold mb-1 text-[18px]">24</p>
              <p className="text-[14px]">Medicine groups</p>
            </div>
          </div>
        </div>
        <div className="h-[130px] rounded border border-[#c3c4c4]">
          <div className="h-[30px] border-b border-[#c3c4c4] flex items-center justify-between px-6">
            <p className="font-bold">Inventory</p>
            <Link href={"#"} className="flex items-center text-[12px]">
              Go to configuration{" "}
              <RiArrowRightDoubleFill className="h-4 w-4 mt-1" />{" "}
            </Link>
          </div>
          <div className="h-[100px] px-6 flex items-center justify-between">
            <div>
              <p className="font-bold mb-1 text-[18px]">298</p>
              <p className="text-[14px]">Total no of medicines</p>
            </div>
            <div>
              <p className="font-bold mb-1 text-[18px]">24</p>
              <p className="text-[14px]">Medicine groups</p>
            </div>
          </div>
        </div>
        <div className="h-[130px] rounded border border-[#c3c4c4]">
          <div className="h-[30px] border-b border-[#c3c4c4] flex items-center justify-between px-6">
            <p className="font-bold">Inventory</p>
            <Link href={"#"} className="flex items-center text-[12px]">
              Go to configuration{" "}
              <RiArrowRightDoubleFill className="h-4 w-4 mt-1" />{" "}
            </Link>
          </div>
          <div className="h-[100px] px-6 flex items-center justify-between">
            <div>
              <p className="font-bold mb-1 text-[18px]">298</p>
              <p className="text-[14px]">Total no of medicines</p>
            </div>
            <div>
              <p className="font-bold mb-1 text-[18px]">24</p>
              <p className="text-[14px]">Medicine groups</p>
            </div>
          </div>
        </div>
        <div className="h-[130px] rounded border border-[#c3c4c4]">
          <div className="h-[30px] border-b border-[#c3c4c4] flex items-center justify-between px-6">
            <p className="font-bold">Inventory</p>
            <Link href={"#"} className="flex items-center text-[12px]">
              Go to configuration{" "}
              <RiArrowRightDoubleFill className="h-4 w-4 mt-1" />{" "}
            </Link>
          </div>
          <div className="h-[100px] px-6 flex items-center justify-between">
            <div>
              <p className="font-bold mb-1 text-[18px]">298</p>
              <p className="text-[14px]">Total no of medicines</p>
            </div>
            <div>
              <p className="font-bold mb-1 text-[18px]">24</p>
              <p className="text-[14px]">Medicine groups</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
