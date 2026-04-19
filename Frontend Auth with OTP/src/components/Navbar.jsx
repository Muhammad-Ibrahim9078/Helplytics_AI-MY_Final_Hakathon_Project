import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { getData } from "../context/UserContext";
import { HiUserCircle } from "react-icons/hi2";
import { FaChevronDown, FaSignOutAlt, FaUser } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, setUser } = getData();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      await axios.post(
        "http://localhost:8000/user/logout",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      console.error("Logout API failed:", error);
    } finally {
      // Always clear local state even if API fails
      setUser(null);
      localStorage.clear();
      toast.success("Logged out successfully");
      navigate("/login");
    }
  };

  const navLinks = [
    { name: "Dashboard", path: "/home" },
    { name: "Explore", path: "/explore" },
    { name: "Messages", path: "/messages" },
    { name: "Leaderboard", path: "/leaderboard" },
    { name: "AI Center", path: "/ai-center" },
    { name: "Notifications", path: "/notifications" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="w-full bg-[#f4f2eb]/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200/50">
      <div className="max-w-[1100px] mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <div 
          onClick={() => navigate("/")} 
          className="flex items-center gap-2 cursor-pointer transition-transform active:scale-95"
        >
          <div className="bg-[#1a8570] text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm">
            H
          </div>
          <span className="font-bold text-lg tracking-tight text-[#1b2622]">HelpHub AI</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 text-[15px] font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`transition-colors ${
                isActive(link.path) 
                ? "text-[#1a8570]" 
                : "text-gray-500 hover:text-[#1a8570]"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Profile / CTAs */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
               <Link 
                to="/create-request" 
                className={`hidden sm:block px-5 py-2 rounded-full text-[14px] font-semibold transition-all ${
                  isActive("/create-request") 
                  ? "bg-[#E4ECE7] text-[#1a8570]" 
                  : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                }`}
              >
                Create Request
              </Link>

              <div className="relative" ref={dropdownRef}>
                <div
                  onClick={() => setOpen((prev) => !prev)}
                  className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100/50 transition-colors cursor-pointer border border-transparent"
                >
                  {user.profilePic ? (
                    <img
                      src={user.profilePic}
                      alt="user"
                      className="w-8 h-8 rounded-full object-cover ring-2 ring-[#1a8570]/20"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-[#1a8570]/10 rounded-full flex items-center justify-center text-[#1a8570]">
                      <HiUserCircle size={32} />
                    </div>
                  )}
                  <FaChevronDown size={10} className={`text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
                </div>

                {open && (
                  <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-5 py-4 bg-gray-50/50 border-b border-gray-100">
                      <p className="text-sm font-bold text-gray-900 truncate">
                        {user?.username}
                      </p>
                      <p className="text-xs text-gray-500 font-medium truncate mt-0.5">
                        {user?.email}
                      </p>
                    </div>

                    <div className="p-2">
                      <button
                        onClick={() => {
                          navigate("/profile");
                          setOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-600 hover:text-[#1a8570] hover:bg-emerald-50 rounded-xl transition-all"
                      >
                        <FaUser size={12} />
                        My Profile
                      </button>
                    </div>

                    <div className="p-2 pt-0 border-t border-gray-100">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50 rounded-xl transition-all"
                      >
                        <FaSignOutAlt size={12} />
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <Link 
              to="/login" 
              className="bg-[#1a8570] hover:bg-[#156d5b] text-white px-5 py-2.5 rounded-full font-medium transition-colors text-sm"
            >
              Join the platform
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;