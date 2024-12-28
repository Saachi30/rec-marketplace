import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { auth } from './pages/firebase';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProducerDB from './pages/producer/Dashboard';
import CompaniesDB from './pages/company/Dashboard';
import ConsumerDB from './pages/user/Dashboard';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        toast.error("Please login to access this page", {
          position: "bottom-center",
        });
        navigate('/login');
      }
      setAuthenticated(!!user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
    </div>;
  }

  return authenticated ? children : null;
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
    });

    return () => unsubscribe();
  }, []);

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
        <Route path="/register" element={<Register/>} />
        <Route
          path="/producerDB"
          element={
            <ProtectedRoute>
              <ProducerDB />
            </ProtectedRoute>
          }
        />
        <Route
          path="/companiesDB"
          element={
            <ProtectedRoute>
              <CompaniesDB />
            </ProtectedRoute>
          }
        />
        <Route
          path="/consumersDB"
          element={
            <ProtectedRoute>
              <ConsumerDB />
            </ProtectedRoute>
          }
        />
         <Route
          path="*"
          element={
            <Navigate to="/" replace />
          }
        />

      </Routes>
    </BrowserRouter>
  );
};

export default App;
