import React from "react";
import { FaArrowCircleDown } from "react-icons/fa";

const ScrollArrow = ({ href }) => {
  return (
    <a href={`#${href}`} className="text-center text-white">
      <FaArrowCircleDown className="animate-bounce" size={30} />
    </a>
  );
};

export default ScrollArrow;
