import React, { useState, useEffect } from 'react';

const EnergyBalances = ({ contract, account }) => {
  const [balances, setBalances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (contract && account) {
      fetchBalances();
    }
  }, [contract, account]);

  const fetchBalances = async () => {
    try {
      setLoading(true);
      const result = await contract.getBalanceInTokensByEnergyType(account);
      const formattedBalances = result.balances.map((balance, index) => ({
        energyType: result.energyTypes[index],
        amount: Number(balance.toString())
      }));
      setBalances(formattedBalances);
    } catch (err) {
      console.error('Error fetching balances:', err);
      setError('Failed to fetch balances. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!contract || !account) {
    return (
      <div className="p-4 text-center text-gray-600">
        Please connect your wallet
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Energy Type Balances</h2>
      </div>
      
      <div className="px-6 py-4">
        {balances.length === 0 ? (
          <p className="text-gray-500 text-center">No tokens found</p>
        ) : (
          <div className="space-y-4">
            {balances.map((balance, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                <span className="font-medium text-gray-900">{balance.energyType}</span>
                <span className="text-gray-600">{balance.amount} RECs</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EnergyBalances;