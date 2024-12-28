import React from 'react'
import { useState } from 'react';

const RECTrade = () => {
    const [tradeType, setTradeType] = useState('buy');
    
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="text-xl font-bold mb-4">Trade RECs</h3>
        <div className="space-y-4">
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setTradeType('buy')}
              className={`flex-1 py-2 rounded-lg ${
                tradeType === 'buy' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-100'
              }`}
            >
              Buy
            </button>
            <button
              onClick={() => setTradeType('sell')}
              className={`flex-1 py-2 rounded-lg ${
                tradeType === 'sell' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-100'
              }`}
            >
              Sell
            </button>
          </div>
          <select className="w-full p-2 border rounded-lg">
            <option>Solar REC</option>
            <option>Wind REC</option>
            <option>Biomass REC</option>
          </select>
          <input
            type="number"
            placeholder="Amount"
            className="w-full p-2 border rounded-lg"
          />
          <input
            type="number"
            placeholder="Price per REC"
            className="w-full p-2 border rounded-lg"
          />
          <button className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
            Place Order
          </button>
        </div>
      </div>
    );
  };

export default RECTrade;
