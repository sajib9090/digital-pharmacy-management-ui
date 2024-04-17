import React from "react";

const PrimarySuccess = ({ message }) => {
  return (
    <div className="mt-8 w-full border border-[#d0cfcf] rounded bg-gray-50">
      <div className="text-center my-6 text-green-600">{message}</div>
    </div>
  );
};

export default PrimarySuccess;
