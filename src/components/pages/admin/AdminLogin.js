import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Home, Eye, EyeOff } from "lucide-react";
import {
  loginUser,
  setCurrentUser,
  setAdminLoggedIn,
} from "../../../services/store";

function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPw, setShowPw] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const found = loginUser(email.trim(), password);

    if (!found || found.role !== "admin") {
      setError("Invalid admin credentials.");
      return;
    }

    setCurrentUser(found);
    setAdminLoggedIn(true);
    navigate("/admin");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: "linear-gradient(135deg,#0F172A,#1E293B)" }}
    >
      <div
        style={{
          background: "white",
          borderRadius: "20px",
          padding: "48px 40px",
          width: "420px",
          maxWidth: "95vw",
          boxShadow: "0 25px 60px rgba(0,0,0,0.4)",
        }}
      >
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center"
            style={{ background: "#F97316" }}
          >
            <Home className="w-7 h-7 text-white" />
          </div>
        </div>

        <h2
          style={{
            textAlign: "center",
            color: "#1A3C6E",
            fontSize: "24px",
            fontWeight: 700,
            marginBottom: "6px",
          }}
        >
          Admin Login
        </h2>

        <p
          style={{
            textAlign: "center",
            color: "#9CA3AF",
            fontSize: "14px",
            marginBottom: "28px",
          }}
        >
          ServeEasy Solapur
        </p>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <label
            style={{
              fontSize: "13px",
              fontWeight: 600,
              color: "#374151",
              display: "block",
              marginBottom: "6px",
            }}
          >
            Email
          </label>

          <input
            type="email"
            placeholder="admin@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              display: "block",
              width: "100%",
              padding: "11px 14px",
              marginBottom: "16px",
              borderRadius: "10px",
              border: "2px solid #E5E7EB",
              fontSize: "14px",
              boxSizing: "border-box",
              outline: "none",
              background: "#F8FAFC",
            }}
          />

          {/* Password */}
          <label
            style={{
              fontSize: "13px",
              fontWeight: 600,
              color: "#374151",
              display: "block",
              marginBottom: "6px",
            }}
          >
            Password
          </label>

          <div style={{ position: "relative", marginBottom: "16px" }}>
            <input
              type={showPw ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                display: "block",
                width: "100%",
                padding: "11px 44px 11px 14px",
                borderRadius: "10px",
                border: "2px solid #E5E7EB",
                fontSize: "14px",
                boxSizing: "border-box",
                outline: "none",
                background: "#F8FAFC",
              }}
            />

            <button
              type="button"
              onClick={() => setShowPw(!showPw)}
              style={{
                position: "absolute",
                right: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#9CA3AF",
                padding: 0,
                display: "flex",
                alignItems: "center",
              }}
            >
              {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Error */}
          {error && (
            <div
              style={{
                background: "#FEE2E2",
                color: "#DC2626",
                padding: "10px 14px",
                borderRadius: "8px",
                fontSize: "13px",
                marginBottom: "16px",
              }}
            >
              ❌ {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "13px",
              backgroundColor: "#1A3C6E",
              color: "white",
              border: "none",
              borderRadius: "10px",
              fontSize: "16px",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Sign In as Admin
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;