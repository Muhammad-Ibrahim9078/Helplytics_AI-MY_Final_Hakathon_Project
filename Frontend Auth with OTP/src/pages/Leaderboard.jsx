import React from 'react';
import Navbar from '../components/Navbar';

const Leaderboard = () => {
    // const navigate = useNavigate();

    const rankings = [
        {
            id: 1,
            rank: "#1 Ayesha Khan",
            skills: "Figma, UI/UX, HTML/CSS",
            percentage: "100%",
            contributions: "35 contributions",
            initials: "AK",
            color: "bg-indigo-500"
        },
        {
            id: 2,
            rank: "#2 Hassan Ali",
            skills: "JavaScript, React, Git/GitHub",
            percentage: "88%",
            contributions: "24 contributions",
            initials: "HA",
            color: "bg-[#162722]"
        },
        {
            id: 3,
            rank: "#3 Sara Noor",
            skills: "Python, Data Analysis",
            percentage: "74%",
            contributions: "11 contributions",
            initials: "SN",
            color: "bg-orange-500"
        }
    ];

    const achievements = [
        {
            name: "Ayesha Khan",
            badges: "Design Ally • Fast Responder",
            progress: 100
        },
        {
            name: "Hassan Ali",
            badges: "Code Rescuer • Bug Hunter",
            progress: 88
        },
        {
            name: "Sara Noor",
            badges: "Community Voice",
            progress: 74
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
                        LEADERBOARD
                    </span>
                    <h1 className="text-4xl md:text-[44px] font-extrabold leading-[1.1] mb-3 tracking-tight max-w-[800px]">
                        Recognize the people who keep the community moving.
                    </h1>
                    <p className="text-[#a4b5ac] text-[15px] mt-2">
                        Trust score, contribution count, and badges create visible momentum for reliable helpers.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-6">
                    
                    {/* Left Rankings Card */}
                    <div className="flex-1 bg-[#FAF9F5] rounded-[32px] p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#ebe9e1] flex flex-col">
                        <span className="text-[#1a8570] text-[11px] font-bold tracking-[0.15em] uppercase mb-4 block">
                            TOP HELPERS
                        </span>
                        <h2 className="text-[32px] md:text-[38px] font-bold leading-tight mb-8 tracking-tight text-[#111]">
                            Rankings
                        </h2>

                        <div className="flex flex-col gap-4">
                            {rankings.map((user) => (
                                <div key={user.id} className="bg-white border border-gray-100 rounded-2xl p-5 flex items-center justify-between gap-4 shadow-sm">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 rounded-full ${user.color} flex items-center justify-center text-white font-bold text-xs shadow-sm`}>
                                            {user.initials}
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <h3 className="font-bold text-[15px] text-[#111]">{user.rank}</h3>
                                            <p className="text-[12px] text-gray-400 font-medium">{user.skills}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <span className="font-bold text-[15px] text-[#111]">{user.percentage}</span>
                                        <span className="text-[11px] text-gray-400">{user.contributions}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Achievement Card */}
                    <div className="flex-1 bg-[#FAF9F5] rounded-[32px] p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#ebe9e1] flex flex-col">
                        <span className="text-[#1a8570] text-[11px] font-bold tracking-[0.15em] uppercase mb-4 block">
                            BADGE SYSTEM
                        </span>
                        <h2 className="text-[32px] md:text-[38px] font-bold leading-tight mb-8 tracking-tight text-[#111]">
                            Trust and achievement
                        </h2>

                        <div className="flex flex-col gap-6">
                            {achievements.map((item, idx) => (
                                <div key={idx} className="flex flex-col gap-4">
                                    <div className="flex flex-col gap-1">
                                        <h3 className="font-bold text-[16px] text-[#111]">{item.name}</h3>
                                        <p className="text-[13px] text-gray-400 font-medium">{item.badges}</p>
                                    </div>
                                    <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                                        <div 
                                            className="h-full bg-gradient-to-r from-orange-400 to-[#1a8570] transition-all duration-1000 ease-out"
                                            style={{ width: `${item.progress}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Leaderboard;
