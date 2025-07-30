// src/components/BookCard.jsx
import React from 'react';

const books = [
  {
    id: 1,
    title: 'Atomic Habits',
    author: 'James Clear',
    description: 'A guide to building good habits and breaking bad ones.',
    image: 'https://m.media-amazon.com/images/I/91bYsX41DVL._AC_UF1000,1000_QL80_.jpg',
  },
  {
    id: 2,
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    description: 'A philosophical story about a shepherd’s journey to find treasure.',
    image: 'https://m.media-amazon.com/images/I/51Z0nLAfLmL.jpg',
  },
  {
    id: 3,
    title: '1984',
    author: 'George Orwell',
    description: 'A dystopian novel set in a totalitarian future society.',
    image: 'https://m.media-amazon.com/images/I/71kxa1-0mfL.jpg',
  },
];

const BookSection = () => {
  return (
    <section className="py-10 px-6 bg-gray-50">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-gray-800 mb-2">Library Collection</h2>
        <p className="text-gray-600">Explore our featured books below</p>
      </div>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {books.map((book) => (
          <div key={book.id} className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-xl transition">
            <img src={book.image} alt={book.title} className="w-full h-64 object-cover" />
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-gray-800">{book.title}</h3>
              <p className="text-gray-600 mb-2 italic">by {book.author}</p>
              <p className="text-gray-700 mb-4">{book.description}</p>
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                Issue Book
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BookSection;

