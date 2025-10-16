import React, { useState } from 'react';
import StatsCard from '../components/SellerPages/StatsCard';
import SalesHistory from '../components/SellerPages/SalesHistroy';
import SellerSidebar from '../components/SellerPages/SellerSidebar';

const SellPage = () => {
  const [activeMenuItem, setActiveMenuItem] = useState('overview');

  const statsData = [
    { title: 'Total Orders', value: '35,367', change: '+2.3%', isPositive: true, icon: '📋' },
    { title: 'Total Revenue', value: '$28,346.00', change: '+12.0%', isPositive: true, icon: '💰' },
    { title: 'New Visitors', value: '5,659', change: '-7.6%', isPositive: false, icon: '👥' },
    { title: 'Total Sales', value: '24,573', change: '+2.3%', isPositive: true, icon: '📈' }
  ];

  const salesData = [
    { product: 'Rolled Signature Scent', amount: '1,234.78', location: 'United States', timeAgo: '15 Min Ago', avatar: '🟣' },
    { product: 'Little Pro Kids Backpack', amount: '623.99', location: 'Japan', timeAgo: 'Today', avatar: '🎒' },
    { product: 'OXY9 Ultra Camera', amount: '1,324', location: 'Canada', timeAgo: '2 Days Ago', avatar: '📷' }
  ];

  const renderContent = () => {
    switch(activeMenuItem) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-indigo-600 to-indigo-400 rounded-2xl p-8 text-white">
              <h2 className="text-2xl font-bold mb-2">Welcome to our Store!</h2>
              <p className="text-indigo-100 mb-6 max-w-md">
                Explore the latest trends, shop our curated collections, and enjoy exclusive discounts and offers.
              </p>
              <button className="bg-white/20 border border-white/30 text-white px-6 py-3 rounded-lg hover:bg-white/30 transition-colors font-medium">
                Start shopping now →
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {statsData.map((stat, index) => (
                <StatsCard key={index} {...stat} />
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-6">📊 Monthly Income</h3>
                <div className="flex items-end justify-around h-32 mt-4">
                  <div className="w-8 bg-indigo-600 rounded-t" style={{height: '60px'}}></div>
                  <div className="w-8 bg-indigo-400 rounded-t" style={{height: '80px'}}></div>
                  <div className="w-8 bg-pink-400 rounded-t" style={{height: '40px'}}></div>
                  <div className="w-8 bg-indigo-600 rounded-t" style={{height: '90px'}}></div>
                  <div className="w-8 bg-indigo-300 rounded-t" style={{height: '70px'}}></div>
                </div>
              </div>
              <SalesHistory sales={salesData} />
            </div>
          </div>
        );
      default:
        return <div><h2 className="text-2xl font-bold">Overview</h2></div>;
    }
  };

  return (
    <div className="fixed inset-0 flex bg-gray-50 z-50">
      <SellerSidebar activeItem={activeMenuItem} onItemClick={setActiveMenuItem} />
      <div className="ml-64 flex-1 flex flex-col p-8 overflow-auto">
        {renderContent()}
      </div>
    </div>
  );
};

export default SellPage;
