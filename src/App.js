import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProducerDashboard from './pages/producer/Dashboard';
import CompanyDashboard from './pages/company/Dashboard';
import UserDashboard from './pages/user/Dashboard';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null);

  return (
    <BrowserRouter>
      {/* <nav className="p-4 bg-gray-100 shadow-sm">
        <ul className="flex space-x-4">
        
          {isLoggedIn && userType === 'producer' && (
            <li>
              <Link to="/producer" className="text-blue-500 hover:underline">Producer Dashboard</Link>
            </li>
          )}
          {isLoggedIn && userType === 'company' && (
            <li>
              <Link to="/company" className="text-blue-500 hover:underline">Company Dashboard</Link>
            </li>
          )}
          {isLoggedIn && userType === 'user' && (
            <li>
              <Link to="/user" className="text-blue-500 hover:underline">User Dashboard</Link>
            </li>
          )}
        </ul>
      </nav> */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route 
          path="/login" 
          element={
            <Login 
              setIsLoggedIn={setIsLoggedIn} 
              setUserType={setUserType} 
            />
          } 
        />
        <Route path="/signup" element={<Signup />} />
        <Route 
          path="/producer/*" 
          element={
            isLoggedIn && userType === 'producer' ? (
              <ProducerDashboard setIsLoggedIn={setIsLoggedIn} />
            ) : (
              <Home /> // Redirecting to Home if not authorized
            )
          } 
        />
        <Route 
          path="/company/*" 
          element={
            isLoggedIn && userType === 'company' ? (
              <CompanyDashboard setIsLoggedIn={setIsLoggedIn} />
            ) : (
              <Home /> // Redirecting to Home if not authorized
            )
          } 
        />
        <Route 
          path="/user/*" 
          element={
            isLoggedIn && userType === 'user' ? (
              <UserDashboard setIsLoggedIn={setIsLoggedIn} />
            ) : (
              <Home /> // Redirecting to Home if not authorized
            )
          } 
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
