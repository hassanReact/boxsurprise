import React, { useState } from 'react';
import { Check, X, AlertCircle, Download } from 'lucide-react';

interface EarningConfirmationProps {
  isAdmin: boolean;
  earnings?: {
    id: string;
    amount: number;
    date: string;
    status: 'pending' | 'confirmed' | 'rejected';
    user: {
      name: string;
      email: string;
      avatar?: string;
    };
    description?: string;
  }[];
}

const EarningConfirmation: React.FC<EarningConfirmationProps> = ({ isAdmin, earnings = [] }) => {
  const [selectedEarning, setSelectedEarning] = useState<string | null>(null);
  const [confirmationStatus, setConfirmationStatus] = useState<{ [key: string]: 'pending' | 'confirmed' | 'rejected' }>({});

  // If not admin, don't show anything
  if (!isAdmin) {
    return null;
  }
  
  const handleConfirm = (id: string) => {
    setConfirmationStatus(prev => ({ ...prev, [id]: 'confirmed' }));
  };
  
  const handleReject = (id: string) => {
    setConfirmationStatus(prev => ({ ...prev, [id]: 'rejected' }));
  };
  
  const getStatusColor = (status: 'pending' | 'confirmed' | 'rejected') => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="my-16 bg-white rounded-lg shadow-lg p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Earnings Confirmation</h1>
        <div className="flex space-x-2">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center">
            <Download size={18} className="mr-2" />
            Export
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 bg-gray-50 rounded-lg p-4 h-min">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Pending Confirmations</h2>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {earnings.map(earning => (
              <div 
                key={earning.id} 
                className={`p-3 rounded-lg cursor-pointer transition-all border ${selectedEarning === earning.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-100'}`}
                onClick={() => setSelectedEarning(earning.id)}
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">{earning.user.name}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(confirmationStatus[earning.id] || earning.status)}`}>
                    {confirmationStatus[earning.id] || earning.status}
                  </span>
                </div>
                <p className="text-gray-500 text-sm">{earning.user.email}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="font-bold text-green-600">${earning.amount.toFixed(2)}</span>
                  <span className="text-xs text-gray-500">{new Date(earning.date).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
            
            {earnings.length === 0 && (
              <div className="text-center py-6 text-gray-500">
                <AlertCircle className="mx-auto mb-2" size={24} />
                <p>No pending confirmations</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="md:col-span-2">
          {selectedEarning ? (
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              {earnings.filter(e => e.id === selectedEarning).map(earning => (
                <div key={earning.id}>
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-xl font-bold">{earning.user.name}</h2>
                      <p className="text-gray-600">{earning.user.email}</p>
                    </div>
                    <div className="flex items-center">
                      <span className="text-2xl font-bold text-green-600 mr-4">${earning.amount.toFixed(2)}</span>
                      <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(confirmationStatus[earning.id] || earning.status)}`}>
                        {confirmationStatus[earning.id] || earning.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Transaction ID</h3>
                      <p className="font-mono text-gray-800">{earning.id}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Date</h3>
                      <p className="text-gray-800">{new Date(earning.date).toLocaleString()}</p>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Description</h3>
                    <p className="text-gray-800">{earning.description || 'No description provided'}</p>
                  </div>
                  
                  <div className="flex justify-end space-x-3 mt-6">
                    <button 
                      onClick={() => handleReject(earning.id)} 
                      className="bg-white border border-red-500 text-red-600 hover:bg-red-50 px-4 py-2 rounded-md flex items-center"
                      disabled={confirmationStatus[earning.id] === 'rejected'}
                    >
                      <X size={18} className="mr-2" />
                      Reject
                    </button>
                    <button 
                      onClick={() => handleConfirm(earning.id)} 
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center"
                      disabled={confirmationStatus[earning.id] === 'confirmed'}
                    >
                      <Check size={18} className="mr-2" />
                      Confirm
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg p-12 flex flex-col items-center justify-center h-full border border-dashed border-gray-300 text-gray-500">
              <AlertCircle size={48} className="mb-4" />
              <h3 className="text-lg font-medium mb-2">No earning selected</h3>
              <p className="text-center">Select an earning from the list to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EarningConfirmation;