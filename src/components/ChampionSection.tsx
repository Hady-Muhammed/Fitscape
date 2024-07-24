import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import ChampionCard from "./ChampionCard";
import { Champion } from "../types/champion";
import useChampion from "../hooks/useChampion";
import { champions as fakeChampions } from "../championsData";
import { useTranslation } from "react-i18next";
const ChampionSection = () => {
  const { t } = useTranslation();
  const { getAllChampions } = useChampion();
  const [champions, setChampions] = useState<Champion[]>([]);
  useEffect(() => {
    getAllChampions().then((champs) => setChampions(champs));
  }, []);

  return (
    <section className="xs:p-2 md:p-16 main-color" id="champions">
      <motion.div exit={{ x: "-200vh" }}>
        <h2 className="text-5xl text-white font-semibold4 text-center p-12">
          {t("ChampionsSection.The Greatest OF ALL Time Classic Physiques!")}
        </h2>
        <div className="grid md:grid-cols-2 gap-20">
          {fakeChampions?.map((champ) => (
            <ChampionCard
              key={champ.title}
              title={champ.title}
              img={champ.img}
              desc={champ.description}
            />
          ))}
          {champions?.map((champ: Champion) => (
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
