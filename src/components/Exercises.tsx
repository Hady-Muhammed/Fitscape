import React, { useEffect, useState } from "react";
import { exercises } from "../exercisesData";
import { Exercise } from "../types/exercise";
import useExercise from "../hooks/useExercise";
import ExerciseCard from "./ExerciseCard";

const Exercises = () => {
  // States
  const [dbExercises, setDbExercises] = useState([]);
  const { getAllExercises } = useExercise();
  // Effects
  useEffect(() => {
    getAllExercises().then((exercises) => setDbExercises(exercises));
  }, []);

  return (
    <section className="xs:p-6 md:p-16" id="exercises">
      <h2 className="text-5xl text-white font-semibold4 text-center xs:px-0 xs:py-6  md:p-12">
        Exercises
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
        {dbExercises?.map((exer: Exercise) => (
          <ExerciseCard
            key={exer.name}
            title={exer.name}
            img={exer.img}
            desc={exer.description}
            tutorial={exer.vid}
          />
        ))}
      </div>
    </section>
  );
};

export default Exercises;
