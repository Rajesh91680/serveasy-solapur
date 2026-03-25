import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import Login from "../pages/user/auth/Login";
import Signup from "../pages/user/auth/Signup";

/**
 * AuthModal — A premium popup for Login and Signup
 * Now WRAPS the actual Login and Signup components to keep logic centralized.
 */
export function AuthModal({ isOpen, onClose, initialMode = "login" }) {
  const [mode, setMode] = useState(initialMode);

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode, isOpen]);

  // Handle successful login from child components
  useEffect(() => {
    const handleLoginSuccess = () => {
      onClose();
    };
    window.addEventListener("authChange", handleLoginSuccess);
    return () => window.removeEventListener("authChange", handleLoginSuccess);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div style={styles.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div style={styles.modal}>
        {/* Close Button */}
        <button onClick={onClose} style={styles.closeBtn}>
          <X size={20} />
        </button>

        {/* Content */}
        <div style={styles.container}>
          {mode === "login" ? (
            <Login isModal={true} />
          ) : (
            <Signup isModal={true} />
          )}

          {/* Switch Footer */}
          <div style={styles.footer}>
            {mode === "login" ? (
              <>
                Don't have an account?{" "}
                <button onClick={() => setMode("signup")} style={styles.linkBtn}>
                  Sign Up
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button onClick={() => setMode("login")} style={styles.linkBtn}>
                  Login
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(15, 23, 42, 0.75)",
    backdropFilter: "blur(8px)",
    zIndex: 10000,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
  },
  modal: {
    backgroundColor: "white",
    borderRadius: "24px",
    width: "100%",
    maxWidth: "500px",
    maxHeight: "90vh",
    overflowY: "auto",
    position: "relative",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
  },
  container: {
    padding: "40px 32px 30px",
  },
  closeBtn: {
    position: "absolute",
    top: "20px",
    right: "20px",
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    border: "none",
    background: "#F1F5F9",
    color: "#64748B",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s",
    zIndex: 10,
  },
  footer: {
    textAlign: "center",
    marginTop: "24px",
    paddingTop: "16px",
    borderTop: "1px solid #F1F5F9",
    fontSize: "14px",
    color: "#64748B",
  },
  linkBtn: {
    background: "none",
    border: "none",
    color: "#F97316",
    fontWeight: 700,
    cursor: "pointer",
    padding: "0 4px",
    textDecoration: "underline",
  },
};

export default AuthModal;
