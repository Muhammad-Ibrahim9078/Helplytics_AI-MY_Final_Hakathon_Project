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
    const [changingPassword, setChangingPassword] = useState(false);

    const [passwordData, setPasswordData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    });

    const [profileData, setProfileData] = useState({
        name: '',
        location: '',
        skills: '',
        interests: '',
        trustScore: 100,
        contributions: 0,
        badges: [],
        role: 'Both'
    });

    const [formData, setFormData] = useState({
        name: '',
        location: '',
        skills: '',
        interests: '',
    });

    useEffect(() => {
        fetchProfile();
    }, []);

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
                const u = res.data.user;
                setProfileData({
                    name: u.username || '',
                    location: u.location || '',
                    skills: (u.skills || []).join(', '),
                    interests: (u.interests || []).join(', '),
                    trustScore: u.trustScore || 100,
                    contributions: u.contributions || 0,
                    badges: u.badges || [],
                    role: u.role || 'Both'
                });
                setFormData({
                    name: u.username || '',
                    location: u.location || '',
                    skills: (u.skills || []).join(', '),
                    interests: (u.interests || []).join(', '),
                });
            }
        } catch (error) {
            console.error("Failed to fetch profile:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setUpdatingProfile(true);
        try {
            const accessToken = localStorage.getItem("accessToken");
            const res = await axios.put("http://localhost:8000/user/profile", {
                username: formData.name,
                location: formData.location,
                skills: formData.skills,
                interests: formData.interests
            }, {
                headers: { Authorization: `Bearer ${accessToken}` }
            });

            if (res.data.success) {
                toast.success("Profile updated successfully!");
                fetchProfile();
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update profile");
        } finally {
            setUpdatingProfile(false);
        }
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        if (passwordData.newPassword !== passwordData.confirmNewPassword) {
            toast.error("New passwords do not match");
            return;
        }
        setChangingPassword(true);
        try {
            const accessToken = localStorage.getItem("accessToken");
            const res = await axios.put("http://localhost:8000/user/update-password", {
                oldPassword: passwordData.oldPassword,
                newPassword: passwordData.newPassword,
                confirmNewPassword: passwordData.confirmNewPassword
            }, {
                headers: { Authorization: `Bearer ${accessToken}` }
            });
            if (res.data.success) {
                toast.success("Password updated successfully!");
                setPasswordData({ oldPassword: '', newPassword: '', confirmNewPassword: '' });
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update password");
        } finally {
            setChangingPassword(false);
        }
    };

    const skillsArray = profileData.skills ? profileData.skills.split(',').map(s => s.trim()).filter(s => s) : [];

    return (
        <div className="min-h-screen relative overflow-hidden font-sans text-gray-900 flex flex-col" style={{ backgroundColor: '#F4F2EB' }}>
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-100/40 blur-[120px] pointer-events-none" />
            <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-orange-100/40 blur-[120px] pointer-events-none" />

            <Navbar />

            <div className="relative z-10 w-full max-w-[1100px] mx-auto px-6 flex-1 flex flex-col pb-12">
                
                {/* Hero */}
                <div className="w-full bg-[#162722] rounded-[32px] p-8 md:p-12 mb-6 text-white shadow-xl flex flex-col justify-center">
                    <span className="text-[#a4b5ac] text-[11px] font-bold tracking-widest uppercase mb-4 block">PROFILE</span>
                    <h1 className="text-4xl md:text-[50px] font-extrabold leading-[1.1] mb-2 tracking-tight">
                        {loading ? "Loading..." : profileData.name}
                    </h1>
                    <p className="text-[#a4b5ac] text-[15px] mt-2">
                        {profileData.role} • {profileData.location || "No location set"}
                    </p>
                </div>

                <div className="flex flex-col md:flex-row gap-6">
                    
                    {/* Public Profile */}
                    <div className="flex-[1.1] bg-[#FAF9F5] rounded-[32px] p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#ebe9e1] flex flex-col">
                        <span className="text-[#1a8570] text-[11px] font-bold tracking-[0.15em] uppercase mb-4 block">PUBLIC PROFILE</span>
                        <h2 className="text-[32px] md:text-[36px] font-bold leading-tight mb-8 tracking-tight text-[#111]">Skills and reputation</h2>

                        <div className="flex flex-col gap-5 mt-2">
                            <div className="flex items-center justify-between border-b border-gray-200/60 pb-5">
                                <span className="text-[14.5px] text-gray-600">Trust score</span>
                                <span className="font-bold text-[15px] text-[#111]">{profileData.trustScore}%</span>
                            </div>
                            
                            <div className="flex items-center justify-between border-b border-gray-200/60 pb-5 mt-2">
                                <span className="text-[14.5px] text-gray-600">Contributions</span>
                                <span className="font-bold text-[15px] text-[#111]">{profileData.contributions}</span>
                            </div>

                            <div className="mt-4">
                                <h3 className="font-bold text-[15px] text-[#111] mb-3">Skills</h3>
                                <div className="flex flex-wrap gap-2.5">
                                    {skillsArray.length > 0 ? skillsArray.map((skill, idx) => (
                                        <span key={idx} className="bg-[#E9F0EC] text-[#1a8570] px-3.5 py-1.5 rounded-full text-[13px] font-semibold">{skill}</span>
                                    )) : (
                                        <span className="text-gray-400 text-[13px]">No skills added yet</span>
                                    )}
                                </div>
                            </div>

                            <div className="mt-4">
                                <h3 className="font-bold text-[15px] text-[#111] mb-3">Badges</h3>
                                <div className="flex flex-wrap gap-2.5">
                                    {profileData.badges.length > 0 ? profileData.badges.map((badge, idx) => (
                                        <span key={idx} className="bg-[#E9F0EC] text-[#1a8570] px-3.5 py-1.5 rounded-full text-[13px] font-semibold">{badge}</span>
                                    )) : (
                                        <span className="text-gray-400 text-[13px]">No badges earned yet</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column (Edit Profile & Security) */}
                    <div className="flex-[0.9] flex flex-col gap-6">
                        
                        {/* Edit Profile */}
                        <div className="bg-[#FAF9F5] rounded-[32px] p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#ebe9e1] flex flex-col">
                            <span className="text-[#1a8570] text-[11px] font-bold tracking-[0.15em] uppercase mb-4 block">EDIT PROFILE</span>
                            <h2 className="text-[32px] md:text-[36px] font-bold leading-tight mb-8 tracking-tight text-[#111]">Update your<br/>identity</h2>

                            <form onSubmit={handleUpdateProfile} className="flex flex-col gap-5 mt-2">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[13px] font-bold text-gray-700">Name</label>
                                        <input type="text" name="name" value={formData.name} onChange={handleChange}
                                            className="w-full bg-white border border-gray-200 text-gray-800 text-[14.5px] rounded-xl px-4 py-3 focus:outline-none focus:border-[#1a8570] transition-all" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[13px] font-bold text-gray-700">Location</label>
                                        <input type="text" name="location" value={formData.location} onChange={handleChange}
                                            className="w-full bg-white border border-gray-200 text-gray-800 text-[14.5px] rounded-xl px-4 py-3 focus:outline-none focus:border-[#1a8570] transition-all" />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-[13px] font-bold text-gray-700">Skills (comma separated)</label>
                                    <input type="text" name="skills" value={formData.skills} onChange={handleChange}
                                        placeholder="e.g. React, Figma, Python"
                                        className="w-full bg-white border border-gray-200 text-gray-800 text-[14.5px] rounded-xl px-4 py-3 focus:outline-none focus:border-[#1a8570] transition-all" />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-[13px] font-bold text-gray-700">Interests (comma separated)</label>
                                    <input type="text" name="interests" value={formData.interests} onChange={handleChange}
                                        placeholder="e.g. Hackathons, UI/UX, Open Source"
                                        className="w-full bg-white border border-gray-200 text-gray-800 text-[14.5px] rounded-xl px-4 py-3 focus:outline-none focus:border-[#1a8570] transition-all" />
                                </div>

                                <button type="submit" disabled={updatingProfile}
                                    className="w-full bg-[#1a8570] hover:bg-[#156d5b] text-white py-4 rounded-full font-semibold text-[15px] mt-6 transition-all duration-200 flex items-center justify-center gap-2 shadow-sm disabled:opacity-50">
                                    {updatingProfile ? (
                                        <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                                    ) : "Save profile"}
                                </button>
                            </form>
                        </div>

                        {/* Change Password */}
                        <div className="bg-[#FAF9F5] rounded-[32px] p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#ebe9e1] flex flex-col">
                            <span className="text-[#1a8570] text-[11px] font-bold tracking-[0.15em] uppercase mb-4 block">SECURITY</span>
                            <h2 className="text-[28px] md:text-[32px] font-bold leading-tight mb-8 tracking-tight text-[#111]">Change<br/>password</h2>

                            <form onSubmit={handlePasswordChange} className="flex flex-col gap-4 mt-2">
                                <div className="flex flex-col gap-2">
                                    <label className="text-[13px] font-bold text-gray-700">Current Password</label>
                                    <input type="password" value={passwordData.oldPassword} onChange={(e) => setPasswordData({...passwordData, oldPassword: e.target.value})} required 
                                        className="w-full bg-white border border-gray-200 text-gray-800 text-[14.5px] rounded-xl px-4 py-3.5 focus:outline-none focus:border-[#1a8570] transition-all" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-[13px] font-bold text-gray-700">New Password</label>
                                    <input type="password" value={passwordData.newPassword} onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})} required 
                                        className="w-full bg-white border border-gray-200 text-gray-800 text-[14.5px] rounded-xl px-4 py-3.5 focus:outline-none focus:border-[#1a8570] transition-all" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-[13px] font-bold text-gray-700">Confirm New Password</label>
                                    <input type="password" value={passwordData.confirmNewPassword} onChange={(e) => setPasswordData({...passwordData, confirmNewPassword: e.target.value})} required 
                                        className="w-full bg-white border border-gray-200 text-gray-800 text-[14.5px] rounded-xl px-4 py-3.5 focus:outline-none focus:border-[#1a8570] transition-all" />
                                </div>
                                <button type="submit" disabled={changingPassword} 
                                    className="w-full bg-gray-900 hover:bg-black text-white py-4 rounded-full font-semibold text-[14px] mt-4 transition-all duration-200 shadow-sm disabled:opacity-50 flex items-center justify-center gap-2">
                                    {changingPassword ? <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div> : "Update password"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
