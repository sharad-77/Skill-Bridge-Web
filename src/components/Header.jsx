import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white border border-gray-200 fixed w-full z-10">
      <div className="px-2 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 w-auto max-w-8xl xl:max-w-7xl mx-auto">
          <p className="font-bold text-[#7c3aed] text-[1.6rem] cursor-pointer">SkillBridge</p>
          
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
          
          {/* Desktop nav */}
          <div className="hidden md:flex md:space-x-2 lg:space-x-4 items-center font-semibold">
            <NavLink
              to="/Collaboration"
              activeClassName="text-[#7c3aed]"
              className="text-[#4b5563] hover:text-[#7c3aed] py-2 rounded-md md:text-xs lg:text-base"
            >
              Collaboration Hub
            </NavLink>

            <NavLink
              to="/Skill-Exchange"
              activeClassName="text-[#7c3aed]"
              className="text-[#4b5563] hover:text-[#7c3aed] py-2 rounded-md md:text-xs lg:text-base"
            >
              Skill Exchange
            </NavLink>

            <NavLink
              to="/Mentor"
              activeClassName="text-[#7c3aed]"
              className="text-[#4b5563] hover:text-[#7c3aed] py-2 rounded-md md:text-xs lg:text-base"
            >
              Mentor Match
            </NavLink>

            <NavLink
              to="/Certificate"
              activeClassName="text-[#7c3aed]"
              className="text-[#4b5563] hover:text-[#7c3aed] py-2 rounded-md md:text-xs lg:text-base"
            >
              Certifications
            </NavLink>
         
            <button className="bg-white text-black w-22 h-10 rounded-xl border border-gray-300 hover:bg-[#7c3aed] hover:text-white cursor-pointer text-sm lg:text-base">Sign in</button>
            <button className="gradient-primary text-white w-22 h-10 rounded-xl border border-gray-300 hover:opacity-80 cursor-pointer text-sm lg:text-base">Sign up</button>
          </div>
        </div>
        
        {/* Mobile menu */}
        <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col">
            <NavLink
              to="/Collaboration"
              activeClassName="text-[#7c3aed]"
              className="text-[#4b5563] hover:text-[#7c3aed] block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Collaboration Hub
            </NavLink>
            
            <NavLink
              to="/Skill-Exchange"
              activeClassName="text-[#7c3aed]"
              className="text-[#4b5563] hover:text-[#7c3aed] block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Skill Exchange
            </NavLink>
            
            <NavLink
              to="/Mentor"
              activeClassName="text-[#7c3aed]"
              className="text-[#4b5563] hover:text-[#7c3aed] block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Mentor Match
            </NavLink>
            
            <NavLink
              to="/Certificate"
              activeClassName="text-[#7c3aed]"
              className="text-[#4b5563] hover:text-[#7c3aed] block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Certifications
            </NavLink>
            
            <div className="flex flex-col space-y-2 pt-2">
              <button className="bg-white text-black py-2 px-4 rounded-xl border border-gray-300 hover:bg-[#7c3aed] hover:text-white cursor-pointer">
                Sign in
              </button>
              <button className="gradient-primary text-white py-2 px-4 rounded-xl border border-gray-300 hover:opacity-80 cursor-pointer">
                Sign up
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;