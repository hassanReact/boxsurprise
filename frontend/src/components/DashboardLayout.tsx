import { Outlet } from "react-router-dom";
import DashboardSidebar from "./DashboardSidebar";
import DashboardNavbar from "./DashboardNavbar";

const DashboardLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <DashboardSidebar userRole={""} />
      <div className="flex-1 flex flex-col">
        <DashboardNavbar onLogout={function (): void {
                  throw new Error("Function not implemented.");
              } } onToggleSidebar={function (): void {
                  throw new Error("Function not implemented.");
              } } isSidebarOpen={false} />
        <main className="p-4 flex-1 overflow-y-auto">
          <Outlet /> {/* 👈 Yeh nested routes ko render karega */}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
