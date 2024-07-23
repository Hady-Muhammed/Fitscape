import React from "react";
import "animate.css/animate.min.css";
import ScrollReveal from "../animations/ScrollReveal";

// Define prop types
interface ChampionCardProps {
  title: string;
  img: string;
  desc: string;
}

const ChampionCard: React.FC<ChampionCardProps> = ({ title, img, desc }) => {
  return (
    <ScrollReveal animationName="fadeInUp">
      <div className="text-white text-center space-y-5">
        <img
          className="w-[16rem] h-80 object-cover rounded-xl mx-auto duration-300"
          src={img}
          alt={title}
        />
        <h2 className="text-3xl font-bold">{title}</h2>
        <p className="">{desc.slice(0, 200) + "..."}</p>
      </div>
    </ScrollReveal>
  );
};

export default ChampionCard;
