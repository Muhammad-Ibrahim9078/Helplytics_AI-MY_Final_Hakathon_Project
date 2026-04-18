import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Explore = () => {
    const navigate = useNavigate();

    const [filters, setFilters] = useState({
        category: 'All categories',
        urgency: 'All urgency levels',
        skills: 'React, Figma, Git/GitHub',
        location: 'Karachi, Lahore, Remote'
    });

    const requests = [
        {
            id: 1,
            title: "Need help",
            desc: "helpn needed",
            author: "Ayesha Khan",
            location: "Karachi",
            helpers: "1 helper interested",
            tags: [],
            badges: [
                { label: "Web Development", color: "bg-[#e4efed] text-[#1a8570]" },
                { label: "High", color: "bg-[#feeceb] text-[#d93025]" },
                { label: "Solved", color: "bg-[#e6f4ea] text-[#1e8e3e]" }
            ]
        },
        {
            id: 2,
            title: "Need help making my portfolio responsive before demo day",
            desc: "My HTML/CSS portfolio breaks on tablets and I need layout guidance before tomorrow evening.",
            author: "Sara Noor",
            location: "Karachi",
            helpers: "1 helper interested",
            tags: ["HTML/CSS", "Responsive", "Portfolio"],
            badges: [
                { label: "Web Development", color: "bg-[#e4efed] text-[#1a8570]" },
                { label: "High", color: "bg-[#feeceb] text-[#d93025]" },
                { label: "Solved", color: "bg-[#e6f4ea] text-[#1e8e3e]" }
            ]
        },
        {
            id: 3,
            title: "Looking for Figma feedback on a volunteer event poster",
            desc: "I have a draft poster for a campus community event and want sharper hierarchy, spacing, and CTA copy.",
            author: "Ayesha Khan",
            location: "Lahore",
            helpers: "1 helper interested",
            tags: ["Figma", "Poster", "Design Review"],
            badges: [
                { label: "Design", color: "bg-[#e8f0fe] text-[#1967d2]" },
                { label: "Medium", color: "bg-[#fef7e0] text-[#b06000]" },
                { label: "Open", color: "bg-white border border-gray-200 text-gray-500" }
            ]
        },
        {
            id: 4,
            title: "Need mock interview support for internship applications",
            desc: "Applying to frontend internships and need someone to practice behavioral and technical interview questions with me.",
            author: "Sara Noor",
            location: "Remote",
            helpers: "2 helpers interested",
            tags: ["Interview Prep", "Career", "Frontend"],
            badges: [
                { label: "Career", color: "bg-gray-100 text-gray-600" },
                { label: "Low", color: "bg-[#e6f4ea] text-[#1e8e3e]" },
                { label: "Solved", color: "bg-[#e6f4ea] text-[#1e8e3e]" }
            ]
        }
    ];

    return (
        <div className="min-h-screen relative overflow-hidden font-sans text-gray-900 flex flex-col" style={{ backgroundColor: '#F4F2EB' }}>
            <Navbar />
            {/* Background Shapes */}
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-100/40 blur-[120px] pointer-events-none" />
            <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-orange-100/40 blur-[120px] pointer-events-none" />

            {/* Main Content */}
            <div className="relative z-10 w-full max-w-[1100px] mx-auto px-6 flex-1 flex flex-col pb-12">
                
                {/* Hero Header Card */}
                <div className="w-full bg-[#162722] rounded-[32px] p-8 md:p-12 mb-6 text-white shadow-xl flex flex-col justify-center text-center md:text-left">
                    <span className="text-[#a4b5ac] text-[11px] font-bold tracking-widest uppercase mb-4 block">
                        EXPLORE / FEED
                    </span>
                    <h1 className="text-4xl md:text-[44px] font-extrabold leading-[1.1] mb-3 tracking-tight max-w-[800px]">
                        Browse help requests with filterable community context.
                    </h1>
                    <p className="text-[#a4b5ac] text-[15px] mt-2">
                        Filter by category, urgency, skills, and location to surface the best matches.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-6">
                    
                    {/* Left Filters Card */}
                    <div className="flex-[0.8] bg-[#FAF9F5] rounded-[32px] p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#ebe9e1] flex flex-col h-fit sticky top-24">
                        <span className="text-[#1a8570] text-[11px] font-bold tracking-[0.15em] uppercase mb-4 block">
                            FILTERS
                        </span>
                        <h2 className="text-[32px] md:text-[38px] font-bold leading-tight mb-8 tracking-tight text-[#111]">
                            Refine the feed
                        </h2>

                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-[13px] font-bold text-gray-700">Category</label>
                                <select 
                                    value={filters.category}
                                    onChange={(e) => setFilters({...filters, category: e.target.value})}
                                    className="w-full bg-white border border-gray-200 text-gray-800 text-[14.5px] rounded-2xl px-4 py-3.5 focus:outline-none focus:border-[#1a8570] transition-all appearance-none cursor-pointer"
                                    style={{ backgroundImage: `url('data:image/svg+xml;utf8,<svg fill="none" viewBox="0 0 24 24" stroke="%23888" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>')`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1em' }}
                                >
                                    <option>All categories</option>
                                    <option>Web Development</option>
                                    <option>Design</option>
                                    <option>Career</option>
                                </select>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-[13px] font-bold text-gray-700">Urgency</label>
                                <select 
                                    value={filters.urgency}
                                    onChange={(e) => setFilters({...filters, urgency: e.target.value})}
                                    className="w-full bg-white border border-gray-200 text-gray-800 text-[14.5px] rounded-2xl px-4 py-3.5 focus:outline-none focus:border-[#1a8570] transition-all appearance-none cursor-pointer"
                                    style={{ backgroundImage: `url('data:image/svg+xml;utf8,<svg fill="none" viewBox="0 0 24 24" stroke="%23888" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>')`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1em' }}
                                >
                                    <option>All urgency levels</option>
                                    <option>High</option>
                                    <option>Medium</option>
                                    <option>Low</option>
                                </select>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-[13px] font-bold text-gray-700">Skills</label>
                                <input 
                                    type="text"
                                    value={filters.skills}
                                    onChange={(e) => setFilters({...filters, skills: e.target.value})}
                                    className="w-full bg-white border border-gray-200 text-gray-800 text-[14.5px] rounded-2xl px-4 py-3.5 focus:outline-none focus:border-[#1a8570] transition-all"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-[13px] font-bold text-gray-700">Location</label>
                                <input 
                                    type="text"
                                    value={filters.location}
                                    onChange={(e) => setFilters({...filters, location: e.target.value})}
                                    className="w-full bg-white border border-gray-200 text-gray-800 text-[14.5px] rounded-2xl px-4 py-3.5 focus:outline-none focus:border-[#1a8570] transition-all"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right Feed Card */}
                    <div className="flex-[1.2] flex flex-col gap-4">
                        {requests.map((req) => (
                            <div key={req.id} className="bg-[#FAF9F5] border border-[#ebe9e1] rounded-[32px] p-8 md:p-10 shadow-sm hover:shadow-md transition-all flex flex-col group">
                                <div className="flex flex-wrap items-center gap-2 mb-4">
                                    {req.badges.map((badge, idx) => (
                                        <span key={idx} className={`${badge.color} text-[10px] font-bold px-3 py-1.5 rounded-full`}>
                                            {badge.label}
                                        </span>
                                    ))}
                                </div>
                                
                                <h3 className="text-[19px] font-bold text-[#111] mb-2 group-hover:text-[#1a8570] transition-colors tracking-tight">
                                    {req.title}
                                </h3>
                                
                                <p className="text-[14px] text-gray-500 mb-6 leading-relaxed">
                                    {req.desc}
                                </p>

                                {req.tags && req.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {req.tags.map((tag, idx) => (
                                            <span key={idx} className="bg-[#EBEEEB] text-gray-600 text-[10px] font-bold px-3 py-1.5 rounded-full">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                <div className="mt-auto pt-6 border-t border-gray-100 flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <span className="font-bold text-[14px] text-[#111] tracking-tight">{req.author}</span>
                                        <span className="text-[12px] text-gray-400 font-medium">
                                            {req.location} • {req.helpers}
                                        </span>
                                    </div>
                                    <button className="bg-white hover:bg-gray-50 text-gray-800 px-6 py-2.5 rounded-full text-[13px] font-bold shadow-sm border border-gray-100 transition-all active:scale-[0.98]">
                                        Open details
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Explore;
