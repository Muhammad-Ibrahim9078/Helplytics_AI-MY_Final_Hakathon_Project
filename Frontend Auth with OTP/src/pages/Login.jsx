import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getData } from '../context/UserContext';
import { HiEye, HiEyeOff } from "react-icons/hi";

const Login = () => {
  const navigate = useNavigate();
  // Safe destructure to avoid errors if context is missing
  const contextData = getData() || {};
  const setUser = contextData.setUser || (() => {});

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return toast.error("Email and password are required");
    }
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:8000/user/login", {
        email: formData.email,
        password: formData.password
      }, {
        headers: { "Content-Type": "application/json" }
      });
      if (res.data.success) {
        localStorage.setItem("accessToken", res.data.accessToken);
        setUser(res.data.user);
        toast.success("Login Successful 🎉");
        
        // If user hasn't set up skills/location, push to onboarding
        if (!res.data.user.skills || res.data.user.skills.length === 0 || !res.data.user.location) {
            navigate("/onboarding");
        } else {
            navigate("/");
        }
      } else {
        toast.error(res.data.message || "Login failed");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid credentials. For demo, just proceed if test mode!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden font-sans text-gray-900 flex flex-col" style={{ backgroundColor: '#F4F2EB' }}>
      {/* Background Shapes */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-100/40 blur-[120px] pointer-events-none" />
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-orange-100/40 blur-[120px] pointer-events-none" />

      {/* Navbar Minimal */}
      <div className="relative z-10 w-full max-w-[1100px] mx-auto px-6 py-6 md:py-8 shrink-0">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-[#1a8570] text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm">
              H
            </div>
            <span className="font-bold text-lg tracking-tight">HelpHub AI</span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-[15px] font-medium text-gray-500">
            <Link to="/" className="hover:text-gray-900 transition-colors">Home</Link>
            <Link to="#" className="hover:text-gray-900 transition-colors">Explore</Link>
            <Link to="#" className="hover:text-gray-900 transition-colors">Leaderboard</Link>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-[1050px] mx-auto px-6 flex-1 flex flex-col justify-center pb-12">
        <div className="flex flex-col md:flex-row gap-5 md:gap-6 mt-4">
          
          {/* Left Dark Card */}
          <div className="flex-1 bg-[#162722] rounded-[32px] p-8 md:p-12 text-white shadow-xl flex flex-col justify-center">
            <span className="text-[#1a8570] text-[11px] font-bold tracking-widest uppercase mb-4">
              Community Access
            </span>
            <h1 className="text-4xl md:text-[46px] font-bold leading-[1.1] mb-6 tracking-tight">
              Enter the support<br className="hidden md:block" /> network.
            </h1>
            <p className="text-[#9eb5aa] text-[15px] leading-relaxed mb-10">
              Choose a demo identity, set your role, and jump into a multi-page product flow designed for asking, offering, and tracking help with a premium interface.
            </p>

            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-[#9eb5aa] mt-2 shrink-0" />
                <span className="text-[14.5px] text-[#9eb5aa]">Role-based entry for Need Help, Can Help, or Both</span>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-[#9eb5aa] mt-2 shrink-0" />
                <span className="text-[14.5px] text-[#9eb5aa]">Direct path into dashboard, requests, AI Center, and community feed</span>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-[#9eb5aa] mt-2 shrink-0" />
                <span className="text-[14.5px] text-[#9eb5aa]">Persistent demo session powered by LocalStorage</span>
              </li>
            </ul>
          </div>

          {/* Right Light Card */}
          <div className="flex-1 bg-[#FAF9F5] rounded-[32px] p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#ebe9e1] flex flex-col justify-center">
            <span className="text-[#1a8570] text-[11px] font-bold tracking-[0.15em] uppercase mb-4 block">
              LOGIN
            </span>
            <h2 className="text-[32px] md:text-[38px] font-bold leading-tight mb-8 tracking-tight text-[#111]">
              Welcome back to<br className="hidden md:block"/> the community
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              
              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-bold text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="community@helphub.ai"
                  className="w-full bg-white border border-gray-200 text-gray-800 text-[15px] rounded-xl px-4 py-3.5 focus:outline-none focus:border-[#1a8570] transition-all"
                />
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <label className="text-[13px] font-bold text-gray-700">Password</label>
                  <span onClick={() => navigate("/forgot-password")} className="text-[12px] font-bold text-[#1a8570] hover:underline cursor-pointer">
                    Forgot?
                  </span>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full bg-white border border-gray-200 text-gray-800 text-[15px] rounded-xl px-4 py-3.5 pr-10 focus:outline-none focus:border-[#1a8570] transition-all"
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 outline-none"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <HiEyeOff size={18} /> : <HiEye size={18} />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#1a8570] hover:bg-[#156d5b] text-white py-4 rounded-full font-semibold text-[15px] mt-2 transition-all duration-200 flex items-center justify-center gap-2 shadow-sm"
              >
                {loading && (
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                )}
                Sign in
              </button>

              <div className="text-center mt-2">
                <span className="text-[13px] text-gray-500">Don't have an account? </span>
                <Link to="/signup" className="text-[13px] font-bold text-[#1a8570] hover:underline">
                  Sign up
                </Link>
              </div>

            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;