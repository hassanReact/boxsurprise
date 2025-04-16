import React, { useState, useEffect, useRef } from "react";
import { Bell, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks";

interface NavbarProps {
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
  onLogout: () => void; // Added onLogout property
}

const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar, isSidebarOpen }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.auth.user);
  console.log(user?.name); // Assuming the user data is in auth.user
  const userFirstName = user?.name;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setShowProfileMenu(false);
      }
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/logout`, {
      method: "POST",
      credentials: "include", // Include cookies in the request
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Logout successful:", data);
        // Redirect to login page or perform any other action
        window.location.href = "/login"; // Redirect to login page
      })
      .catch((error) => {
        console.error("Error during logout:", error);
      });
    // Optional: Clear localStorage or cookies if you store your JWT manually
    localStorage.removeItem("token"); // or cookies.remove('token') if using cookies
    localStorage.removeItem("user"); // or cookies.remove('user') if using cookies
    window.location.href = "/login";
  };

  const goToProfile = () => {
    setShowProfileMenu(false);
    navigate("/dashboard/profile"); // This goes to the settings page
  };

  const goToSettings = () => {
    setShowProfileMenu(false);
    navigate("/dashboard/settings"); // This goes to the settings page
  };

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
          Welcome back {userFirstName}!
        </div>
      </div>

      <div className="flex items-center space-x-2 md:space-x-4">
        {/* {isSignedIn && ( */}
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
              <div className="px-4 py-2 text-sm font-medium border-b">
                Notifications
              </div>
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
        {/* )} */}

        <div className="relative" ref={profileRef}>
          <div
            className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-indigo-100 flex items-center justify-center cursor-pointer overflow-hidden text-indigo-600 font-semibold uppercase"
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
            }}
          >
            {user?.imageUrl ? (
              <img
                src={user.imageUrl}
                alt="Profile"
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              user?.name?.charAt(0) || "?" // Show '?' if name is not available
            )}
          </div>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
              <button
                onClick={goToProfile}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Profile
              </button>
              <button
                onClick={goToSettings}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Settings
              </button>
              <div className="border-t border-gray-100"></div>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
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
