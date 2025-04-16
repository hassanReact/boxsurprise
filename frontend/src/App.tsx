import React, { useState } from "react";
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
import {GoogleOAuthProvider} from '@react-oauth/google';

type Props = {
  onLogin: (role: string) => void;
};

// 🛠 Dev Mode Toggle
// const devMode = true;

const AuthHandler: React.FC<{ setIsLoggedIn: (val: boolean) => void }> = ({
}) => {
  // const navigate = useNavigate();


  return null;
};

const App: React.FC<Props> = ({ onLogin }) => {

  const GoogleAuthWrapper = () =>{
    return (
      <GoogleOAuthProvider clientId={`474677330361-lk4gqk9852kprlal663mt8tqid851q9d.apps.googleusercontent.com`}>
        <UserLogin onLogin={handleLogin}></UserLogin>
      </GoogleOAuthProvider>
    );
  }

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<string>("user"); // 'user' or 'admin'

  const handleLogin = (role: string) => {
    setIsLoggedIn(true);
    setUserRole(role);
    onLogin(role); // If `onLogin` is needed
  };

  // const handleLogout = () => {
  //   setIsLoggedIn(false);
  //   setUserRole("user");
  // };

  // const showDashboard = devMode || isLoggedIn;

  return (
    <Router>
      <AuthHandler setIsLoggedIn={setIsLoggedIn} />
      {!isLoggedIn 
      ? 
      (
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow pt-20">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              {/* <Route path="/oauth-callback" element={<OAuthCallback />} /> */}
              <Route
                path="/login"
                element={<GoogleAuthWrapper />}
              />
              <Route path="/register" element={<UserSignUp />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </main>
          <Footer />
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