import React, { useState } from 'react';
import Navbar from '../components/Navbar';

const Messages = () => {
    // const navigate = useNavigate();

    const [formData, setFormData] = useState({
        to: 'Ayesha Khan',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle send logic
    };

    const recentMessages = [
        {
            id: 1,
            from: "Ayesha Khan",
            to: "Sara Noor",
            preview: "I checked your portfolio request. Share the breakpoint screenshots and I can suggest fixes.",
            time: "09:45 AM"
        },
        {
            id: 2,
            from: "Hassan Ali",
            to: "Ayesha Khan",
            preview: "Your event poster concept is solid. I would tighten the CTA and reduce the background texture.",
            time: "11:10 AM"
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
                        INTERACTION / MESSAGING
                    </span>
                    <h1 className="text-4xl md:text-[44px] font-extrabold leading-[1.1] mb-3 tracking-tight max-w-[800px]">
                        Keep support moving through direct communication.
                    </h1>
                    <p className="text-[#a4b5ac] text-[15px] mt-2">
                        Basic messaging gives helpers and requesters a clear follow-up path once a match happens.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-6">
                    
                    {/* Left Conversation Card */}
                    <div className="flex-[1.2] bg-[#FAF9F5] rounded-[32px] p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#ebe9e1] flex flex-col">
                        <span className="text-[#1a8570] text-[11px] font-bold tracking-[0.15em] uppercase mb-4 block">
                            CONVERSATION STREAM
                        </span>
                        <h2 className="text-[32px] md:text-[38px] font-bold leading-tight mb-8 tracking-tight text-[#111]">
                            Recent messages
                        </h2>

                        <div className="flex flex-col gap-4">
                            {recentMessages.map((msg) => (
                                <div key={msg.id} className="bg-white border border-gray-100 rounded-2xl p-6 flex justify-between gap-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                                    <div className="flex flex-col gap-2 flex-1">
                                        <h3 className="font-bold text-[15px] text-[#111]">
                                            {msg.from} <span className="text-gray-400 font-medium px-1">→</span> {msg.to}
                                        </h3>
                                        <p className="text-[14px] text-gray-500 leading-relaxed max-w-[450px]">
                                            {msg.preview}
                                        </p>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <span className="bg-[#E9F0EC] text-[#1a8570] text-[10px] font-bold px-2.5 py-2 rounded-xl h-fit">
                                            {msg.time}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Send Message Card */}
                    <div className="flex-[0.8] bg-[#FAF9F5] rounded-[32px] p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#ebe9e1] flex flex-col">
                        <span className="text-[#1a8570] text-[11px] font-bold tracking-[0.15em] uppercase mb-4 block">
                            SEND MESSAGE
                        </span>
                        <h2 className="text-[32px] md:text-[38px] font-bold leading-tight mb-8 tracking-tight text-[#111]">
                            Start a<br />conversation
                        </h2>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-2">
                            
                            {/* To Dropdown */}
                            <div className="flex flex-col gap-2">
                                <label className="text-[13px] font-bold text-gray-700">To</label>
                                <select 
                                    name="to"
                                    value={formData.to}
                                    onChange={handleChange}
                                    className="w-full bg-white border border-gray-200 text-gray-800 text-[14.5px] rounded-xl px-4 py-3.5 focus:outline-none focus:border-[#1a8570] transition-all appearance-none cursor-pointer"
                                    style={{ backgroundImage: `url('data:image/svg+xml;utf8,<svg fill="none" viewBox="0 0 24 24" stroke="%23888" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>')`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1em' }}
                                >
                                    <option value="Ayesha Khan">Ayesha Khan</option>
                                    <option value="Sara Noor">Sara Noor</option>
                                    <option value="Hassan Ali">Hassan Ali</option>
                                </select>
                            </div>

                            {/* Message Textarea */}
                            <div className="flex flex-col gap-2">
                                <label className="text-[13px] font-bold text-gray-700">Message</label>
                                <textarea 
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Share support details, ask for files, or suggest next steps."
                                    className="w-full bg-white border border-gray-200 text-gray-800 text-[14.5px] rounded-xl px-4 py-3.5 min-h-[140px] focus:outline-none focus:border-[#1a8570] transition-all resize-none placeholder:text-gray-400"
                                />
                            </div>

                            {/* Send Button */}
                            <button
                                type="submit"
                                className="w-full bg-[#1a8570] hover:bg-[#156d5b] text-white py-4 rounded-full font-bold text-[15px] mt-2 transition-all duration-200 flex items-center justify-center gap-2 shadow-sm"
                            >
                                Send
                            </button>

                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Messages;
