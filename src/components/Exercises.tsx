import React from "react";
import { exercises } from "../exercisesData";
import ExerciseCard from "./ExerciseCard";
import { useTranslation } from "react-i18next";

const Exercises = () => {
  // Utilites
  const { t } = useTranslation();
  return (
    <section className="xs:p-6 md:p-16 main-color" id="exercises">
      <h2 className="text-5xl text-white font-semibold4 text-center xs:px-0 xs:py-6  md:p-12">
        {t("Exercises")}
      </h2>
      <div className="grid md:grid-cols-2 gap-20">
        {exercises?.map((exer) => (
          <ExerciseCard
            key={exer.title}
            title={exer.title}
            img={exer.img}
            desc={exer.desc}
            tutorial={exer.tutorial}
          />
        ))}
      </div>
    </section>
  );
};

export default Exercises;
