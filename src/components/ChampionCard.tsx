import React from "react";
import ScrollAnimation from "react-animate-on-scroll";
import "animate.css/animate.min.css";

// Define prop types
interface ChampionCardProps {
  title: string;
  img: string;
  desc: string;
}

const ChampionCard: React.FC<ChampionCardProps> = ({ title, img, desc }) => {
  return (
    <ScrollAnimation offset={500} animateIn="animate__fadeInUp">
      <div className="text-white text-center space-y-5">
        <img
          className="w-[16rem] h-80 object-cover rounded-xl mx-auto duration-300"
          src={img}
          alt={title}
        />
        <h2 className="text-3xl font-bold">{title}</h2>
        <p className="">{desc.slice(0, 200) + "..."}</p>
      </div>
    </ScrollAnimation>
  );
};

export default ChampionCard;
