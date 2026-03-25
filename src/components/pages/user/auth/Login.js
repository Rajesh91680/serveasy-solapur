import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import Navbar from "../../../Navbar";

const API_URL = "http://127.0.0.1:8000/api/";

/**
 * LoginPage — standalone page at "/login"
 *
 * Responsibilities:
 *   ✅ Handles login form & validation
 *   ✅ Calls POST /api/auth/login/
 *   ✅ Stores user in sessionStorage
 *   ✅ Dispatches "authChange" event so Navbar updates
 *   ✅ Navigates to /address-select after successful login
 */
function LoginPage({ isModal = false }) {
  const navigate = useNavigate();

  const [email, setEmail]           = useState("");
  const [password, setPassword]     = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError]           = useState("");
  const [success, setSuccess]       = useState("");
  const [loading, setLoading]       = useState(false);

  // ── Validation ──────────────────────────────────────────────────────────────
  const validate = () => {
    if (!email.trim())    return "Email is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return "Enter a valid email.";
    if (!password.trim()) return "Password is required.";
    return "";
  };

  // ── Submit ──────────────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setSuccess("");

    const validationError = validate();
    if (validationError) { setError(validationError); return; }

    setLoading(true);
    try {
      const res = await axios.post(API_URL + "auth/login/", {
        email:    email.trim(),
        password: password,
      });

      const user = res.data.user || res.data;

      // Store in sessionStorage
      sessionStorage.setItem("currentUser", JSON.stringify(user));

      // Notify Navbar to re-render with user info
      window.dispatchEvent(new Event("authChange"));

      // Navigate to address selection flow
      navigate("/address-select");

    } catch (err) {
      setError(err.response?.data?.error || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  // ── Render ──────────────────────────────────────────────────────────────────
  if (isModal) {
    return (
      <div style={{ padding: "0" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <div style={{
            width: "50px", height: "50px", borderRadius: "14px",
            backgroundColor: "#EEF4FF", display: "flex", alignItems: "center",
            justifyContent: "center", fontSize: "24px", margin: "0 auto 10px",
          }}>🔐</div>
          <h1 style={{ fontSize: "22px", fontWeight: 800, color: "#1A3C6E", margin: "0 0 4px" }}>
            Welcome Back
          </h1>
          <p style={{ fontSize: "14px", color: "#6B7280", margin: 0 }}>
            Login to your account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <label style={labelStyle}>Email Address</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>Password</label>
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={inputStyle}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)",
                  background: "none", border: "none", cursor: "pointer", color: "#9CA3AF",
                }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          {error && <div style={{ color: "#DC2626", fontSize: "13px", fontWeight: 600 }}>⚠️ {error}</div>}
          {success && <div style={{ color: "#16A34A", fontSize: "13px", fontWeight: 600 }}>✅ {success}</div>}
          <button type="submit" disabled={loading} style={{ padding: "14px", borderRadius: "12px", border: "none", backgroundColor: "#F97316", color: "white", fontWeight: 700, fontSize: "15px", cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1 }}>
            {loading ? "Logging in..." : "Login →"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <div style={{
        minHeight: "calc(100vh - 80px)",
        backgroundColor: "#F0F4F8",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px 16px",
        fontFamily: "'Segoe UI', system-ui, sans-serif",
      }}>
        <div style={{
          backgroundColor: "white",
          borderRadius: "20px",
          width: "100%",
          maxWidth: "440px",
          padding: "40px 32px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.12)",
        }}>

          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "28px" }}>
            <div style={{
              width: "56px", height: "56px", borderRadius: "16px",
              backgroundColor: "#EEF4FF", display: "flex", alignItems: "center",
              justifyContent: "center", fontSize: "28px", margin: "0 auto 12px",
            }}>🔐</div>
            <h1 style={{ fontSize: "24px", fontWeight: 800, color: "#1A3C6E", margin: "0 0 4px" }}>
              Welcome Back
            </h1>
            <p style={{ fontSize: "14px", color: "#6B7280", margin: 0 }}>
              Login to your ServeEasySolapur account
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

            {/* Email */}
            <div>
              <label style={labelStyle}>Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={inputStyle}
              />
            </div>

            {/* Password */}
            <div>
              <label style={labelStyle}>Password</label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={inputStyle}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)",
                    background: "none", border: "none", cursor: "pointer", color: "#9CA3AF",
                  }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Error / Success */}
            {error && (
              <div style={{
                padding: "10px 14px", borderRadius: "10px",
                backgroundColor: "#FEF2F2", border: "1px solid #FECACA",
                color: "#DC2626", fontSize: "13px", fontWeight: 600,
              }}>⚠️ {error}</div>
            )}
            {success && (
              <div style={{
                padding: "10px 14px", borderRadius: "10px",
                backgroundColor: "#F0FDF4", border: "1px solid #86EFAC",
                color: "#16A34A", fontSize: "13px", fontWeight: 600,
              }}>✅ {success}</div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: "14px", borderRadius: "12px", border: "none",
                backgroundColor: "#F97316", color: "white", fontWeight: 700,
                fontSize: "15px", cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.7 : 1, transition: "opacity 0.2s",
              }}
            >
              {loading ? "Logging in..." : "Login →"}
            </button>
          </form>

          {/* Switch to Signup */}
          <div style={{ textAlign: "center", marginTop: "20px", fontSize: "14px", color: "#6B7280" }}>
            Don't have an account?{" "}
            <Link to="/signup" style={{ color: "#F97316", fontWeight: 600, textDecoration: "none" }}>
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

// ── Shared styles ─────────────────────────────────────────────────────────────
const labelStyle = {
  display: "block", fontSize: "12px", fontWeight: 700, color: "#374151",
  textTransform: "uppercase", letterSpacing: "0.4px", marginBottom: "6px",
};

const inputStyle = {
  width: "100%", padding: "12px 14px", border: "1.5px solid #D1D5DB",
  borderRadius: "10px", fontSize: "14px", outline: "none",
  fontFamily: "inherit", boxSizing: "border-box", transition: "border-color 0.2s",
};

export default LoginPage;