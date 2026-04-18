import React, { useState } from 'react';
import Navbar from '../components/Navbar';

const CreateRequest = () => {
    // const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: 'Need review on my JavaScript quiz app before submission',
        description: '',
        tags: 'JavaScript, Debugging, Review',
        category: 'Web Development',
        urgency: 'High'
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle publish logic
    };

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
                        CREATE REQUEST
                    </span>
                    <h1 className="text-4xl md:text-[44px] font-extrabold leading-[1.1] mb-3 tracking-tight max-w-[800px]">
                        Turn a rough problem into a clear help request.
                    </h1>
                    <p className="text-[#a4b5ac] text-[15px] mt-2">
                        Use built-in AI suggestions for category, urgency, tags, and a stronger description rewrite.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-6">
                    
                    {/* Left Form Card */}
                    <div className="flex-[1.2] bg-[#FAF9F5] rounded-[32px] p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#ebe9e1] flex flex-col">
                        
                        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                            
                            {/* Title */}
                            <div className="flex flex-col gap-2">
                                <label className="text-[13px] font-bold text-gray-700">Title</label>
                                <input 
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="Brief title of the problem"
                                    className="w-full bg-white border border-gray-200 text-gray-500 text-[14.5px] rounded-xl px-4 py-3 focus:outline-none focus:border-[#1a8570] transition-all"
                                />
                            </div>

                            {/* Description */}
                            <div className="flex flex-col gap-2">
                                <label className="text-[13px] font-bold text-gray-700">Description</label>
                                <textarea 
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Explain the challenge, your current progress, deadline, and what kind of help would be useful."
                                    className="w-full bg-white border border-gray-200 text-gray-800 text-[14.5px] rounded-xl px-4 py-3 min-h-[120px] focus:outline-none focus:border-[#1a8570] transition-all resize-none placeholder:text-gray-400"
                                />
                            </div>

                            {/* Tags & Category */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex flex-col gap-2">
                                    <label className="text-[13px] font-bold text-gray-700">Tags</label>
                                    <input 
                                        type="text"
                                        name="tags"
                                        value={formData.tags}
                                        onChange={handleChange}
                                        placeholder="e.g. React, Bug"
                                        className="w-full bg-white border border-gray-200 text-gray-500 text-[14.5px] rounded-xl px-4 py-3 focus:outline-none focus:border-[#1a8570] transition-all"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-[13px] font-bold text-gray-700">Category</label>
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        className="w-full bg-white border border-gray-200 text-gray-500 text-[14.5px] rounded-xl px-4 py-3 focus:outline-none focus:border-[#1a8570] transition-all appearance-none cursor-pointer"
                                        style={{ backgroundImage: `url('data:image/svg+xml;utf8,<svg fill="none" viewBox="0 0 24 24" stroke="%23888" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>')`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1em' }}
                                    >
                                        <option value="Web Development">Web Development</option>
                                        <option value="Mobile Development">Mobile Development</option>
                                        <option value="Design">Design</option>
                                    </select>
                                </div>
                            </div>

                            {/* Urgency */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex flex-col gap-2">
                                    <label className="text-[13px] font-bold text-gray-700">Urgency</label>
                                    <select
                                        name="urgency"
                                        value={formData.urgency}
                                        onChange={handleChange}
                                        className="w-full bg-white border border-gray-200 text-gray-800 text-[14.5px] rounded-xl px-4 py-3 focus:outline-none focus:border-[#1a8570] transition-all appearance-none cursor-pointer"
                                        style={{ backgroundImage: `url('data:image/svg+xml;utf8,<svg fill="none" viewBox="0 0 24 24" stroke="%23888" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>')`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1em' }}
                                    >
                                        <option value="High">High</option>
                                        <option value="Medium">Medium</option>
                                        <option value="Low">Low</option>
                                    </select>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center gap-4 mt-2">
                                <button
                                    type="button"
                                    className="bg-white hover:bg-gray-50 border border-gray-200 text-gray-800 py-3 px-5 rounded-full font-bold text-[14px] transition-all duration-200 shadow-sm"
                                >
                                    Apply AI suggestions
                                </button>
                                <button
                                    type="submit"
                                    className="bg-[#1a8570] hover:bg-[#156d5b] text-white py-3 px-6 rounded-full font-bold text-[14px] transition-all duration-200 shadow-sm shadow-[#1a8570]/30"
                                >
                                    Publish request
                                </button>
                            </div>

                        </form>
                    </div>

                    {/* Right AI Assistant Card */}
                    <div className="flex-[0.8] bg-[#FAF9F5] rounded-[32px] p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#ebe9e1] flex flex-col">
                        <span className="text-[#1a8570] text-[11px] font-bold tracking-[0.15em] uppercase mb-4 block">
                            AI ASSISTANT
                        </span>
                        <h2 className="text-[32px] md:text-[34px] font-bold leading-tight mb-8 tracking-tight text-[#111]">
                            Smart request<br />guidance
                        </h2>

                        <div className="flex flex-col gap-5 mt-2">
                            {/* Suggested Category */}
                            <div className="flex items-start justify-between border-b border-gray-200/60 pb-5 gap-4">
                                <span className="text-[14px] text-gray-600 whitespace-nowrap">Suggested category</span>
                                <span className="font-bold text-[14px] text-[#111] text-right">Community</span>
                            </div>
                            
                            {/* Detected Urgency */}
                            <div className="flex items-start justify-between border-b border-gray-200/60 pb-5">
                                <span className="text-[14px] text-gray-600 whitespace-nowrap">Detected urgency</span>
                                <span className="font-bold text-[14px] text-[#111] text-right">Low</span>
                            </div>

                            {/* Suggested Tags */}
                            <div className="flex items-start justify-between border-b border-gray-200/60 pb-5 gap-4">
                                <span className="text-[14px] text-gray-600 whitespace-nowrap">Suggested tags</span>
                                <span className="font-bold text-[13.5px] text-[#111] leading-snug text-right max-w-[180px]">Add more detail for smarter tags</span>
                            </div>

                            {/* Rewrite Suggestion */}
                            <div className="flex flex-col sm:flex-row items-start justify-between gap-2 sm:gap-6 pt-1">
                                <span className="text-[14px] text-gray-600 whitespace-nowrap">Rewrite<br className="hidden sm:block" /> suggestion</span>
                                <span className="font-bold text-[13.5px] text-[#111] leading-snug sm:text-right">Start describing the challenge to generate a stronger version.</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default CreateRequest;
