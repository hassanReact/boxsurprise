import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DashboardSidebar from "./DashboardSidebar";
import DashboardNavbar from "./DashboardNavbar";
import { setDirectReferrals } from "../features/auth/authSlice"; // Adjust the import path as needed

const DashboardLayout = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Get user email from localStorage or your auth state
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const userEmail = useSelector((state: any) => state.auth.user?.email) || localStorage.getItem('userEmail') || '';
  // const userEmail = localStorage.getItem('userEmail') || '';
  
  const fetchReferralTree = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URI}/api/referral/tree`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: userEmail })
      });
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      
      const responseData = await response.json();
      console.log("API response:", responseData);
      
      // Check if we have direct referrals data
      if (responseData.data?.directReferrals && Array.isArray(responseData.data.directReferrals)) {
        // Extract referral IDs and format them
        const directReferralsArray: { referralId: string }[] = responseData.data.directReferrals;
        const referralIds = directReferralsArray.map((item: { referralId: string }) => item.referralId).join(', ');
        
        // Store referral IDs in Redux state
        dispatch(setDirectReferrals(directReferralsArray));
        console.log("Stored referral IDs:", referralIds);
      } else {
        console.log("No direct referrals found");
        dispatch(setDirectReferrals([]));
      }
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch referral tree';
      setError(errorMessage);
      console.error('Error fetching referral tree:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch data when component mounts or when the location changes
  useEffect(() => {
    // Check if user is on dashboard page
    if (location.pathname === '/dashboard') {
      fetchReferralTree();
    }
  }, [location.pathname, dispatch]);

  const handleLogout = () => {
    // Implement your logout logic here
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    // Redirect to login page or wherever needed
    window.location.href = '/login';
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <DashboardSidebar userRole={""} />
      <div className="flex-1 flex flex-col">
        <DashboardNavbar 
          onLogout={handleLogout} 
          onToggleSidebar={handleToggleSidebar} 
          isSidebarOpen={isSidebarOpen} 
        />
        <main className="p-4 flex-1 overflow-y-auto">
          {isLoading && <div>Loading referral data...</div>}
          {error && <div className="text-red-500">Error: {error}</div>}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;