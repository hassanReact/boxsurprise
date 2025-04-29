import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import DashboardNavbar from "./components/DashboardNavbar";
import Footer from "./components/Footer";
import DashboardSidebar from "./components/DashboardSidebar";
import HomePage from "./pages/Home";
import AboutPage from "./pages/About";
import UserLogin from "./components/UserLogin";
import UserSignUp from "./components/UserSignUp";
import Dashboard from "./pages/UserDashboard";
import ReferralTree from "./pages/UserReferralTree";
import Earnings from "./pages/UserEarnings";
import Withdrawals from "./pages/UserWithdrawls";
import Posts from "./pages/UserPosts";
import Settings from "./pages/UserSettings";
import DashboardLayout from "./components/DashboardLayout";
import VerifyUser from "./components/VerifyUser";
import { useAppDispatch, useAppSelector } from "./hooks";
import { RootState } from "./store";
import UserProfile from "./pages/UserProfile";
import { setAdmin, setUser } from "./features/auth/authSlice";
import ForgotPassword from "./components/ForgetPassword";
import ResetPassword from "./components/ResetPassword";
import EarningConfirmation from "./pages/EarningConfirmation";

// Create a wrapper component to use Router hooks
const AppContent: React.FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  
  const isAuthenticated = useAppSelector((state: RootState) => state.auth.isAuthenticated);
  const isAdmin = useAppSelector((state: RootState) => state.auth.isAdmin);
  console.log("isAdmin", isAdmin);
  
  // Check if current path is an authentication route
  const isAuthRoute = [
    "/login",
    "/register",
    "/verify-user",
    "/forget-password"
  ].includes(location.pathname) || location.pathname.startsWith("/reset-password/");

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      console.log("Parsed User:", parsedUser);  // Log the parsed user object
  
      if (parsedUser?.role) {
        dispatch(setUser(parsedUser)); // Dispatch user data to Redux
        dispatch(setAdmin(parsedUser.role === "admin")); // Set admin status
      } else {
        console.log("User role is missing or invalid in localStorage");
      }
    } else {
      console.log("No user found in localStorage");
    }
  }, [dispatch]);
  

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col min-h-screen">
        {!isAuthRoute && <Navbar />}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/login" element={<UserLogin />} />
            <Route path="/register" element={<UserSignUp />} />
            <Route path="/register/:referralId" element={<UserSignUp />} />
            <Route path="/verify-user" element={<VerifyUser />} />
            <Route path="/forget-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </main>
        {!isAuthRoute && <Footer />}
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <DashboardSidebar userRole={isAdmin ? "admin" : "user"} />
      <div className="flex-1 flex flex-col">
        <DashboardNavbar 
          onToggleSidebar={() => {}} 
          isSidebarOpen={false} 
          onLogout={function (): void {
            throw new Error("Function not implemented.");
          }} 
        />
        <main className="flex-1 overflow-hidden bg-gray-100 p-4 lg:ml-64 ml-16">
          <Routes>
            <Route path="/dashboard/*" element={<DashboardLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="referral-tree" element={<ReferralTree />} />
              <Route path="earnings" element={<Earnings />} />
              <Route path="withdrawals" element={<Withdrawals />} />
              <Route path="posts" element={<Posts />} />
              <Route path="settings" element={<Settings />} />
              <Route path="profile" element={<UserProfile />} />
              {/* Conditional route for EarningConfirmation */}
              <Route path="earningsconfirmation" element={isAdmin ? <EarningConfirmation isAdmin={isAdmin} /> : <Navigate to="/dashboard" replace />} />
            </Route>
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

// Main App component that provides the Router context
const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
