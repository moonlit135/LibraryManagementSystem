import React, { useState } from "react";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from '../components/Navbar';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate loading
    setTimeout(() => {
      console.log("Logging in with", email, password);
      setIsLoading(false);
    }, 1500);
  };

  return (
   <>
      
        <Navbar />
        
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 pt-24 relative">
            {/* Main container */}
            <div className="relative z-10 w-full max-w-md">
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
                    <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
                        <Lock className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent mb-2">
                        Welcome Back
                    </h2>
                    <p className="text-gray-300 text-sm">Sign in to your account</p>
                    </div>

                    {/* Form */}
                    <div className="space-y-6">
                    {/* Email field */}
                    <div className="relative group">
                        <label className="block text-gray-200 font-medium mb-2 text-sm">
                        Email Address
                        </label>
                        <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-400 transition-colors" />
                        <input
                            type="email"
                            className="w-full bg-white/10 border border-white/20 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 backdrop-blur-sm"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Enter your email"
                        />
                        </div>
                    </div>

                    {/* Password field */}
                    <div className="relative group">
                        <label className="block text-gray-200 font-medium mb-2 text-sm">
                        Password
                        </label>
                        <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-400 transition-colors" />
                        <input
                            type={showPassword ? "text" : "password"}
                            className="w-full bg-white/10 border border-white/20 rounded-xl pl-12 pr-12 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 backdrop-blur-sm"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Enter your password"
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

                    {/* Forgot password */}
                    <div className="text-right">
                        <a href="#" className="text-blue-400 hover:text-blue-300 text-sm transition-colors">
                        Forgot password?
                        </a>
                    </div>

                    {/* Submit button */}
                    <button
                        onClick={handleLogin}
                        disabled={isLoading}
                        className="btn btn-active btn-primary w-full flex items-center justify-center group"
                    >
                        {isLoading ? (
                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                        <>
                            <span>Sign In</span>
                            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                        </>
                        )}
                    </button>
                    </div>

                    {/* Register link */}
                    <p className="text-center text-gray-300 text-sm mt-6">
                    Don't have an account?{" "}
                    <Link 
                        to="/register" 
                        className="text-blue-400 hover:text-blue-300 font-medium transition-colors hover:underline"
                    >
                        Register
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

export default Login;
