import React from "react";
import { motion } from "framer-motion";
import Logo from "./Logo";
import ScrollArrow from "./ScrollArrow";

const Hero = () => {
  return (
    <main className="bg-cover flex justify-center items-center relative">
      {/* Overlay Screen */}
      <div className="absolute w-full h-full left-0 top-0 bg-gradient-to-l from-transparent to-black/80 "></div>
      {/* Logo */}
      <Logo />

      <motion.div
        className="relative z-10 text-white text-center space-y-4"
        exit={{ y: "-100vh", transition: { duration: 0.5 } }}
      >
        <motion.h1
          className="text-3xl font-bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          Champions aren't made overnight , <br /> Putting the hardwork is NOT
          an option its a MUST
        </motion.h1>
        <motion.span
          className="text-xl block italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          "Growth is painful"
        </motion.span>
      </motion.div>
      <button className="absolute bottom-5 left-1/2 translate-x-[-50%]">
        <ScrollArrow href="exercises" />
      </button>
    </main>
  );
};

export default Hero;
