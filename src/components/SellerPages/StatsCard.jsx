import React from 'react';

const StatsCard = ({ title, value, change, isPositive, icon }) => (
  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center gap-2">
        <span>{icon}</span>
        <span className="text-gray-600">{title}</span>
      </div>
      <span className="text-indigo-500">↗</span>
    </div>
    <div className="text-2xl font-bold text-gray-800 mb-2">{value}</div>
    <div className={`flex items-center gap-2 text-sm ${
      isPositive ? 'text-green-500' : 'text-red-500'
    }`}>
      <span>{change}</span>
      <span>{isPositive ? '🟢' : '🔴'}</span>
    </div>
  </div>
);

export default StatsCard;
