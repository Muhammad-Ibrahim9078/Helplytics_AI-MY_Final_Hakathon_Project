import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Loader2, Eye, EyeOff, ShieldCheck } from 'lucide-react';

const ChangePassword = () => {
    const { email } = useParams();
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const handleChangePassword = async () => {
        setError("");
        setSuccess("");

        if (!newPassword || !confirmPassword) {
            setError("Please fill in all fields");
            return;
        }

        if (newPassword.length < 6) {
            setError("Password must be at least 6 characters long");
            return;
        }

        if (newPassword !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            setIsLoading(true);
            const res = await axios.post(`http://localhost:8000/user/change-password/${email}`, {
                newPassword: newPassword,
                confimPassword: confirmPassword
            });

            setSuccess(res.data.message || "Password changed successfully!");
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (error) {
            setError(error.response?.data?.message || "Something went wrong");
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
                    
                    <div className="flex justify-center mb-6">
                        <div className="bg-[#E9F0EC] p-5 rounded-full text-[#1a8570]">
                            <ShieldCheck size={28} />
                        </div>
                    </div>

                    <span className="text-[#1a8570] text-[11px] font-bold tracking-[0.15em] uppercase mb-4 block text-center">
                        Security update
                    </span>
                    <h2 className="text-3xl font-extrabold text-[#111] tracking-tight mb-2 leading-tight text-center">
                        Create new password
                    </h2>
                    <p className="text-gray-500 text-[14px] leading-relaxed mb-8 text-center">
                        Set a strong password for <span className="font-bold text-gray-700">{decodeURIComponent(email)}</span>
                    </p>

                    {error && (
                        <div className="mb-6 p-4 bg-red-50 text-red-700 border border-red-100 rounded-2xl text-[13px] font-bold text-center">
                            {error}
                        </div>
                    )}
                    
                    {success && (
                        <div className="mb-6 p-4 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-2xl text-[13px] font-bold text-center">
                            {success}
                        </div>
                    )}

                    <div className="flex flex-col gap-5">
                        <div className="flex flex-col gap-2 relative">
                            <label className="text-[13px] font-bold text-gray-700">New password</label>
                            <div className="relative">
                                <input
                                    type={showNewPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="w-full bg-white border border-gray-200 text-gray-800 text-[15px] rounded-xl px-4 py-3.5 focus:outline-none focus:border-[#1a8570] transition-all pr-12"
                                    disabled={isLoading}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors outline-none"
                                >
                                    {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2 relative">
                            <label className="text-[13px] font-bold text-gray-700">Confirm password</label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full bg-white border border-gray-200 text-gray-800 text-[15px] rounded-xl px-4 py-3.5 focus:outline-none focus:border-[#1a8570] transition-all pr-12"
                                    disabled={isLoading}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors outline-none"
                                >
                                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {newPassword && (
                            <div className="p-4 bg-gray-50/50 rounded-2xl border border-gray-100 flex flex-col gap-2">
                                <div className="flex items-center gap-2">
                                    <div className={`w-1.5 h-1.5 rounded-full ${newPassword.length >= 6 ? "bg-emerald-500" : "bg-gray-300"}`} />
                                    <span className={`text-[12px] font-medium ${newPassword.length >= 6 ? "text-emerald-700" : "text-gray-500"}`}>Minimum 6 characters</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className={`w-1.5 h-1.5 rounded-full ${confirmPassword && newPassword === confirmPassword ? "bg-emerald-500" : "bg-gray-300"}`} />
                                    <span className={`text-[12px] font-medium ${confirmPassword && newPassword === confirmPassword ? "text-emerald-700" : "text-gray-500"}`}>Passwords match</span>
                                </div>
                            </div>
                        )}

                        <button
                            onClick={handleChangePassword}
                            disabled={isLoading}
                            className="w-full py-4 bg-[#1a8570] hover:bg-[#156d5b] text-white rounded-full font-bold text-[15px] mt-2 transition-all shadow-sm flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : "Update password"}
                        </button>

                        <div className="text-center mt-2">
                            <button
                                onClick={() => navigate('/login')}
                                className="text-[13px] font-bold text-[#1a8570] hover:underline"
                            >
                                Return to sign in
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;