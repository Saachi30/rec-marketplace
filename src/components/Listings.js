import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const TokenListings = ({ contract, walletAddress }) => {
  const [amount, setAmount] = useState('');
  const [price, setPrice] = useState('');
  const [energyType, setEnergyType] = useState('');
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [balance, setBalance] = useState('0');

  useEffect(() => {
    loadListings();
  }, [contract, walletAddress]);

  useEffect(() => {
    if (energyType) {
      checkBalance();
    }
  }, [energyType]);

  const checkBalance = async () => {
    try {
      const bal = await contract.getBalanceByEnergyType(walletAddress, energyType);
      setBalance(ethers.utils.formatEther(bal));
    } catch (error) {
      console.error('Error checking balance:', error);
    }
  };

  const loadListings = async () => {
    try {
      const currentListings = [];
      let id = 1;
      
      while (true) {
        try {
          const listing = await contract.listings(id);
          if (listing.active && listing.seller.toLowerCase() === walletAddress.toLowerCase()) {
            currentListings.push({
              id,
              amount: ethers.utils.formatEther(listing.amount),
              price: ethers.utils.formatEther(listing.price),
              energyType: listing.energyType
            });
          }
          id++;
        } catch (error) {
          break;
        }
      }
      setListings(currentListings);
    } catch (error) {
      console.error('Error loading listings:', error);
    }
  };

  const handleListTokens = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      if (Number(amount) > Number(balance)) {
        throw new Error(`Insufficient balance. You have ${balance} ${energyType} tokens`);
      }
      
      const tx = await contract.listTokens(
        ethers.utils.parseEther(amount),
        ethers.utils.parseEther(price),
        energyType
      );
      await tx.wait();
      setAmount('');
      setPrice('');
      setEnergyType('');
      await loadListings();
    } catch (error) {
      setError(error.message || 'Error listing tokens. Make sure you are a verified producer with sufficient balance.');
    }
    setLoading(false);
  };

  const handleCancelListing = async (listingId) => {
    setError('');
    setLoading(true);
    try {
      const tx = await contract.cancelListing(listingId);
      await tx.wait();
      await loadListings();
    } catch (error) {
      setError('Error canceling listing');
    }
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8 bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">List New Tokens</h2>
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        <form onSubmit={handleListTokens} className="space-y-4">
          <div>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Amount"
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price"
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <input
              type="text"
              value={energyType}
              onChange={(e) => setEnergyType(e.target.value)}
              placeholder="Energy Type"
              className="w-full p-2 border rounded"
              required
            />
          </div>
          {energyType && (
            <div className="text-sm text-gray-600">
              Available balance: {balance} {energyType} tokens
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
          >
            {loading ? 'Processing...' : 'List Tokens'}
          </button>
        </form>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Your Active Listings</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="p-4 text-left">ID</th>
                <th className="p-4 text-left">Amount</th>
                <th className="p-4 text-left">Price</th>
                <th className="p-4 text-left">Energy Type</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {listings.map((listing) => (
                <tr key={listing.id} className="border-t">
                  <td className="p-4">{listing.id}</td>
                  <td className="p-4">{listing.amount}</td>
                  <td className="p-4">{listing.price}</td>
                  <td className="p-4">{listing.energyType}</td>
                  <td className="p-4">
                    <button
                      onClick={() => handleCancelListing(listing.id)}
                      disabled={loading}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:bg-gray-400"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
              {listings.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-4 text-center text-gray-500">
                    No active listings found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TokenListings;