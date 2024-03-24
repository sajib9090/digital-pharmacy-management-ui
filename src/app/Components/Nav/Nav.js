import React from "react";

const Nav = () => {
  return (
    <div className="h-[60px] bg-[#f7fafd] border-b border-[#ced1d5] flex items-center justify-end">
      <div>
        <p className="text-end text-[#1D242E] font-bold">Good Morning</p>
        <p className="text-[#2e333a] text-[12px]">
          {new Date().toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default Nav;
