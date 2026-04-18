import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';

const AiCenter = () => {
    const [stats, setStats] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAIData();
    }, []);

    const fetchAIData = async () => {
        try {
            const token = localStorage.getItem("accessToken");
            const headers = { Authorization: `Bearer ${token}` };

            const [insightRes, recRes] = await Promise.all([
                axios.get("http://localhost:8000/api/ai-center/insights", { headers }),
                axios.get("http://localhost:8000/api/ai-center/recommendations", { headers })
            ]);

            if (insightRes.data.success) {
                const d = insightRes.data.data;
                setStats([d.trendPulse, d.urgencyWatch, d.mentorPool]);
            }
            if (recRes.data.success) setRecommendations(recRes.data.data);
        } catch (error) {
            console.error("Failed to fetch AI Center data:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen relative overflow-hidden font-sans text-gray-900 flex flex-col" style={{ backgroundColor: '#F4F2EB' }}>
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-100/40 blur-[120px] pointer-events-none" />
            <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-orange-100/40 blur-[120px] pointer-events-none" />

            <Navbar />

            <div className="relative z-10 w-full max-w-[1100px] mx-auto px-6 flex-1 flex flex-col pb-12">
                
                <div className="w-full bg-[#162722] rounded-[32px] p-8 md:p-12 mb-6 text-white shadow-xl flex flex-col justify-center">
                    <span className="text-[#a4b5ac] text-[11px] font-bold tracking-widest uppercase mb-4 block">AI CENTER</span>
                    <h1 className="text-4xl md:text-[44px] font-extrabold leading-[1.1] mb-3 tracking-tight max-w-[800px]">
                        See what the platform intelligence is noticing.
                    </h1>
                    <p className="text-[#a4b5ac] text-[15px] mt-2">
                        AI-like insights summarize demand trends, helper readiness, urgency signals, and request recommendations.
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin w-10 h-10 border-4 border-[#1a8570] border-t-transparent rounded-full"></div>
                    </div>
                ) : (
                    <>
                        {/* Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            {stats.map((stat, index) => (
                                <div key={index} className="bg-[#FAF9F5] rounded-[32px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#ebe9e1] flex flex-col h-full min-h-[180px]">
                                    <span className="text-[#1a8570] text-[11px] font-bold tracking-[0.15em] uppercase mb-4 block">{stat.tag}</span>
                                    <h2 className="text-[28px] font-bold leading-tight mb-3 tracking-tight text-[#111]">{stat.value}</h2>
                                    <p className="text-[13px] text-gray-400 font-medium leading-relaxed">{stat.desc}</p>
                                </div>
                            ))}
                        </div>

                        {/* Recommendations */}
                        <div className="bg-[#FAF9F5] rounded-[32px] p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#ebe9e1] flex flex-col">
                            <span className="text-[#1a8570] text-[11px] font-bold tracking-[0.15em] uppercase mb-4 block">AI RECOMMENDATIONS</span>
                            <h2 className="text-[32px] md:text-[38px] font-bold leading-tight mb-10 tracking-tight text-[#111]">Requests needing attention</h2>

                            {recommendations.length === 0 ? (
                                <p className="text-gray-400 text-center py-10">No open requests needing attention right now.</p>
                            ) : (
                                <div className="flex flex-col gap-4">
                                    {recommendations.map((rec) => (
                                        <div key={rec.id} className="bg-white border border-gray-100 rounded-[24px] p-6 md:p-8 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow">
                                            <h3 className="font-bold text-[17px] text-[#111] tracking-tight">{rec.title}</h3>
                                            <p className="text-[14px] text-gray-500 leading-relaxed font-medium">{rec.aiSummary}</p>
                                            <div className="flex flex-wrap items-center gap-2.5 mt-2">
                                                {(rec.tags || []).map((tag, idx) => (
                                                    <span key={idx} className={`${tag.color} text-[10px] font-bold px-3 py-1.5 rounded-full`}>{tag.label}</span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default AiCenter;
