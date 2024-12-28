import React from 'react';
import PriceChart from '../../components/PriceChart';
import RECBalance from '../../components/RECBalance';
import AddEnergy from '../../components/AddEnergy';
import { useNavigate } from 'react-router-dom';


const ProducerDashboard = ({ setIsLoggedIn }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        setIsLoggedIn(false);
        navigate('/');
    };
    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Producer Dashboard</h1>
                <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                    Logout
                </button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <RECBalance />
                <PriceChart />
                <AddEnergy />
                {/* <TransactionHistory /> */}
            </div>
        </div>
    );
}

export default ProducerDashboard;