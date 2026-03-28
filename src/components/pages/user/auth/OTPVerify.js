import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";
import { Mail, CheckCircle2, ShieldAlert, Loader2, ArrowRight, RefreshCw } from "lucide-react";
import Navbar from "../../../Navbar";

const API_URL = "http://127.0.0.1:8000/api/";

const OTPVerify = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Receive email from navigation state
  const email = location.state?.email || "";

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Timer for Resend OTP (30s) and OTP Expiry (5m)
  const [resendTimer, setResendTimer] = useState(30);
  const [expiryTimer, setExpiryTimer] = useState(300); // 5 minutes

  useEffect(() => {
    if (!email) {
      // If no email in state, redirect back to signup or home
      navigate("/signup");
    }
  }, [email, navigate]);

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  useEffect(() => {
    if (expiryTimer > 0) {
      const timer = setTimeout(() => setExpiryTimer(expiryTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [expiryTimer]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const handleOtpChange = (index, value) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return;

    if (value.length > 1) value = value.slice(-1);

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  const handleVerifySubmit = async (e) => {
    e.preventDefault();
    const otpString = otp.join("");
    if (otpString.length < 6) {
      setError("Please enter all 6 digits.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(`${API_URL}verify-otp/`, {
        email: email,
        otp: otpString,
      });

      if (response.status === 200) {
        setSuccess("Email verified successfully! Redirecting to login...");
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      }
    } catch (err) {
      setError(err.response?.data?.error || "Invalid or expired OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (resendTimer > 0) return;

    setResending(true);
    setError("");
    setSuccess("");

    try {
      await axios.post(`${API_URL}resend-otp/`, { email });
      setSuccess("A new OTP has been sent to your email.");
      setResendTimer(30);
      setExpiryTimer(300); // Reset expiry timer
      setOtp(["", "", "", "", "", ""]);
      document.getElementById("otp-0").focus();
    } catch (err) {
      setError("Failed to resend OTP. Please try again.");
    } finally {
      setResending(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-[#F0F4F8] px-4 py-8">
        <div className="max-w-md w-full animate-in fade-in duration-700">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-orange-500 text-white shadow-lg shadow-orange-200 mb-4">
              <Mail className="w-8 h-8" />
            </div>
            <h1 className="text-3xl font-bold text-[#1A3C6E]">Verify Email</h1>
            <p className="text-gray-500 mt-2 px-4 whitespace-normal">
              We've sent a 6-digit verification code to <span className="text-orange-500 font-semibold break-all">{email}</span>
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
            <form onSubmit={handleVerifySubmit} className="space-y-8">
              {error && (
                <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-600 text-sm font-medium">
                  <ShieldAlert className="w-5 h-5 flex-shrink-0" />
                  {error}
                </div>
              )}
              {success && (
                <div className="p-4 bg-green-50 border border-green-100 rounded-xl flex items-center gap-3 text-green-600 text-sm font-medium">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                  {success}
                </div>
              )}

              <div className="flex justify-between items-center gap-2">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    id={`otp-${i}`}
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    className="w-12 h-14 text-center text-2xl font-bold bg-gray-50 border-2 border-transparent rounded-xl focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all outline-none text-[#1A3C6E]"
                    autoFocus={i === 0}
                  />
                ))}
              </div>

              <div className="flex flex-col items-center gap-4 pt-2">
                <div className="text-sm font-medium text-gray-400">
                  OTP expires in: <span className="text-orange-500 font-bold">{formatTime(expiryTimer)}</span>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full relative py-4 bg-orange-500 text-white font-bold rounded-2xl shadow-xl shadow-orange-200 hover:bg-orange-600 active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed group overflow-hidden"
                >
                  <span className="flex items-center justify-center gap-2">
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Verify & Continue</>}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={resendTimer > 0 || resending}
                  className={`flex items-center gap-2 text-sm font-bold transition-all ${
                    resendTimer > 0 || resending ? "text-gray-300 cursor-not-allowed" : "text-[#1A3C6E] hover:text-orange-500"
                  }`}
                >
                  {resending ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
                  {resendTimer > 0 ? `Resend OTP in ${resendTimer}s` : "Resend Verification Code"}
                </button>
              </div>
            </form>
          </div>

          <p className="text-center mt-8 text-gray-500 text-sm">
            Didn't receive the code? Check your spam folder or{" "}
            <Link to="/signup" className="text-orange-500 font-bold hover:underline">
              Try signing up again
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default OTPVerify;
