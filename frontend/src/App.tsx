import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
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
import { useAppSelector } from "./hooks";
import { RootState } from "./store";
import UserProfile from "./pages/UserProfile";




const App: React.FC = () => {
  // const [userRole, _setUserRole] = useState<string>("user"); // 'user' or 'admin'
  
  const isAuthenticated = useAppSelector((state: RootState) => state.auth.isAuthenticated);
  const userRole = useAppSelector((state: RootState) => state.auth.user?.role || "user");
  
  const authenticationRoute = window.location.pathname === "/login" || window.location.pathname === "/register" || window.location.pathname === "/verify-user";
  
  // const showDashboard = devMode || isLoggedIn;

  return (
    <Router>
      {!isAuthenticated ? (
        <div className="flex flex-col min-h-screen">
          {authenticationRoute ? <></>  :   <Navbar />}
          <main className="flex-grow pt-20">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route
                path="/login"
                element={<UserLogin />}
              />
              <Route path="/register" element={<UserSignUp />} />
              <Route path="/verify-user" element={<VerifyUser />} />
              {/* <Route path="/forgot-password/:token" element={} /> */}
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </main>
         {authenticationRoute ?  <></> : <Footer />}
        </div>
      ) : (
        <div className="flex h-screen bg-gray-100">
          <DashboardSidebar userRole={userRole} />
          <div className="flex-1 flex flex-col ">
            <DashboardNavbar onToggleSidebar={() => { } } isSidebarOpen={false} onLogout={function (): void {
                throw new Error("Function not implemented.");
              } } />
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
                </Route>
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </main>
          </div>
        </div>
      )}
    </Router>
  );
};

export default App;
