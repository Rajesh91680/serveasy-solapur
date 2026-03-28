import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import axios from "axios";
import Navbar from "../../../Navbar";

const API_URL = "http://127.0.0.1:8000/api/";

/**
 * LoginPage component
 */
function LoginPage({ isModal = false, onSwitch }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setSuccess("");
    setLoading(true);

    try {
      const res = await axios.post(API_URL + "auth/login/", {
        email: email.trim(),
        password: password,
      });

      const user = res.data.user || res.data;
      sessionStorage.setItem("currentUser", JSON.stringify(user));
      window.dispatchEvent(new Event("authChange"));
      navigate("/address-select");
    } catch (err) {
      setError(err.response?.data?.error || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {!isModal && <Navbar />}

      <div className={!isModal ? "min-h-[calc(100vh-80px)] bg-slate-50 flex items-center justify-center p-4" : ""}>
        <div className={!isModal ? "bg-white p-8 rounded-3xl shadow-xl w-full max-w-[440px] border border-slate-100" : "w-full"}>
          
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">🔐</div>
            <h1 className="text-2xl font-bold text-[#1A3C6E]">Welcome Back</h1>
            <p className="text-slate-500 text-sm mt-1">Login to your ServeEasySolapur account</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
              <input 
                type="email" 
                placeholder="Email Address" 
                className="w-full border border-slate-300 p-3 pl-10 rounded-xl outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all font-medium"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Password" 
                className="w-full border border-slate-300 p-3 pl-10 rounded-xl outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all font-medium"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-slate-400 hover:text-orange-500 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {error && <p className="text-red-500 text-sm font-semibold">⚠️ {error}</p>}
            {success && <p className="text-green-500 text-sm font-semibold">✅ {success}</p>}

            <button disabled={loading} className="bg-orange-500 text-white py-4 rounded-xl font-bold hover:bg-orange-600 transition-all disabled:opacity-50 mt-2 shadow-lg shadow-orange-100">
              {loading ? "Logging in..." : "Login →"}
            </button>
          </form>

          {!isModal && (
            <div className="text-center mt-6 text-sm text-slate-500">
              Don't have an account?{" "}
              <button onClick={onSwitch || (() => navigate("/signup"))} className="text-orange-500 font-bold hover:underline">
                Sign Up
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default LoginPage;