// src/components/DashboardCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardCard = ({ title, description, route }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(route)}
      className="cursor-pointer bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition duration-300 w-full sm:w-72"
    >
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default DashboardCard;
