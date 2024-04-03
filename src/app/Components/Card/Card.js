import Link from "next/link";
import React from "react";
import { RiArrowRightDoubleFill } from "react-icons/ri";

const Card = ({
  title,
  info,
  icon,
  linkTitle,
  link,
  primaryBorderColor,
  primaryBg,
  secondaryBg,
  secondaryBorderColor,
  fetchingLoading,
}) => {
  return (
    <div
      className={`h-[152px] border ${primaryBorderColor} ${primaryBg} rounded flex flex-col justify-between`}
    >
      <div className="flex flex-col justify-center items-center mt-4">
        {/* <RiShieldCrossLine className="h-10 w-10 text-[#01A768]" /> */}
        {icon}

        {fetchingLoading ? (
          <h1 className="text-[20px] font-bold">{"Please wait..."}</h1>
        ) : (
          <h1 className="text-[20px] font-bold">{title}</h1>
        )}
        <p className="capitalize">{info}</p>
      </div>
      <div
        className={`h-[25px] ${secondaryBg} w-full border-t ${secondaryBorderColor} flex items-center justify-center`}
      >
        <Link
          href={link}
          className="text-[14px] capitalize text-black flex items-center"
        >
          {linkTitle} <RiArrowRightDoubleFill className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
};

export default Card;
