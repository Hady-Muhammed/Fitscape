import { motion } from "framer-motion";
import React from "react";
import Logo from "../components/Logo";
import ScrollArrow from "../components/ScrollArrow";
import VolumeCalculator from "../components/VolumeCalculator";
import { IonContent, IonPage } from "@ionic/react";
import Footer from "../components/Footer";

const Volume = () => {
  return (
    <IonPage>
      <IonContent>
        <section className="volume flex justify-center items-center relative">
          {/* Overlay Screen */}
          <div className="absolute w-full h-full left-0 top-0 bg-gradient-to-l from-transparent to-black/30 "></div>
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
              Evalute the training volume to see your progress.
            </motion.h1>
            <motion.span
              className="text-xl block italic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.5 }}
            >
              "Victory isn’t defined by wins and losses, it’s defined by effort.
              "
            </motion.span>
          </motion.div>
          <button className="absolute bottom-5 left-1/2 translate-x-[-50%]">
            <ScrollArrow href="volume" />
          </button>
        </section>
        <VolumeCalculator />
        <Footer />
      </IonContent>
    </IonPage>
  );
};

export default Volume;
