import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Eye, EyeOff, User, Phone, Mail, Lock, MapPin, Home, Building2, Store } from "lucide-react";
import Navbar from "../../../Navbar";
import Login from "./Login";

const API_URL = "http://127.0.0.1:8000/api/";

// Modal UI Styles for Login popup
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
 * Signup component
 * Combines Monika's Smart Logic (OTP, API) with Rajesh's Premium UI
 */
function Signup({ isModal = false, onSwitch }) {
  const navigate = useNavigate();

  // Form States from Monika's branch
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [addressTitle, setAddressTitle] = useState("Home");
  const [addressLine1, setAddressLine1] = useState("");
  const [city, setCity] = useState("Solapur");
  const [area, setArea] = useState("");
  const [pinCode, setPinCode] = useState("");

  // UI States from both branches
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState("signup"); // 'signup' or 'verify'
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [userId, setUserId] = useState(null);
  const [otpValue, setOtpValue] = useState(["", "", "", "", "", ""]);
  const [resendTimer, setResendTimer] = useState(0);
  const [expiryTimer, setExpiryTimer] = useState(300);

  // OTP Timer Logic from Monika's branch
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

  // Form Handlers
  const handlePhoneChange = (e) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 10);
    setPhone(val);
  };

  const handlePinChange = (e) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 6);
    setPinCode(val);
  };

  // Signup Submit Logic from Monika's branch
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setSuccess("");
    setLoading(true);

    try {
      const resp = await axios.post(API_URL + "auth/register/", {
        name: name.trim(), email: email.trim(), password,
        phone: phone.trim(), title: addressTitle.trim(),
        address_line: addressLine1.trim(), city: city.trim(),
        area: area.trim(), pin_code: pinCode.trim(),
      });
      
      setUserId(resp.data.user_id);
      setSuccess("Account created! Verify your email.");
      setStep("verify");
      setResendTimer(30);
    } catch (err) {
      setError(err.response?.data?.error || err.response?.data?.email?.[0] || "Failed to create account.");
    } finally {
      setLoading(false);
    }
  };

  // OTP Verification Logic from Monika's branch
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
      await axios.post(API_URL + "verify-otp/", { user_id: userId, otp: inputOtp });
      setSuccess("Verified! You can now login.");
      setTimeout(() => {
        if (isModal && onSwitch) {
            onSwitch(); // Switch to login mode in modal
        } else {
            setShowLoginModal(true);
        }
      }, 1500);
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
      await axios.post(API_URL + "resend-otp/", { user_id: userId });
      setResendTimer(30); setExpiryTimer(300); setOtpValue(["", "", "", "", "", ""]);
      setSuccess("OTP resent.");
    } catch (err) {
      setError("Failed to resend.");
    } finally {
      setLoading(false);
    }
  };

  // Styles from Rajesh's branch
  const inputClass = (field) =>
    `w-full bg-white border-2 rounded-xl px-4 py-2.5 text-sm text-gray-700 outline-none transition-all duration-200 ${
      focused === field
        ? "border-orange-400 shadow-[0_0_0_3px_rgba(251,146,60,0.15)]"
        : "border-gray-200 hover:border-gray-300"
    }`;

  const labelClass = "block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide";

  return (
    <>
      {!isModal && <Navbar />}

      <div className={!isModal ? "min-h-[calc(100vh-80px)] bg-slate-50 flex items-center justify-center p-4" : ""}>
        <div className={!isModal ? "bg-white p-8 rounded-3xl shadow-xl w-full max-w-[480px] border border-slate-100" : "w-full"}>
          
          {step === "signup" ? (
            <div className="font-sans">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Create Account</h2>
                <p className="text-sm text-gray-400 mt-1">Join ServeEasy Solapur today</p>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {/* Full Name */}
                <div>
                  <label className={labelClass}>Full Name</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <User size={15} />
                    </span>
                    <input
                      className={`${inputClass("name")} pl-9`}
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      onFocus={() => setFocused("name")}
                      onBlur={() => setFocused("")}
                      required
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className={labelClass}>Phone Number</label>
                  <div className="flex gap-2">
                    <div className="flex items-center bg-orange-50 border-2 border-orange-200 rounded-xl px-3 text-orange-600 font-bold text-sm whitespace-nowrap select-none">
                      🇮🇳 +91
                    </div>
                    <input
                      className={inputClass("phone")}
                      placeholder="10-digit mobile number"
                      value={phone}
                      onChange={handlePhoneChange}
                      onFocus={() => setFocused("phone")}
                      onBlur={() => setFocused("")}
                      inputMode="numeric"
                      maxLength={10}
                      required
                    />
                  </div>
                  {phone.length > 0 && phone.length < 10 && (
                    <p className="text-xs text-orange-400 mt-1">
                      {10 - phone.length} more digits needed
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className={labelClass}>Email</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <Mail size={15} />
                    </span>
                    <input
                      className={`${inputClass("email")} pl-9`}
                      placeholder="your@email.com"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => setFocused("email")}
                      onBlur={() => setFocused("")}
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className={labelClass}>Password</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <Lock size={15} />
                    </span>
                    <input
                      className={`${inputClass("password")} pl-9 pr-10`}
                      type={showPassword ? "text" : "password"}
                      placeholder="Min 8 characters"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onFocus={() => setFocused("password")}
                      onBlur={() => setFocused("")}
                      minLength={8}
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-500 transition-colors"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {/* Address Title */}
                <div>
                  <label className={labelClass}>Address Type</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { value: "Home", icon: <Home size={14} />, label: "Home" },
                      { value: "Office", icon: <Building2 size={14} />, label: "Office" },
                      { value: "Other", icon: <Store size={14} />, label: "Other" },
                    ].map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setAddressTitle(opt.value)}
                        className={`flex items-center justify-center gap-1.5 py-2.5 rounded-xl border-2 text-sm font-medium transition-all duration-200 ${
                          addressTitle === opt.value
                            ? "border-orange-400 bg-orange-50 text-orange-600 shadow-[0_0_0_3px_rgba(251,146,60,0.15)]"
                            : "border-gray-200 text-gray-500 hover:border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        {opt.icon}
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Address Line 1 */}
                <div>
                  <label className={labelClass}>Address Line 1</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <MapPin size={15} />
                    </span>
                    <input
                      className={`${inputClass("address")} pl-9`}
                      placeholder="House / Flat / Street"
                      value={addressLine1}
                      onChange={(e) => setAddressLine1(e.target.value)}
                      onFocus={() => setFocused("address")}
                      onBlur={() => setFocused("")}
                      required
                    />
                  </div>
                </div>

                {/* City & Area */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelClass}>City</label>
                    <select
                      className={inputClass("city")}
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      onFocus={() => setFocused("city")}
                      onBlur={() => setFocused("")}
                      required
                    >
                      <option value="">Select City</option>
                      <option value="Solapur">Solapur</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Area</label>
                    <select
                      className={inputClass("area")}
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      onFocus={() => setFocused("area")}
                      onBlur={() => setFocused("")}
                      required
                    >
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
                  </div>
                </div>

                {/* Pin Code */}
                <div>
                  <label className={labelClass}>Pin Code</label>
                  <input
                    className={inputClass("pin")}
                    placeholder="6-digit PIN code"
                    value={pinCode}
                    onChange={handlePinChange}
                    onFocus={() => setFocused("pin")}
                    onBlur={() => setFocused("")}
                    inputMode="numeric"
                    maxLength={6}
                    required
                  />
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-2.5">
                    <p className="text-red-500 text-sm font-semibold">{error}</p>
                  </div>
                )}
                {success && (
                  <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-2.5">
                    <p className="text-green-500 text-sm font-semibold">{success}</p>
                  </div>
                )}

                <button
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 text-white font-semibold py-3.5 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 mt-2 disabled:opacity-50"
                  type="submit"
                >
                  {loading ? "Processing..." : "Create Account →"}
                </button>
              </form>

              {!isModal && (
                <p className="text-center mt-4 text-sm text-gray-500">
                  Already have account?{" "}
                  <button onClick={onSwitch || (() => navigate("/login"))} className="text-orange-500 font-bold hover:underline">
                    Login
                  </button>
                </p>
              )}
            </div>
          ) : (
            <div className="w-full text-center">
                <div className="text-5xl mb-4">📧</div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Verify Your Email</h2>
                <p className="text-gray-400 text-sm mb-6">Enter the 6-digit OTP sent to <br/><b>{email}</b></p>
                
                <div className="flex justify-center gap-2 mb-8">
                  {otpValue.map((d, i) => (
                    <input key={i} id={`otp-${i}`} className="w-11 h-13 text-center text-xl font-bold border-2 border-slate-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all" value={d} maxLength={1} onChange={(e) => handleOtpChange(i, e.target.value)} />
                  ))}
                </div>

                <div className="space-y-5">
                  <p className="text-sm text-gray-500">Expiring in: <span className="text-orange-600 font-bold">{formatTime(expiryTimer)}</span></p>
                  <button onClick={() => handleVerifyOtp()} disabled={loading || otpValue.join("").length < 6} className="w-full bg-slate-800 text-white py-4 rounded-xl font-bold hover:bg-slate-900 transition-all disabled:opacity-50">
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

      {/* Login Modal (for non-modal flow) */}
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

export default Signup;
