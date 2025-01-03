import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const ActiveListings = ({ contract }) => {
  const [listings, setListings] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (contract) {
      fetchListings();
    }
  }, [contract]);

  const fetchListings = async () => {
    try {
      setLoading(true);
      const activeListings = await contract.getActiveListings();
      
      const groupedListings = activeListings.reduce((acc, listing) => {
        if (!acc[listing.energyType]) {
          acc[listing.energyType] = [];
        }
        
        const formattedListing = {
          id: listing.id.toString(),
          seller: listing.seller,
          amount: ethers.utils.formatUnits(listing.amount, 18),
          price: ethers.utils.formatUnits(listing.price, 18),
          energyType: listing.energyType,
          active: listing.active
        };
        
        if (formattedListing.active) {
          acc[listing.energyType].push(formattedListing);
        }
        
        return acc;
      }, {});

      setListings(groupedListings);
    } catch (err) {
      console.error('Error fetching listings:', err);
      setError('Failed to fetch listings. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!contract) {
    return (
      <div className="text-center p-4 text-gray-600">
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

  if (Object.keys(listings).length === 0) {
    return (
      <div className="text-center p-4 text-gray-600">
        No active listings found
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {Object.entries(listings).map(([energyType, typeListings]) => (
        <div key={energyType} className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">{energyType} Listings</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">ID</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Seller</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Amount (RECs)</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Price (ETH)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {typeListings.map((listing) => (
                  <tr key={listing.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{listing.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {`${listing.seller.slice(0, 6)}...${listing.seller.slice(-4)}`}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{listing.amount}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{listing.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActiveListings;