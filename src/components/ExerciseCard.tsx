import "animate.css/animate.min.css";
import React, { FC } from "react";
import ScrollReveal from "../animations/ScrollReveal";

interface ExerciseCardProps {
  title: string;
  img: string;
  desc: string;
  tutorial: string;
}
const ExerciseCard: FC<ExerciseCardProps> = ({
  title,
  img,
  desc,
  tutorial,
}) => {
  return (
    <ScrollReveal animationName="fadeInUp">
      <div className="text-white text-center space-y-5">
        <a className="group relative block" href={tutorial} target="blank">
          <img
            loading="lazy"
            className="w-full group-hover:brightness-50 h-80 object-cover rounded-md mx-auto duration-300"
            src={img}
            alt={title}
          />
          <p className="font-medium text-xl duration-300 opacity-0 group-hover:opacity-[1] absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
            Watch Tutorial
          </p>
        </a>
        <h2 className="text-3xl font-bold">{title}</h2>
        <p className="">{desc.slice(0, 200) + "..."}</p>
      </div>
    </ScrollReveal>
  );
};

export default ExerciseCard;
