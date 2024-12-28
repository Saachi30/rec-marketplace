import React from 'react'
import { Link } from 'react-router-dom';

const Header = () => (
  <header className="bg-white shadow-sm">
    <div className="container mx-auto px-4 py-4">
      <nav className="flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-green-600">REC Market</Link>
        <div className="space-x-6">
          <Link to="/" className="text-gray-600 hover:text-green-600">Home</Link>
          <Link to="/login" className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">Login</Link>
        </div>
      </nav>
    </div>
  </header>
);

export default Header;
