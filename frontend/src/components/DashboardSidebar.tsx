import React from 'react';
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
  LogOut
} from 'lucide-react';
import { useUser, useClerk } from '@clerk/clerk-react';

interface DashboardSidebarProps {
  userRole: string;
}

const Sidebar: React.FC<DashboardSidebarProps> = ({userRole}) => {
  const location = useLocation();
  const { user } = useUser();
  const { signOut } = useClerk();
  const userName = user?.fullName || 'Guest User';
  const userInitial = userName.charAt(0).toUpperCase();

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path);
  };

  const userNavItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/dashboard' },
    { icon: <Network size={20} />, label: 'Referral Tree', path: '/dashboard/referral-tree' },
    { icon: <DollarSign size={20} />, label: 'Earnings', path: '/dashboard/earnings' },
    { icon: <CreditCard size={20} />, label: 'Withdrawals', path: '/dashboard/withdrawals' },
    { icon: <MessageSquare size={20} />, label: 'Posts', path: '/dashboard/posts' },
    { icon: <Settings size={20} />, label: 'Settings', path: '/dashboard/settings' },
  ];

  const adminNavItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/dashboard' },
    { icon: <Users size={20} />, label: 'Users', path: '/users' },
    { icon: <BarChart size={20} />, label: 'Reports', path: '/reports' },
    { icon: <CreditCard size={20} />, label: 'Withdrawals', path: '/withdrawals' },
    { icon: <Settings size={20} />, label: 'Settings', path: '/settings' },
  ];

  const navItems = userRole === 'admin' ? adminNavItems : userNavItems;

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 h-screen bg-indigo-900 text-white fixed left-0 top-0">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center h-20 px-4 border-b border-indigo-800">
            <img src='/BoxSurprise - WhiteVersion.png' className='w-40 h-40'/>
          </div>

          <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
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
                      {user?.imageUrl ? 
                        <img src={user.imageUrl} alt={userName} className="rounded-full" /> 
                        : userInitial}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium">{userName}</div>
                  <div className="text-xs text-indigo-200">
                    Role: {userRole}
                  </div>
                </div>
              </div>
            </div>

            <button
              className="mt-4 w-full flex items-center justify-center space-x-2 px-4 py-2 text-sm text-white bg-indigo-700 rounded-md hover:bg-indigo-600 transition-all duration-200"
              onClick={() => signOut()}
            >
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <aside className="lg:hidden w-16 h-screen bg-indigo-900 text-white fixed left-0 top-0">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center h-16 border-b border-indigo-800">
            <span className="text-xl font-bold">MLM</span>
          </div>

          <nav className="flex-1 px-2 py-4 space-y-4 overflow-y-auto flex flex-col items-center">
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className={`flex items-center justify-center p-3 rounded-md transition-all duration-200 ${
                  isActive(item.path)
                    ? 'bg-indigo-800 text-white shadow-lg'
                    : 'text-indigo-100 hover:bg-indigo-700 hover:shadow-md'
                }`}
                title={item.label}
              >
                <div className={`transition-transform duration-200 hover:scale-110 ${
                  isActive(item.path) ? 'transform scale-110' : ''
                }`}>
                  {item.icon}
                </div>
              </Link>
            ))}
          </nav>

          <div className="p-2 border-t border-indigo-800 flex justify-center">
            <button
              className="my-4 flex items-center justify-center p-3 text-white bg-indigo-700 rounded-md hover:bg-indigo-600 transition-all duration-200"
              onClick={() => signOut()}
              title="Logout"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
