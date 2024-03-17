import axios from "axios";
import React, { useEffect, useState, lazy } from "react";
import { enviroment } from "../enviroment";
import { exercises } from "../exercisesData";
const ExerciseCard = lazy(() => import("../components/ExerciseCard"));

const Exercises = () => {
  // States
  const [dbExercises, setDbExercises] = useState([]);
  // Functions
  const getAllExercises = async () => {
    try {
      const res = await axios.get(enviroment.API_URL + "/api/exercises");
      setDbExercises(res.data.exers);
    } catch (error) {
      console.error(error.message);
    }
  };
  // Effects
  useEffect(() => {
    getAllExercises();
  }, []);

  return (
    <section className="xs:p-6 md:p-16" id="exercises">
      <h2 className="text-5xl text-white font-semibold4 text-center xs:px-0 xs:py-6  md:p-12">
        Exercises
      </h2>
      <div className="grid md:grid-cols-2 gap-20">
        {exercises.map((exer) => (
          <ExerciseCard
            key={exer.title}
            title={exer.title}
            img={exer.img}
            desc={exer.desc}
            tutorial={exer.tutorial}
          />
        ))}
        {dbExercises.map((exer) => (
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
