import React from 'react';

const SellerSidebar = ({ activeItem, onItemClick }) => {
  const menuItems = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'payment', label: 'Payment', icon: '💳' },
    { id: 'product', label: 'Product', icon: '📦' },
    { id: 'order', label: 'Order', icon: '📋' },
    { id: 'report', label: 'Report', icon: '📈' },
    { id: 'account', label: 'Account', icon: '👤' },
    { id: 'settings', label: 'Settings', icon: '⚙️' }
  ];

  return (
    <div className="w-64 h-full bg-gray-800 text-white fixed left-0 top-0 p-4 flex flex-col">
      <div className="font-bold text-xl mb-6 flex items-center space-x-2">
        <span className="text-2xl">🛍️</span>
        <span>Shoplay</span>
      </div>

      <nav className="flex-grow">
        {menuItems.map((item) => (
          <div
            key={item.id}
            onClick={() => onItemClick(item.id)}
            className={`cursor-pointer px-3 py-2 rounded-lg flex items-center space-x-2 ${
              activeItem === item.id ? 'bg-indigo-600' : 'hover:bg-gray-700'
            }`}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default SellerSidebar;
