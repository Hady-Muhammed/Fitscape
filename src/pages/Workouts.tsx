import { motion } from "framer-motion";
import React from "react";
import Logo from "../components/Logo";
import ScrollArrow from "../components/ScrollArrow";
import Tables from "../components/Tables";
import { IonContent, IonPage } from "@ionic/react";
import Footer from "../components/Footer";

const Workouts = () => {
  return (
    <IonPage>
      <IonContent>
        <section className="lg:p-0 xs:p-5 workout flex justify-center items-center relative">
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
              Anything worth achieving is gonna be hard <br /> , Facing ups and
              downs is inevitable, BUT this is <br /> what differentiate legends
              from normals!{" "}
            </motion.h1>
            <motion.span
              className="text-xl block italic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.5 }}
            >
              "If you fail to PLAN , you're planning to FAIL"
            </motion.span>
          </motion.div>
          <button className="absolute bottom-5 left-1/2 translate-x-[-50%]">
            <ScrollArrow href="tables" />
          </button>
        </section>
        <div className="flex flex-col gap-4">
          <Tables />
        </div>
        <Footer />
      </IonContent>
    </IonPage>
  );
};

export default Workouts;
