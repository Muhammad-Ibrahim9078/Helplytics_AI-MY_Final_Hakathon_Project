import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        try {
            const token = localStorage.getItem("accessToken");
            const res = await axios.get("http://localhost:8000/api/notifications", {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.data.success) setNotifications(res.data.data);
        } catch (error) {
            console.error("Failed to fetch notifications:", error);
        } finally {
            setLoading(false);
        }
    };

    const markAllRead = async () => {
        try {
            const token = localStorage.getItem("accessToken");
            await axios.put("http://localhost:8000/api/notifications/read-all", {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setNotifications(prev => prev.map(n => ({ ...n, read: true })));
        } catch (error) {
            console.error("Failed to mark all as read:", error);
        }
    };

    const getTimeAgo = (dateStr) => {
        const diff = Date.now() - new Date(dateStr).getTime();
        const mins = Math.floor(diff / 60000);
        if (mins < 1) return "Just now";
        if (mins < 60) return `${mins} min ago`;
        const hrs = Math.floor(mins / 60);
        if (hrs < 24) return `${hrs} hr ago`;
        return `${Math.floor(hrs / 24)}d ago`;
    };

    return (
        <div className="min-h-screen relative overflow-hidden font-sans text-gray-900 flex flex-col" style={{ backgroundColor: '#F4F2EB' }}>
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-100/40 blur-[120px] pointer-events-none" />
            <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-orange-100/40 blur-[120px] pointer-events-none" />

            <Navbar />

            <div className="relative z-10 w-full max-w-[1100px] mx-auto px-6 flex-1 flex flex-col pb-12">
                
                <div className="w-full bg-[#162722] rounded-[32px] p-8 md:p-12 mb-6 text-white shadow-xl flex flex-col justify-center">
                    <span className="text-[#a4b5ac] text-[11px] font-bold tracking-widest uppercase mb-4 block">NOTIFICATIONS</span>
                    <h1 className="text-4xl md:text-[44px] font-extrabold leading-[1.1] mb-3 tracking-tight max-w-[800px]">
                        Stay updated on requests, helpers, and trust signals.
                    </h1>
                </div>

                <div className="bg-[#FAF9F5] rounded-[32px] p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#ebe9e1] flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-[#1a8570] text-[11px] font-bold tracking-[0.15em] uppercase block">LIVE UPDATES</span>
                        {notifications.some(n => !n.read) && (
                            <button onClick={markAllRead} className="text-[12px] text-[#1a8570] font-bold hover:underline">Mark all as read</button>
                        )}
                    </div>
                    <h2 className="text-[32px] md:text-[38px] font-bold leading-tight mb-10 tracking-tight text-[#111]">Notification feed</h2>

                    {loading ? (
                        <div className="flex justify-center py-10">
                            <div className="animate-spin w-8 h-8 border-4 border-[#1a8570] border-t-transparent rounded-full"></div>
                        </div>
                    ) : notifications.length === 0 ? (
                        <p className="text-gray-400 text-center py-10">No notifications yet.</p>
                    ) : (
                        <div className="flex flex-col gap-3">
                            {notifications.map((notif) => (
                                <div key={notif._id} className="bg-white border border-gray-100 rounded-[20px] p-5 md:p-6 flex items-center justify-between gap-6 shadow-sm hover:shadow-md transition-all group">
                                    <div className="flex flex-col gap-1.5 flex-1">
                                        <h3 className="font-bold text-[15.5px] text-[#111] leading-snug group-hover:text-[#1a8570] transition-colors">
                                            {notif.title}
                                        </h3>
                                        <p className="text-[12.5px] text-gray-400 font-medium">
                                            {notif.category} • {getTimeAgo(notif.createdAt)}
                                        </p>
                                    </div>
                                    <div className="shrink-0">
                                        <span className={`text-[11px] font-bold px-3 py-1.5 rounded-lg border ${
                                            !notif.read
                                            ? "bg-white border-gray-200 text-[#111]" 
                                            : "bg-gray-50 border-transparent text-gray-400"
                                        }`}>
                                            {notif.read ? "Read" : "Unread"}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Notifications;
