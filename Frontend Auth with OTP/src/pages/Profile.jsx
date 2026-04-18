import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';


import axios from 'axios';
import { toast } from 'react-toastify';
import { getData } from '../context/UserContext';

const Profile = () => {
    const navigate = useNavigate();
    const contextData = getData() || {};
    const setUser = contextData.setUser || (() => {});
    const [loading, setLoading] = useState(true);
    const [updatingProfile, setUpdatingProfile] = useState(false);

    // Profile State (matching the new mockup fields)
    const [formData, setFormData] = useState({
        name: 'Ayesha Khan',
        location: 'Karachi',
        skills: 'Figma, UI/UX, HTML/CSS, Career Guidance',
        interests: 'Hackathons, UI/UX, Community Building',
    });

    // We can still fetch basic details from API if we want
    useEffect(() => {
        const fetchProfile = async () => {
            const accessToken = localStorage.getItem("accessToken");
            if (!accessToken) {
                setLoading(false);
                return;
            }
            try {
                const res = await axios.get("http://localhost:8000/user/profile", {
                    headers: { Authorization: `Bearer ${accessToken}` }
                });
                if (res.data.success) {
                    const userData = res.data.user;
                    setFormData(prev => ({
                        ...prev,
                        name: userData.username || prev.name
                    }));
                }
            } catch (error) {
                // Ignore API failure for demo page mockup purposes
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setUpdatingProfile(true);
        toast.info("Saving profile details...");
        
        // Simulating API wait for the newly added fields
        setTimeout(() => {
            setUpdatingProfile(false);
            toast.success("Profile updated successfully!");
        }, 1000);
    };

    return (
        <div className="min-h-screen relative overflow-hidden font-sans text-gray-900 flex flex-col" style={{ backgroundColor: '#F4F2EB' }}>
            {/* Background Shapes */}
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-100/40 blur-[120px] pointer-events-none" />
            <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-orange-100/40 blur-[120px] pointer-events-none" />

            <Navbar />


            {/* Main Content */}
            <div className="relative z-10 w-full max-w-[1100px] mx-auto px-6 flex-1 flex flex-col pb-12">
                
                {/* Hero Header Card */}
                <div className="w-full bg-[#162722] rounded-[32px] p-8 md:p-12 mb-6 text-white shadow-xl flex flex-col justify-center">
                    <span className="text-[#a4b5ac] text-[11px] font-bold tracking-widest uppercase mb-4 block">
                        PROFILE
                    </span>
                    <h1 className="text-4xl md:text-[50px] font-extrabold leading-[1.1] mb-2 tracking-tight">
                        {formData.name}
                    </h1>
                    <p className="text-[#a4b5ac] text-[15px] mt-2">
                        Both • {formData.location}
                    </p>
                </div>

                <div className="flex flex-col md:flex-row gap-6">
                    
                    {/* Left Panel: Public Profile (Skills & Reputation) */}
                    <div className="flex-[1.1] bg-[#FAF9F5] rounded-[32px] p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#ebe9e1] flex flex-col">
                        <span className="text-[#1a8570] text-[11px] font-bold tracking-[0.15em] uppercase mb-4 block">
                            PUBLIC PROFILE
                        </span>
                        <h2 className="text-[32px] md:text-[36px] font-bold leading-tight mb-8 tracking-tight text-[#111]">
                            Skills and reputation
                        </h2>

                        <div className="flex flex-col gap-5 mt-2">
                            {/* Trust Score */}
                            <div className="flex items-center justify-between border-b border-gray-200/60 pb-5">
                                <span className="text-[14.5px] text-gray-600">Trust score</span>
                                <span className="font-bold text-[15px] text-[#111]">100%</span>
                            </div>
                            
                            {/* Contributions */}
                            <div className="flex items-center justify-between border-b border-gray-200/60 pb-5 mt-2">
                                <span className="text-[14.5px] text-gray-600">Contributions</span>
                                <span className="font-bold text-[15px] text-[#111]">35</span>
                            </div>

                            {/* Skills Label & Badges */}
                            <div className="mt-4">
                                <h3 className="font-bold text-[15px] text-[#111] mb-3">Skills</h3>
                                <div className="flex flex-wrap gap-2.5">
                                    <span className="bg-[#E9F0EC] text-[#1a8570] px-3.5 py-1.5 rounded-full text-[13px] font-semibold">Figma</span>
                                    <span className="bg-[#E9F0EC] text-[#1a8570] px-3.5 py-1.5 rounded-full text-[13px] font-semibold">UI/UX</span>
                                    <span className="bg-[#E9F0EC] text-[#1a8570] px-3.5 py-1.5 rounded-full text-[13px] font-semibold">HTML/CSS</span>
                                    <span className="bg-[#E9F0EC] text-[#1a8570] px-3.5 py-1.5 rounded-full text-[13px] font-semibold">Career Guidance</span>
                                </div>
                            </div>

                            {/* Badges Label & Badges */}
                            <div className="mt-4">
                                <h3 className="font-bold text-[15px] text-[#111] mb-3">Badges</h3>
                                <div className="flex flex-wrap gap-2.5">
                                    <span className="bg-[#E9F0EC] text-[#1a8570] px-3.5 py-1.5 rounded-full text-[13px] font-semibold">Design Ally</span>
                                    <span className="bg-[#E9F0EC] text-[#1a8570] px-3.5 py-1.5 rounded-full text-[13px] font-semibold">Fast Responder</span>
                                    <span className="bg-[#E9F0EC] text-[#1a8570] px-3.5 py-1.5 rounded-full text-[13px] font-semibold">Top Mentor</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Panel: Edit Profile */}
                    <div className="flex-[0.9] bg-[#FAF9F5] rounded-[32px] p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#ebe9e1] flex flex-col">
                        <span className="text-[#1a8570] text-[11px] font-bold tracking-[0.15em] uppercase mb-4 block">
                            EDIT PROFILE
                        </span>
                        <h2 className="text-[32px] md:text-[36px] font-bold leading-tight mb-8 tracking-tight text-[#111]">
                            Update your<br/>identity
                        </h2>

                        <form onSubmit={handleUpdateProfile} className="flex flex-col gap-5 mt-2">
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="flex flex-col gap-2">
                                    <label className="text-[13px] font-bold text-gray-700">Name</label>
                                    <input 
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full bg-white border border-gray-200 text-gray-800 text-[14.5px] rounded-xl px-4 py-3 focus:outline-none focus:border-[#1a8570] transition-all"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-[13px] font-bold text-gray-700">Location</label>
                                    <input 
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        className="w-full bg-white border border-gray-200 text-gray-800 text-[14.5px] rounded-xl px-4 py-3 focus:outline-none focus:border-[#1a8570] transition-all"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-[13px] font-bold text-gray-700">Skills</label>
                                <input 
                                    type="text"
                                    name="skills"
                                    value={formData.skills}
                                    onChange={handleChange}
                                    className="w-full bg-white border border-gray-200 text-gray-800 text-[14.5px] rounded-xl px-4 py-3 focus:outline-none focus:border-[#1a8570] transition-all"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-[13px] font-bold text-gray-700">Interests</label>
                                <input 
                                    type="text"
                                    name="interests"
                                    value={formData.interests}
                                    onChange={handleChange}
                                    className="w-full bg-white border border-gray-200 text-gray-800 text-[14.5px] rounded-xl px-4 py-3 focus:outline-none focus:border-[#1a8570] transition-all"
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={updatingProfile}
                                className="w-full bg-[#1a8570] hover:bg-[#156d5b] text-white py-4 rounded-full font-semibold text-[15px] mt-6 transition-all duration-200 flex items-center justify-center gap-2 shadow-sm"
                            >
                                {updatingProfile ? (
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                ) : "Save profile"}
                            </button>

                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Profile;
