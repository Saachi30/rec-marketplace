import React from 'react';
import { CreditCard, TrendingUp, TrendingDown } from 'lucide-react';

const RECBalance = () => {
  const balances = [
    { type: 'Solar', amount: 1250, change: '+12.5%', trend: 'up' },
    { type: 'Wind', amount: 850, change: '-3.2%', trend: 'down' },
    { type: 'Biomass', amount: 425, change: '+5.7%', trend: 'up' }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold">REC Balance</h3>
        <CreditCard className="text-green-600" size={24} />
      </div>
      <div className="space-y-4">
        {balances.map((balance, i) => (
          <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-semibold">{balance.type} RECs</h4>
              <p className="text-2xl font-bold">{balance.amount.toLocaleString()}</p>
            </div>
            <div className={`flex items-center ${
              balance.trend === 'up' ? 'text-green-600' : 'text-red-600'
            }`}>
              {balance.trend === 'up' ? 
                <TrendingUp size={20} /> : 
                <TrendingDown size={20} />
              }
              <span className="ml-1">{balance.change}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RECBalance;