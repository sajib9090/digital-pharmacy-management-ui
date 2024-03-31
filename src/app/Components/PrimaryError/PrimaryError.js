import React from "react";

const PrimaryError = ({ message, refresh }) => {
  return (
    <div className="mt-8 w-full border border-[#d0cfcf] rounded bg-gray-50">
      <p className="text-center my-6 text-red-600">
        {message}
        {refresh && (
          <span
            onClick={() => window.location.reload()}
            className="ml-2 underline cursor-pointer"
          >
            Please Refresh
          </span>
        )}
      </p>
    </div>
  );
};

export default PrimaryError;
