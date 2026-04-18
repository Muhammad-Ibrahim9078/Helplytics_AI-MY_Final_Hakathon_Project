import React from 'react';
import Navbar from '../components/Navbar';

const Notifications = () => {
    // const navigate = useNavigate();

    const notifications = [
        {
            id: 1,
            title: "\"Need help\" was marked as solved",
            category: "Status",
            time: "Just now",
            status: "Unread"
        },
        {
            id: 2,
            title: "Ayesha Khan offered help on \"Need help\"",
            category: "Match",
            time: "Just now",
            status: "Unread"
        },
        {
            id: 3,
            title: "Your request \"Need help\" is now live in the community feed",
            category: "Request",
            time: "Just now",
            status: "Unread"
        },
        {
            id: 4,
            title: "\"Need help making my portfolio responsive before demo day\" was marked as solved",
            category: "Status",
            time: "Just now",
            status: "Unread"
        },
        {
            id: 5,
            title: "\"Need help making my portfolio responsive before demo day\" was marked as solved",
            category: "Status",
            time: "Just now",
            status: "Unread"
        },
        {
            id: 6,
            title: "\"Need help making my portfolio responsive before demo day\" was marked as solved",
            category: "Status",
            time: "Just now",
            status: "Unread"
        },
        {
            id: 7,
            title: "New helper matched to your responsive portfolio request",
            category: "Match",
            time: "12 min ago",
            status: "Unread"
        },
        {
            id: 8,
            title: "Your trust score increased after a solved request",
            category: "Reputation",
            time: "1 hr ago",
            status: "Unread"
        },
        {
            id: 9,
            title: "AI Center detected rising demand for interview prep",
            category: "Insight",
            time: "Today",
            status: "Read"
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
                        NOTIFICATIONS
                    </span>
                    <h1 className="text-4xl md:text-[44px] font-extrabold leading-[1.1] mb-3 tracking-tight max-w-[800px]">
                        Stay updated on requests, helpers, and trust signals.
                    </h1>
                </div>

                {/* Notification Feed Card */}
                <div className="bg-[#FAF9F5] rounded-[32px] p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#ebe9e1] flex flex-col">
                    <span className="text-[#1a8570] text-[11px] font-bold tracking-[0.15em] uppercase mb-4 block">
                        LIVE UPDATES
                    </span>
                    <h2 className="text-[32px] md:text-[38px] font-bold leading-tight mb-10 tracking-tight text-[#111]">
                        Notification feed
                    </h2>

                    <div className="flex flex-col gap-3">
                        {notifications.map((notif) => (
                            <div key={notif.id} className="bg-white border border-gray-100 rounded-[20px] p-5 md:p-6 flex items-center justify-between gap-6 shadow-sm hover:shadow-md transition-all group">
                                <div className="flex flex-col gap-1.5 flex-1">
                                    <h3 className="font-bold text-[15.5px] text-[#111] leading-snug group-hover:text-[#1a8570] transition-colors">
                                        {notif.title}
                                    </h3>
                                    <p className="text-[12.5px] text-gray-400 font-medium">
                                        {notif.category} • {notif.time}
                                    </p>
                                </div>
                                <div className="shrink-0">
                                    <span className={`text-[11px] font-bold px-3 py-1.5 rounded-lg border ${
                                        notif.status === "Unread" 
                                        ? "bg-white border-gray-200 text-[#111]" 
                                        : "bg-gray-50 border-transparent text-gray-400"
                                    }`}>
                                        {notif.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Notifications;
