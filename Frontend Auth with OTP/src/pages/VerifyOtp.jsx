import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import axios from "axios";

const VerifyOtp = () => {
  const { email } = useParams();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (otp.length !== 6) {
      setError("Please enter valid 6-digit OTP");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `http://localhost:8000/user/verify-otp/${email}`,
        { otp, email }
      );

      if (response.data.success || response.status === 200) {
        navigate(`/change-password/${email}`);
      } else {
        setError(response.data.message || "Invalid OTP. Please try again.");
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || "OTP verification failed. Please try again.");
      } else {
        setError("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
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
                <FaLock size={28} />
            </div>
          </div>

          <span className="text-[#1a8570] text-[11px] font-bold tracking-[0.15em] uppercase mb-4 block text-center">
            Verification required
          </span>
          <h2 className="text-3xl font-extrabold text-[#111] tracking-tight mb-2 leading-tight text-center">
            Verify identity
          </h2>
          <p className="text-gray-500 text-[14px] leading-relaxed mb-8 text-center flex items-center justify-center gap-2">
            <FaEnvelope className="text-[#1a8570]/60 shrink-0" size={12} />
            <span className="font-semibold text-gray-700 truncate">{decodeURIComponent(email)}</span>
          </p>

          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-700 border border-red-100 rounded-2xl text-[13px] font-bold">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-center">
            <div className="flex flex-col gap-4">
              <label className="text-[13px] font-bold text-gray-600">
                Enter the 6-digit code sent to your email
              </label>
              <input
                type="text"
                maxLength="6"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ""))}
                className="w-full px-4 py-4 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:border-[#1a8570] transition-all text-center tracking-[1em] text-3xl font-extrabold text-[#111] placeholder:text-gray-200"
                placeholder="000000"
                required
                disabled={loading}
                autoFocus
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-[#1a8570] hover:bg-[#156d5b] text-white rounded-full font-bold text-[15px] transition-all shadow-sm flex items-center justify-center gap-2"
            >
              {loading ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
              ) : "Verify code"}
            </button>

            <div className="mt-2">
                <button 
                  type="button"
                  className="text-[13px] font-bold text-[#1a8570] hover:underline"
                  onClick={() => window.location.reload()}
                >
                    Resend code
                </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;