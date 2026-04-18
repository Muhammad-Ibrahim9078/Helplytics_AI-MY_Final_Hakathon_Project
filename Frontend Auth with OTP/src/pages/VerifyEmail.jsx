import React from 'react';
import { useNavigate } from 'react-router-dom';

const VerifyEmail = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen relative overflow-hidden font-sans text-gray-900 flex flex-col items-center justify-center" style={{ backgroundColor: '#F4F2EB' }}>
            {/* Background Shapes */}
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-100/40 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-orange-100/40 blur-[120px] pointer-events-none" />

            <div className="relative z-10 w-full max-w-md px-6">
                <div className="bg-[#FAF9F5] p-8 md:p-12 rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#ebe9e1] flex flex-col items-center text-center">
                    <div className="bg-[#E9F0EC] p-5 rounded-full mb-8">
                        <svg className="w-10 h-10 text-[#1a8570]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                        </svg>
                    </div>

                    <span className="text-[#1a8570] text-[11px] font-bold tracking-[0.15em] uppercase mb-4 block">
                        Account Activation
                    </span>
                    <h2 className="text-3xl font-extrabold text-[#111] tracking-tight mb-4 leading-tight">
                        Check your inbox
                    </h2>
                    <p className="text-gray-500 text-[15px] leading-relaxed mb-10">
                        We've sent a verification link to your email. Please follow the instructions to activate your community profile.
                    </p>

                    <div className="w-full flex flex-col gap-4">
                        <button 
                            onClick={() => window.location.reload()}
                            className="w-full py-4 bg-[#1a8570] hover:bg-[#156d5b] text-white rounded-full font-bold text-[15px] transition-all shadow-sm"
                        >
                            I've verified my email
                        </button>
                        <button 
                            onClick={() => navigate("/login")}
                            className="w-full py-2 text-[14px] font-bold text-gray-500 hover:text-[#1a8570] transition-colors"
                        >
                            Back to login
                        </button>
                    </div>

                    <div className="mt-8 pt-8 border-t border-gray-100 w-full text-center">
                        <p className="text-[13px] text-gray-400">
                            Didn't receive an email? <button className="text-[#1a8570] font-bold hover:underline">Resend</button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerifyEmail;