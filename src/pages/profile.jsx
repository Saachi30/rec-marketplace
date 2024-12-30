

// import React, { useEffect, useState } from 'react';
// import { ArrowLeft, Trophy, Target, Users, Award, TrendingUp, Star, Mail, Phone, Building, MapPin } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import { auth, db } from "./firebase";
// import { doc, getDoc } from "firebase/firestore";
// import { toast } from "react-toastify";

// const Profile = () => {
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState('about');
//   const [userDetails, setUserDetails] = useState(null);
//   const [userType, setUserType] = useState(null);

//   const tabs = [

//     { id: 'achievements', label: 'Achievements' },
//     { id: 'challenges', label: 'Challenges' },
//     { id: 'leaderboard', label: 'Leaderboard' }
//     // { id: 'about', label: 'About' },
//   ];

//   // Fetch user data from Firebase
//   const fetchUserData = async () => {
//     auth.onAuthStateChanged(async (user) => {
//       if (user) {
//         try {
//           const userTypeDoc = await getDoc(doc(db, "UserTypes", user.uid));

//           if (userTypeDoc.exists()) {
//             const type = userTypeDoc.data().type;
//             setUserType(type);
//             const collectionName = type === "company" ? "Companies" :
//                                  type === "energyProducer" ? "EnergyProducers" :
//                                  "Consumers";

//             const userDoc = await getDoc(doc(db, collectionName, user.uid));
//             if (userDoc.exists()) {
//               setUserDetails(userDoc.data());
//             } else {
//               toast.error("User data not found");
//             }
//           }
//         } catch (error) {
//           toast.error("Error loading user data");
//         }
//       } else {
//         navigate("/login");
//       }
//     });
//   };

// useEffect(() => {
//   fetchUserData();
// }, []);

// const mockLeaderboard = [
//   { rank: 1, name: "EcoTech Solutions", score: 2500, isUser: false },
//   { rank: 2, name: "Green Energy Corp", score: 2350, isUser: false },
//   { rank: 3, name: userDetails?.name, score: 2200, isUser: true },
//   { rank: 4, name: "Sustainable Inc", score: 2100, isUser: false },
//   { rank: 5, name: "CleanPower Ltd", score: 2000, isUser: false }
// ];

// const mockChallenges = [
//   {
//     title: "Zero Carbon Month",
//     progress: 75,
//     deadline: "2024-04-30",
//     reward: "500 Green Points"
//   },
//   {
//     title: "Community Impact",
//     progress: 40,
//     deadline: "2024-05-15",
//     reward: "Premium Badge"
//   }
// ];

//   const renderHeader = () => (
//     <div className="relative bg-white rounded-xl shadow-sm p-6 mb-6">
//       <div className="flex items-start space-x-8">
//       {/* Left side - Profile Image */}
//       <div className="w-48">
//         <div className="w-48 h-48 rounded-lg overflow-hidden bg-gray-100">
//           {userDetails?.profileImage ? (
//             <img
//               src={userDetails.profileImage}
//               alt="Profile"
//               className="w-full h-full object-cover"
//             />
//           ) : (
//             <div className="w-full h-full flex items-center justify-center">
//               <Building className="w-16 h-16 text-gray-400" />
//             </div>
//           )}
//         </div>
//       </div>

//         <div className="flex-grow">
//           <h1 className="text-2xl font-bold mb-2">{userDetails?.name}</h1>
//           <div className="grid grid-cols-3 gap-4 mb-4">
//             <div className="bg-green-50 p-4 rounded-lg text-center">
//               <div className="text-2xl font-bold text-green-600">{userDetails?.recBalances?.length || 0}</div>
//               <div className="text-sm text-gray-600">Carbon Credits</div>
//             </div>
//             <div className="bg-blue-50 p-4 rounded-lg text-center">
//               <div className="text-2xl font-bold text-blue-600">{userDetails?.achievements?.length || 0}</div>
//               <div className="text-sm text-gray-600">Achievements</div>
//             </div>
//             <div className="bg-purple-50 p-4 rounded-lg text-center">
//               <div className="text-2xl font-bold text-purple-600">{userDetails?.creditScore || 0}</div>
//               <div className="text-sm text-gray-600">Credit Score</div>
//             </div>
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <div className="flex items-center space-x-2">
//               <Mail className="w-4 h-4 text-gray-400" />
//               <span className="text-gray-600">{userDetails?.email}</span>
//             </div>
//             <div className="flex items-center space-x-2">
//               <Phone className="w-4 h-4 text-gray-400" />
//               <span className="text-gray-600">{userDetails?.phone}</span>
//             </div>
//             <div className="flex items-center space-x-2">
//               <Building className="w-4 h-4 text-gray-400" />
//               <span className="text-gray-600">GST: {userDetails?.gst}</span>
//             </div>
//             <div className="flex items-center space-x-2">
//               <MapPin className="w-4 h-4 text-gray-400" />
//               <span className="text-gray-600">{userDetails?.address}</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {userDetails?.certificate && (
//         <div className="mt-6 p-4 border rounded-lg">
//           <h3 className="text-lg font-semibold mb-2">Company Certificates</h3>
//           <div className="flex items-center space-x-4">
//             <Award className="w-6 h-6 text-green-600" />
//             <span>{userDetails.certificate}</span>
//             <a
//               href={userDetails.certificateUrl}
//               className="text-blue-600 hover:underline"
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               View Certificate
//             </a>
//           </div>
//         </div>
//       )}
//     </div>
//   );

//   const renderAbout = () => (
//     <div className="bg-white rounded-xl shadow-sm p-6">
//       <h3 className="text-lg font-semibold mb-4">About Company</h3>
//       <p className="text-gray-600">
//         {userDetails?.about || 'No company description available.'}
//       </p>
//     </div>
//   );

//   const renderAchievements = () => (
//     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//       {(userDetails?.achievements || []).map((achievement, index) => (
//         <div key={index} className="bg-white p-6 rounded-xl shadow-sm text-center">
//           <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
//             <Trophy className="w-8 h-8 text-green-600" />
//           </div>
//           <h5 className="font-semibold mb-2">{achievement.title}</h5>
//           <p className="text-gray-600 text-sm">Earned on {achievement.date}</p>
//         </div>
//       ))}
//     </div>
//   );

//   const renderChallenges = () => (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//       {mockChallenges.map((challenge, index) => (
//         <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
//           <div className="flex items-center justify-between mb-4">
//             <h5 className="font-semibold">{challenge.title}</h5>
//             <Target className="w-5 h-5 text-green-600" />
//           </div>
//           <div className="space-y-4">
//             <div>
//               <div className="flex justify-between mb-2">
//                 <span className="text-gray-600">Progress</span>
//                 <span>{challenge.progress}%</span>
//               </div>
//               <div className="w-full bg-gray-200 rounded-full h-2">
//                 <div
//                   className="bg-green-600 rounded-full h-2"
//                   style={{ width: `${challenge.progress}%` }}
//                 />
//               </div>
//             </div>
//             <div className="flex justify-between text-sm">
//               <span className="text-gray-600">Deadline</span>
//               <span>{challenge.deadline}</span>
//             </div>
//             <div className="flex justify-between text-sm">
//               <span className="text-gray-600">Reward</span>
//               <span className="text-green-600">{challenge.reward}</span>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );

//   const renderLeaderboard = () => (
//     <div className="bg-white rounded-xl shadow-sm overflow-hidden">
//       <div className="p-6 border-b">
//         <h4 className="text-lg font-semibold">Top Performers</h4>
//       </div>
//       <div className="divide-y">
//         {mockLeaderboard.map((entry) => (
//           <div
//             key={entry.rank}
//             className={`p-4 flex items-center justify-between ${
//               entry.isUser ? 'bg-green-50' : ''
//             }`}
//           >
//             <div className="flex items-center space-x-4">
//               <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
//                 entry.rank <= 3 ? 'bg-yellow-100' : 'bg-gray-100'
//               }`}>
//                 {entry.rank <= 3 ? (
//                   <Trophy className={`w-4 h-4 ${
//                     entry.rank === 1 ? 'text-yellow-600' :
//                     entry.rank === 2 ? 'text-gray-600' : 'text-orange-600'
//                   }`} />
//                 ) : (
//                   <span className="text-gray-600">{entry.rank}</span>
//                 )}
//               </div>
//               <span className={`font-medium ${entry.isUser ? 'text-green-600' : ''}`}>
//                 {entry.name}
//               </span>
//             </div>
//             <span className="font-semibold">{entry.score}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );

//   if (!userDetails) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-xl text-gray-600">Loading...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-7xl mx-auto">
//         <div className="flex items-center space-x-4 mb-8">
//           <button
//             onClick={() => navigate('/dashboard')}
//             className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//           >
//             <ArrowLeft className="w-6 h-6" />
//           </button>
//           <h2 className="text-2xl font-bold"> Profile</h2>
//         </div>

//         {renderHeader()}

//         <div className="mb-8">
//           <div className="flex space-x-2">
//             {tabs.map((tab) => (
//               <button
//                 key={tab.id}
//                 onClick={() => setActiveTab(tab.id)}
//                 className={`px-4 py-2 rounded-lg transition-colors ${
//                   activeTab === tab.id
//                     ? 'bg-green-600 text-white'
//                     : 'bg-white text-gray-600 hover:bg-gray-50'
//                 }`}
//               >
//                 {tab.label}
//               </button>
//             ))}
//           </div>
//         </div>

//         <div className="space-y-6">

//           {activeTab === 'achievements' && renderAchievements()}
//           {activeTab === 'challenges' && renderChallenges()}
//           {activeTab === 'leaderboard' && renderLeaderboard()}
//           {/* {activeTab === 'about' && renderAbout()} */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;

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
