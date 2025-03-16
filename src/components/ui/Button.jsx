import React from "react";
import { twMerge } from "tailwind-merge";

const Button = ({ children,  Variant = "primary",
    size = "medium", className, onClick, ...props }) => {
  const varientStyles = {
    primary: "gradient-primary text-white hover:opacity-90",
    secondry:
      "text-[#000000] hover:bg-[var(--primary-color)] hover:text-[#ffffff]",
    normal:"bg-gray-800 text-white hover:bg-white hover:text-black border border-black",
  };

  const buttonSize = {
    small: "text-md px-4 py-2",
    medium: "text-lg px-6 py-3",
    large: "text-lg px-6 py-3",
  };

  return (
    <button
      onClick={onClick}
      className={twMerge(
        "flex rounded-lg font-semibold btn-shine cursor-pointer border border-gray-300 items-center justify-center gap-2",
        varientStyles[Variant],
        buttonSize[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};


export default Button;