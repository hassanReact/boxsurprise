import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4">
        <nav className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="logo">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-blue-600">MLM Lab</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link to="/" className="text-gray-800 hover:text-blue-600 font-medium">Home</Link>
            <div className="relative group">
              <button className="text-gray-800 hover:text-blue-600 font-medium flex items-center">
                About
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg p-2 hidden group-hover:block transition-all duration-300">
                <Link to="/about" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 rounded-md">About Us</Link>
                <Link to="/contact" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 rounded-md">Contact</Link>
                <Link to="/faq" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 rounded-md">FAQ</Link>
              </div>
            </div>
            <div className="relative group">
              <button className="text-gray-800 hover:text-blue-600 font-medium flex items-center">
                Plans
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg p-2 hidden group-hover:block transition-all duration-300">
                <Link to="/plans/standard" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 rounded-md">Standard Plan</Link>
                <Link to="/plans/premium" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 rounded-md">Premium Plan</Link>
                <Link to="/plans/all" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 rounded-md">All Plans</Link>
              </div>
            </div>
            <Link to="/blogs" className="text-gray-800 hover:text-blue-600 font-medium">Blogs</Link>
            <Link to="/login" className="text-gray-800 hover:text-blue-600 font-medium">Login</Link>
            <Link to="/register" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors duration-300">Register</Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 focus:outline-none"
            >
              {isMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200">
            <Link to="/" className="block py-2 text-gray-800 hover:text-blue-600 font-medium">Home</Link>
            
            <div className="py-2">
              <button 
                className="flex justify-between items-center w-full text-gray-800 hover:text-blue-600 font-medium"
                onClick={() => {
                  const submenu = document.getElementById('about-submenu');
                  if (submenu) {
                    submenu.classList.toggle('hidden');
                  }
                }}
              >
                About
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div id="about-submenu" className="hidden pl-4 mt-2 space-y-2">
                <Link to="/about" className="block py-2 text-gray-700 hover:text-blue-600">About Us</Link>
                <Link to="/contact" className="block py-2 text-gray-700 hover:text-blue-600">Contact</Link>
                <Link to="/faq" className="block py-2 text-gray-700 hover:text-blue-600">FAQ</Link>
              </div>
            </div>
            
            <div className="py-2">
              <button 
                className="flex justify-between items-center w-full text-gray-800 hover:text-blue-600 font-medium"
                onClick={() => {
                  const submenu = document.getElementById('plans-submenu');
                  if (submenu) {
                    submenu.classList.toggle('hidden');
                  }
                }}
              >
                Plans
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div id="plans-submenu" className="hidden pl-4 mt-2 space-y-2">
                <Link to="/plans/standard" className="block py-2 text-gray-700 hover:text-blue-600">Standard Plan</Link>
                <Link to="/plans/premium" className="block py-2 text-gray-700 hover:text-blue-600">Premium Plan</Link>
                <Link to="/plans/all" className="block py-2 text-gray-700 hover:text-blue-600">All Plans</Link>
              </div>
            </div>
            
            <Link to="/blogs" className="block py-2 text-gray-800 hover:text-blue-600 font-medium">Blogs</Link>
            <Link to="/login" className="block py-2 text-gray-800 hover:text-blue-600 font-medium">Login</Link>
            <Link to="/register" className="block py-2 bg-blue-600 hover:bg-blue-700 text-white px-4 rounded-md transition-colors duration-300 w-full text-center mt-2">Register</Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
