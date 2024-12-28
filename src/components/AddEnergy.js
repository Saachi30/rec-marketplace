import React from 'react'
import { useState } from 'react';

const AddEnergy = () => {
    const [formData, setFormData] = useState({
      type: '',
      amount: '',
      location: ''
    });
  
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="text-xl font-bold mb-4">Add Energy Source</h3>
        <form className="space-y-4">
          <select 
            className="w-full p-2 border rounded-lg"
            value={formData.type}
            onChange={(e) => setFormData({...formData, type: e.target.value})}
          >
            <option value="">Select Type</option>
            <option value="solar">Solar</option>
            <option value="wind">Wind</option>
            <option value="biomass">Biomass</option>
          </select>
          <input
            type="number"
            placeholder="Amount (kWh)"
            className="w-full p-2 border rounded-lg"
            value={formData.amount}
            onChange={(e) => setFormData({...formData, amount: e.target.value})}
          />
          <input
            type="text"
            placeholder="Location"
            className="w-full p-2 border rounded-lg"
            value={formData.location}
            onChange={(e) => setFormData({...formData, location: e.target.value})}
          />
          <button className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
            Add Energy Source
          </button>
        </form>
      </div>
    );
  };
  

export default AddEnergy
