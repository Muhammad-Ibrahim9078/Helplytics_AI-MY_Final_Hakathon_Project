import React from 'react';
import Navbar from '../components/Navbar';

const AiCenter = () => {
    // const navigate = useNavigate();

    const stats = [
        {
            tag: "TREND PULSE",
            value: "Web Development",
            desc: "Most common support area based on active community requests."
        },
        {
            tag: "URGENCY WATCH",
            value: "2",
            desc: "Requests currently flagged high priority by the urgency detector."
        },
        {
            tag: "MENTOR POOL",
            value: "2",
            desc: "Trusted helpers with strong response history and contribution signals."
        }
    ];

    const recommendations = [
        {
            id: 1,
            title: "Need help",
            aiSummary: "AI summary: Web Development request with high urgency. Best suited for members with relevant expertise.",
            tags: [
                { label: "Web Development", color: "bg-[#e4efed] text-[#1a8570]" },
                { label: "High", color: "bg-[#feeceb] text-[#d93025]" }
            ]
        },
        {
            id: 2,
            title: "Need help making my portfolio responsive before demo day",
            aiSummary: "Responsive layout issue with a short deadline. Best helpers are frontend mentors comfortable with CSS grids and media queries.",
            tags: [
                { label: "Web Development", color: "bg-[#e4efed] text-[#1a8570]" },
                { label: "High", color: "bg-[#feeceb] text-[#d93025]" }
            ]
        },
        {
            id: 3,
            title: "Looking for Figma feedback on a volunteer event poster",
            aiSummary: "A visual design critique request where feedback on hierarchy, spacing, and messaging would create the most value.",
            tags: [
                { label: "Design", color: "bg-[#e8f0fe] text-[#1967d2]" },
                { label: "Medium", color: "bg-[#fef7e0] text-[#b06000]" }
            ]
        },
        {
            id: 4,
            title: "Need mock interview support for internship applications",
            aiSummary: "Career coaching request focused on confidence-building, behavioral answers, and entry-level frontend interviews.",
            tags: [
                { label: "Career", color: "bg-gray-100 text-gray-600" },
                { label: "Low", color: "bg-[#e6f4ea] text-[#1e8e3e]" }
            ]
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
                    <span className="text-[#a4b5ac] text-[11px] font-bold tracking-widest uppercase mb-4 block">
                        AI CENTER
                    </span>
                    <h1 className="text-4xl md:text-[44px] font-extrabold leading-[1.1] mb-3 tracking-tight max-w-[800px]">
                        See what the platform intelligence is noticing.
                    </h1>
                    <p className="text-[#a4b5ac] text-[15px] mt-2">
                        AI-like insights summarize demand trends, helper readiness, urgency signals, and request recommendations.
                    </p>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-[#FAF9F5] rounded-[32px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#ebe9e1] flex flex-col h-full min-h-[180px]">
                            <span className="text-[#1a8570] text-[11px] font-bold tracking-[0.15em] uppercase mb-4 block">
                                {stat.tag}
                            </span>
                            <h2 className="text-[28px] font-bold leading-tight mb-3 tracking-tight text-[#111]">
                                {stat.value}
                            </h2>
                            <p className="text-[13px] text-gray-400 font-medium leading-relaxed">
                                {stat.desc}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Recommendations Section */}
                <div className="bg-[#FAF9F5] rounded-[32px] p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#ebe9e1] flex flex-col">
                    <span className="text-[#1a8570] text-[11px] font-bold tracking-[0.15em] uppercase mb-4 block">
                        AI RECOMMENDATIONS
                    </span>
                    <h2 className="text-[32px] md:text-[38px] font-bold leading-tight mb-10 tracking-tight text-[#111]">
                        Requests needing attention
                    </h2>

                    <div className="flex flex-col gap-4">
                        {recommendations.map((rec) => (
                            <div key={rec.id} className="bg-white border border-gray-100 rounded-[24px] p-6 md:p-8 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow">
                                <h3 className="font-bold text-[17px] text-[#111] tracking-tight">{rec.title}</h3>
                                <p className="text-[14px] text-gray-500 leading-relaxed font-medium">
                                    {rec.aiSummary}
                                </p>
                                <div className="flex flex-wrap items-center gap-2.5 mt-2">
                                    {rec.tags.map((tag, idx) => (
                                        <span key={idx} className={`${tag.color} text-[10px] font-bold px-3 py-1.5 rounded-full`}>
                                            {tag.label}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AiCenter;
