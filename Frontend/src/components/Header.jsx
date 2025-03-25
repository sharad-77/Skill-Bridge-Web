import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Button from "./ui/Button";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="border-gray-200 max-w-7xl mx-auto ">
      <div className="px-2 h-full w-full ">
        <div className="flex items-center justify-between h-16 w-auto max-w-8xl xl:max-w-7xl mx-auto border-b border-gray-400">
          <p className="font-bold text-[#7c3aed] text-[1.6rem] cursor-pointer"
          onClick={() => window.location.replace("/")}
          >
            SkillBridge
          </p>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-[#7c3aed] focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex md:space-x-2 lg:space-x-4 items-center font-semibold">
            <NavLink
              to="/Collaboration"
              className={({ isActive }) =>
                isActive
                  ? "text-[#7c3aed] py-2 rounded-md md:text-xs lg:text-md"
                  : "text-[#4b5563] hover:text-[#7c3aed] py-2 rounded-md md:text-xs lg:text-base"
              }
            >
              Collaboration Hub
            </NavLink>

            <NavLink
              to="/Skill"
              className={({ isActive }) =>
                isActive
                  ? "text-[#7c3aed] py-2 rounded-md md:text-xs lg:text-base"
                  : "text-[#4b5563] hover:text-[#7c3aed] py-2 rounded-md md:text-xs lg:text-base"
              }
            >
              Skill Exchange
            </NavLink>

            <NavLink
              to="/Mentor"
              className={({ isActive }) =>
                isActive
                  ? "text-[#7c3aed] py-2 rounded-md md:text-xs lg:text-base"
                  : "text-[#4b5563] hover:text-[#7c3aed] py-2 rounded-md md:text-xs lg:text-base"
              }
            >
              Mentor Match
            </NavLink>

            <NavLink
              to="/Certificate"
              className={({ isActive }) =>
                isActive
                  ? "text-[#7c3aed] py-2 rounded-md md:text-xs lg:text-base"
                  : "text-[#4b5563] hover:text-[#7c3aed] py-2 rounded-md md:text-xs lg:text-base"
              }
            >
              Certifications
            </NavLink>

            <Button Variant="secondry" size="small">
              Signin
            </Button>

            <Button
              Variant="primary"
              size="small"
              className="bg-[#7c3aed] text-white items-center"
            >
              Signup
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`${isMenuOpen ? "block" : "hidden"} md:hidden`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col">
            <NavLink
              to="/Collaboration"
              className={({ isActive }) =>
                isActive
                  ? "text-[#7c3aed] block px-3 py-2 rounded-md text-base font-medium"
                  : "text-[#4b5563] hover:text-[#7c3aed] block px-3 py-2 rounded-md text-base font-medium"
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Collaboration Hub
            </NavLink>

            <NavLink
              to="/Skill-Exchange"
              className={({ isActive }) =>
                isActive
                  ? "text-[#7c3aed] block px-3 py-2 rounded-md text-base font-medium"
                  : "text-[#4b5563] hover:text-[#7c3aed] block px-3 py-2 rounded-md text-base font-medium"
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Skill Exchange
            </NavLink>

            <NavLink
              to="/Mentor"
              className={({ isActive }) =>
                isActive
                  ? "text-[#7c3aed] block px-3 py-2 rounded-md text-base font-medium"
                  : "text-[#4b5563] hover:text-[#7c3aed] block px-3 py-2 rounded-md text-base font-medium"
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Mentor Match
            </NavLink>

            <NavLink
              to="/Certificate"
              className={({ isActive }) =>
                isActive
                  ? "text-[#7c3aed] block px-3 py-2 rounded-md text-base font-medium"
                  : "text-[#4b5563] hover:text-[#7c3aed] block px-3 py-2 rounded-md text-base font-medium"
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Certifications
            </NavLink>

            <div className="flex flex-col space-y-2 pt-2">
              <Button
                Variant="primary"
                size="large"
                className="text-xl items-center gap-2"
              >
                SignUP
              </Button>
              <Button Variant="secondry" size="medium">
                Signin
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;

