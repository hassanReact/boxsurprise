// import React, { useState } from 'react';
// import { Wallet, AlertCircle } from 'lucide-react';
import EasypaisaWithdrawalForm from '../components/WithdrawWithEasyPaisa';

// interface WithdrawalRequest {
//   id: string;
//   amount: string;
//   status: 'pending' | 'approved' | 'rejected';
//   date: string;
//   paymentMethod: string;
// }

const WithdrawRequests: React.FC = () => {
  // const [amount, setAmount] = useState('');
  // const [paymentMethod, setPaymentMethod] = useState('bank');

  // // This would come from your API/database
  // const withdrawalHistory: WithdrawalRequest[] = [
  //   {
  //     id: 'WD001',
  //     amount: 'Rs: 500.00',
  //     status: 'pending',
  //     date: '2024-03-15',
  //     paymentMethod: 'Bank Transfer'
  //   },
  //   {
  //     id: 'WD002',
  //     amount: 'Rs: 300.00',
  //     status: 'approved',
  //     date: '2024-03-10',
  //     paymentMethod: 'PayPal'
  //   },
  //   {
  //     id: 'WD003',
  //     amount: 'Rs: 200.00',
  //     status: 'rejected',
  //     date: '2024-03-05',
  //     paymentMethod: 'Bank Transfer'
  //   }
  // ];

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   // Handle withdrawal request submission
  //   console.log('Withdrawal requested:', { amount, paymentMethod });
  // };

  return (
    // <div className="space-y-6 my-16">
    //   {/* New Withdrawal Request Form */}
    //   <div className="bg-white rounded-lg shadow-sm">
    //     <div className="p-6 border-b border-gray-200">
    //       <h2 className="text-lg font-semibold text-gray-900">Request Withdrawal</h2>
    //     </div>
    //     <form onSubmit={handleSubmit} className="p-6 space-y-4">
    //       <div>
    //         <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
    //           Amount
    //         </label>
    //         <div className="mt-1 relative rounded-md shadow-sm">
    //           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
    //             <span className="text-gray-500 sm:text-sm">Rs: </span>
    //           </div>
    //           <input
    //             type="number"
    //             name="amount"
    //             id="amount"
    //             min="100"
    //             step="0.01"
    //             value={amount}
    //             onChange={(e) => setAmount(e.target.value)}
    //             className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
    //             placeholder=" 0.00"
    //             required
    //           />
    //         </div>
    //       </div>

    //       <div>
    //         <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700">
    //           Payment Method
    //         </label>
    //         <select
    //           id="paymentMethod"
    //           name="paymentMethod"
    //           value={paymentMethod}
    //           onChange={(e) => setPaymentMethod(e.target.value)}
    //           className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
    //         >
    //           <option value="bank">Bank Transfer</option>
    //           <option value="paypal">PayPal</option>
    //           <option value="crypto">Cryptocurrency</option>
    //         </select>
    //       </div>

    //       <div className="bg-yellow-50 p-4 rounded-md">
    //         <div className="flex">
    //           <div className="flex-shrink-0">
    //             <AlertCircle className="h-5 w-5 text-yellow-400" />
    //           </div>
    //           <div className="ml-3">
    //             <h3 className="text-sm font-medium text-yellow-800">
    //               Important Notice
    //             </h3>
    //             <div className="mt-2 text-sm text-yellow-700">
    //               <p>
    //                 - Minimum withdrawal amount is Rs: 100<br />
    //                 - Processing time: 2-3 business days<br />
    //                 - Withdrawal fees may apply
    //               </p>
    //             </div>
    //           </div>
    //         </div>
    //       </div>

    //       <button
    //         type="submit"
    //         className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    //       >
    //         <Wallet className="mr-2 h-5 w-5" />
    //         Request Withdrawal
    //       </button>
    //     </form>
    //   </div>

    //   {/* Withdrawal History */}
    //   <div className="bg-white rounded-lg shadow-sm">
    //     <div className="p-6 border-b border-gray-200">
    //       <h2 className="text-lg font-semibold text-gray-900">Withdrawal History</h2>
    //     </div>
    //     <div className="overflow-x-auto">
    //       <table className="w-full">
    //         <thead className="bg-gray-50">
    //           <tr>
    //             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    //               ID
    //             </th>
    //             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    //               Date
    //             </th>
    //             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    //               Amount
    //             </th>
    //             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    //               Payment Method
    //             </th>
    //             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    //               Status
    //             </th>
    //           </tr>
    //         </thead>
    //         <tbody className="bg-white divide-y divide-gray-200">
    //           {withdrawalHistory.map((withdrawal) => (
    //             <tr key={withdrawal.id}>
    //               <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
    //                 {withdrawal.id}
    //               </td>
    //               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
    //                 {withdrawal.date}
    //               </td>
    //               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
    //                 {withdrawal.amount}
    //               </td>
    //               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
    //                 {withdrawal.paymentMethod}
    //               </td>
    //               <td className="px-6 py-4 whitespace-nowrap">
    //                 <span
    //                   className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
    //                     withdrawal.status === 'approved'
    //                       ? 'bg-green-100 text-green-800'
    //                       : withdrawal.status === 'pending'
    //                       ? 'bg-yellow-100 text-yellow-800'
    //                       : 'bg-red-100 text-red-800'
    //                   }`}
    //                 >
    //                   {withdrawal.status.charAt(0).toUpperCase() + withdrawal.status.slice(1)}
    //                 </span>
    //               </td>
    //             </tr>
    //           ))}
    //         </tbody>
    //       </table>
    //     </div>
    //   </div>
    // </div>
    <>
      <EasypaisaWithdrawalForm />
    </>
  );
};

export default WithdrawRequests;