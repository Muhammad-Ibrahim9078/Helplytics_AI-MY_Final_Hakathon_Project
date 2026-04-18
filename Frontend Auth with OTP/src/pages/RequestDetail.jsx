import React from 'react';
import Navbar from '../components/Navbar';
import { useParams } from 'react-router-dom';


const RequestDetail = () => {
    // const navigate = useNavigate();
    const { id } = useParams();

    const helpers = [
        {
            id: 1,
            name: "Ayesha Khan",
            skills: "Figma, UI/UX, HTML/CSS",
            trust: "100%",
            initials: "AK",
            color: "bg-orange-500"
        },
        {
            id: 2,
            name: "Hassan Ali",
            skills: "JavaScript, React, Git/GitHub",
            trust: "88%",
            initials: "HA",
            color: "bg-orange-500"
        }
    ];

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
                    <div className="flex gap-2 mb-4">
                        <span className="bg-[#e4efed]/10 text-[#1a8570] text-[10px] font-bold px-3 py-1 rounded-full border border-[#1a8570]/30">Career</span>
                        <span className="bg-[#e4efed]/10 text-[#1a8570] text-[10px] font-bold px-3 py-1 rounded-full border border-[#1a8570]/30">Low</span>
                        <span className="bg-[#e4efed]/10 text-[#1a8570] text-[10px] font-bold px-3 py-1 rounded-full border border-[#1a8570]/30">Solved</span>
                    </div>
                    <span className="text-[#a4b5ac] text-[11px] font-bold tracking-widest uppercase mb-4 block">
                        REQUEST DETAIL
                    </span>
                    <h1 className="text-3xl md:text-[44px] font-extrabold leading-[1.1] mb-4 tracking-tight max-w-[850px]">
                        Need mock interview support for internship applications
                    </h1>
                    <p className="text-[#a4b5ac] text-[15px] mt-2 max-w-[700px]">
                        Applying to frontend internships and need someone to practice behavioral and technical interview questions with me.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    
                    {/* Left Column (8 cols) */}
                    <div className="lg:col-span-7 flex flex-col gap-6">
                        
                        {/* AI Summary Card */}
                        <div className="bg-[#FAF9F5] rounded-[32px] p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#ebe9e1] flex flex-col h-full min-h-[250px]">
                            <span className="text-[#1a8570] text-[11px] font-bold tracking-[0.15em] uppercase mb-4 block">
                                AI SUMMARY
                            </span>
                            <p className="text-[17px] font-medium text-[#111] leading-relaxed mb-8">
                                entry-level frontend interviews.
                            </p>
                            <div className="flex flex-wrap gap-2 mt-auto">
                                <span className="bg-[#E9F0EC] text-[#1a8570] text-[11px] font-bold px-4 py-2 rounded-full">Interview Prep</span>
                                <span className="bg-[#E9F0EC] text-[#1a8570] text-[11px] font-bold px-4 py-2 rounded-full">Career</span>
                                <span className="bg-[#E9F0EC] text-[#1a8570] text-[11px] font-bold px-4 py-2 rounded-full">Frontend</span>
                            </div>
                        </div>

                        {/* Actions Card */}
                        <div className="bg-[#FAF9F5] rounded-[32px] p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#ebe9e1] flex flex-col">
                            <span className="text-[#1a8570] text-[11px] font-bold tracking-[0.15em] uppercase mb-4 block">
                                ACTIONS
                            </span>
                            <div className="flex flex-wrap gap-4">
                                <button className="bg-[#1a8570] hover:bg-[#156d5b] text-white px-8 py-3.5 rounded-full font-bold text-[14px] shadow-sm transition-all active:scale-[0.98]">
                                    I can help
                                </button>
                                <button className="bg-white hover:bg-gray-50 text-gray-800 px-8 py-3.5 border border-gray-200 rounded-full font-bold text-[14px] shadow-sm transition-all active:scale-[0.98]">
                                    Mark as solved
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Column (5 cols) */}
                    <div className="lg:col-span-5 flex flex-col gap-6">
                        
                        {/* Requester Card */}
                        <div className="bg-[#FAF9F5] rounded-[32px] p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#ebe9e1] flex flex-col">
                            <span className="text-[#1a8570] text-[11px] font-bold tracking-[0.15em] uppercase mb-4 block">
                                REQUESTER
                            </span>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xs">SN</div>
                                <div className="flex flex-col">
                                    <h3 className="font-bold text-[16px] text-[#111]">Sara Noor</h3>
                                    <p className="text-[13px] text-gray-400 font-medium">Karachi, Pakistan</p>
                                </div>
                            </div>
                        </div>

                        {/* Helpers Card */}
                        <div className="bg-[#FAF9F5] rounded-[32px] p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#ebe9e1] flex flex-col">
                            <span className="text-[#1a8570] text-[11px] font-bold tracking-[0.15em] uppercase mb-4 block">
                                HELPERS
                            </span>
                            <h2 className="text-[20px] font-bold text-[#111] mb-6 tracking-tight">People ready to support</h2>
                            
                            <div className="flex flex-col gap-4">
                                {helpers.map((helper) => (
                                    <div key={helper.id} className="bg-white border border-gray-100 rounded-[24px] p-4 flex items-center justify-between shadow-sm">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-10 h-10 ${helper.color} rounded-full flex items-center justify-center text-white font-bold text-[10px]`}>
                                                {helper.initials}
                                            </div>
                                            <div className="flex flex-col">
                                                <h4 className="font-bold text-[14px] text-[#111]">{helper.name}</h4>
                                                <p className="text-[11px] text-gray-400 font-medium">{helper.skills}</p>
                                            </div>
                                        </div>
                                        <div className="bg-[#e4efed] px-3 py-1.5 rounded-xl">
                                            <span className="text-[#1a8570] text-[10px] font-bold whitespace-nowrap">Trust {helper.trust}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default RequestDetail;
