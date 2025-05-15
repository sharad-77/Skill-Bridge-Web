import React from "react";
import { twMerge } from "tailwind-merge";
import { MoveRight, Users } from "lucide-react";
import Button from "../ui/Button";

const MiniCard = ({ children }) => {
  return (
    <div
      className={twMerge(
        "rounded-lg w-full h-full bg-white shadow-md p-6 flex flex-col justify-center items-center gap-2 hover:shadow-lg hover:transition hover:ease-in-out hover:duration-300 hover:-translate-y-2 hover:scale-105"
      )}
    >
      <div className="text-[#7c3aed] text-2xl md:text-4xl font-bold">
        {children[0]}
      </div>
      <div className="text-[#4b5563] text:md md:text-lg">{children[1]}</div>
    </div>
  );
};

const FeaturesCard = ({ children, svg, title, description, className }) => {
  return (
    <div
      className={twMerge(
        "flex flex-col w-full h-full py-4 rounded-2xl border border-gray-100 hover:shadow-lg hover:transition hover:ease-in-out hover:duration-300 hover:-translate-y-2 cursor-pointer ",
        className
      )}
    >
      <div className="p-7">
        <div className="flex items-center justify-center bg-gray-100 h-17 w-17 rounded-2xl p-3 mb-6">
          {svg}
        </div>
        <div className="text-xl font-semibold my-5">{title}</div>
        <div className="text-gray-600">{description}</div>
        <div className="flex items-center gap-2 text-md mt-7">
          Learn more <MoveRight />
        </div>
      </div>
    </div>
  );
};

const ProjectsCard = ({
  title,
  category,
  Percentage,
  description,
  members,
  progress,
  tags,
}) => {
  return (
    <div className="max-w-md mx-auto border-2 border-purple-600 rounded-3xl overflow-hidden shadow-md bg-white hover:shadow-xl hover:scale-105 hover:border-purple-800 transition duration-300 ease-in-out cursor-pointer">
      <div className="flex items-left -mt-3 ml-3 absolute">
        <span className="bg-purple-800 text-white px-2 py-1 rounded-2xl text-sm">
          Featured
        </span>
      </div>
      
      <div className="px-6 py-8">
        <div className="">
          <span className="text-md font-semibold text-purple-500 group-hover:text-purple-700">
            {category}
          </span>
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-gray-600 mb-4">{description}</p>
          
          <div className="text-md mb-2 flex gap-2">
            <Users />
            {members} members
          </div>
          <div className="flex justify-between mb-1 text-black font-semibold">
            <div className="text-sm">Project Progress</div>
            <div className="text-sm">{progress}%</div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
            <div
              className="bg-purple-500 h-2.5 rounded-full transition-all duration-300 ease-in-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="mini-Heading px-2 py-1 text-xs rounded-lg hover:bg-purple-100 transition-colors duration-200"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="">
          <button className="flex justify-center gap-2 p-4 gradient-primary text-white font-semibold rounded-lg w-full h-full hover:brightness-110 transition-all duration-300">
            View Project <MoveRight className="transform transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
};
const CertificateCard =({ title, issuer, dateObtained, expirationDate, certificateLink })  => {

    return (
      <div className="bg-white border border-gray-300 rounded-lg p-6 h-full w-full">
        <div className="text-2xl font-semibold mb-2">{title}</div>

        <div className="text-gray-600 text-md">Issuer: {issuer}</div>

        <div className="text-lg">Date Obtained: {dateObtained}</div>
        <div className="text-lg">Expiration Date: {expirationDate}</div>
        <Button
            Variant="secondry"
            size="medium"
            className="h-10 mt-2 text-sm"
            onClick={certificateLink}
          >
            View Certificate
          </Button>
      </div>
    );  
  };
const MentorCard =({ name, Menotrpost,Expertise1,Expertise2,Expertise3, ...props})  => {

    return (
      <div className="h-full w-full border border-gray-300 rounded-lg p-6 h-full w-full">
        <div className="text-2xl font-semibold mb-2 text-2xl">{name}</div>

        <div className="text-gray-600 text-sm py-2">{Menotrpost}</div>
        <div className="font-bold text-md">Expertise:</div>
        <div><li>{Expertise1}</li></div>        
        <div><li>{Expertise2}</li></div>        
        <div><li>{Expertise3}</li></div>        
        <Button
            Variant="secondry"
            size="medium"
            className="h-10 mt-2 text-md"
          >
            Request Mentorship
          </Button>
      </div>
    );
  };

export {
  MiniCard,
  FeaturesCard,
  ProjectsCard,
  CertificateCard,
  MentorCard,
};
