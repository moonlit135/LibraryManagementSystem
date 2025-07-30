import React, { useState } from 'react';
import DashboardCard from '../components/DashboardCard';
import AdminSidebar from '../components/AdminSidebar';
import Navbar2 from '../components/Navbar2';

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      {/* Fixed Navbar at the top */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar2 onToggleSidebar={toggleSidebar} />
      </div>

      {/* Main Layout with margin top for navbar height */}
      <div className="flex mt-16">
        {/* Sidebar: visible on large screens, toggleable on small */}
        <AdminSidebar isOpen={sidebarOpen} />

        {/* Main Content */}
        <div className="flex-1 p-8 bg-gray-100 min-h-screen">
          <h1 className="text-3xl font-bold mb-8 text-gray-800">Welcome Admin</h1>

          <div className="flex flex-wrap gap-6 justify-start">
            <DashboardCard
              title="Manage Students"
              description="View, edit, or delete student records"
              route="/admin/students"
            />
            <DashboardCard
              title="Manage Professors"
              description="Manage professor profiles and book issues"
              route="/admin/professors"
            />
            <DashboardCard
              title="Manage Books"
              description="Add, update, or remove books in the system"
              route="/admin/books"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
