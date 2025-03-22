import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Network, 
  DollarSign, 
  CreditCard, 
  MessageSquare, 
  Settings, 
  Users, 
  BarChart, 
  Menu,
  X,
  LogOut
} from 'lucide-react';

interface SidebarProps {
  userRole: string;
  onToggleSidebar?: () => void;
  isSidebarOpen?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  userRole, 
  onToggleSidebar, 
  isSidebarOpen = false 
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);
  
  useEffect(() => {
    if (isSidebarOpen !== undefined) {
      setIsMobileMenuOpen(isSidebarOpen);
    }
  }, [isSidebarOpen]);

  const userNavItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/dashboard' },
    { icon: <Network size={20} />, label: 'Referral Tree', path: '/referral-tree' },
    { icon: <DollarSign size={20} />, label: 'Earnings', path: '/earnings' },
    { icon: <CreditCard size={20} />, label: 'Withdrawals', path: '/withdrawals' },
    { icon: <MessageSquare size={20} />, label: 'Posts', path: '/posts' },
    { icon: <Settings size={20} />, label: 'Settings', path: '/settings' },
  ];

  const adminNavItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/dashboard' },
    { icon: <Users size={20} />, label: 'Users', path: '/users' },
    { icon: <BarChart size={20} />, label: 'Reports', path: '/reports' },
    { icon: <CreditCard size={20} />, label: 'Withdrawals', path: '/withdrawals' },
    { icon: <Settings size={20} />, label: 'Settings', path: '/settings' },
  ];

  const navItems = userRole === 'admin' ? adminNavItems : userNavItems;

  const toggleMobileMenu = () => {
    const newState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newState);
    if (onToggleSidebar) {
      onToggleSidebar();
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      toggleMobileMenu();
    }
  };

  return (
    <>
      <button
        onClick={toggleMobileMenu}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-all duration-300"
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={handleBackdropClick}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-indigo-900 text-white z-40 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center h-16 px-4 border-b border-indigo-800">
            <h1 className="text-2xl font-bold">MLM Network</h1>
          </div>

          <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center space-x-3 py-3 px-4 rounded-md transition-all duration-200 group ${
                  isActive(item.path)
                    ? 'bg-indigo-800 text-white shadow-lg'
                    : 'text-indigo-100 hover:bg-indigo-700 hover:shadow-md'
                }`}
              >
                <div className={`transition-transform duration-200 group-hover:scale-110 ${
                  isActive(item.path) ? 'transform scale-110' : ''
                }`}>
                  {item.icon}
                </div>
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>

          <div className="p-4 border-t border-indigo-800">
            <div className="bg-indigo-800 p-4 rounded-lg shadow-lg">
              <div className="flex items-center space-x-3">
                <div className="bg-indigo-700 p-2 rounded-full">
                  <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center">
                    <span className="font-bold text-white">
                      {userRole === 'admin' ? 'A' : 'U'}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium">
                    {userRole === 'admin' ? 'Admin User' : 'John Doe'}
                  </div>
                  <div className="text-xs text-indigo-200">ID: #12345</div>
                </div>
              </div>
            </div>

            <button 
              className="mt-4 w-full flex items-center justify-center space-x-2 px-4 py-2 text-sm text-white bg-indigo-700 rounded-md hover:bg-indigo-600 transition-all duration-200"
              onClick={() => {
                console.log('Logout clicked');
              }}
            >
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;