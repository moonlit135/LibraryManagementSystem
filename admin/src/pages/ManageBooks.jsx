import React, { useEffect, useState } from 'react';
import AdminSidebar from '../components/AdminSidebar';

const ManageBooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Mock data for now, replace with backend API call
    const mockBooks = [
      {
        id: 1,
        title: "Introduction to Algorithms",
        author: "Thomas H. Cormen",
        department: "Computer Science",
        isbn: "9780262033848",
        quantity: 10,
      },
      {
        id: 2,
        title: "Digital Signal Processing",
        author: "John G. Proakis",
        department: "Electronics",
        isbn: "9780133942891",
        quantity: 7,
      },
    ];
    setBooks(mockBooks);
  }, []);

  const handleDelete = (id) => {
    const confirm = window.confirm("Are you sure you want to delete this book?");
    if (confirm) {
      setBooks(books.filter(book => book.id !== id));
      // Make DELETE API call here
    }
  };

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="ml-64 w-full p-8 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold mb-6">Manage Books</h1>
        <div className="overflow-x-auto bg-white p-6 rounded-lg shadow">
          <table className="table-auto w-full border-collapse border border-gray-200">
            <thead className="bg-gray-200 text-left">
              <tr>
                <th className="p-3 border">Title</th>
                <th className="p-3 border">Author</th>
                <th className="p-3 border">Department</th>
                <th className="p-3 border">ISBN</th>
                <th className="p-3 border">Quantity</th>
                <th className="p-3 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center p-4">No books available.</td>
                </tr>
              ) : (
                books.map((book) => (
                  <tr key={book.id} className="hover:bg-gray-50">
                    <td className="p-3 border">{book.title}</td>
                    <td className="p-3 border">{book.author}</td>
                    <td className="p-3 border">{book.department}</td>
                    <td className="p-3 border">{book.isbn}</td>
                    <td className="p-3 border">{book.quantity}</td>
                    <td className="p-3 border">
                      <button
                        onClick={() => handleDelete(book.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                      {/* Add Edit button here if needed */}
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

export default ManageBooks;
