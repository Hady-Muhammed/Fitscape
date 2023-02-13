import React from "react";
import { Link } from "react-router-dom";

const _404Page = () => {
  return (
    <div className="_404 flex justify-center items-center relative">
      {/* Overlay Screen */}
      <div className="absolute w-full h-full left-0 top-0 bg-black/70"></div>
      <div className="flex flex-col items-center font-mont space-y-8">
        <h1 className="text-white z-10 text-9xl">404</h1>
        <div className="text-center text-white z-10">
          <p className="text-2xl">Page not found</p>
          <p className="text-2xl">
            We couldn't find the page you were looking for.
          </p>
        </div>
        <Link
          className="text-white bg-[#795548] hover:bg-[#5f443a] duration-300 rounded-md px-6 p-3 z-10 shadow shadow-white"
          to={"/signin"}
        >
          Return
        </Link>
      </div>
    </div>
  );
};

export default _404Page;
