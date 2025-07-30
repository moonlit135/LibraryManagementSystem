import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ManageStudents = () => {
  const { students, studentsLoading, fetchStudents, deleteStudent } = useAuth();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadStudents = async () => {
      try {
        setError(null);
        await fetchStudents(); // This will run only once unless fetchStudents reference changes
      } catch (err) {
        setError('Failed to load students. Please try again.');
        console.error('Error loading students:', err);
        toast.error('Failed to load students. Please try again later.');
      }
    };

    loadStudents();
  }, [fetchStudents]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;

    try {
      await deleteStudent(id);
      toast.success('Student deleted successfully');
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error(err.message || 'Failed to delete student');
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-student/${id}`);
  };

  if (studentsLoading && students.length === 0) {
    return (
      <div className="flex-1 p-8 bg-gray-100">
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-700">Loading students...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-8 bg-gray-100">
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800">Manage Students</h2>
          <p className="text-gray-600 mt-1">View and manage all registered students</p>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 m-4">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student ID</th>
                <th className="px-6 py-3 relative">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {students.map((student) => (
                <tr key={student._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {student.name || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.studentId || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEdit(student._id)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(student._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {!studentsLoading && students.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No students found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageStudents;

