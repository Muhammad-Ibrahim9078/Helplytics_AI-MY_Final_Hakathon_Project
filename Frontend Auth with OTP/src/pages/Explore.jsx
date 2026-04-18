import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import axios from 'axios';

const Explore = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [requests, setRequests] = useState([]);

    const [filters, setFilters] = useState({
        category: 'All categories',
        urgency: 'All urgency levels',
        location: '',
        skills: ''
    });

    useEffect(() => {
        fetchRequests();
    }, [filters]);

    const fetchRequests = async () => {
        try {
            const params = {};
            if (filters.category !== 'All categories') params.category = filters.category;
            if (filters.urgency !== 'All urgency levels') params.urgency = filters.urgency;
            if (filters.location.trim() !== '') params.location = filters.location;
            if (filters.skills.trim() !== '') params.skills = filters.skills;

            const res = await axios.get("http://localhost:8000/api/requests", { params });
            if (res.data.success) setRequests(res.data.data);
        } catch (error) {
            console.error("Failed to fetch requests:", error);
        } finally {
            setLoading(false);
        }
    };

    const getCategoryColor = (cat) => {
        if (cat === "Design") return "bg-[#e8f0fe] text-[#1967d2]";
        if (cat === "Career") return "bg-gray-100 text-gray-600";
        return "bg-[#e4efed] text-[#1a8570]";
    };
    const getUrgencyColor = (urg) => {
        if (urg === "High") return "bg-[#feeceb] text-[#d93025]";
        if (urg === "Low") return "bg-[#e6f4ea] text-[#1e8e3e]";
        return "bg-[#fef7e0] text-[#b06000]";
    };
    const getStatusColor = (status) => {
        if (status === "Solved") return "bg-[#e6f4ea] text-[#1e8e3e]";
        return "bg-white border border-gray-200 text-gray-500";
    };

    return (
        <div className="min-h-screen relative overflow-hidden font-sans text-gray-900 flex flex-col" style={{ backgroundColor: '#F4F2EB' }}>
            <Navbar />
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-100/40 blur-[120px] pointer-events-none" />
            <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-orange-100/40 blur-[120px] pointer-events-none" />

            <div className="relative z-10 w-full max-w-[1100px] mx-auto px-6 flex-1 flex flex-col pb-12">
                
                {/* Hero */}
                <div className="w-full bg-[#162722] rounded-[32px] p-8 md:p-12 mb-6 text-white shadow-xl flex flex-col justify-center text-center md:text-left">
                    <span className="text-[#a4b5ac] text-[11px] font-bold tracking-widest uppercase mb-4 block">EXPLORE / FEED</span>
                    <h1 className="text-4xl md:text-[44px] font-extrabold leading-[1.1] mb-3 tracking-tight max-w-[800px]">
                        Browse help requests with filterable community context.
                    </h1>
                    <p className="text-[#a4b5ac] text-[15px] mt-2">
                        Filter by category and urgency to surface the best matches.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-6">
                    
                    {/* Filters */}
                    <div className="flex-[0.8] bg-[#FAF9F5] rounded-[32px] p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#ebe9e1] flex flex-col h-fit sticky top-24">
                        <span className="text-[#1a8570] text-[11px] font-bold tracking-[0.15em] uppercase mb-4 block">FILTERS</span>
                        <h2 className="text-[32px] md:text-[38px] font-bold leading-tight mb-8 tracking-tight text-[#111]">Refine the feed</h2>

                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-[13px] font-bold text-gray-700">Category</label>
                                <select 
                                    value={filters.category}
                                    onChange={(e) => setFilters({...filters, category: e.target.value})}
                                    className="w-full bg-white border border-gray-200 text-gray-800 text-[14.5px] rounded-2xl px-4 py-3.5 focus:outline-none focus:border-[#1a8570] transition-all appearance-none cursor-pointer"
                                >
                                    <option>All categories</option>
                                    <option>Web Development</option>
                                    <option>Design</option>
                                    <option>Career</option>
                                    <option>Community</option>
                                </select>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-[13px] font-bold text-gray-700">Urgency</label>
                                <select 
                                    value={filters.urgency}
                                    onChange={(e) => setFilters({...filters, urgency: e.target.value})}
                                    className="w-full bg-white border border-gray-200 text-gray-800 text-[14.5px] rounded-2xl px-4 py-3.5 focus:outline-none focus:border-[#1a8570] transition-all appearance-none cursor-pointer"
                                >
                                    <option>All urgency levels</option>
                                    <option>High</option>
                                    <option>Medium</option>
                                    <option>Low</option>
                                </select>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-[13px] font-bold text-gray-700">Location</label>
                                <input 
                                    type="text"
                                    placeholder="e.g. Remote, City"
                                    value={filters.location}
                                    onChange={(e) => setFilters({...filters, location: e.target.value})}
                                    className="w-full bg-white border border-gray-200 text-gray-800 text-[14.5px] rounded-2xl px-4 py-3.5 focus:outline-none focus:border-[#1a8570] transition-all"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-[13px] font-bold text-gray-700">Skills / Tags</label>
                                <input 
                                    type="text"
                                    placeholder="e.g. React, UI/UX"
                                    value={filters.skills}
                                    onChange={(e) => setFilters({...filters, skills: e.target.value})}
                                    className="w-full bg-white border border-gray-200 text-gray-800 text-[14.5px] rounded-2xl px-4 py-3.5 focus:outline-none focus:border-[#1a8570] transition-all"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Feed */}
                    <div className="flex-[1.2] flex flex-col gap-4">
                        {loading ? (
                            <div className="flex items-center justify-center py-20">
                                <div className="animate-spin w-8 h-8 border-4 border-[#1a8570] border-t-transparent rounded-full"></div>
                            </div>
                        ) : requests.length === 0 ? (
                            <div className="text-center py-20 bg-white/50 rounded-[32px] border border-dashed border-gray-300">
                                <h3 className="text-xl font-bold text-gray-400">No requests found</h3>
                                <p className="text-gray-400 mt-1">Try adjusting your filters.</p>
                            </div>
                        ) : (
                            requests.map((req) => (
                                <div key={req._id} className="bg-[#FAF9F5] border border-[#ebe9e1] rounded-[32px] p-8 md:p-10 shadow-sm hover:shadow-md transition-all flex flex-col group">
                                    <div className="flex flex-wrap items-center gap-2 mb-4">
                                        <span className={`${getCategoryColor(req.category)} text-[10px] font-bold px-3 py-1.5 rounded-full`}>{req.category}</span>
                                        <span className={`${getUrgencyColor(req.urgency)} text-[10px] font-bold px-3 py-1.5 rounded-full`}>{req.urgency}</span>
                                        <span className={`${getStatusColor(req.status)} text-[10px] font-bold px-3 py-1.5 rounded-full`}>{req.status}</span>
                                    </div>
                                    
                                    <h3 className="text-[19px] font-bold text-[#111] mb-2 group-hover:text-[#1a8570] transition-colors tracking-tight">{req.title}</h3>
                                    <p className="text-[14px] text-gray-500 mb-6 leading-relaxed">{req.description}</p>

                                    {req.tags && req.tags.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {req.tags.map((tag, idx) => (
                                                <span key={idx} className="bg-[#EBEEEB] text-gray-600 text-[10px] font-bold px-3 py-1.5 rounded-full">{tag}</span>
                                            ))}
                                        </div>
                                    )}

                                    <div className="mt-auto pt-6 border-t border-gray-100 flex items-center justify-between">
                                        <div className="flex flex-col">
                                            <span className="font-bold text-[14px] text-[#111] tracking-tight">{req.author?.username || "Unknown"}</span>
                                            <span className="text-[12px] text-gray-400 font-medium">
                                                {req.author?.location || "Remote"} • {req.helpers?.length || 0} helper interested
                                            </span>
                                        </div>
                                        <button 
                                            onClick={() => navigate(`/request/${req._id}`)}
                                            className="bg-white hover:bg-gray-50 text-gray-800 px-6 py-2.5 rounded-full text-[13px] font-bold shadow-sm border border-gray-100 transition-all active:scale-[0.98]"
                                        >
                                            Open details
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Explore;
