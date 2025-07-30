import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
    navigate('/login');
  };

  return (
    <div className="navbar bg-base-100 shadow-sm px-4">
      <div className="navbar bg-base-100 shadow-sm">
        <a className="btn btn-ghost text-xl">
          <img 
            src="/images/central-library-high-resolution-logo-transparent.png" 
            alt="Central Library Logo" 
            className="h-15 w-auto"
          /></a>
          <div className="text-center">
            <h1 className="text-xl md:text-2xl font-bold text-white mb-6">
            Central Library
            </h1>
          </div>
      </div>
          
      {user && (
        <div className="flex-none gap-2">
          <div className="dropdown dropdown-end">
            <div 
              tabIndex={0} 
              role="button" 
              className="btn btn-ghost btn-circle avatar"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <div className="w-10 rounded-full bg-blue-500 text-white flex items-center justify-center">
                <span className="text-lg font-semibold">
                  {user.email ? user.email.charAt(0).toUpperCase() : 'A'}
                </span>
              </div>
            </div>
            {isDropdownOpen && (
              <ul 
                tabIndex={0} 
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
              >
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">Admin</span>
                  </a>
                </li>
                <li><a>Settings</a></li>
                <li><button onClick={handleLogout}>Logout</button></li>
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;