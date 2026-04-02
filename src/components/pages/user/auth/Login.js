import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import axios from "axios";
import Navbar from "../../../Navbar";

const API_URL = "http://127.0.0.1:8000/api/";

/**
 * Login component
 * Combines Monika's Smart Logic (API, Event Dispatch) with Rajesh's Premium UI & Google Login
 */
function Login({ isModal = false, onSwitch }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // Normal Login Submit Logic from Monika's branch
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
      
      if (!isModal) {
        navigate("/address-select");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  // Google Login Logic from Rajesh's branch
  const handleGoogleSuccess = (credentialResponse) => {
    try {
        const user = jwtDecode(credentialResponse.credential);
        console.log("Google User Signed In:", user);
        
        // Map Google user to application user format
        const appUser = {
            id: user.sub,
            name: user.name,
            email: user.email,
            avatar_url: user.picture,
            is_verified: true
        };
        
        setEmail(user.email);
        sessionStorage.setItem("currentUser", JSON.stringify(appUser));
        window.dispatchEvent(new Event("authChange"));
        
        if (!isModal) {
            navigate("/address-select");
        }
    } catch (err) {
        setError("Google authentication failed.");
    }
  };

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
        <div className={!isModal ? "bg-white p-8 rounded-3xl shadow-xl w-full max-w-[440px] border border-slate-100" : "w-full"}>
          
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
            <p className="text-sm text-gray-400 mt-1">Login to your ServeEasy account</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocused("password")}
                  onBlur={() => setFocused("")}
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
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 text-white font-semibold py-3.5 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 mt-1 disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login →"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <hr className="flex-grow border-gray-200" />
            <span className="mx-3 text-xs text-gray-400 font-medium uppercase tracking-wider">or</span>
            <hr className="flex-grow border-gray-200" />
          </div>

          {/* Google Login */}
          <div className="flex flex-col items-center gap-3">
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Continue with Google</p>
            <GoogleLogin
              text="signin"
              onSuccess={handleGoogleSuccess}
              onError={() => setError("Google Sign-In failed.")}
            />
          </div>

          {!isModal && (
            <p className="text-center mt-6 text-sm text-gray-500">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={onSwitch || (() => navigate("/signup"))}
                className="text-orange-500 font-semibold hover:text-orange-600 transition-colors"
              >
                Sign Up
              </button>
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default Login;