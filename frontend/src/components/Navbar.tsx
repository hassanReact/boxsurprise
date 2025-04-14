import type React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import { useKindeAuth } from '@kinde-oss/kinde-auth-react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [aboutSubmenuOpen, setAboutSubmenuOpen] = useState(false);
  const [plansSubmenuOpen, setPlansSubmenuOpen] = useState(false);

  // Get login status and functions from Kinde Auth
  const { login, register, user, logout } = useKindeAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-100 ${scrolled ? "bg-white shadow-md" : "bg-transparent"}`}
    >
      <div className="container mx-auto px-4">
        <nav className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="logo">
            <Link to="/" className="flex items-center h-10">
              <img src="/BoxSurprise - Logo.png" alt="MLM Lab" className="h-38 w-43" />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link to="/" className="text-gray-800 hover:text-blue-600 font-medium">
              Home
            </Link>
            <div className="relative group">
              <button className="text-gray-800 hover:text-blue-600 font-medium flex items-center">
                About
                <ChevronDown className="h-4 w-4 ml-1" />
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg p-2 hidden group-hover:block transition-all duration-100">
                <Link to="/about" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 rounded-md">
                  About Us
                </Link>
                <Link to="/contact" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 rounded-md">
                  Contact
                </Link>
                <Link to="/faq" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 rounded-md">
                  FAQ
                </Link>
              </div>
            </div>
            <div className="relative group">
              <button className="text-gray-800 hover:text-blue-600 font-medium flex items-center">
                Plans
                <ChevronDown className="h-4 w-4 ml-1" />
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg p-2 hidden group-hover:block transition-all duration-100">
                <Link to="/plans/standard" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 rounded-md">
                  Standard Plan
                </Link>
                <Link to="/plans/premium" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 rounded-md">
                  Premium Plan
                </Link>
                <Link to="/plans/all" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 rounded-md">
                  All Plans
                </Link>
              </div>
            </div>
            <Link to="/blogs" className="text-gray-800 hover:text-blue-600 font-medium">
              Blogs
            </Link>
            {/* Show Login/Register only if user is not logged in */}
            {!user ? (
              <>
                <button onClick={() => login()} className="text-gray-800 hover:text-blue-600 font-medium">
                  Login
                </button>
                <button
                  onClick={() => register()}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors duration-100"
                >
                  Register
                </button>
              </>
            ) : (
              <>
              <span className="text-gray-800 font-medium">Welcome, {user.givenName}</span>
              <button
                  onClick={() => logout()}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors duration-100"
                >
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700 focus:outline-none">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200">
            <Link to="/" className="block py-2 text-gray-800 hover:text-blue-600 font-medium">
              Home
            </Link>

            <div className="py-2">
              <button
                className="flex justify-between items-center w-full text-gray-800 hover:text-blue-600 font-medium"
                onClick={() => setAboutSubmenuOpen(!aboutSubmenuOpen)}
              >
                About
                <ChevronDown className={`h-4 w-4 transition-transform ${aboutSubmenuOpen ? "rotate-180" : ""}`} />
              </button>
              <div className={`pl-4 mt-2 space-y-2 ${aboutSubmenuOpen ? "block" : "hidden"}`}>
                <Link to="/about" className="block py-2 text-gray-700 hover:text-blue-600">
                  About Us
                </Link>
                <Link to="/contact" className="block py-2 text-gray-700 hover:text-blue-600">
                  Contact
                </Link>
                <Link to="/faq" className="block py-2 text-gray-700 hover:text-blue-600">
                  FAQ
                </Link>
              </div>
            </div>

            <div className="py-2">
              <button
                className="flex justify-between items-center w-full text-gray-800 hover:text-blue-600 font-medium"
                onClick={() => setPlansSubmenuOpen(!plansSubmenuOpen)}
              >
                Plans
                <ChevronDown className={`h-4 w-4 transition-transform ${plansSubmenuOpen ? "rotate-180" : ""}`} />
              </button>
              <div className={`pl-4 mt-2 space-y-2 ${plansSubmenuOpen ? "block" : "hidden"}`}>
                <Link to="/plans/standard" className="block py-2 text-gray-700 hover:text-blue-600">
                  Standard Plan
                </Link>
                <Link to="/plans/premium" className="block py-2 text-gray-700 hover:text-blue-600">
                  Premium Plan
                </Link>
                <Link to="/plans/all" className="block py-2 text-gray-700 hover:text-blue-600">
                  All Plans
                </Link>
              </div>
            </div>

            <Link to="/blogs" className="block py-2 text-gray-800 hover:text-blue-600 font-medium">
              Blogs
            </Link>
            {!user ? (
              <>
                <button onClick={() => login()} className="block py-2 text-gray-800 hover:text-blue-600 font-medium">
                  Login
                </button>
                <button
                  onClick={() => register()}
                  className="block py-2 bg-blue-600 hover:bg-blue-700 text-white px-4 rounded-md transition-colors duration-100 w-full text-center mt-2"
                >
                  Register
                </button>
              </>
            ) : (
              <span className="block py-2 text-gray-800 font-medium">Welcome, {user.givenName}</span>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
