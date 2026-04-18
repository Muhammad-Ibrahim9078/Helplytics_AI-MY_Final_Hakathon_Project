import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";

const Verify = () => {
  const { token } = useParams();
  const [status, setStatus] = useState("Verifying...");
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const res = await axios.post(
          "http://localhost:8000/user/verify",{},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.data.success) {
          setStatus("✅ Success");
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        } else {
          setStatus("❌ Error");
        }
      } catch (error) {
        setStatus("❌ Error");
      }
    };

    verifyEmail();
  }, [token, navigate]);

  const isSuccess = status.includes('✅');
  const isError = status.includes('❌');
  const isVerifying = status.includes('Verifying');

  return (
    <div className="min-h-screen relative overflow-hidden font-sans text-gray-900 flex flex-col items-center justify-center" style={{ backgroundColor: '#F4F2EB' }}>
      {/* Background Shapes */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-100/40 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-orange-100/40 blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-md px-6">
        <div className="bg-[#FAF9F5] p-8 md:p-12 rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#ebe9e1] flex flex-col items-center text-center">
          
          <div className={`p-5 rounded-full mb-8 ${
              isSuccess ? 'bg-emerald-50 text-emerald-600' : 
              isError ? 'bg-red-50 text-red-600' : 
              'bg-gray-100 text-[#1a8570]'
          }`}>
            {isVerifying && <Loader2 className="w-10 h-10 animate-spin" />}
            {isSuccess && <CheckCircle className="w-10 h-10" />}
            {isError && <XCircle className="w-10 h-10" />}
          </div>

          <span className="text-[#1a8570] text-[11px] font-bold tracking-[0.15em] uppercase mb-4 block">
            Verification status
          </span>
          
          <h2 className="text-3xl font-extrabold text-[#111] tracking-tight mb-4 leading-tight">
            {isVerifying ? "Verifying email..." : 
             isSuccess ? "Email verified!" : 
             "Verification failed"}
          </h2>
          
          <p className="text-gray-500 text-[15px] leading-relaxed mb-6">
            {isVerifying && "Please wait while we validate your activation token."}
            {isSuccess && "Your community profile is now active. Redirecting you to sign in..."}
            {isError && "The token might be expired or invalid. Please try registering again."}
          </p>

          {isError && (
              <button 
                  onClick={() => navigate("/signup")}
                  className="w-full py-4 bg-[#1a8570] hover:bg-[#156d5b] text-white rounded-full font-bold text-[15px] transition-all shadow-sm"
              >
                  Return to signup
              </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Verify;