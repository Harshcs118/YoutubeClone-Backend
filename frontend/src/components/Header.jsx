import React, { useState } from 'react';
import { Menu, Search, User, Film } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Header = ({ toggleSidebar }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  return (
    <nav className="bg-white shadow-md p-4 sticky top-0 z-50">
      <div className="flex items-center justify-between flex-wrap">
        {/* Logo and Menu Button */}
        <div className="flex items-center space-x-4 w-full md:w-auto justify-between">
          {/* Always Visible Hamburger Button */}
          <button
            onClick={toggleSidebar}
            className="p-2 hover:bg-gray-100 rounded-full" // Removed `md:hidden`, always visible
          >
            <Menu className="w-6 h-6 text-gray-700" />
          </button>

          {/* Logo */}
          <button
            onClick={() => navigate('/')} 
            className="text-xl font-bold flex items-center"
          >
            <Film className="w-6 h-6 mr-2" />
            YouTube Clone
          </button>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-full md:max-w-2xl mx-4 mt-4 md:mt-0 w-full">
          <form onSubmit={handleSearch} className="flex">
            <input
              type="text"
              placeholder="Search"
              className="w-full px-4 py-2 border rounded-l-full focus:outline-none focus:border-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="submit"
              className="px-6 py-2 bg-gray-100 border border-l-0 rounded-r-full hover:bg-gray-200"
            >
              <Search className="w-5 h-5" />
            </button>
          </form>
        </div>

        {/* User Actions */}
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          {isLoggedIn ? (
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/channel')}
                className="hover:bg-gray-100 p-2 rounded-full"
              >
                <User className="w-6 h-6" />
              </button>
              <button
                onClick={logout}
                className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-full"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => navigate('/signin')}
              className="flex items-center text-blue-600 border border-blue-600 px-4 py-2 rounded-full hover:bg-blue-50"
            >
              <User className="w-5 h-5 mr-2" />
              Sign In
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
