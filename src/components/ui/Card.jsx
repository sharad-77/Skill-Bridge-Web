import React from "react";
import { twMerge } from "tailwind-merge";
import { MoveRight } from "lucide-react";

const MiniCard = ({ children }) => {
  return (
    <div
      className={twMerge(
        "rounded-lg w-50 bg-white shadow-md p-6 flex flex-col justify-center items-center gap-2 hover:shadow-lg hover:transition hover:ease-in-out hover:duration-300 hover:-translate-y-2 hover:scale-105"
      )}
    >
      <p className="text-[#7c3aed] text-3xl font-bold">{children[0]}</p>
      <p className="text-[#4b5563] text-lg">{children[1]}</p>
    </div>
  );
};

const FeaturesCard = ({ children, svg, title, description, className}) => {

  return(
    <div className={twMerge("flex flex-col w-full h-full py-4 rounded-2xl border border-gray-100 hover:shadow-lg hover:transition hover:ease-in-out hover:duration-300 hover:-translate-y-2 cursor-pointer ",className)}>
      <div className="p-7">
      <div className="flex items-center justify-center bg-gray-100 h-17 w-17 rounded-2xl p-3 mb-6">{svg}</div>
      <div className="text-xl font-semibold my-5">{title}</div>
      <div className="text-gray-600">{description}</div>
      <div className="flex items-center gap-2 text-md mt-7">Learn more <MoveRight /></div>
      </div>
    </div>
  )

  };

const ReviewsCard = () => {};
const SkillsCard = () => {};
const PrimaryCard = () => {};
const SecondryCard = () => {};

export {
  MiniCard,
  FeaturesCard,
  ReviewsCard,
  SkillsCard,
  PrimaryCard,
  SecondryCard,
};

