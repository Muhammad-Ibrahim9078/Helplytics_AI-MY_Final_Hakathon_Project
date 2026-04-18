import React from 'react';
import Navbar from '../components/Navbar';

const Landing = () => {
    return (
        <div className="min-h-screen relative overflow-hidden font-sans text-[#1b2622]" style={{ backgroundColor: '#F4F2EB' }}>
            <Navbar />
            
            {/* Background Shapes */}
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-100/40 blur-[120px] pointer-events-none" />
            <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-orange-100/40 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-20%] left-[20%] w-[40%] h-[40%] rounded-full bg-orange-50/40 blur-[100px] pointer-events-none" />

            {/* Container for content */}
            <div className="relative z-10 w-full max-w-[1100px] mx-auto px-6 py-8 flex flex-col gap-12 md:gap-20">
                {/* Hero Section */}
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-8 justify-between mt-4">
                    
                    {/* Left Column */}
                    <div className="flex-1 flex flex-col items-start gap-8 max-w-[500px]">
                        <div className="flex flex-col gap-4">
                            <span className="text-[#1a8570] text-xs font-bold tracking-widest uppercase">
                                Smit Grand Coding Night 2026
                            </span>
                            <h1 className="text-5xl md:text-6xl font-extrabold leading-[1.05] tracking-tight text-[#16211e]">
                                Find help faster.<br/> Become help that matters.
                            </h1>
                            <p className="text-gray-600 text-[15px] leading-relaxed mt-2">
                                HelpHub AI is a community-powered support network for students, mentors, creators, and builders. Ask for help, offer help, track impact, and let AI surface smarter matches across the platform.
                            </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-4">
                            <button className="bg-[#1a8570] hover:bg-[#156d5b] text-white px-6 py-3 rounded-full font-medium shadow-sm transition-colors text-sm">
                                Open product demo
                            </button>
                            <button className="bg-white hover:bg-gray-50 text-gray-800 px-6 py-3 rounded-full font-medium shadow-sm transition-colors text-sm">
                                Post a request
                            </button>
                        </div>

                        {/* Stats */}
                        <div className="flex items-stretch gap-4 w-full mt-4">
                            <div className="flex-1 bg-[#F9F8F4] border border-[#ebe9e1] rounded-[20px] p-5 flex flex-col shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
                                <span className="text-xs font-bold text-[#1a8570] tracking-wider mb-2">MEMBERS</span>
                                <span className="text-3xl font-extrabold mb-2">384+</span>
                                <p className="text-xs text-gray-500 leading-snug">Students, mentors, and helpers in the loop.</p>
                            </div>
                            <div className="flex-1 bg-[#F9F8F4] border border-[#ebe9e1] rounded-[20px] p-5 flex flex-col shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
                                <span className="text-xs font-bold text-gray-400 tracking-wider mb-2">REQUESTS</span>
                                <span className="text-3xl font-extrabold mb-2">72+</span>
                                <p className="text-xs text-gray-500 leading-snug">Support posts shared across learning journeys.</p>
                            </div>
                            <div className="flex-1 bg-[#F9F8F4] border border-[#ebe9e1] rounded-[20px] p-5 flex flex-col shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
                                <span className="text-xs font-bold text-gray-400 tracking-wider mb-2">SOLVED</span>
                                <span className="text-3xl font-extrabold mb-2">69+</span>
                                <p className="text-xs text-gray-500 leading-snug">Problems resolved through fast community action.</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column (Dark Card) */}
                    <div className="w-full lg:w-[440px] bg-[#162722] rounded-[32px] p-8 flex flex-col relative overflow-hidden text-white shadow-2xl">
                        {/* Gold Sphere */}
                        <div className="absolute top-6 right-6 w-16 h-16 rounded-full bg-gradient-to-br from-[#FFD166] to-[#D99A29] shadow-[0_0_30px_rgba(255,209,102,0.3)] z-10" />
                        
                        <span className="text-[10px] font-bold tracking-widest text-[#a6b8b0] uppercase mb-4 z-20">Live Product Feel</span>
                        <h2 className="text-[34px] font-bold leading-tight mb-4 z-20">
                            More than a form.<br/>
                            More like an ecosystem.
                        </h2>
                        <p className="text-[13px] text-[#9eb5aa] leading-relaxed mb-8 z-20 pr-4">
                            A polished multi-page experience inspired by product platforms, with AI summaries, trust scores, contribution signals, notifications, and leaderboard momentum built directly in HTML, CSS, JavaScript, and LocalStorage.
                        </p>

                        <div className="flex flex-col gap-3 z-20">
                            <div className="bg-[#EEEDE6] text-gray-900 rounded-2xl p-5">
                                <h3 className="font-bold text-sm mb-1">AI request intelligence</h3>
                                <p className="text-xs text-gray-600 leading-relaxed">Auto-categorization, urgency detection, tags, rewrite suggestions, and trend snapshots.</p>
                            </div>
                            <div className="bg-[#EEEDE6] text-gray-900 rounded-2xl p-5">
                                <h3 className="font-bold text-sm mb-1">Community trust graph</h3>
                                <p className="text-xs text-gray-600 leading-relaxed">Badges, helper rankings, trust score boosts, and visible contribution history.</p>
                            </div>
                            <div className="bg-[#EEEDE6] text-gray-900 rounded-2xl p-5">
                                <h3 className="font-bold text-sm mb-1">100%</h3>
                                <p className="text-xs text-gray-600 leading-relaxed">Top trust score currently active across the sample mentor network.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Core Flow Section */}
                <div className="mt-8">
                    <span className="text-[10px] font-bold tracking-widest text-[#1a8570] uppercase mb-2 block">Core Flow</span>
                    <div className="flex items-end justify-between mb-8">
                        <h2 className="text-3xl font-bold tracking-tight text-[#16211e]">From struggling alone to solving together</h2>
                        <button className="bg-white hover:bg-gray-50 text-gray-800 px-5 py-2.5 rounded-full font-medium shadow-sm text-sm transition-colors border border-gray-100">
                            Try onboarding AI
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        <div className="bg-[#FAF9F5] border border-[#ebe9e1] rounded-2xl p-6 shadow-sm">
                            <h3 className="font-bold mb-2">Ask for help clearly</h3>
                            <p className="text-xs text-gray-500 leading-relaxed">Create structured requests with category, urgency, AI suggestions, and tags that attract the right people.</p>
                        </div>
                        <div className="bg-[#FAF9F5] border border-[#ebe9e1] rounded-2xl p-6 shadow-sm">
                            <h3 className="font-bold mb-2">Discover the right people</h3>
                            <p className="text-xs text-gray-500 leading-relaxed">Use the explore feed, helper lists, notifications, and messaging to move quickly once a match happens.</p>
                        </div>
                        <div className="bg-[#FAF9F5] border border-[#ebe9e1] rounded-2xl p-6 shadow-sm">
                            <h3 className="font-bold mb-2">Track real contribution</h3>
                            <p className="text-xs text-gray-500 leading-relaxed">Trust scores, badges, solved requests, and rankings help the community recognize meaningful support.</p>
                        </div>
                    </div>
                </div>

                {/* Featured Requests Section */}
                <div className="mt-8">
                    <span className="text-[10px] font-bold tracking-widest text-[#1a8570] uppercase mb-2 block">Featured Requests</span>
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
                        <h2 className="text-3xl font-bold tracking-tight text-[#16211e]">Community problems currently in motion</h2>
                        <button className="bg-white hover:bg-gray-50 text-gray-800 px-5 py-2.5 rounded-full font-medium shadow-sm text-sm transition-colors border border-gray-100 whitespace-nowrap">
                            View full feed
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {/* Request Card 1 */}
                        <div className="bg-[#FAF9F5] border border-[#ebe9e1] rounded-3xl p-6 flex flex-col shadow-sm">
                            <div className="flex flex-wrap items-center gap-2 mb-4">
                                <span className="bg-[#e4efed] text-[#1a8570] text-[10px] font-semibold px-2.5 py-1 rounded-full">Web Development</span>
                                <span className="bg-[#feeceb] text-[#d93025] text-[10px] font-semibold px-2.5 py-1 rounded-full">High</span>
                                <span className="bg-[#e6f4ea] text-[#1e8e3e] text-[10px] font-semibold px-2.5 py-1 rounded-full">Solved</span>
                            </div>
                            <h3 className="font-bold text-[15px] mb-2 text-[#111]">Need help</h3>
                            <p className="text-xs text-gray-500 flex-1 mb-6 leading-relaxed">help n needed</p>
                            
                            <div className="flex items-center justify-between mt-auto">
                                <div className="flex flex-col">
                                    <span className="font-semibold text-xs text-gray-900">Ayesha Khan</span>
                                    <span className="text-[10px] text-gray-500">Karachi • 1 helper interested</span>
                                </div>
                                <button className="bg-white hover:bg-gray-50 text-gray-800 px-4 py-2 rounded-full text-xs font-semibold shadow-sm border border-gray-100">
                                    Open details
                                </button>
                            </div>
                        </div>

                        {/* Request Card 2 */}
                        <div className="bg-[#FAF9F5] border border-gray-200/50 rounded-3xl p-6 flex flex-col shadow-sm ring-1 ring-black/5">
                            <div className="flex flex-wrap items-center gap-2 mb-4">
                                <span className="bg-[#e4efed] text-[#1a8570] text-[10px] font-semibold px-2.5 py-1 rounded-full">Web Development</span>
                                <span className="bg-[#feeceb] text-[#d93025] text-[10px] font-semibold px-2.5 py-1 rounded-full">High</span>
                                <span className="bg-[#e6f4ea] text-[#1e8e3e] text-[10px] font-semibold px-2.5 py-1 rounded-full">Solved</span>
                            </div>
                            <h3 className="font-bold text-[15px] mb-2 text-[#111] leading-snug">Need help making my portfolio responsive before demo day</h3>
                            <p className="text-xs text-gray-500 mb-4 leading-relaxed">My HTML/CSS portfolio breaks on tablets and I need layout guidance before tomorrow evening.</p>
                            
                            <div className="flex flex-wrap items-center gap-2 mb-6">
                                <span className="bg-[#EBEEEB] text-gray-600 text-[10px] font-medium px-2.5 py-1 rounded-full">HTML/CSS</span>
                                <span className="bg-[#EBEEEB] text-gray-600 text-[10px] font-medium px-2.5 py-1 rounded-full">Responsive</span>
                                <span className="bg-[#EBEEEB] text-gray-600 text-[10px] font-medium px-2.5 py-1 rounded-full">Portfolio</span>
                            </div>

                            <div className="flex items-center justify-between mt-auto">
                                <div className="flex flex-col">
                                    <span className="font-semibold text-xs text-gray-900">Sara Noor</span>
                                    <span className="text-[10px] text-gray-500">Karachi • 1 helper interested</span>
                                </div>
                                <button className="bg-white hover:bg-gray-50 text-gray-800 px-4 py-2 rounded-full text-xs font-semibold shadow-sm border border-gray-100">
                                    Open details
                                </button>
                            </div>
                        </div>

                        {/* Request Card 3 */}
                        <div className="bg-[#FAF9F5] border border-[#ebe9e1] rounded-3xl p-6 flex flex-col shadow-sm ring-1 ring-black/5">
                            <div className="flex flex-wrap items-center gap-2 mb-4">
                                <span className="bg-[#e8f0fe] text-[#1967d2] text-[10px] font-semibold px-2.5 py-1 rounded-full">Design</span>
                                <span className="bg-[#fef7e0] text-[#b06000] text-[10px] font-semibold px-2.5 py-1 rounded-full">Medium</span>
                                <span className="bg-white border border-gray-200 text-gray-600 text-[10px] font-semibold px-2.5 py-1 rounded-full">Open</span>
                            </div>
                            <h3 className="font-bold text-[15px] mb-2 text-[#111] leading-snug">Looking for Figma feedback on a volunteer event poster</h3>
                            <p className="text-xs text-gray-500 mb-4 leading-relaxed">I have a draft poster for a campus community event and want sharper hierarchy, spacing, and CTA copy.</p>
                            
                            <div className="flex flex-wrap items-center gap-2 mb-6">
                                <span className="bg-[#EBEEEB] text-gray-600 text-[10px] font-medium px-2.5 py-1 rounded-full">Figma</span>
                                <span className="bg-[#EBEEEB] text-gray-600 text-[10px] font-medium px-2.5 py-1 rounded-full">Poster</span>
                                <span className="bg-[#EBEEEB] text-gray-600 text-[10px] font-medium px-2.5 py-1 rounded-full">Design Review</span>
                            </div>

                            <div className="flex items-center justify-between mt-auto">
                                <div className="flex flex-col">
                                    <span className="font-semibold text-xs text-gray-900">Ayesha Khan</span>
                                    <span className="text-[10px] text-gray-500">Lahore • 1 helper interested</span>
                                </div>
                                <button className="bg-white hover:bg-gray-50 text-gray-800 px-4 py-2 rounded-full text-xs font-semibold shadow-sm border border-gray-100">
                                    Open details
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-8 pb-12 text-[11px] text-gray-400">
                    HelpHub AI is built as a premium-feel, multi-page community support product using HTML, CSS, JavaScript, and LocalStorage.
                </div>
            </div>
        </div>
    );
};

export default Landing;
