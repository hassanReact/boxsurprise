import React, { useState, useEffect, useRef } from 'react';
import { useLogout } from "../hooks/useLogout"; // Ensure correct path
import { Bell, User, Menu, X } from 'lucide-react';
import { useAuth, useUser } from '@clerk/clerk-react';

interface NavbarProps {
  onLogout: () => void;
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ 
  onToggleSidebar, 
  isSidebarOpen 
}) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  const logout = useLogout();

  const {isSignedIn} = useAuth()
  const {user} = useUser()
  
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white shadow-md h-16 flex items-center justify-between px-4 md:px-6 fixed top-0 right-0 left-0 z-30 lg:left-64 transition-all duration-300">
      <div className="flex items-center">
        <button 
          onClick={onToggleSidebar}
          className="mr-4 cursor-pointer lg:hidden focus:outline-none"
          aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <div className="text-base md:text-xl font-semibold text-gray-800 truncate">
          Welcome back, {isSignedIn ? user?.fullName : 'Guest'}!
        </div>
      </div>
      
      <div className="flex items-center space-x-2 md:space-x-4">
        {isSignedIn && (
          <div className="relative" ref={notificationRef}>
            <Bell 
              className="text-gray-500 cursor-pointer hover:text-indigo-600 transition-colors" 
              size={20} 
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowProfileMenu(false);
              }}
            />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
              3
            </span>
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-60 md:w-80 bg-white rounded-md shadow-lg py-1 z-10">
                <div className="px-4 py-2 text-sm font-medium border-b">Notifications</div>
                <div className="max-h-64 overflow-y-auto">
                  <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    <p className="text-sm font-medium">New referral joined</p>
                    <p className="text-xs text-gray-500">10 minutes ago</p>
                  </div>
                  <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    <p className="text-sm font-medium">Commission earned</p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                  <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    <p className="text-sm font-medium">Withdrawal approved</p>
                    <p className="text-xs text-gray-500">Yesterday</p>
                  </div>
                </div>
                <div className="px-4 py-2 text-sm text-indigo-600 border-t text-center cursor-pointer">
                  View all notifications
                </div>
              </div>
            )}
          </div>
        )}
        
        <div className="relative" ref={profileRef}>
          <div 
            className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-indigo-100 flex items-center justify-center cursor-pointer overflow-hidden"
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
            }}
          >
            {isSignedIn && user?.imageUrl ? (
              <img src={user.imageUrl} alt="Profile" className="w-full h-full object-cover rounded-full" />
            ) : (
              <User size={18} className="text-indigo-600" />
            )}
          </div>
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Profile
              </a>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Settings
              </a>
              <div className="border-t border-gray-100"></div>
              <button 
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                onClick={logout}
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
