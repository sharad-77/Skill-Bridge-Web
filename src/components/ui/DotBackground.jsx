import React from "react";

function DotBackground({ children }) {
    return (
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-background">
        {/* Dot Pattern */}
        <div className="absolute inset-0 bg-dot-pattern bg-dots text-gray-300 [mask-image:radial-gradient(300px_circle_at_center,white,transparent)]" />
{/* Content */}
        <div className="relative z-10">{children}</div>
      </div>
    );
  }
  

export default DotBackground;