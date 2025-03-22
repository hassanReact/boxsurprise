import React, { useState } from 'react';
import { Search, Filter, Edit, Trash, Eye, Plus } from 'lucide-react';

const AdminUsers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);

  // Sample user data
  const users = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    referrer: i === 0 ? 'Direct' : `User ${i}`,
    level: Math.ceil((i + 1) / 3),
    joinDate: new Date(2023, 0, (i + 1) * 3).toLocaleDateString(),
    status: i % 3 === 0 ? 'Active' : i % 3 === 1 ? 'Pending' : 'Inactive',
    earnings: (100 * (10 - i)).toFixed(2),
    networkSize: 10 - i
  }));

  const toggleFilter = () => {
    setFilterOpen(!filterOpen);
  };

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">User Management</h1>
          <p className="text-gray-600">Manage users and their referral networks</p>
        </div>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center">
          <Plus size={18} className="mr-2" />
          Add User
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row justify-between mb-6">
          <div className="relative mb-4 md:mb-0 w-full md:w-64">
            <input
              type="text"
              placeholder="Search users..."
              className="pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
          </div>
          
          <div className="relative">
            <button
              className="flex items-center px-4 py-2 border rounded-lg hover:bg-gray-50"
              onClick={toggleFilter}
            >
              <Filter size={18} className="mr-2 text-gray-600" />
              Filter
            </button>
            
            {filterOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg py-1 z-10">
                <div className="px-4 py-2 border-b">
                  <p className="font-medium">Filter by</p>
                </div>
                <div className="p-4 space-y-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select className="border rounded-md w-full p-2">
                      <option>All</option>
                      <option>Active</option>
                      <option>Pending</option>
                      <option>Inactive</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
                    <select className="border rounded-md w-full p-2">
                      <option>All</option>
                      <option>Level 1</option>
                      <option>Level 2</option>
                      <option>Level 3+</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Join Date</label>
                    <select className="border rounded-md w-full p-2">
                      <option>All time</option>
                      <option>This month</option>
                      <option>Last 3 months</option>
                      <option>This year</option>
                    </select>
                  </div>
                  <div className="flex justify-end pt-2">
                    <button className="bg-gray-200 text-gray-800 px-3 py-1 rounded-md mr-2">
                      Reset
                    </button>
                    <button className="bg-indigo-600 text-white px-3 py-1 rounded-md">
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">User</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Referrer</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Level</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Join Date</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Status</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Earnings</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Network</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                        <span className="font-medium text-indigo-600">
                          {user.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-700">{user.referrer}</td>
                  <td className="py-3 px-4 text-gray-700">Level {user.level}</td>
                  <td className="py-3 px-4 text-gray-700">{user.joinDate}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      user.status === 'Active' ? 'bg-green-100 text-green-800' :
                      user.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-700">${user.earnings}</td>
                  <td className="py-3 px-4 text-gray-700">{user.networkSize}</td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800">
                        <Eye size={16} />
                      </button>
                      <button className="text-indigo-600 hover:text-indigo-800">
                        <Edit size={16} />
                      </button>
                      <button className="text-red-600 hover:text-red-800">
                        <Trash size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex justify-between items-center">
          <p className="text-sm text-gray-600">Showing 1-10 of 50 users</p>
          <div className="flex">
            <button className="px-3 py-1 border rounded-l-md bg-gray-50">Previous</button>
            <button className="px-3 py-1 border-t border-b bg-indigo-50 text-indigo-600">1</button>
            <button className="px-3 py-1 border-t border-b">2</button>
            <button className="px-3 py-1 border-t border-b">3</button>
            <button className="px-3 py-1 border rounded-r-md bg-gray-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;