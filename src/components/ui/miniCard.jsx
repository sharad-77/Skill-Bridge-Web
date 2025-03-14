import React from "react";

function MiniCard({ children }) {
  return (
    <div className="rounded-2xl w-50 bg-white shadow-md p-6 flex flex-col justify-center items-center gap-2 hover:shadow-lg hover:transition hover:ease-in-out 
    hover:duration-300 hover:-translate-y-2 hover:scale-105">
      <p className="text-[#7c3aed] text-3xl font-bold">{children[0]}</p>
      <p className="text-[#4b5563] text-lg">{children[1]}</p>
    </div>
  );
}

export default MiniCard;

