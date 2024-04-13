import Link from "next/link";
import React from "react";

const PrimaryError = ({
  message,
  refresh,
  redirect,
  redirectLink,
  redirectMessage,
}) => {
  return (
    <div className="mt-8 w-full border border-[#d0cfcf] rounded bg-gray-50">
      <div className="text-center my-6 text-red-600">
        {message}
        {refresh && (
          <span
            onClick={() => window.location.reload()}
            className="ml-2 underline cursor-pointer"
          >
            Please Refresh
          </span>
        )}
        {redirect && (
          <Link href={redirectLink} className="ml-2 underline cursor-pointer">
            {redirectMessage}
          </Link>
        )}
      </div>
    </div>
  );
};

export default PrimaryError;
