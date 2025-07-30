import React, { useEffect, useState } from 'react';
import AdminSidebar from '../components/AdminSidebar';

const ManageProfessors = () => {
  const [professors, setProfessors] = useState([]);

  useEffect(() => {
    // Replace this with your backend API call later
    const mockProfessors = [
      {
        id: 1,
        name: "Dr. Anjali Mehra",
        email: "anjali.mehra@example.com",
        department: "Computer Science",
        designation: "Associate Professor",
      },
      {
        id: 2,
        name: "Dr. Rajeev Nair",
        email: "rajeev.nair@example.com",
        department: "Electrical",
        designation: "Assistant Professor",
      },
    ];
    setProfessors(mockProfessors);
  }, []);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this professor?");
    if (confirmDelete) {
      setProfessors(professors.filter(prof => prof.id !== id));
      // Call backend API to delete from DB
    }
  };

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="ml-64 w-full p-8 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold mb-6">Manage Professors</h1>
        <div className="overflow-x-auto bg-white p-6 rounded-lg shadow">
          <table className="table-auto w-full border-collapse border border-gray-200">
            <thead className="bg-gray-200 text-left">
              <tr>
                <th className="p-3 border">Name</th>
                <th className="p-3 border">Email</th>
                <th className="p-3 border">Department</th>
                <th className="p-3 border">Designation</th>
                <th className="p-3 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {professors.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-4 text-center">No professors found.</td>
                </tr>
              ) : (
                professors.map((prof) => (
                  <tr key={prof.id} className="hover:bg-gray-50">
                    <td className="p-3 border">{prof.name}</td>
                    <td className="p-3 border">{prof.email}</td>
                    <td className="p-3 border">{prof.department}</td>
                    <td className="p-3 border">{prof.designation}</td>
                    <td className="p-3 border">
                      <button
                        onClick={() => handleDelete(prof.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageProfessors;
