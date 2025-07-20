import {
  Award,
  BookOpen,
  Briefcase,
  ChevronDown,
  GraduationCap,
  MessageSquare,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/ui/Button.jsx";

export default function Header() {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRefs = useRef({});

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        activeDropdown &&
        dropdownRefs.current[activeDropdown] &&
        !dropdownRefs.current[activeDropdown].contains(event.target)
      ) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [activeDropdown]);

  const toggleDropdown = (key) => {
    setActiveDropdown(activeDropdown === key ? null : key);
  };

  const closeDropdown = () => setActiveDropdown(null);

  const navItems = [
    {
      name: "Learning",
      key: "learning",
      icon: BookOpen,
      items: [
        { name: "Collaboration Hub", to: "/collaboration", icon: Users, description: "Work on projects together" },
        { name: "Skill Exchange", to: "/LearnSkill", icon: Award, description: "Trade skills with peers" },
        { name: "Certifications", to: "/Certificate", icon: Award, description: "Earn verified certificates" },
      ],
    },
    {
      name: "Mentorship",
      key: "mentorship",
      icon: Users,
      items: [
        { name: "Find Mentors", to: "/Mentor", icon: Users, description: "Connect with industry experts" },
        { name: "My Requests", to: "/Mentorship-requests", icon: MessageSquare, description: "Track mentorship requests" },
        { name: "Chat", to: "/Chat", icon: MessageSquare, description: "Message your mentors" },
        { name: "Request Mentor", to: "/Mentor-request", icon: UserPlus, description: "Send mentorship request" },
      ],
    },
    {
      name: "Account",
      key: "account",
      icon: User,
      items: [
        { name: "Profile", to: "/profile", icon: User, description: "View and edit your profile" },
        { name: "Dashboard", to: "/dashboard", icon: Settings, description: "Your personal dashboard" },
        { name: "Student Onboarding", to: "/onboarding/student", icon: GraduationCap, description: "Complete student setup" },
        { name: "Mentor Onboarding", to: "/onboarding/mentor", icon: Briefcase, description: "Complete mentor setup" },
      ],
    },
  ];

  return (
    <header className="border-b border-gray-200 sticky top-0 z-50 shadow-sm bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl sm:text-2xl font-bold gradient-text-primary">
              SkillBridge
            </Link>
          </div>

          <div className='flex'>
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((navItem) => (
              <div
                key={navItem.key}
                ref={(el) => (dropdownRefs.current[navItem.key] = el)}
                className="relative"
              >
                <button
                  onClick={() => toggleDropdown(navItem.key)}
                  className={`flex items-center gap-2 px-3 py-2 text-[25px] rounded-lg transition-all ${activeDropdown === navItem.key
                      ? "bg-purple-50 text-purple-700 shadow-sm"
                      : "text-gray-600 hover:text-purple-600 hover:bg-gray-50"
                    }`}
                >
                  <navItem.icon className="w-4 h-4" />
                  <span className="whitespace-nowrap">{navItem.name}</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${activeDropdown === navItem.key ? "rotate-180" : ""
                      }`}
                  />
                </button>

                {/* Dropdown */}
                {activeDropdown === navItem.key && (
                  <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                    {navItem.items.map((item, index) => (
                      <Link
                        key={index}
                        to={item.to}
                        onClick={closeDropdown}
                        className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 transition-colors group"
                      >
                        <item.icon className="w-4 h-4 text-gray-400 group-hover:text-purple-600 flex-shrink-0 mt-0.5" />
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-gray-900 group-hover:text-purple-700 truncate">
                            {item.name}
                          </p>
                          <p className="text-xs text-gray-500 line-clamp-2">{item.description}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Auth Buttons - Desktop */}
          <div className="hidden lg:flex items-center space-x-3">
            <Button variant="outline" asChild className="text-sm px-4 py-2">
              <Link to="/signin">Sign In</Link>
            </Button>
            <Button asChild className="bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm px-4 py-2">
              <Link to="/signup">Sign Up</Link>
            </Button>
          </div>
    </div>

          {/* Mobile/Tablet Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-purple-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isMobileMenuOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-4 space-y-4 max-h-[calc(100vh-4rem)] overflow-y-auto">
            {navItems.map((navItem) => (
              <div key={navItem.key} className="space-y-2">
                <div className="flex items-center gap-2 px-2 py-1">
                  <navItem.icon className="w-4 h-4 text-gray-500" />
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                    {navItem.name}
                  </p>
                </div>
                <div className="space-y-1">
                  {navItem.items.map((item, index) => (
                    <Link
                      key={index}
                      to={item.to}
                      onClick={() => {
                        closeDropdown();
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex items-center gap-3 px-4 py-3 text-sm rounded-lg text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors"
                    >
                      <item.icon className="w-4 h-4 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="font-medium truncate">{item.name}</p>
                        <p className="text-xs text-gray-500 line-clamp-2">{item.description}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            {/* Auth Buttons - Mobile */}
            <div className="pt-4 border-t border-gray-200 space-y-3">
              <Button variant="outline" asChild className="w-full justify-center">
                <Link to="/signin" onClick={() => setIsMobileMenuOpen(false)}>
                  Sign In
                </Link>
              </Button>
              <Button asChild className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white justify-center">
                <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                  Sign Up
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
