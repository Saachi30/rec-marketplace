import React from 'react'
import { Link } from 'react-router-dom';


const Header = () => (
  <header className=" py-3 bg-gray-900 shadow-sm z-11 w-screen flex top-0 absolute">
    <div className="container mx-auto px-4 py-4">
      <nav className="flex justify-between items-center">
        <Link to="/" className="text-2xl font-extrabold text-green-600">RECit</Link>
        <div className="space-x-6">
          <Link to="/" className="text-gray-600 hover:text-green-600 border-b-2 border-green-600 pb-1 px-1 ">Home</Link>
          
          <Link to="/login" className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">Login</Link>
         
          
        </div>
      </nav>
    </div>
  </header>
);

export default Header;
