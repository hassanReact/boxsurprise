import React from 'react';
// import { useLogout } from "../hooks/useLogout"; // Ensure correct path
import { Users, DollarSign, TrendingUp, Award, CreditCard } from 'lucide-react';

const Dashboard: React.FC = () => {
  // const logout = useLogout();
  const statsData = [
    { title: 'Total Referrals', value: '27', icon: <Users size={20} />, color: 'bg-blue-500' },
    { title: 'Total Earnings', value: '$1,234', icon: <DollarSign size={20} />, color: 'bg-green-500' },
    { title: 'Network Growth', value: '+15%', icon: <TrendingUp size={20} />, color: 'bg-purple-500' },
    { title: 'Level Achieved', value: 'Gold', icon: <Award size={20} />, color: 'bg-yellow-500' },
  ];

  return (
    <div className="max-w-max transition-all duration-300">
      <div className="p-4 md:p-6 mt-16 bg-gray-50 min-h-screen">
        <div className="mb-6 flex">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Dashboard</h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
          {statsData.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-4 md:p-6 flex items-center">
              <div className={`rounded-full ${stat.color} p-2 md:p-3 mr-3 md:mr-4 text-white`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-base md:text-lg font-bold text-gray-700">{stat.value}</p>
                <p className="text-xs md:text-sm text-gray-500">{stat.title}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          <div className="bg-white rounded-lg shadow-md p-4 md:p-6 lg:col-span-2">
            <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">Recent Referrals</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm font-medium text-gray-600">Name</th>
                    <th className="text-left py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm font-medium text-gray-600">Level</th>
                    <th className="text-left py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm font-medium text-gray-600 hidden sm:table-cell">Date Joined</th>
                    <th className="text-left py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm font-medium text-gray-600">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3, 4, 5].map((item) => (
                    <tr key={item} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-2 md:py-3 px-2 md:px-4">
                        <div className="flex items-center">
                          <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-indigo-100 flex items-center justify-center mr-2 md:mr-3">
                            <span className="text-xs md:text-sm font-medium text-indigo-600">
                              {String.fromCharCode(64 + item)}
                            </span>
                          </div>
                          <span className="text-xs md:text-sm font-medium text-gray-700">User {item}</span>
                        </div>
                      </td>
                      <td className="py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm text-gray-700">Level {item % 3 + 1}</td>
                      <td className="py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm text-gray-700 hidden sm:table-cell">
                        {new Date(2023, 0, item * 3).toLocaleDateString()}
                      </td>
                      <td className="py-2 md:py-3 px-2 md:px-4">
                        <span className={`px-1.5 md:px-2 py-0.5 md:py-1 text-xs rounded-full ${
                          item % 3 === 0 ? 'bg-green-100 text-green-800' :
                          item % 3 === 1 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {item % 3 === 0 ? 'Active' : item % 3 === 1 ? 'Pending' : 'New'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 text-center">
              <button className="text-indigo-600 hover:text-indigo-800 text-xs md:text-sm font-medium">
                View All Referrals
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">Earnings Breakdown</h2>
            <div className="space-y-3 md:space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xs md:text-sm text-gray-500">Level 1 Earnings</p>
                  <p className="text-base md:text-lg font-semibold">$580.00</p>
                </div>
                <div className="w-16 md:w-24 bg-gray-200 h-1.5 md:h-2 rounded-full overflow-hidden">
                  <div className="bg-green-500 h-full rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xs md:text-sm text-gray-500">Level 2 Earnings</p>
                  <p className="text-base md:text-lg font-semibold">$350.00</p>
                </div>
                <div className="w-16 md:w-24 bg-gray-200 h-1.5 md:h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-full rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xs md:text-sm text-gray-500">Level 3 Earnings</p>
                  <p className="text-base md:text-lg font-semibold">$240.00</p>
                </div>
                <div className="w-16 md:w-24 bg-gray-200 h-1.5 md:h-2 rounded-full overflow-hidden">
                  <div className="bg-purple-500 h-full rounded-full" style={{ width: '30%' }}></div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xs md:text-sm text-gray-500">Bonuses</p>
                  <p className="text-base md:text-lg font-semibold">$64.00</p>
                </div>
                <div className="w-16 md:w-24 bg-gray-200 h-1.5 md:h-2 rounded-full overflow-hidden">
                  <div className="bg-yellow-500 h-full rounded-full" style={{ width: '8%' }}></div>
                </div>
              </div>
            </div>
            <div className="mt-4 md:mt-6 border-t pt-3 md:pt-4">
              <div className="flex justify-between items-center">
                <p className="text-xs md:text-sm text-gray-500">Total This Month</p>
                <p className="text-base md:text-xl font-bold">$1,234.00</p>
              </div>
              <div className="mt-1 md:mt-2 flex justify-between items-center">
                <p className="text-xs text-gray-500">Compared to last month</p>
                <p className="text-xs md:text-sm text-green-500 font-medium">+12.5%</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 md:mt-8 bg-white rounded-lg shadow-md p-4 md:p-6">
          <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">Recent Activities</h2>
          <div className="space-y-3 md:space-y-4">
            {[
              { title: 'New referral joined your network', time: '2 hours ago', icon: <Users size={16} />, color: 'bg-blue-100 text-blue-600' },
              { title: 'Commission earned from Level 2', time: 'Yesterday', icon: <DollarSign size={16} />, color: 'bg-green-100 text-green-600' },
              { title: 'Withdrawal processed', time: '2 days ago', icon: <CreditCard size={16} />, color: 'bg-purple-100 text-purple-600' },
              { title: 'Achieved new rank: Gold', time: '1 week ago', icon: <Award size={16} />, color: 'bg-yellow-100 text-yellow-600' },
            ].map((activity, index) => (
              <div key={index} className="flex items-start">
                <div className={`rounded-full ${activity.color} p-1.5 md:p-2 mr-2 md:mr-3`}>
                  {activity.icon}
                </div>
                <div>
                  <p className="text-xs md:text-sm font-medium text-gray-800">{activity.title}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <button className="text-indigo-600 hover:text-indigo-800 text-xs md:text-sm font-medium">
              View All Activities
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;