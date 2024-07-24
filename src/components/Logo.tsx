import React from "react";
import { Link } from "react-router-dom";
import { SiFitbit } from "react-icons/si";

const Logo = () => {
  return (
    <Link to={"/"}>
      <span className="z-10 absolute top-4 right-10 gap-2 text-white xs:text-lg lg:text-4xl font-mono font-bold flex items-center font-mont">
        <span className="">Fitscape</span>
        <SiFitbit size={25} />
      </span>
    </Link>
  );
};

export default Logo;
