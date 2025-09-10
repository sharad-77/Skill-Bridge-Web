import {
  Award,
  BookOpen,
  ChevronDown,
  LogOut,
  MessageSquare,
  User,
  UserPlus,
  Users
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/ui/Button.jsx";
import useAuthStore from "../store/useAuthStore.js";

export default function Header() {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRefs = useRef({});

  const { isAuthenticated, user, logout, initAuth, isInitializing } = useAuthStore();
  const navigate = useNavigate();

  // Initialize auth on component mount
  useEffect(() => {
    initAuth();
  }, [initAuth]);

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

  const handleLogout = () => {
    logout();
    closeDropdown();
    setIsMobileMenuOpen(false);
    navigate('/');
  };

  const handleProfileClick = () => {
    if (user?.role === "student" || user?.role === "mentor") {
      navigate("/profile");
    } else {
      navigate("/");
    }
    closeDropdown();
  };

  const navItems = [
    {
      name: "Learning",
      key: "learning",
      icon: BookOpen,
      items: [
        { name: "Collaboration Hub", to: "/collaboration", icon: Users, description: "Work on projects together" },
        { name: "Skill Exchange", to: "/learnSkill", icon: Award, description: "Trade skills with peers" },
        { name: "Certifications", to: "/certificate", icon: Award, description: "Earn verified certificates" },
      ],
    },
    {
      name: "Mentorship",
      key: "mentorship",
      icon: Users,
      items: [
        { name: "Find Mentors", to: "/mentor", icon: Users, description: "Connect with industry experts" },
        { name: "My Requests", to: "/mentorship-requests", icon: MessageSquare, description: "Track mentorship requests" },
        { name: "Chat", to: "/chat", icon: MessageSquare, description: "Message your mentors" },
      ],
    },
    {
      name: "Account",
      key: "account",
      icon: User,
      items: [
        { name: "Profile", to: "/profile", icon: User, description: "View and edit your profile" },
      ],
    },
  ];

  if (isInitializing) {
    return (
      <header className="border-b border-gray-200 sticky top-0 z-50 shadow-sm bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <nav className="flex items-center justify-between h-14 sm:h-16 lg:h-18">
            <div className="flex-shrink-0">
              <Link to="/" className="text-lg sm:text-xl lg:text-2xl font-bold gradient-text-primary">
                SkillBridge
              </Link>
            </div>
            <div className="animate-pulse h-6 sm:h-8 w-20 sm:w-24 bg-gray-200 rounded-md"></div>
          </nav>
        </div>
      </header>
    );
  }

  return (
    <header className="border-b border-gray-200 sticky top-0 z-50 shadow-sm bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <nav className="flex items-center justify-between h-14 sm:h-16 lg:h-18">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-lg sm:text-xl lg:text-2xl font-bold gradient-text-primary hover:opacity-80 transition-opacity">
              SkillBridge
            </Link>
          </div>

          <div className='flex items-center'>
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1 mr-4">
              {navItems.map((navItem) => (
                <div
                  key={navItem.key}
                  ref={(el) => (dropdownRefs.current[navItem.key] = el)}
                  className="relative"
                >
                  <button
                    onClick={() => toggleDropdown(navItem.key)}
                    className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${activeDropdown === navItem.key
                        ? "bg-purple-50 text-purple-700 shadow-sm"
                        : "text-gray-600 hover:text-purple-600 hover:bg-gray-50"
                      }`}
                  >
                    <navItem.icon className="w-4 h-4 flex-shrink-0" />
                    <span className="whitespace-nowrap">{navItem.name}</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === navItem.key ? "rotate-180" : ""
                        }`}
                    />
                  </button>

                  {/* Dropdown */}
                  {activeDropdown === navItem.key && (
                    <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50 animate-in slide-in-from-top-2 duration-200">
                      {navItem.items.map((item, index) => (
                        <Link
                          key={index}
                          to={item.to}
                          onClick={closeDropdown}
                          className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 transition-colors group"
                        >
                          <item.icon className="w-4 h-4 text-gray-400 group-hover:text-purple-600 flex-shrink-0 mt-0.5 transition-colors" />
                          <div className="min-w-0 flex-1">
                            <p className="font-medium text-gray-900 group-hover:text-purple-700 truncate text-sm">
                              {item.name}
                            </p>
                            <p className="text-xs text-gray-500 line-clamp-2 mt-0.5">{item.description}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Auth Section - Desktop */}
            <div className="hidden lg:flex items-center space-x-3">
              {isAuthenticated ? (
                <div
                  ref={(el) => (dropdownRefs.current.profile = el)}
                  className="relative"
                >
                  <button
                    onClick={() => toggleDropdown('profile')}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${activeDropdown === 'profile'
                        ? "bg-purple-50 text-purple-700 shadow-sm"
                        : "text-gray-600 hover:text-purple-600 hover:bg-gray-50"
                      }`}
                  >
                    <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-medium flex-shrink-0">
                      {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                    <span className="font-medium text-sm max-w-24 truncate">
                      {user?.name || 'Profile'}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 flex-shrink-0 ${activeDropdown === 'profile' ? "rotate-180" : ""
                        }`}
                    />
                  </button>

                  {/* Profile Dropdown Menu */}
                  {activeDropdown === 'profile' && (
                    <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50 animate-in slide-in-from-top-2 duration-200">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="font-medium text-gray-900 truncate text-sm">
                          {user?.name || 'User'}
                        </p>
                        <p className="text-xs text-gray-500 truncate mt-0.5">
                          {user?.email || 'user@example.com'}
                        </p>
                      </div>

                      <div className="py-1">
                        <button
                          onClick={handleProfileClick}
                          className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors w-full text-left"
                        >
                          <User className="w-4 h-4 flex-shrink-0" />
                          Profile
                        </button>
                      </div>

                      <div className="border-t border-gray-100 py-1">
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors w-full text-left"
                        >
                          <LogOut className="w-4 h-4 flex-shrink-0" />
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* Sign In/Up Buttons */
                <div className="flex items-center space-x-2">
                  <Button variant="outline" asChild className="text-sm px-3 sm:px-4 py-2 h-9">
                    <Link to="/signin">Sign In</Link>
                  </Button>
                  <Button asChild className="bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm px-3 sm:px-4 py-2 h-9">
                    <Link to="/signup">Sign Up</Link>
                  </Button>
                </div>
              )}
            </div>

            {/* Mobile/Tablet Menu Button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-purple-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500 transition-colors"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!isMobileMenuOpen ? (
                  <svg className="block h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                ) : (
                  <svg className="block h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </button>
            </div>
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
                  <navItem.icon className="w-4 h-4 text-gray-500 flex-shrink-0" />
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
                      className="flex items-start gap-3 px-4 py-3 text-sm rounded-lg text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors"
                    >
                      <item.icon className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <div className="min-w-0 flex-1">
                        <p className="font-medium truncate">{item.name}</p>
                        <p className="text-xs text-gray-500 line-clamp-2 mt-0.5">{item.description}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            {/* Auth Section - Mobile */}
            <div className="pt-4 border-t border-gray-200 space-y-3">
              {isAuthenticated ? (
                /* Mobile Profile Section */
                <>
                  <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-medium flex-shrink-0">
                      {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate text-sm">
                        {user?.name || 'User'}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {user?.email || 'user@example.com'}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <button
                      onClick={() => {
                        handleProfileClick();
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex items-center gap-3 px-4 py-3 text-sm rounded-lg text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors w-full text-left"
                    >
                      <User className="w-4 h-4 flex-shrink-0" />
                      Profile
                    </button>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-4 py-3 text-sm rounded-lg text-red-600 hover:bg-red-50 transition-colors w-full text-left"
                    >
                      <LogOut className="w-4 h-4 flex-shrink-0" />
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                /* Mobile Sign In/Up Buttons */
                <div className="space-y-2">
                  <Button variant="outline" asChild className="w-full justify-center h-10">
                    <Link to="/signin" onClick={() => setIsMobileMenuOpen(false)}>
                      Sign In
                    </Link>
                  </Button>
                  <Button asChild className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white justify-center h-10">
                    <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                      Sign Up
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
