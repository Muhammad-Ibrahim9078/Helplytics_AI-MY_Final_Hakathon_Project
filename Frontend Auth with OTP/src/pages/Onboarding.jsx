import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getData } from '../context/UserContext';
import Navbar from '../components/Navbar';

const Onboarding = () => {
    const navigate = useNavigate();
    const contextData = getData() || {};
    const setUser = contextData.setUser || (() => {});
    const [loading, setLoading] = useState(false);
    const [aiLoading, setAiLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        skills: '',
        interests: '',
        location: ''
    });

    const [aiSuggestions, setAiSuggestions] = useState({
        helpProvide: [],
        helpNeed: []
    });

    useEffect(() => {
        // Pre-fill name if available
        if (contextData.user) {
            setFormData(prev => ({ ...prev, name: contextData.user.username || '' }));
        }
    }, [contextData.user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAISuggestions = async () => {
        if (!formData.skills && !formData.interests) {
            toast.warning("Add some baseline skills or interests first");
            return;
        }
        setAiLoading(true);
        try {
            const token = localStorage.getItem("accessToken");
            const res = await axios.post("http://localhost:8000/api/requests/ai-suggestions", 
                { skills: formData.skills, interests: formData.interests },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (res.data.success) {
                setAiSuggestions(res.data.data);
                toast.success("AI analyzed your profile!");
            }
        } catch (error) {
            toast.error("Failed to get AI profile suggestions");
        } finally {
            setAiLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const token = localStorage.getItem("accessToken");
            const res = await axios.put("http://localhost:8000/user/profile", {
                username: formData.name,
                location: formData.location,
                skills: formData.skills,
                interests: formData.interests
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (res.data.success) {
                if (setUser && res.data.user) setUser(res.data.user);
                toast.success("Onboarding complete! Welcome to HelpHub AI.");
                navigate("/");
            }
        } catch (error) {
            toast.error("Failed to save profile setup");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen relative overflow-hidden font-sans text-gray-900 flex flex-col" style={{ backgroundColor: '#F4F2EB' }}>
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-100/40 blur-[120px] pointer-events-none" />
            <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-orange-100/40 blur-[120px] pointer-events-none" />

            {/* Navbar Minimal */}
            <div className="relative z-10 w-full max-w-[1100px] mx-auto px-6 py-6 border-b border-gray-200/50 mb-6 shrink-0">
                <div className="flex items-center gap-2">
                    <div className="bg-[#1a8570] text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm">H</div>
                    <span className="font-bold text-lg tracking-tight">HelpHub AI</span>
                </div>
            </div>

            <div className="relative z-10 w-full max-w-[1100px] mx-auto px-6 flex-1 flex flex-col pb-12">
                
                <div className="w-full bg-[#162722] rounded-[32px] p-8 md:p-12 mb-6 text-white shadow-xl flex flex-col justify-center text-center">
                    <span className="text-[#a4b5ac] text-[11px] font-bold tracking-widest uppercase mb-4 block">ONBOARDING</span>
                    <h1 className="text-4xl md:text-[44px] font-extrabold leading-[1.1] mb-3 tracking-tight max-w-[800px] mx-auto">
                        Complete your community profile.
                    </h1>
                    <p className="text-[#a4b5ac] text-[15px] mt-2 max-w-[600px] mx-auto">
                        Let us know what you're good at and what you want to learn so we can match you dynamically.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-6">
                    
                    {/* Form */}
                    <div className="flex-[1.2] bg-[#FAF9F5] rounded-[32px] p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#ebe9e1] flex flex-col">
                        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex flex-col gap-2">
                                    <label className="text-[13px] font-bold text-gray-700">Display Name</label>
                                    <input type="text" name="name" value={formData.name} onChange={handleChange} required
                                        className="w-full bg-white border border-gray-200 text-gray-800 text-[14.5px] rounded-xl px-4 py-3.5 focus:outline-none focus:border-[#1a8570] transition-all" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-[13px] font-bold text-gray-700">Location</label>
                                    <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="e.g. Remote, City"
                                        className="w-full bg-white border border-gray-200 text-gray-800 text-[14.5px] rounded-xl px-4 py-3.5 focus:outline-none focus:border-[#1a8570] transition-all" />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-[13px] font-bold text-gray-700">Skills (Comma separated)</label>
                                <input type="text" name="skills" value={formData.skills} onChange={handleChange}
                                    placeholder="e.g. React, Python, UI Design"
                                    className="w-full bg-white border border-gray-200 text-gray-800 text-[14.5px] rounded-xl px-4 py-3.5 focus:outline-none focus:border-[#1a8570] transition-all" />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-[13px] font-bold text-gray-700">Interests (Comma separated)</label>
                                <input type="text" name="interests" value={formData.interests} onChange={handleChange}
                                    placeholder="e.g. Open Source, Machine Learning"
                                    className="w-full bg-white border border-gray-200 text-gray-800 text-[14.5px] rounded-xl px-4 py-3.5 focus:outline-none focus:border-[#1a8570] transition-all" />
                            </div>

                            <div className="flex items-center gap-4 mt-4">
                                <button type="button" onClick={handleAISuggestions} disabled={aiLoading}
                                    className="bg-white hover:bg-gray-50 border border-gray-200 text-gray-800 py-3.5 px-6 rounded-full font-bold text-[14px] transition-all duration-200 shadow-sm flex items-center gap-2">
                                    {aiLoading ? <div className="animate-spin w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full"></div> : null}
                                    Get AI Suggestions
                                </button>
                                <button type="submit" disabled={loading}
                                    className="bg-[#1a8570] hover:bg-[#156d5b] text-white py-3.5 px-8 rounded-full font-bold text-[14px] transition-all duration-200 shadow-sm shadow-[#1a8570]/30 flex items-center gap-2">
                                    {loading ? <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div> : null}
                                    Complete Setup
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* AI Assistant */}
                    <div className="flex-[0.8] bg-[#FAF9F5] rounded-[32px] p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#ebe9e1] flex flex-col">
                        <span className="text-[#1a8570] text-[11px] font-bold tracking-[0.15em] uppercase mb-4 block">AI DISCOVERY</span>
                        <h2 className="text-[32px] md:text-[34px] font-bold leading-tight mb-8 tracking-tight text-[#111]">Match<br />Potential</h2>

                        <div className="flex flex-col gap-6 mt-2">
                            <div className="flex flex-col border-b border-gray-200/60 pb-5 gap-3">
                                <span className="text-[14px] font-bold text-gray-800">You can help with:</span>
                                <div className="flex flex-wrap gap-2">
                                    {aiSuggestions.helpProvide?.length > 0 ? aiSuggestions.helpProvide.map((skill, idx) => (
                                        <span key={idx} className="bg-[#E9F0EC] text-[#1a8570] text-[11px] font-bold px-3 py-1.5 rounded-full">{skill}</span>
                                    )) : <span className="text-[13px] text-gray-500">Add skills and ask AI to analyze them.</span>}
                                </div>
                            </div>
                            <div className="flex flex-col pb-5 gap-3">
                                <span className="text-[14px] font-bold text-gray-800">You might need help with:</span>
                                <div className="flex flex-wrap gap-2">
                                    {aiSuggestions.helpNeed?.length > 0 ? aiSuggestions.helpNeed.map((area, idx) => (
                                        <span key={idx} className="bg-orange-100/50 text-orange-600 text-[11px] font-bold px-3 py-1.5 rounded-full">{area}</span>
                                    )) : <span className="text-[13px] text-gray-500">AI will suggest areas for growth.</span>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Onboarding;
