import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

function Footer() {
  const navigate = useNavigate();
  return (
    <section className="flex flex-col justify-center items-center">
      <div className="container mx-auto px-4 py-8 max-w-5xl flex flex-col justify-center items-center">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl grid-items-center ">
          <div>
            <h1 className="font-bold mb-4 text-[var(--primary-color)] cursor-pointer"
              onClick={() => navigate("/")}
            >
              SkillBridge
            </h1>
            <p className="text-lg text-secondary">
              Empowering students through collaborative learning and career
              growth.
            </p>
          </div>

          <div className="flex flex-col">
            <p className="font-semibold mb-4 text-gray-800"> Quick Links </p>
            <Link to="/" className="text-secondary mb-2 text-sm">
              Home
            </Link>
            <Link to="/Collaboration" className="text-secondary mb-2 text-sm">
              Collaboration Hub
            </Link>
            <Link to="/LearnSkill" className="text-secondary mb-2 text-sm">
              Skill Exchange
            </Link>
            <Link to="/Mentor" className="text-secondary text-sm">
              Mentor Match
            </Link>
          </div>

          <div className="flex flex-col">
            <p className="font-semibold mb-4 text-gray-800">Resources</p>
            <Link to="/Certificate" className="mb-2 text-secondary text-sm">
              Certificate
            </Link>
            <Link to="/" className="mb-2 text-secondary text-sm">
              Blog
            </Link>
            <Link to="/" className="text-secondary text-sm">
              FAQ
            </Link>
          </div>

          <div>
            <p className="font-semibold mb-4 text-gray-800">Contact</p>
            <p className="mb-2 text-secondary text-sm">Email : ChavdaSharad@gmail.com</p>
            <p className="text-secondary text-sm">Phone : 1234567890</p>
          </div>

        </div>

        <div className="mt-8 pt-8 border-t w-full border-gray-200 text-center text-sm text-gray-600 max-w-4xl flex justify-center items-center">
          <p> © 2025 SkillBridge. All rights reserved. </p>
        </div>
      </div>
    </section>

  );
}

export default Footer;
