import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getData } from '../context/UserContext';

const RequestDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const contextData = getData() || {};
    const currentUser = contextData.user;
    const [request, setRequest] = useState(null);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);

    useEffect(() => {
        fetchRequest();
    }, [id]);

    const fetchRequest = async () => {
        try {
            const res = await axios.get(`http://localhost:8000/api/requests/${id}`);
            if (res.data.success) setRequest(res.data.data);
        } catch (error) {
            console.error("Failed to fetch request:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleOfferHelp = async () => {
        setActionLoading(true);
        try {
            const token = localStorage.getItem("accessToken");
            const res = await axios.put(`http://localhost:8000/api/requests/${id}/help`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.data.success) {
                toast.success("You offered to help!");
                setRequest(res.data.data);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to offer help");
        } finally {
            setActionLoading(false);
        }
    };

    const handleMarkSolved = async () => {
        setActionLoading(true);
        try {
            const token = localStorage.getItem("accessToken");
            const res = await axios.put(`http://localhost:8000/api/requests/${id}/solve`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.data.success) {
                toast.success("Request marked as solved!");
                fetchRequest();
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to mark as solved");
        } finally {
            setActionLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#F4F2EB' }}>
                <Navbar />
                <div className="flex-1 flex items-center justify-center">
                    <div className="animate-spin w-10 h-10 border-4 border-[#1a8570] border-t-transparent rounded-full"></div>
                </div>
            </div>
        );
    }

    if (!request) {
        return (
            <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#F4F2EB' }}>
                <Navbar />
                <div className="flex-1 flex items-center justify-center">
                    <h2 className="text-2xl font-bold text-gray-400">Request not found</h2>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen relative overflow-hidden font-sans text-gray-900 flex flex-col" style={{ backgroundColor: '#F4F2EB' }}>
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-100/40 blur-[120px] pointer-events-none" />
            <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-orange-100/40 blur-[120px] pointer-events-none" />

            <Navbar />

            <div className="relative z-10 w-full max-w-[1100px] mx-auto px-6 flex-1 flex flex-col pb-12">

                {/* Hero */}
                <div className="w-full bg-[#162722] rounded-[32px] p-8 md:p-12 mb-6 text-white shadow-xl flex flex-col justify-center">
                    <div className="flex gap-2 mb-4">
                        <span className="bg-[#e4efed]/10 text-[#1a8570] text-[10px] font-bold px-3 py-1 rounded-full border border-[#1a8570]/30">{request.category}</span>
                        <span className="bg-[#e4efed]/10 text-[#1a8570] text-[10px] font-bold px-3 py-1 rounded-full border border-[#1a8570]/30">{request.urgency}</span>
                        <span className="bg-[#e4efed]/10 text-[#1a8570] text-[10px] font-bold px-3 py-1 rounded-full border border-[#1a8570]/30">{request.status}</span>
                    </div>
                    <span className="text-[#a4b5ac] text-[11px] font-bold tracking-widest uppercase mb-4 block">REQUEST DETAIL</span>
                    <h1 className="text-3xl md:text-[44px] font-extrabold leading-[1.1] mb-4 tracking-tight max-w-[850px]">{request.title}</h1>
                    <p className="text-[#a4b5ac] text-[15px] mt-2 max-w-[700px]">{request.description}</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                    {/* Left */}
                    <div className="lg:col-span-7 flex flex-col gap-6">
                        {/* AI Summary */}
                        <div className="bg-[#FAF9F5] rounded-[32px] p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#ebe9e1] flex flex-col h-full min-h-[250px]">
                            <span className="text-[#1a8570] text-[11px] font-bold tracking-[0.15em] uppercase mb-4 block">AI SUMMARY</span>
                            <p className="text-[17px] font-medium text-[#111] leading-relaxed mb-8">
                                {request.aiSummary || "No AI summary available for this request."}
                            </p>
                            <div className="flex flex-wrap gap-2 mt-auto">
                                {(request.aiTags || request.tags || []).map((tag, idx) => (
                                    <span key={idx} className="bg-[#E9F0EC] text-[#1a8570] text-[11px] font-bold px-4 py-2 rounded-full">{tag}</span>
                                ))}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="bg-[#FAF9F5] rounded-[32px] p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#ebe9e1] flex flex-col">
                            <span className="text-[#1a8570] text-[11px] font-bold tracking-[0.15em] uppercase mb-4 block">ACTIONS</span>
                            <div className="flex flex-wrap gap-4">
                                <button onClick={handleOfferHelp} disabled={actionLoading || request.status === "Solved"}
                                    className="bg-[#1a8570] hover:bg-[#156d5b] text-white px-8 py-3.5 rounded-full font-bold text-[14px] shadow-sm transition-all active:scale-[0.98] disabled:opacity-50">
                                    I can help
                                </button>
                                <button onClick={handleMarkSolved} disabled={actionLoading || request.status === "Solved"}
                                    className="bg-white hover:bg-gray-50 text-gray-800 px-8 py-3.5 border border-gray-200 rounded-full font-bold text-[14px] shadow-sm transition-all active:scale-[0.98] disabled:opacity-50">
                                    Mark as solved
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right */}
                    <div className="lg:col-span-5 flex flex-col gap-6">
                        {/* Requester */}
                        <div className="bg-[#FAF9F5] rounded-[32px] p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#ebe9e1] flex flex-col">
                            <span className="text-[#1a8570] text-[11px] font-bold tracking-[0.15em] uppercase mb-4 block">REQUESTER</span>
                            <div className="flex items-center justify-between w-full">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                                        {request.author?.username?.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) || "??"}
                                    </div>
                                    <div className="flex flex-col">
                                        <h3 className="font-bold text-[16px] text-[#111]">{request.author?.username || "Unknown"}</h3>
                                        <p className="text-[13px] text-gray-400 font-medium">{request.author?.location || "Remote"}</p>
                                    </div>
                                </div>
                                {currentUser && request.author?._id !== currentUser._id && (
                                    <button onClick={() => navigate('/messages', { state: { recipient: request.author?.username } })}
                                        className="text-[11px] font-bold bg-[#1a8570]/10 text-[#1a8570] px-4 py-2 rounded-full hover:bg-[#1a8570]/20 transition-colors shadow-sm">
                                        Message
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Helpers */}
                        <div className="bg-[#FAF9F5] rounded-[32px] p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#ebe9e1] flex flex-col">
                            <span className="text-[#1a8570] text-[11px] font-bold tracking-[0.15em] uppercase mb-4 block">HELPERS</span>
                            <h2 className="text-[20px] font-bold text-[#111] mb-6 tracking-tight">People ready to support</h2>

                            {request.helpers && request.helpers.length > 0 ? (
                                <div className="flex flex-col gap-4">
                                    {request.helpers.map((helper) => (
                                        <div key={helper._id} className="bg-white border border-gray-100 rounded-[24px] p-4 flex items-center justify-between shadow-sm">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-[10px]">
                                                    {helper.username?.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) || "??"}
                                                </div>
                                                <div className="flex flex-col">
                                                    <h4 className="font-bold text-[14px] text-[#111]">{helper.username}</h4>
                                                    <p className="text-[11px] text-gray-400 font-medium">{helper.skills?.join(", ") || "No skills listed"}</p>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-end gap-2">
                                                <div className="bg-[#e4efed] px-3 py-1.5 rounded-xl">
                                                    <span className="text-[#1a8570] text-[10px] font-bold whitespace-nowrap">Trust {helper.trustScore || 0}%</span>
                                                </div>
                                                {currentUser && helper._id !== currentUser._id && (
                                                    <button onClick={() => navigate('/messages', { state: { recipient: helper.username } })}
                                                        className="text-[10px] font-bold bg-gray-900 text-white px-3 py-1.5 rounded-lg hover:bg-black transition-colors shadow-sm">
                                                        Chat
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-400 text-[14px]">No helpers yet. Be the first to offer!</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RequestDetail;
