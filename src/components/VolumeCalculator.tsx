import { motion } from "framer-motion";
import React, { useState } from "react";
import "animate.css/animate.min.css";
import ScrollReveal from "../animations/ScrollReveal";
import { useTranslation } from "react-i18next";

const VolumeCalculator = () => {
  const { t } = useTranslation();
  // States
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [sets, setSets] = useState<any>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [reps, setReps] = useState<any>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [weight, setWeight] = useState<any>();
  const [total, setTotal] = useState<number>();
  // Refs
  // Functions
  const EvaluateVol = () => {
    setTotal(sets * reps * weight);
  };

  return (
    <div
      className="main-color flex items-center justify-center h-screen flex-col space-y-8"
      id="volume"
    >
      <ScrollReveal animationName="fadeInUp">
        <table>
          <thead>
            <tr>
              <th className="text-xl p-5 text-white">
                {t("Volume.Number of Sets")}
              </th>
              <th className="text-xl p-5 text-white">
                {t("Volume.Number of Reps")}
              </th>
              <th className="text-xl p-5 text-white">
                {t("Tables.Weight Lifted")}(kg)
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2">
                <input
                  className="font-bold main-color text-white border-b appearance-none mx-auto block rounded-xl p-1 w-[70px] outline-none"
                  type="number"
                  onChange={(e) => setSets(e.target.value)}
                  required
                />
              </td>
              <td className="p-2">
                <input
                  className="font-bold main-color text-white border-b appearance-none mx-auto block rounded-xl p-1 w-[70px] outline-none"
                  type="number"
                  onChange={(e) => setReps(e.target.value)}
                  required
                />
              </td>
              <td className="p-2">
                <input
                  className="font-bold main-color text-white border-b appearance-none mx-auto block rounded-xl p-1 w-[70px] outline-none"
                  type="number"
                  onChange={(e) => setWeight(e.target.value)}
                  required
                />
              </td>
            </tr>
          </tbody>
        </table>
      </ScrollReveal>
      <div>
        <ScrollReveal animationName="fadeIn">
          <motion.button
            className="text-white border px-4 py-1 text-xl rounded-lg eval italic"
            whileHover={{
              scale: 1.1,
              transition: {
                ease: "linear",
                repeat: Infinity,
                repeatType: "reverse",
              },
            }}
            transition={{ duration: 0.5 }}
            onClick={EvaluateVol}
          >
            {t("Volume.Evaluate")}
          </motion.button>
        </ScrollReveal>
      </div>
      {total && (
        <>
          <motion.span
            className="text-white text-5xl block mt-12"
            initial={{ x: "-50vh" }}
            animate={{ x: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            {t("Volume.TOTAL")} = {total}
          </motion.span>

          <motion.span
            className="text-2xl block mt-12 text-green-600"
            initial={{ x: "100vh" }}
            animate={{ x: 0 }}
            transition={{ delay: 1, type: "spring", stiffness: 100 }}
          >
            {t("Volume.KEEP GOING!")}
          </motion.span>
        </>
      )}
    </div>
  );
};

export default VolumeCalculator;
