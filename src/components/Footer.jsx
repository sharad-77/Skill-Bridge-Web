import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <section className="flex flex-col justify-center items-center bg-white">
      <div className="grid lg:grid-cols-4 lg:gap-8 h-full w-full lg:py-6 lg:px-2 md:px-5 px-4 grid-cols-2 gap-4 max-w-7xl border-t border-gray-200 ">
        
        <div className="text-xs md:text-[14px]">
          <h1 className="text-lg font-bold pb-2 text-[var(--primary-color)]">
            SkillBridge
          </h1>
          <p className="text-[var(--secoundry-color)] text-xs md:text-[14px]">
            Empowering students through collaborative learning and career
            growth.
          </p>
        </div>
        <div className="flex flex-col">
          <p className="text-lg font-semibold pb-2"> Quick Links </p>
          <Link to="/" className="text-secondary pb-1 text-sm md:text-[14px]">
            Home
          </Link>
          <Link to="/Collaboration" className="text-secondary pb-1 text-sm md:text-[14px]">
            Collaboration Hub
          </Link>
          <Link to="/Skill" className="text-secondary pb-1 text-sm md:text-[14px]">
            Skill Exchange
          </Link>
          <Link to="/Mentor" className="text-secondary text-sm md:text-[14px]">
            Mentor Match
          </Link>
        </div>
        <div className="flex flex-col ">
          <p className="text-lg font-semibold pb-2">Resources</p>
          <Link to="/Certificate" className="pb-1 text-secondary text-sm md:text-[14px]">
            Certificate
          </Link>
          <Link to="/" className="pb-1 text-secondary text-sm md:text-[14px]">
            Blog
          </Link>
          <Link to="/" className=" text-secondary text-sm md:text-[14px]">
            FAQ
          </Link>
        </div>
        <div>
          <p className="text-lg font-semibold pb-2">Contact</p>
          <p className="pb-1 text-secondary text-xs md:text-[14px]">Email:ChavdaSharad@gmail.com</p>
          <p className="pb-1 text-secondary text-sm md:text-[14px]">Phone:1234567890</p>
        </div>
      </div>
      <div className="flex justify-center items-center h-20 w-full border-t max-w-7xl border-gray-200 ">
        <p className="text-[#4b5563] text-sm md:text-[14px]"> © 2025 SkillBridge. All rights reserved. </p>
      </div>
    </section>
  );
}

export default Footer;