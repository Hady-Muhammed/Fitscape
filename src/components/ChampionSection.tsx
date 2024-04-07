import axios from "axios";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { champions } from "../championsData";
import ChampionCard from "./ChampionCard";
import { enviroment as env } from "../enviroment";
import { Champion } from "../types/champion";
const ChampionSection = () => {
  // States
  const [dbChampions, setDbChampions] = useState([]);
  // Functions
  const getAllChampions = async () => {
    try {
      const res = await axios.get(env.API_URL + "/api/champs");
      setDbChampions(res.data.champs);
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  // Effects
  useEffect(() => {
    getAllChampions();
  }, []);

  return (
    <section className="xs:p-2 md:p-16 main-color" id="champions">
      <motion.div exit={{ x: "-200vh" }}>
        <h2 className="text-5xl text-white font-semibold4 text-center p-12 font-mont">
          The Greatest OF ALL Time Classic Physiques!
        </h2>
        <div className="grid md:grid-cols-2 gap-20">
          {champions.map((champ) => (
            <ChampionCard
              key={champ.title}
              title={champ.title}
              img={champ.img}
              desc={champ.desc}
            />
          ))}
          {dbChampions.map((champ: Champion) => (
            <ChampionCard
              key={champ._id}
              title={champ.name}
              img={champ.img}
              desc={champ.description}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default ChampionSection;
