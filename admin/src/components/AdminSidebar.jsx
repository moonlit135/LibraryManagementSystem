import React from 'react';
import { Link } from 'react-router-dom';

const AdminSidebar = ({ isOpen }) => {
  return (
    <div
      className={`fixed top-16 left-0 z-50 w-64 h-full bg-gray-800 text-white p-7 transition-transform duration-300 ease-in-out transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0 md:static md:h-screen`}
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Admin Panel</h2>
      <nav className="flex flex-col gap-4">
        <Link to="/admin-dashboard" className="hover:text-blue-400">Dashboard</Link>
        <Link to="/admin/students" className="hover:text-blue-400">Manage Students</Link>
        <Link to="/admin/professors" className="hover:text-blue-400">Manage Professors</Link>
        <Link to="/admin/books" className="hover:text-blue-400">Manage Books</Link>
        <Link to="/admin/logout" className="hover:text-blue-400">Logout</Link>
      </nav>
    </div>
  );
};

export default AdminSidebar;

