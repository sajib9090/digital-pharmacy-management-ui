import React from "react";

const PrimaryLoading = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div class="border-gray-300 h-8 w-8 animate-spin rounded-full border-[5px] border-t-black" />
      <p className="text-xl">{message}</p>
    </div>
  );
};

export default PrimaryLoading;
