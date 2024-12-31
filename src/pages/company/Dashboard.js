import { useNavigate } from 'react-router-dom';
import React from 'react';
import MarketOverview from '../../components/MarketOverview';
import CompanyProfile from '../../components/CompanyProfile';
import RECTrade from '../../components/RECTrade';
import TransactionHistory from '../../components/TransactionHistory';
import { auth} from "../firebase";
import { toast } from "react-toastify";
import { AccountCircleOutlined as ProfileIcon } from "@mui/icons-material";
import { IconButton } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';

const CompanyDashboard = () => {
    const navigate = useNavigate();

    async function handleProfile(){
        try{
            navigate('/companyprofile')
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
                <div className="flex items-center gap-4 mr-6">
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
          <ProfileIcon onClick={handleProfile} className="text-green-700 cursor-pointer" />
           {/* Multilingual Icon */}
           <IconButton
              color="inherit"
             
              aria-controls="language-menu"
              aria-haspopup="true"
              className="hover:text-green-600 "
            >
              <LanguageIcon />
            </IconButton>
            
        </div>
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