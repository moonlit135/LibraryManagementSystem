// AuthContext.jsx
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_BASE_URL = 'http://localhost:5000/api';
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [students, setStudents] = useState([]);
  const [studentsLoading, setStudentsLoading] = useState(false);
  const navigate = useNavigate();

  // Secure fetch helper
  const authFetch = useCallback(async (url, options = {}) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_BASE_URL}${url}`, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'Request failed');
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      if (!error.message.includes('session') && !error.message.includes('token')) {
        toast.error(error.message);
      }
      throw error;
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Login failed');

      if (!data.token) throw new Error('No token received');

      localStorage.setItem('adminToken', data.token);
      const tokenData = JSON.parse(atob(data.token.split('.')[1]));
      const userData = {
        id: tokenData.id,
        email,
        role: tokenData.role || 'Admin',
        name: email.split('@')[0]
      };

      localStorage.setItem('adminUser', JSON.stringify(userData));
      setUser(userData);
      toast.success('Login successful');
      navigate('/admin-dashboard');
      return { success: true };
    } catch (error) {
      toast.error(error.message);
      return { success: false, message: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    setUser(null);
    setStudents([]);
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const fetchStudents = useCallback(async () => {
    setStudentsLoading(true);
    try {
      const data = await authFetch('/students');
      setStudents(data || []);
    } catch (error) {
      console.error('Failed to fetch students:', error);
      setStudents([]);
      throw error;
    } finally {
      setStudentsLoading(false);
    }
  }, [authFetch]);

  const deleteStudent = async (id) => {
    try {
      await authFetch(`/students/${id}`, { method: 'DELETE' });
      setStudents((prev) => prev.filter((student) => student._id !== id));
      toast.success('Student deleted successfully');
    } catch (error) {
      toast.error(error.message || 'Failed to delete student');
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('adminToken');
      const userData = localStorage.getItem('adminUser');

      if (token && userData) {
        try {
          await authFetch('/auth/verify');
          setUser(JSON.parse(userData));
        } catch (err) {
          logout();
        }
      }
      setIsLoading(false);
    };
    checkAuth();
  }, [authFetch]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        isAuthenticated: !!user,
        students,
        studentsLoading,
        fetchStudents,
        deleteStudent
      }}
    >
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;