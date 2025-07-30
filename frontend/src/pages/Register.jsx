import React, { useState } from "react";
import { Eye, EyeOff, User, Hash, Building, BookOpen, Mail, Lock, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from '../components/Navbar';

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    rollNo: "",
    department: "",
    course: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const { password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setIsLoading(true);
    // Simulate loading
    setTimeout(() => {
      console.log("Registering user:", formData);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 pt-24 relative">
        {/* Main container */}
        <div className="relative z-10 w-full max-w-lg">
            {/* Glassmorphism card */}
            <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 border border-white/20 rounded-3xl p-8 shadow-2xl transform transition-all duration-300 hover:scale-105 relative overflow-hidden">
            {/* Animated background elements inside panel */}
            <div className="absolute inset-0">
                <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
                <div className="absolute top-20 right-10 w-32 h-32 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>
                <div className="absolute bottom-10 left-20 w-32 h-32 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-4000"></div>
            </div>
            
            {/* Content wrapper */}
            <div className="relative z-10">
                {/* Header */}
                <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
                    <UserPlus className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent mb-2">
                    Create Account
                </h2>
                <p className="text-gray-300 text-sm">Join us today</p>
                </div>

                {/* Form */}
                <div className="space-y-4">
                {/* Full Name field */}
                <div className="relative group">
                    <label className="block text-gray-200 font-medium mb-2 text-sm">
                    Full Name
                    </label>
                    <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-400 transition-colors" />
                    <input
                        type="text"
                        name="name"
                        className="w-full bg-white/10 border border-white/20 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 backdrop-blur-sm"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Enter your full name"
                    />
                    </div>
                </div>

                {/* Roll Number field */}
                <div className="relative group">
                    <label className="block text-gray-200 font-medium mb-2 text-sm">
                    Roll Number
                    </label>
                    <div className="relative">
                    <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-400 transition-colors" />
                    <input
                        type="text"
                        name="rollNo"
                        className="w-full bg-white/10 border border-white/20 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 backdrop-blur-sm"
                        value={formData.rollNo}
                        onChange={handleChange}
                        required
                        placeholder="Enter roll number"
                    />
                    </div>
                </div>

                {/* Department and Course in a grid */}
                <div className="grid grid-cols-2 gap-4">
                    {/* Department field */}
                    <div className="relative group">
                    <label className="block text-gray-200 font-medium mb-2 text-sm">
                        Department
                    </label>
                    <div className="relative">
                        <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-400 transition-colors" />
                        <select
                        name="department"
                        className="w-full bg-white/10 border border-white/20 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 backdrop-blur-sm appearance-none"
                        value={formData.department}
                        onChange={handleChange}
                        required
                        >
                        <option value="" className="bg-gray-800 text-white">Select dept.</option>
                        <option value="MCA" className="bg-gray-800 text-white">MCA</option>
                        <option value="BTech" className="bg-gray-800 text-white">BTech</option>
                        <option value="MTech" className="bg-gray-800 text-white">MTech</option>
                        <option value="MSc" className="bg-gray-800 text-white">MSc</option>
                        </select>
                    </div>
                    </div>

                    {/* Course field */}
                    <div className="relative group">
                    <label className="block text-gray-200 font-medium mb-2 text-sm">
                        Course
                    </label>
                    <div className="relative">
                        <BookOpen className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-400 transition-colors" />
                        <select
                        name="course"
                        className="w-full bg-white/10 border border-white/20 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 backdrop-blur-sm appearance-none"
                        value={formData.course}
                        onChange={handleChange}
                        required
                        >
                        <option value="" className="bg-gray-800 text-white">Select course</option>
                        <option value="Computer" className="bg-gray-800 text-white">Computer</option>
                        <option value="Mathematics" className="bg-gray-800 text-white">Mathematics</option>
                        <option value="Electronics" className="bg-gray-800 text-white">Electronics</option>
                        <option value="Civil" className="bg-gray-800 text-white">Civil</option>
                        </select>
                    </div>
                    </div>
                </div>

                {/* Email field */}
                <div className="relative group">
                    <label className="block text-gray-200 font-medium mb-2 text-sm">
                    Email Address
                    </label>
                    <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-400 transition-colors" />
                    <input
                        type="email"
                        name="email"
                        className="w-full bg-white/10 border border-white/20 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 backdrop-blur-sm"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="Enter your email"
                    />
                    </div>
                </div>

                {/* Password fields in a grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Password field */}
                    <div className="relative group">
                    <label className="block text-gray-200 font-medium mb-2 text-sm">
                        Password
                    </label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-400 transition-colors" />
                        <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        className="w-full bg-white/10 border border-white/20 rounded-xl pl-12 pr-12 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 backdrop-blur-sm"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        placeholder="Password"
                        />
                        <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                        onClick={() => setShowPassword(!showPassword)}
                        >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                    </div>
                    </div>

                    {/* Confirm Password field */}
                    <div className="relative group">
                    <label className="block text-gray-200 font-medium mb-2 text-sm">
                        Confirm Password
                    </label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-400 transition-colors" />
                        <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        className="w-full bg-white/10 border border-white/20 rounded-xl pl-12 pr-12 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 backdrop-blur-sm"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        placeholder="Confirm"
                        />
                        <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                    </div>
                    </div>
                </div>

                {/* Submit button */}
                <button
                    onClick={handleRegister}
                    disabled={isLoading}
                    className="btn btn-active btn-primary w-full flex items-center justify-center group mt-6"
                >
                    {isLoading ? (
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                    <>
                        <span>Create Account</span>
                        <UserPlus className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </>
                    )}
                </button>
                </div>

                {/* Login link */}
                <p className="text-center text-gray-300 text-sm mt-6">
                Already have an account?{" "}
                <Link 
                    to="/login" 
                    className="text-blue-400 hover:text-blue-300 font-medium transition-colors hover:underline"
                >
                    Sign In
                </Link>
                </p>
            </div>
            </div>
        </div>

        <style jsx>{`
            @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
            }
            .animation-delay-1000 {
            animation-delay: 1s;
            }
            .animation-delay-2000 {
            animation-delay: 2s;
            }
            .animation-delay-4000 {
            animation-delay: 4s;
            }
        `}</style>
        </div>
    </>
  );
};

export default Register;
