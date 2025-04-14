import React from "react";
import { Users, TrendingUp, Award, CreditCard } from "lucide-react";

const Dashboard: React.FC = () => {
  const statsData = [
    {
      title: "Total Referrals",
      value: "27",
      icon: <Users size={20} />,
      color: "bg-blue-500",
    },
    {
      title: "Total Earnings",
      value: "1,234",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <text
            x="4"
            y="18"
            fontFamily="Arial, sans-serif"
            fontSize="18"
            fill="#1b1b1b"
          >
            ₨
          </text>
        </svg>
      ),
      color: "bg-green-500",
    },
    {
      title: "Network Growth",
      value: "+15%",
      icon: <TrendingUp size={20} />,
      color: "bg-purple-500",
    },
    {
      title: "Level Achieved",
      value: "Gold",
      icon: <Award size={20} />,
      color: "bg-yellow-500",
    },
  ];

  return (
    // Using the exact same structure as Earnings component to ensure consistent scrolling
    <div className="space-y-6 mt-14">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Dashboard
        </h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsData.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-sm p-4 flex items-center"
          >
            <div className={`rounded-full ${stat.color} p-2 mr-3 text-white`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-base font-bold text-gray-700">{stat.value}</p>
              <p className="text-xs text-gray-500">{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Content grid - Recent Referrals and Earnings Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Recent Referrals */}
        <div className="bg-white rounded-lg shadow-sm lg:col-span-2">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold">Recent Referrals</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Level
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase hidden sm:table-cell">
                    Date Joined
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[1, 2, 3, 4, 5].map((item) => (
                  <tr key={item} className="hover:bg-gray-50">
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center mr-2">
                          <span className="text-xs font-medium text-indigo-600">
                            {String.fromCharCode(64 + item)}
                          </span>
                        </div>
                        <span className="text-xs font-medium text-gray-700">
                          User {item}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-xs text-gray-700">
                      Level {(item % 3) + 1}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-xs text-gray-700 hidden sm:table-cell">
                      {new Date(2023, 0, item * 3).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          item % 3 === 0
                            ? "bg-green-100 text-green-800"
                            : item % 3 === 1
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {item % 3 === 0
                          ? "Active"
                          : item % 3 === 1
                          ? "Pending"
                          : "New"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 text-center">
            <button className="text-indigo-600 hover:text-indigo-800 text-xs font-medium">
              View All Referrals
            </button>
          </div>
        </div>

        {/* Earnings Breakdown */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <h2 className="text-lg font-semibold mb-3">Earnings Breakdown</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs text-gray-500">Level 1 Earnings</p>
                <p className="text-base font-semibold">Rs: 580.00</p>
              </div>
              <div className="w-16 bg-gray-200 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-green-500 h-full rounded-full"
                  style={{ width: "75%" }}
                ></div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs text-gray-500">Level 2 Earnings</p>
                <p className="text-base font-semibold">Rs: 350.00</p>
              </div>
              <div className="w-16 bg-gray-200 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-blue-500 h-full rounded-full"
                  style={{ width: "45%" }}
                ></div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs text-gray-500">Level 3 Earnings</p>
                <p className="text-base font-semibold">Rs: 240.00</p>
              </div>
              <div className="w-16 bg-gray-200 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-purple-500 h-full rounded-full"
                  style={{ width: "30%" }}
                ></div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs text-gray-500">Bonuses</p>
                <p className="text-base font-semibold">Rs: 64.00</p>
              </div>
              <div className="w-16 bg-gray-200 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-yellow-500 h-full rounded-full"
                  style={{ width: "8%" }}
                ></div>
              </div>
            </div>
          </div>
          <div className="mt-4 border-t pt-3">
            <div className="flex justify-between items-center">
              <p className="text-xs text-gray-500">Total This Month</p>
              <p className="text-base font-bold">Rs: 1,234.00</p>
            </div>
            <div className="mt-1 flex justify-between items-center">
              <p className="text-xs text-gray-500">Compared to last month</p>
              <p className="text-xs text-green-500 font-medium">+12.5%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Recent Activities</h2>
        </div>
        <div className="p-4">
          <div className="space-y-3">
            {[
              {
                title: "New referral joined your network",
                time: "2 hours ago",
                icon: <Users size={16} />,
                color: "bg-blue-100 text-blue-600",
              },
              {
                title: "Commission earned from Level 2",
                time: "Yesterday",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <text
                      x="4"
                      y="18"
                      fontFamily="Arial, sans-serif"
                      fontSize="18"
                      fill="#1b1b1b"
                    >
                      ₨
                    </text>
                  </svg>
                ),
                color: "bg-green-100 text-green-600",
              },
              {
                title: "Withdrawal processed",
                time: "2 days ago",
                icon: <CreditCard size={16} />,
                color: "bg-purple-100 text-purple-600",
              },
              {
                title: "Achieved new rank: Gold",
                time: "1 week ago",
                icon: <Award size={16} />,
                color: "bg-yellow-100 text-yellow-600",
              },
            ].map((activity, index) => (
              <div key={index} className="flex items-start">
                <div className={`rounded-full ${activity.color} p-1.5 mr-2`}>
                  {activity.icon}
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-800">
                    {activity.title}
                  </p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <button className="text-indigo-600 hover:text-indigo-800 text-xs font-medium">
              View All Activities
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
