import React from "react";
import { motion } from "framer-motion";
import Logo from "../components/Logo";
import ChampionSection from "../components/ChampionSection";
import ScrollArrow from "../components/ScrollArrow";

const Champions = () => {
  return (
    <>
      <section className="champs flex justify-center items-center relative">
        {/* Overlay Screen */}
        <div className="absolute w-full h-full left-0 top-0 bg-black/60 "></div>
        {/* Logo */}
        <Logo />
        <motion.div
          className="relative z-10 text-white text-center space-y-4 xl:w-[45%] 2xl:w-full"
          exit={{ y: "-100vh", transition: { duration: 0.5 } }}
        >
          <motion.h1
            className="text-3xl font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            Bodybuilding isn't just a sport where you lift some weights and have
            muscles . <br /> It's the way to push your limits and learn what
            displine really is
          </motion.h1>
          <motion.span
            className="text-xl block italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            "Winners do what they fear."
          </motion.span>
        </motion.div>
      </section>
      <button className="absolute bottom-5 left-1/2 translate-x-[-50%]">
        <ScrollArrow href="champions" />
      </button>
      <ChampionSection />
    </>
  );
};

export default Champions;
