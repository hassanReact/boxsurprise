import { TransactionCard } from "./TransactionCard";

type Transaction = {
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
};

const LatestTransactions: React.FC = () => {
    const transactions: Transaction[] = [
      {
        id: '1',
        type: 'deposit',
        amount: 1500,
        currency: 'USD',
        user: {
          name: 'Sarah Johnson',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop'
        },
        date: '2 minutes ago',
        status: 'completed'
      },
      {
        id: '2',
        type: 'withdrawal',
        amount: 850,
        currency: 'USD',
        user: {
          name: 'Michael Chen',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop'
        },
        date: '5 minutes ago',
        status: 'pending'
      },
      {
        id: '3',
        type: 'deposit',
        amount: 2000,
        currency: 'USD',
        user: {
          name: 'Emma Wilson',
          avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop'
        },
        date: '10 minutes ago',
        status: 'completed'
      },
      {
        id: '4',
        type: 'withdrawal',
        amount: 1200,
        currency: 'USD',
        user: {
          name: 'David Kim',
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop'
        },
        date: '15 minutes ago',
        status: 'completed'
      },
      {
        id: '5',
        type: 'deposit',
        amount: 3000,
        currency: 'USD',
        user: {
          name: 'Lisa Anderson',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop'
        },
        date: '20 minutes ago',
        status: 'failed'
      }
    ];
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
          <div className="container mx-auto px-4 py-20">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-900">
                Latest Transactions
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Stay updated with the most recent financial activities across our network.
              </p>
            </div>
    
            <div className="max-w-4xl mx-auto space-y-4">
              {transactions.map((transaction) => (
                <TransactionCard key={transaction.id} transaction={transaction} />
              ))}
            </div>
          </div>
        </div>
      );
    }
    
    export default LatestTransactions;