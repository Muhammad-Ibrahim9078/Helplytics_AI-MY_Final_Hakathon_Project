import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const res = await axios.post('http://localhost:8000/user/forget-password', { email });

            if (res.data) {
                toast.success(res.data.message);
                navigate(`/verify-otp/${email}`);
                setEmail("");
            } else {
                toast.error("Some Issue in Response");
            }
        } catch (error) {
            toast.error("Something went wrong!");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen relative overflow-hidden font-sans text-gray-900 flex flex-col items-center justify-center" style={{ backgroundColor: '#F4F2EB' }}>
            {/* Background Shapes */}
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-100/40 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-orange-100/40 blur-[120px] pointer-events-none" />

            <div className="relative z-10 w-full max-w-md px-6">
                <div className="bg-[#FAF9F5] p-8 md:p-12 rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#ebe9e1] flex flex-col">
                    
                    <span className="text-[#1a8570] text-[11px] font-bold tracking-[0.15em] uppercase mb-4 block text-center">
                        Account Recovery
                    </span>
                    <h2 className="text-3xl font-extrabold text-[#111] tracking-tight mb-4 leading-tight text-center">
                        Reset password
                    </h2>
                    <p className="text-gray-500 text-[15px] leading-relaxed mb-8 text-center">
                        Enter your email to receive a password reset code.
                    </p>

                    <form onSubmit={handleForgotPassword} className="flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="email" className="text-[13px] font-bold text-gray-700">Email address</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="name@helphub.ai"
                                className="w-full bg-white border border-gray-200 text-gray-800 text-[15px] rounded-xl px-4 py-3.5 focus:outline-none focus:border-[#1a8570] transition-all"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-4 bg-[#1a8570] hover:bg-[#156d5b] text-white rounded-full font-bold text-[15px] transition-all shadow-sm flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : "Send reset code"}
                        </button>
                    </form>

                    <div className="mt-8 pt-8 border-t border-gray-100 w-full text-center">
                        <p className="text-[13px] text-gray-400">
                            Remember your password? <button onClick={() => navigate('/login')} className="text-[#1a8570] font-bold hover:underline">Sign in</button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;