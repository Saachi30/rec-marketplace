import React, { useState, useEffect } from 'react';

const ProducerManagement = ({ contract, address }) => {
  const [gst, setGst] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [producerInfo, setProducerInfo] = useState(null);

  useEffect(() => {
    if (contract && address) {
      loadProducerInfo();
    }
  }, [contract, address]);

  const loadProducerInfo = async () => {
    try {
      const info = await contract.getProducerInfo(address);
      if (info && info.gst !== '') {
        setProducerInfo({
          gst: info.gst,
          location: info.location,
          verified: info.verified
        });
      }
    } catch (error) {
      console.error('Error loading producer info:', error);
    }
  };

  const handleRegisterAndVerify = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (!contract) {
        throw new Error('Contract not initialized');
      }

      if (!gst || !location) {
        throw new Error('Please fill in all fields');
      }

      const tx = await contract.registerAndVerifyProducer(gst, location);
      await tx.wait();
      setSuccess('Successfully registered and verified as producer!');
      await loadProducerInfo();
      setGst('');
      setLocation('');
    } catch (err) {
      setError(err.message || 'Error registering producer');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
          {success}
        </div>
      )}

      {producerInfo ? (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Producer Information</h2>
          <div className="space-y-4">
            <div>
              <span className="font-semibold">GST Number:</span>
              <span className="ml-2">{producerInfo.gst}</span>
            </div>
            <div>
              <span className="font-semibold">Location:</span>
              <span className="ml-2">{producerInfo.location}</span>
            </div>
            <div>
              <span className="font-semibold">Status:</span>
              {producerInfo.verified ? (
                <span className="ml-2 text-green-600">Verified</span>
              ) : (
                <span className="ml-2 text-yellow-600">Pending Verification</span>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Register as Producer</h2>
          <form onSubmit={handleRegisterAndVerify} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                GST Number
              </label>
              <input
                type="text"
                value={gst}
                onChange={(e) => setGst(e.target.value)}
                placeholder="Enter GST number"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                disabled={loading}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter location"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                disabled={loading}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {loading ? 'Processing...' : 'Register & Verify'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ProducerManagement;