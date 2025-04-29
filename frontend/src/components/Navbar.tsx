import type React from "react";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { BookOpen, CheckCircle, ChevronDown, HelpCircle, Home, Info, List, LogIn, Menu, Package, Phone, Star, User, UserPlus, Users, X } from "lucide-react";
import { useKindeAuth } from '@kinde-oss/kinde-auth-react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [aboutSubmenuOpen, setAboutSubmenuOpen] = useState(false);
  const [plansSubmenuOpen, setPlansSubmenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // Get login status and functions from Kinde Auth
  const { login, register, user, logout } = useKindeAuth();

  // Handle scroll effect
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

  // Handle clicks outside menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  // Function to close menu when a link is clicked
  const closeMenu = () => {
    setIsMenuOpen(false);
    setAboutSubmenuOpen(false);
    setPlansSubmenuOpen(false);
  };

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-100 ${scrolled ? "bg-white shadow-md" : "bg-transparent"}`}
    >
      <div className="container mx-auto px-4">
        <nav className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="logo">
            <Link to="/" className="flex items-center h-10" onClick={closeMenu}>
              <img src={scrolled ? "/BoxSurprise - Logo.png" : "/BoxSurprise - WhiteVersion.png"} alt="MLM Lab" className="h-38 w-43" />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link to="/" className={`font-medium transition duration-300 ${
    scrolled ? "text-gray-800 hover:text-blue-600" : "text-white hover:text-blue-600"
  }`}>
              Home
            </Link>
            <div className="relative group">
              <button className={`font-medium transition duration-300 flex items-center cursor-pointer ${
    scrolled ? "text-gray-800 hover:text-blue-600" : "text-white hover:text-blue-600"
  }`}>
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
              <button className={`font-medium transition duration-300 flex items-center cursor-pointer ${
    scrolled ? "text-gray-800 hover:text-blue-600" : "text-white hover:text-blue-600"
  }`}>
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
            <Link to="/blogs" className={`font-medium transition duration-300 ${
    scrolled ? "text-gray-800 hover:text-blue-600" : "text-white hover:text-blue-600"
  }`}>
              Blogs
            </Link>
            {/* Show Login/Register only if user is not logged in */}
            {!user ? (
              <>
                <Link to='/login' onClick={() => login()} className={`font-medium transition duration-300 ${
    scrolled ? "text-gray-800 hover:text-blue-600" : "text-white hover:text-blue-600"
  }`}>
                  Login
                </Link>
                <Link to='/register'
                  onClick={() => register()}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors duration-100"
                >
                  Register
                </Link>
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
            <button 
              ref={menuButtonRef}
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="text-gray-700 focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
  <div 
    ref={menuRef}
    className="lg:hidden py-2 border-t border-gray-200 bg-white rounded-b-lg shadow-md animate-fadeIn"
  >
    <nav className="flex flex-col space-y-1 px-4">
      {/* Home Link */}
      <Link 
        to="/" 
        className="flex items-center py-3 text-gray-800 hover:text-blue-600 font-medium border-b border-gray-100"
        onClick={closeMenu}
      >
        <Home className="h-5 w-5 mr-3" />
        Home
      </Link>

      {/* About Section */}
      <div className="border-b border-gray-100">
        <button
          className="flex justify-between items-center w-full py-3 text-gray-800 hover:text-blue-600 font-medium"
          onClick={() => setAboutSubmenuOpen(!aboutSubmenuOpen)}
        >
          <div className="flex items-center">
            <Info className="h-5 w-5 mr-3" />
            About
          </div>
          <ChevronDown className={`h-5 w-5 transition-transform duration-300 ${aboutSubmenuOpen ? "rotate-180" : ""}`} />
        </button>
        
        <div className={`overflow-hidden transition-all duration-300 ${aboutSubmenuOpen ? "max-h-48" : "max-h-0"}`}>
          <div className="pl-8 py-2 space-y-3 bg-gray-50 rounded-md mb-2">
            <Link 
              to="/about" 
              className="flex items-center py-2 text-gray-700 hover:text-blue-600"
              onClick={closeMenu}
            >
              <Users className="h-4 w-4 mr-2" />
              About Us
            </Link>
            <Link 
              to="/contact" 
              className="flex items-center py-2 text-gray-700 hover:text-blue-600"
              onClick={closeMenu}
            >
              <Phone className="h-4 w-4 mr-2" />
              Contact
            </Link>
            <Link 
              to="/faq" 
              className="flex items-center py-2 text-gray-700 hover:text-blue-600"
              onClick={closeMenu}
            >
              <HelpCircle className="h-4 w-4 mr-2" />
              FAQ
            </Link>
          </div>
        </div>
      </div>

      {/* Plans Section */}
      <div className="border-b border-gray-100">
        <button
          className="flex justify-between items-center w-full py-3 text-gray-800 hover:text-blue-600 font-medium"
          onClick={() => setPlansSubmenuOpen(!plansSubmenuOpen)}
        >
          <div className="flex items-center">
            <Package className="h-5 w-5 mr-3" />
            Plans
          </div>
          <ChevronDown className={`h-5 w-5 transition-transform duration-300 ${plansSubmenuOpen ? "rotate-180" : ""}`} />
        </button>
        
        <div className={`overflow-hidden transition-all duration-300 ${plansSubmenuOpen ? "max-h-48" : "max-h-0"}`}>
          <div className="pl-8 py-2 space-y-3 bg-gray-50 rounded-md mb-2">
            <Link 
              to="/plans/standard" 
              className="flex items-center py-2 text-gray-700 hover:text-blue-600"
              onClick={closeMenu}
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Standard Plan
            </Link>
            <Link 
              to="/plans/premium" 
              className="flex items-center py-2 text-gray-700 hover:text-blue-600"
              onClick={closeMenu}
            >
              <Star className="h-4 w-4 mr-2" />
              Premium Plan
            </Link>
            <Link 
              to="/plans/all" 
              className="flex items-center py-2 text-gray-700 hover:text-blue-600"
              onClick={closeMenu}
            >
              <List className="h-4 w-4 mr-2" />
              All Plans
            </Link>
          </div>
        </div>
      </div>

      {/* Blogs Link */}
      <Link 
        to="/blogs" 
        className="flex items-center py-3 text-gray-800 hover:text-blue-600 font-medium border-b border-gray-100"
        onClick={closeMenu}
      >
        <BookOpen className="h-5 w-5 mr-3" />
        Blogs
      </Link>
      
      {/* Auth Section */}
      <div className="pt-2">
        {!user ? (
          <div className="flex flex-col space-y-3 mt-2">
            <button 
              onClick={() => {
                login();
                closeMenu();
              }} 
              className="flex items-center justify-center py-3 border border-blue-600 text-blue-600 hover:bg-blue-50 font-medium rounded-lg transition-colors duration-300"
            >
              <Link to='/login' className="flex items-center justify-center">
              <LogIn className="h-5 w-5 mr-2" />
              Login
              </Link>
              
            </button>
            <button
              onClick={() => {
                register();
                closeMenu();
              }}
              className="py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-300"
            >
              <Link to='/register' className="flex items-center justify-center">
              <UserPlus className="h-5 w-5 mr-2" />
              Register
              </Link>
            </button>
          </div>
        ) : (
          <div className="flex flex-col space-y-3">
            <div className="flex items-center py-3 px-3 bg-blue-50 rounded-lg">
              <User className="h-5 w-5 text-blue-600 mr-3" />
              <span className="text-gray-800 font-medium">Welcome, {user.givenName}</span>
            </div>
            <button
              onClick={() => {
                logout();
                closeMenu();
              }}
              className="py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-300 flex items-center justify-center"
            >
              <LogIn className="h-5 w-5 mr-2" />
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  </div>
)}
      </div>
    </header>
  );
};

export default Navbar;