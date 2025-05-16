import React from "react";
import { CircleUserRound, MessageSquareText } from "lucide-react";
import { twMerge } from "tailwind-merge";

const PostComponent = ({ children, className }) => {
  return (
    <div
      className={twMerge(
        "bg-white rounded-lg shadow-md p-5 transform transition-all duration-300",
        "hover:shadow-xl hover:-translate-y-1 hover:bg-gray-50 hover:border-blue-200",
        "border border-transparent group cursor-pointer",
        className
      )}
    >
      <div className="flex mb-3">
        <div className="mr-3">
          <MessageSquareText className="text-gray-500 h-6 w-6 group-hover:text-blue-500 transition-colors duration-300" />
        </div>
        <div className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
          {children[0]}
        </div>
      </div>

      <div className="border-b border-gray-300 mb-3"></div>

      <div className="flex items-center mt-4 pl-9">
        <div className="p-1 bg-gray-100 rounded-full mr-3 group-hover:bg-blue-100 transition-colors duration-300">
          <CircleUserRound className="text-gray-500 h-5 w-5 group-hover:text-blue-600 transition-colors duration-300" />
        </div>
        <div className="flex flex-col">
          <div className="font-semibold text-gray-800 group-hover:text-gray-900">
            {children[1]}
          </div>
          <div className="text-sm font-semibold text-gray-500 group-hover:text-gray-700 transition-colors duration-300">
            {children[2]}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostComponent;
