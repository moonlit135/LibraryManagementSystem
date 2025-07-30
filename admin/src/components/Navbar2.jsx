import React, { useState } from 'react';

import { FaBars } from 'react-icons/fa';

const Navbar2 = ({ onToggleSidebar }) => {
  return (
    <div className="navbar bg-base-100 shadow-sm fixed top-0 left-0 right-0 z-50">
      {/* Left Section: Hamburger + Logo */}
      <div className="flex-1 flex items-center gap-3">
        {/* Hamburger Button (Mobile) */}
        <button className="btn btn-ghost lg:hidden" onClick={onToggleSidebar}>
          <FaBars size={20} />
        </button>

        {/* Logo */}
        <a className="btn btn-ghost text-xl">
          <img 
            src="/images/central-library-high-resolution-logo-transparent.png" 
            alt="Central Library Logo" 
            className="h-10 w-auto"
          />
        </a>
      </div>

      {/* Right Section: Search + Avatar */}
      <div className="flex gap-2 items-center">
        {/* Search Input */}
        <input 
          type="text" 
          placeholder="Search" 
          className="input input-bordered w-24 md:w-auto" 
        />

        {/* User Avatar Dropdown */}
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                alt="User Avatar"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
          >
            <li><a>Logout</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar2;
