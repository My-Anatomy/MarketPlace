import React from 'react';

const SalesHistory = ({ sales }) => (
  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
    <div className="flex justify-between items-center mb-6">
      <h3 className="text-lg font-semibold text-gray-800">📊 Sales History</h3>
      <button className="text-indigo-500 text-sm hover:text-indigo-700">View All →</button>
    </div>
    <div className="space-y-4">
      {sales.map((sale, i) => (
        <div key={i} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center bg-indigo-100 rounded-full text-lg">{sale.avatar}</div>
            <div>
              <div className="font-medium text-gray-800 text-sm">{sale.product}</div>
              <div className="text-xs text-gray-500">📍 {sale.location}</div>
            </div>
          </div>
          <div className="text-right">
            <div className="font-semibold text-gray-800">${sale.amount}</div>
            <div className="text-xs text-gray-500">🕐 {sale.timeAgo}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default SalesHistory;
