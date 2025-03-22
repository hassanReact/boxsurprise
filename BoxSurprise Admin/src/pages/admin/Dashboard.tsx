import React from 'react';
import { Users, DollarSign, TrendingUp, Activity } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  // Sample data for demonstration
  const statsData = [
    { title: 'Total Users', value: '1,234', icon: <Users size={20} />, color: 'bg-blue-500' },
    { title: 'Total Earnings', value: '$45,678', icon: <DollarSign size={20} />, color: 'bg-green-500' },
    { title: 'User Growth', value: '+22%', icon: <TrendingUp size={20} />, color: 'bg-purple-500' },
    { title: 'Active Users', value: '87%', icon: <Activity size={20} />, color: 'bg-yellow-500' },
  ];

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="text-gray-600">Overview of Surprise Box network system</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsData.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6 flex items-center">
            <div className={`rounded-full ${stat.color} p-3 mr-4 text-white`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-lg font-bold text-gray-700">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 xl:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Recent Users</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">User</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Referrer</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Date Joined</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Action</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4, 5].map((item) => (
                  <tr key={item} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                          <span className="font-medium text-indigo-600">
                            {String.fromCharCode(64 + item)}
                          </span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">User {item}</span>
                          <p className="text-xs text-gray-500">user{item}@example.com</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-700">
                      {item === 1 ? 'Direct' : `User ${item - 1}`}
                    </td>
                    <td className="py-3 px-4 text-gray-700">
                      {new Date(2023, 0, item * 3).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        item % 3 === 0 ? 'bg-green-100 text-green-800' :
                        item % 3 === 1 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {item % 3 === 0 ? 'Active' : item % 3 === 1 ? 'Pending' : 'New'}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-center">
            <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
              View All Users
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">System Overview</h2>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <p className="text-gray-600 text-sm">User Growth</p>
                <p className="text-indigo-600 text-sm font-medium">+15% this month</p>
              </div>
              <div className="bg-gray-200 h-2 rounded-full overflow-hidden">
                <div className="bg-indigo-600 h-full rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <p className="text-gray-600 text-sm">Network Distribution</p>
              </div>
              <div className="flex items-center justify-between text-sm mb-2">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-indigo-600 rounded-full mr-2"></div>
                  <p className="text-gray-700">Level 1</p>
                </div>
                <p className="font-medium">20%</p>
              </div>
              <div className="flex items-center justify-between text-sm mb-2">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                  <p className="text-gray-700">Level 2</p>
                </div>
                <p className="font-medium">35%</p>
              </div>
              <div className="flex items-center justify-between text-sm mb-2">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <p className="text-gray-700">Level 3</p>
                </div>
                <p className="font-medium">25%</p>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                  <p className="text-gray-700">Level 4+</p>
                </div>
                <p className="font-medium">20%</p>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <p className="text-gray-600 text-sm">Conversion Rate</p>
                <p className="text-green-600 text-sm font-medium">Good</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">Signup to Active</p>
                <p className="text-sm font-medium">78%</p>
              </div>
              <div className="flex items-center justify-between mt-1">
                <p className="text-sm text-gray-500">Referral Rate</p>
                <p className="text-sm font-medium">52%</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Withdrawals</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">User</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Amount</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Date</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4].map((item) => (
                  <tr key={item} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                          <span className="font-medium text-indigo-600">
                            {String.fromCharCode(64 + item)}
                          </span>
                        </div>
                        <span className="font-medium text-gray-700">User {item}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-700">${(item * 75).toFixed(2)}</td>
                    <td className="py-3 px-4 text-gray-700">
                      {new Date(2023, 1, item * 2).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        item % 3 === 0 ? 'bg-green-100 text-green-800' :
                        item % 3 === 1 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {item % 3 === 0 ? 'Completed' : item % 3 === 1 ? 'Pending' : 'Rejected'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Top Earners</h2>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-600 text-white font-bold mr-3">
                    {item}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">User {10 - item}</p>
                    <p className="text-xs text-gray-500">Level {Math.ceil(item / 2)}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-800">${(1000 - item * 75).toFixed(2)}</p>
                  <p className="text-xs text-gray-500">Network Size: {40 - item * 5}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

