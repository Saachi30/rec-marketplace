import React, { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";

function Profile() {
  const [userDetails, setUserDetails] = useState(null);
  const [userType, setUserType] = useState(null);
  const navigate = useNavigate();

  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          // First get the user type
          const userTypeDoc = await getDoc(doc(db, "UserTypes", user.uid));
          
          if (userTypeDoc.exists()) {
            const type = userTypeDoc.data().type;
            setUserType(type);

            // Determine collection based on user type
            let collectionName = "";
            switch (type) {
              case "energyProducer":
                collectionName = "EnergyProducers";
                break;
              case "company":
                collectionName = "Companies";
                break;
              case "consumer":
                collectionName = "Consumers";
                break;
              default:
                throw new Error("Invalid user type");
            }

            // Get user details from appropriate collection
            const userDoc = await getDoc(doc(db, collectionName, user.uid));
            if (userDoc.exists()) {
              setUserDetails(userDoc.data());
            } else {
              toast.error("User data not found", {
                position: "bottom-center",
              });
            }
          } else {
            toast.error("User type not found", {
              position: "bottom-center",
            });
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          toast.error("Error loading user data", {
            position: "bottom-center",
          });
        }
      } else {
        navigate("/login");
      }
    });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

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

  const renderUserSpecificFields = () => {
    if (!userDetails) return null;

    switch (userType) {
      case "energyProducer":
        return (
          <>
            <p className="mb-2">GST Number: {userDetails.gst}</p>
            <p className="mb-2">Address: {userDetails.address}</p>
            <p className="mb-2">REC Balances: {userDetails.recBalances?.length || 0}</p>
          </>
        );
      case "company":
        return (
          <>
            <p className="mb-2">GST Number: {userDetails.gst}</p>
            <p className="mb-2">Address: {userDetails.address}</p>
            <p className="mb-2">Credit Score: {userDetails.creditScore || 'Not yet rated'}</p>
            <p className="mb-2">Achievements: {userDetails.achievements?.length || 0}</p>
          </>
        );
      case "consumer":
        return (
          <>
            <p className="mb-2">Green Points: {userDetails.greenPoint}</p>
            <p className="mb-2">Achievements: {userDetails.achievements?.length || 0}</p>
            <p className="mb-2">Events Participated: {userDetails.events?.length || 0}</p>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      {userDetails ? (
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-2xl font-semibold mb-4">
            Welcome {userDetails.name} 🙏
          </h3>
          
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-md">
              <h4 className="text-lg font-medium mb-2">Basic Information</h4>
              <p className="mb-2">Email: {userDetails.email}</p>
              <p className="mb-2">User Type: {userType}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-md">
              <h4 className="text-lg font-medium mb-2">Additional Information</h4>
              {renderUserSpecificFields()}
            </div>
          </div>

          <button 
            className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex justify-center items-center min-h-[200px]">
          <p className="text-lg">Loading...</p>
        </div>
      )}
    </div>
  );
}

export default Profile;