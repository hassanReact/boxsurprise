import React from 'react';
import { DollarSign, TrendingUp, Calendar, ArrowUpRight } from 'lucide-react';

interface EarningsSummary {
  totalEarnings: string;
  monthlyEarnings: string;
  pendingCommissions: string;
  lastPayout: string;
}

interface EarningsHistory {
  date: string;
  amount: string;
  type: string;
  status: string;
}

const EarningsBreakdown: React.FC = () => {
  // This would come from your API/database
  const summary: EarningsSummary = {
    totalEarnings: "$5,240.00",
    monthlyEarnings: "$850.00",
    pendingCommissions: "$320.00",
    lastPayout: "$420.00"
  };

  const earningsHistory: EarningsHistory[] = [
    {
      date: "2024-03-15",
      amount: "$150.00",
      type: "Direct Referral",
      status: "Paid"
    },
    {
      date: "2024-03-14",
      amount: "$75.00",
      type: "Level 2 Commission",
      status: "Paid"
    },
    {
      date: "2024-03-13",
      amount: "$95.00",
      type: "Direct Referral",
      status: "Pending"
    }
  ];

  return (
    <div className="space-y-6 mt-14">
      {/* Earnings Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Earnings</p>
              <p className="text-2xl font-bold text-gray-900">{summary.totalEarnings}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Monthly Earnings</p>
              <p className="text-2xl font-bold text-gray-900">{summary.monthlyEarnings}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Pending Commissions</p>
              <p className="text-2xl font-bold text-gray-900">{summary.pendingCommissions}</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-full">
              <Calendar className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Last Payout</p>
              <p className="text-2xl font-bold text-gray-900">{summary.lastPayout}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <ArrowUpRight className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Earnings History Table */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Earnings History</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {earningsHistory.map((earning, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {earning.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {earning.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {earning.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        earning.status === 'Paid'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {earning.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EarningsBreakdown;