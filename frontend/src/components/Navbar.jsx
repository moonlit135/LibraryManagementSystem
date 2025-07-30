import React, { useState } from 'react';


const Navbar = () => {
  return(
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
  );
};

export default Navbar;