import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import ReferralTree from './pages/ReferralTree';
import Earnings from './pages/Earnings';
import Withdrawals from './pages/Withdrawls';
import Posts from './pages/UserPosts';
import Settings from './pages/UserSettings';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/admin/Dashboard';
import AdminUsers from './pages/admin/Users';
// import AdminReports from './pages/admin/Reports';
// import AdminWithdrawals from './pages/admin/Withdrawals';
// import AdminSettings from './pages/admin/Settings';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<string>('user'); // 'user' or 'admin'

  // Mock login function
  const handleLogin = (role: string) => {
    setIsLoggedIn(true);
    setUserRole(role);
  };

  // Mock logout function
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole('user');
  };

  // Uncomment this block when you're ready to implement actual login
  /*
  if (!isLoggedIn) {
    return (
      <Router>
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    );
  }
  */

  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        <Sidebar userRole={userRole} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Navbar onLogout={handleLogout} onToggleSidebar={() => {}} isSidebarOpen={false} />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4 lg:ml-64 ml-16">
            <Routes>
              {userRole === 'admin' ? (
                // Admin routes
                <>
                  <Route path="/dashboard" element={<AdminDashboard />} />
                  <Route path="/users" element={<AdminUsers />} />
                  {/* <Route path="/reports" element={<AdminReports />} /> */}
                  {/* <Route path="/withdrawals" element={<AdminWithdrawals />} /> */}
                  {/* <Route path="/settings" element={<AdminSettings />} /> */}
                  <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </>
              ) : (
                // User routes
                <>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/referral-tree" element={<ReferralTree />} />
                  <Route path="/earnings" element={<Earnings />} />
                  <Route path="/withdrawals" element={<Withdrawals />} />
                  <Route path="/posts" element={<Posts />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </>
              )}
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;