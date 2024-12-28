import { useNavigate } from 'react-router-dom';
import React from 'react';
import MarketOverview from '../../components/MarketOverview';
import CompanyProfile from '../../components/CompanyProfile';
import RECTrade from '../../components/RECTrade';
import TransactionHistory from '../../components/TransactionHistory';
import { auth} from "../firebase";
import { toast } from "react-toastify";

const CompanyDashboard = () => {
    const navigate = useNavigate();

    async function handleProfile(){
        try{
            navigate('/profile')
        }catch(error){
            console.log("Error")
        }
    }

    async function handleLogout() {
        try {
          await auth.signOut();
          navigate("/login");
          toast.success("Logged out successfully", {
            position: "top-center",
          });
        } catch (error) {
          toast.error("Error logging out: " + error.message, {
            position: "bottom-center",
          });
        }
      }
    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Company Dashboard</h1>
                <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                    Logout
                </button>
                <button
                    onClick={handleProfile}
                    className="px-4 py-2 bg-green-400 text-white rounded-lg hover:bg-red-700"
                >
                    Profile
                </button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <CompanyProfile />
                <MarketOverview />
                <RECTrade />
                <TransactionHistory/>
            </div>
        </div>
    );
}
export default CompanyDashboard;