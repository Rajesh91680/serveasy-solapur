import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../../../Navbar";

const API_URL = "http://127.0.0.1:8000/api/";

/**
 * SignupPage — standalone page at "/signup"
 *
 * Responsibilities:
 *   ✅ Handles signup form & validation
 *   ✅ Calls POST /api/auth/register/
 *   ✅ Navigates to /login on success
 */
function SignupPage({ isModal = false }) {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [addressTitle, setAddressTitle] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");
  const [pinCode, setPinCode] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // ── Validation ──────────────────────────────────────────────────────────────
  const validate = () => {
    if (!name.trim()) return "Full name is required.";
    if (name.trim().length < 3) return "Full name must be at least 3 characters.";
    if (!phone.trim()) return "Phone number is required.";
    if (!/^\d{10}$/.test(phone.trim())) return "Phone number must be 10 digits.";
    if (!email.trim()) return "Email is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return "Enter a valid email.";
    if (!password.trim()) return "Password is required.";
    if (password.length < 6) return "Password must be at least 6 characters.";
    if (!addressTitle.trim()) return "Address title is required.";
    if (!addressLine1.trim()) return "Address Line 1 is required.";
    if (addressLine1.trim().length < 5) return "Address Line 1 is too short.";
    if (!city.trim()) return "City is required.";
    if (!area.trim()) return "Area is required.";
    if (!pinCode.trim()) return "Pin Code is required.";
    if (!/^\d{6}$/.test(pinCode.trim())) return "Pin Code must be 6 digits.";
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
      await axios.post(API_URL + "auth/register/", {
        name: name.trim(),
        email: email.trim(),
        password,
        phone: phone.trim(),
        title: addressTitle.trim(),
        address_line: addressLine1.trim(),
        city: city.trim(),
        area: area.trim(),
        pin_code: pinCode.trim(),
      });

      setSuccess("Account created successfully! Redirecting to login...");
      setError("");

      // Redirect to login after short delay
      setTimeout(() => navigate("/login"), 1500);

    } catch (err) {
      setError(
        err.response?.data?.email?.[0] ||
        err.response?.data?.error ||
        "Something went wrong."
      );
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
          }}>📝</div>
          <h1 style={{ fontSize: "22px", fontWeight: 800, color: "#1A3C6E", margin: "0 0 4px" }}>
            Create Account
          </h1>
          <p style={{ fontSize: "14px", color: "#6B7280", margin: 0 }}>
            Join ServeEasySolapur today
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px", maxHeight: "60vh", overflowY: "auto", paddingRight: "4px" }}>
          <div>
            <label style={labelStyle}>Full Name *</label>
            <input placeholder="Your full name" value={name} onChange={(e) => setName(e.target.value)} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Phone Number *</label>
            <input placeholder="10-digit number" value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))} maxLength={10} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Email Address *</label>
            <input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Password *</label>
            <input type="password" placeholder="Min 6 chars" value={password} onChange={(e) => setPassword(e.target.value)} style={inputStyle} />
          </div>

          <div style={{ borderTop: "1px solid #E5E7EB", marginTop: "4px", paddingTop: "8px" }}>
            <div style={{ fontSize: "10px", fontWeight: 800, color: "#374151", textTransform: "uppercase", marginBottom: "8px" }}>📍 Address</div>
          </div>

          <div>
            <label style={labelStyle}>Line 1 *</label>
            <input placeholder="House No, Street" value={addressLine1} onChange={(e) => setAddressLine1(e.target.value)} style={inputStyle} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
            <div>
              <label style={labelStyle}>Area *</label>
              <input placeholder="Jule Solapur" value={area} onChange={(e) => setArea(e.target.value)} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Pincode *</label>
              <input placeholder="413001" value={pinCode} onChange={(e) => setPinCode(e.target.value.replace(/\D/g, ""))} maxLength={6} style={inputStyle} />
            </div>
          </div>

          {error && <div style={{ color: "#DC2626", fontSize: "12px", fontWeight: 600 }}>⚠️ {error}</div>}
          {success && <div style={{ color: "#16A34A", fontSize: "12px", fontWeight: 600 }}>✅ {success}</div>}

          <button type="submit" disabled={loading} style={{ padding: "14px", borderRadius: "12px", border: "none", backgroundColor: "#1A3C6E", color: "white", fontWeight: 700, fontSize: "15px", cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1 }}>
            {loading ? "Registering..." : "Create Account →"}
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
          maxWidth: "500px",
          padding: "36px 32px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.12)",
          maxHeight: "90vh",
          overflowY: "auto",
        }}>

          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "24px" }}>
            <div style={{
              width: "56px", height: "56px", borderRadius: "16px",
              backgroundColor: "#EEF4FF", display: "flex", alignItems: "center",
              justifyContent: "center", fontSize: "28px", margin: "0 auto 12px",
            }}>📝</div>
            <h1 style={{ fontSize: "24px", fontWeight: 800, color: "#1A3C6E", margin: "0 0 4px" }}>
              Create Account
            </h1>
            <p style={{ fontSize: "14px", color: "#6B7280", margin: 0 }}>
              Join ServeEasySolapur today
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>

            {/* Full Name */}
            <div>
              <label style={labelStyle}>Full Name *</label>
              <input
                placeholder="Your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={inputStyle}
              />
            </div>

            {/* Phone */}
            <div>
              <label style={labelStyle}>Phone Number *</label>
              <input
                placeholder="10-digit phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                maxLength={10}
                style={inputStyle}
              />
            </div>

            {/* Email */}
            <div>
              <label style={labelStyle}>Email Address *</label>
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
              <label style={labelStyle}>Password *</label>
              <input
                type="password"
                placeholder="Minimum 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={inputStyle}
              />
            </div>

            {/* Divider */}
            <div style={{ borderTop: "1px solid #E5E7EB", marginTop: "4px", paddingTop: "10px" }}>
              <div style={{ fontSize: "12px", fontWeight: 800, color: "#374151", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "10px" }}>
                📍 Address Details
              </div>
            </div>

            {/* Address Title */}
            <div>
              <label style={labelStyle}>Title *</label>
              <input
                placeholder="Home / Office / Shop"
                value={addressTitle}
                onChange={(e) => setAddressTitle(e.target.value)}
                style={inputStyle}
              />
            </div>

            {/* Address Line 1 */}
            <div>
              <label style={labelStyle}>Address Line 1 *</label>
              <input
                placeholder="House No, Street Name"
                value={addressLine1}
                onChange={(e) => setAddressLine1(e.target.value)}
                style={inputStyle}
              />
            </div>

            {/* City + Area + Pincode */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px" }}>
              <div>
                <label style={labelStyle}>City *</label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  style={inputStyle}
                >
                  <option value="">Select</option>
                  <option value="Solapur">Solapur</option>
                </select>
              </div>

              <div>
                <label style={labelStyle}>Area *</label>
                <select
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  style={inputStyle}
                >
                  <option value="">Select</option>
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

              <div>
                <label style={labelStyle}>Pincode *</label>
                <input
                  placeholder="413001"
                  value={pinCode}
                  onChange={(e) => setPinCode(e.target.value.replace(/\D/g, ""))}
                  maxLength={6}
                  style={inputStyle}
                />
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
                backgroundColor: "#1A3C6E", color: "white", fontWeight: 700,
                fontSize: "15px", cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.7 : 1, transition: "opacity 0.2s",
                marginTop: "4px",
              }}
            >
              {loading ? "Creating account..." : "Create Account →"}
            </button>
          </form>

          {/* Switch to Login */}
          <div style={{ textAlign: "center", marginTop: "20px", fontSize: "14px", color: "#6B7280" }}>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "#F97316", fontWeight: 600, textDecoration: "none" }}>
              Login
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

export default SignupPage;