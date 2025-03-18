import { ArrowDownLeft, ArrowUpRight } from "lucide-react";

interface Transaction {
    id: string;
    type: 'deposit' | 'withdrawal';
    amount: number;
    currency: string;
    user: {
      name: string;
      avatar: string;
    };
    date: string;
    status: 'completed' | 'pending' | 'failed';
  }

export const TransactionCard: React.FC<{ transaction: Transaction }> = ({ transaction }) => {
    const statusColors = {
      completed: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      failed: 'bg-red-100 text-red-800'
    };
  
    const isDeposit = transaction.type === 'deposit';
  
    return (
      <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img 
                src={transaction.user.avatar} 
                alt={transaction.user.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-gray-100"
              />
              <div className={`absolute -bottom-1 -right-1 p-1 rounded-full ${isDeposit ? 'bg-green-500' : 'bg-blue-500'}`}>
                {isDeposit ? 
                  <ArrowDownLeft className="w-3 h-3 text-white" /> : 
                  <ArrowUpRight className="w-3 h-3 text-white" />
                }
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{transaction.user.name}</h3>
              <p className="text-sm text-gray-500">{transaction.date}</p>
            </div>
          </div>
          <div className="text-right">
            <p className={`text-lg font-bold ${isDeposit ? 'text-green-600' : 'text-blue-600'}`}>
              {isDeposit ? '+' : '-'} {transaction.amount} {transaction.currency}
            </p>
            <span className={`text-xs px-2 py-1 rounded-full ${statusColors[transaction.status]}`}>
              {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
            </span>
          </div>
        </div>
      </div>
    );
  };