import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../../../Navbar";
import Login from "./Login";

const API_URL = "http://127.0.0.1:8000/api/";

// Modal UI Styles moved out to avoid re-creation on render
const modalOverlayStyle = {
  position: "fixed",
  inset: 0,
  backgroundColor: "rgba(15, 23, 42, 0.75)",
  backdropFilter: "blur(8px)",
  zIndex: 10000,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
};

const modalCardStyle = {
  backgroundColor: "white",
  borderRadius: "28px",
  width: "100%",
  maxWidth: "400px",
  padding: "40px 32px",
  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
};

/**
 * SignupPage component
 */
function SignupPage({ isModal = false, onSwitch }) {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [addressTitle, setAddressTitle] = useState("Home");
  const [addressLine1, setAddressLine1] = useState("");
  const [city, setCity] = useState("Solapur");
  const [area, setArea] = useState("");
  const [pinCode, setPinCode] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const [step, setStep] = useState("signup"); // 'signup' or 'verify'
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [otpValue, setOtpValue] = useState(["", "", "", "", "", ""]);
  const [resendTimer, setResendTimer] = useState(0);
  const [expiryTimer, setExpiryTimer] = useState(300);

  useEffect(() => {
    let interval;
    if (step === "verify") {
      interval = setInterval(() => {
        setResendTimer((prev) => (prev > 0 ? prev - 1 : 0));
        setExpiryTimer((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setSuccess("");
    setLoading(true);

    try {
      await axios.post(API_URL + "auth/register/", {
        name: name.trim(), email: email.trim(), password,
        phone: phone.trim(), title: addressTitle.trim(),
        address_line: addressLine1.trim(), city: city.trim(),
        area: area.trim(), pin_code: pinCode.trim(),
      });
      setSuccess("Account created! Verify your email.");
      setStep("verify");
      setResendTimer(30);
    } catch (err) {
      setError(err.response?.data?.error || err.response?.data?.email?.[0] || "Failed to create account.");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    if (value.length > 1) value = value.slice(-1);
    const newOtp = [...otpValue];
    newOtp[index] = value;
    setOtpValue(newOtp);

    if (value && index < 5) document.getElementById(`otp-${index + 1}`)?.focus();
    if (newOtp.join("").length === 6 && value) handleVerifyOtp(newOtp.join(""));
  };

  const handleVerifyOtp = async (inputOtp = otpValue.join("")) => {
    setLoading(true); setError("");
    try {
      await axios.post(API_URL + "verify-otp/", { email: email.trim(), otp: inputOtp });
      setSuccess("Verified! You can now login.");
      setTimeout(() => setShowLoginModal(true), 1000);
    } catch (err) {
      setError(err.response?.data?.error || "Invalid OTP.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (resendTimer > 0) return;
    setLoading(true);
    try {
      await axios.post(API_URL + "resend-otp/", { email: email.trim() });
      setResendTimer(30); setExpiryTimer(300); setOtpValue(["", "", "", "", "", ""]);
      setSuccess("OTP resent.");
    } catch (err) {
      setError("Failed to resend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {!isModal && <Navbar />}

      <div className={!isModal ? "min-h-[calc(100vh-80px)] bg-slate-50 flex items-center justify-center p-4" : ""}>
        <div className={!isModal ? "bg-white p-8 rounded-3xl shadow-xl w-full max-w-[480px] border border-slate-100" : "w-full"}>
          
          {step === "signup" ? (
            <div className="w-full">
              <h2 className="text-xl font-bold text-center mb-4 text-[#1A3C6E]">Create Account</h2>
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input className="border border-slate-300 p-2.5 rounded-lg outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
                <input className="border border-slate-300 p-2.5 rounded-lg outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))} maxLength={10} required />
                <input className="border border-slate-300 p-2.5 rounded-lg outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all" placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input className="border border-slate-300 p-2.5 rounded-lg outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                
                <div className="border-t border-slate-100 my-1 pt-2">
                    <p className="text-[10px] uppercase font-bold text-slate-400">📍 Address Details</p>
                </div>

                <input className="border border-slate-300 p-2.5 rounded-lg outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all" placeholder="Title (Home / Office / Shop)" value={addressTitle} onChange={(e) => setAddressTitle(e.target.value)} required />
                <input className="border border-slate-300 p-2.5 rounded-lg outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all" placeholder="Address Line 1" value={addressLine1} onChange={(e) => setAddressLine1(e.target.value)} required />

                <select className="border border-slate-300 p-2.5 rounded-lg outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all bg-white" value={city} onChange={(e) => setCity(e.target.value)} required>
                  <option value="">Select City</option>
                  <option value="Solapur">Solapur</option>
                </select>

                <select className="border border-slate-300 p-2.5 rounded-lg outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all bg-white" value={area} onChange={(e) => setArea(e.target.value)} required>
                  <option value="">Select Area</option>
                  <option value="Jule Solapur">Jule Solapur</option>
                  <option value="Hotgi Road">Hotgi Road</option>
                  <option value="Akkalkot Road">Akkalkot Road</option>
                  <option value="Railway Lines">Railway Lines</option>
                  <option value="Vijapur Road">Vijapur Road</option>
                  <option value="Datta Nagar">Datta Nagar</option>
                  <option value="Budhwar Peth">Budhwar Peth</option>
                  <option value="Sakhar Peth">Sakhar Peth</option>
                  <option value="Siddheshwar Peth">Siddheshwar Peth</option>
                  <option value="Mangalwar Peth">Mangalwar Peth</option>
                  <option value="Shivaji Nagar">Shivaji Nagar</option>
                  <option value="Kambar Ali">Kambar Ali</option>
                  <option value="Murarji Peth">Murarji Peth</option>
                </select>

                <input className="border border-slate-300 p-2.5 rounded-lg outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all" placeholder="Pin Code" value={pinCode} onChange={(e) => setPinCode(e.target.value.replace(/\D/g, ""))} maxLength={6} required />

                {error && <p className="text-red-500 text-sm font-semibold">{error}</p>}
                {success && <p className="text-green-500 text-sm font-semibold">{success}</p>}

                <button disabled={loading} className="bg-orange-500 text-white py-3 rounded-lg font-bold hover:bg-orange-600 transition-all disabled:opacity-50">
                  {loading ? "Processing..." : "Sign Up"}
                </button>
              </form>
              
              {!isModal && (
                <p className="text-center mt-3 text-sm">
                  Already have account?
                  <button type="button" onClick={onSwitch || (() => navigate("/login"))} className="text-orange-500 ml-2 font-bold hover:underline">Login</button>
                </p>
              )}
            </div>
          ) : (
            <div className="w-full text-center">
                <div className="text-5xl mb-4">📧</div>
                <h2 className="text-2xl font-bold text-[#1A3C6E] mb-2">Verify Your Email</h2>
                <p className="text-slate-500 text-sm mb-6">Enter the 6-digit OTP sent to <br/><b>{email}</b></p>
                
                <div className="flex justify-center gap-2 mb-8">
                  {otpValue.map((d, i) => (
                    <input key={i} id={`otp-${i}`} className="w-11 h-13 text-center text-xl font-bold border-2 border-slate-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all" value={d} maxLength={1} onChange={(e) => handleOtpChange(i, e.target.value)} />
                  ))}
                </div>

                <div className="space-y-5">
                  <p className="text-sm text-slate-500">Expiring in: <span className="text-orange-600 font-bold">{formatTime(expiryTimer)}</span></p>
                  <button onClick={() => handleVerifyOtp()} disabled={loading || otpValue.join("").length < 6} className="w-full bg-[#1A3C6E] text-white py-4 rounded-xl font-bold hover:bg-slate-900 transition-all disabled:opacity-50">
                    {loading ? "Verifying..." : "Verify & Continue"}
                  </button>
                  <button onClick={handleResendOtp} disabled={resendTimer > 0} className={`text-sm font-bold block mx-auto ${resendTimer > 0 ? "text-slate-300" : "text-orange-600 hover:underline"}`}>
                    {resendTimer > 0 ? `Resend OTP in ${resendTimer}s` : "Resend Code"}
                  </button>
                </div>
                {error && <p className="text-red-500 text-center text-sm mt-4 font-bold">{error}</p>}
                {success && <p className="text-green-500 text-center text-sm mt-4 font-bold">{success}</p>}
            </div>
          )}
        </div>
      </div>

      {showLoginModal && (
        <div style={modalOverlayStyle}>
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-md" onClick={() => setShowLoginModal(false)} />
          <div style={modalCardStyle} className="relative !max-w-md !p-0 overflow-hidden animate-in zoom-in duration-300">
            <button onClick={() => setShowLoginModal(false)} className="absolute top-6 right-6 w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-all z-10">✕</button>
            <div className="p-8 pt-10">
                <Login isModal={true} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SignupPage;