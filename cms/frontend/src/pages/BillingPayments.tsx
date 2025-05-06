import React from 'react';
import Card from '../components/common/Card';

const BillingPayments: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Billing & Payments</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <h2 className="text-xl font-semibold mb-4">Payment Summary</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Maintenance Due</span>
              <span className="font-medium">₹5,000</span>
            </div>
            <div className="flex justify-between">
              <span>Water Charges</span>
              <span className="font-medium">₹1,200</span>
            </div>
            <div className="flex justify-between">
              <span>Electricity (Common Areas)</span>
              <span className="font-medium">₹800</span>
            </div>
            <div className="flex justify-between border-t pt-2 mt-2">
              <span className="font-semibold">Total Due</span>
              <span className="font-bold">₹7,000</span>
            </div>
          </div>
          <button className="mt-6 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors w-full">
            Pay Now
          </button>
        </Card>
        
        <Card>
          <h2 className="text-xl font-semibold mb-4">Payment History</h2>
          <div className="space-y-3">
            {[
              { date: '15 Apr 2023', amount: '₹7,000', status: 'Paid' },
              { date: '15 Mar 2023', amount: '₹7,000', status: 'Paid' },
              { date: '15 Feb 2023', amount: '₹7,000', status: 'Paid' }
            ].map((payment, index) => (
              <div key={index} className="flex justify-between items-center border-b pb-2">
                <div>
                  <p className="font-medium">{payment.date}</p>
                  <p className="text-sm text-gray-600">Monthly Maintenance</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{payment.amount}</p>
                  <p className="text-sm text-green-600">{payment.status}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-6 border border-blue-600 text-blue-600 py-2 px-4 rounded hover:bg-blue-50 transition-colors w-full">
            View All Transactions
          </button>
        </Card>
      </div>
      
      <div className="mt-8">
        <Card>
          <h2 className="text-xl font-semibold mb-4">Upcoming Bills</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-4 whitespace-nowrap">May Maintenance</td>
                  <td className="px-4 py-4 whitespace-nowrap">15 May 2023</td>
                  <td className="px-4 py-4 whitespace-nowrap">₹7,000</td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                      Upcoming
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-4 whitespace-nowrap">Water Bill - Q2</td>
                  <td className="px-4 py-4 whitespace-nowrap">30 June 2023</td>
                  <td className="px-4 py-4 whitespace-nowrap">₹3,500</td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                      Pending
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-4 whitespace-nowrap">Property Tax</td>
                  <td className="px-4 py-4 whitespace-nowrap">15 July 2023</td>
                  <td className="px-4 py-4 whitespace-nowrap">₹12,000</td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                      Pending
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default BillingPayments;