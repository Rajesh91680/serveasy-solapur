import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Home, User, LogOut, ChevronDown } from "lucide-react";

// sessionStorage helper
const getCurrentUser = () => {
  const user = sessionStorage.getItem("currentUser");
  return user ? JSON.parse(user) : null;
};

/**
 * Navbar component
 * Clean, responsive and uses shared AuthModal logic via events
 */
export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState(getCurrentUser());
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Update Navbar on auth state changes
  useEffect(() => {
    const handleAuthChange = () => {
      setUser(getCurrentUser());
    };
    window.addEventListener("authChange", handleAuthChange);
    return () => window.removeEventListener("authChange", handleAuthChange);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("currentUser");
    sessionStorage.removeItem("selectedAddress");
    setUser(null);
    localStorage.removeItem("access_token");
    setProfileOpen(false);
    navigate("/");
    window.dispatchEvent(new Event("authChange"));
  };

  const openAuthModal = (mode = "login") => {
    window.dispatchEvent(new CustomEvent("openAuth", { detail: { mode } }));
  };

  return (
    <nav className={`sticky top-0 z-50 bg-white border-b ${isScrolled ? "shadow-md" : ""}`}>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full flex items-center justify-center transition-transform hover:scale-110" style={{ backgroundColor: "#1A3C6E" }}>
              <Home className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col sm:flex-row sm:gap-1">
              <span className="text-[#1A3C6E] font-bold text-lg leading-tight sm:leading-normal">ServeEasy</span>
              <span className="text-[#F97316] font-bold text-lg leading-tight sm:leading-normal">Solapur</span>
            </div>
          </Link>

          {/* Action Area */}
          <div className="flex items-center gap-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 border border-slate-100 transition-all hover:bg-slate-100"
                >
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold" style={{ background: "#1A3C6E" }}>
                    {user?.name?.[0]?.toUpperCase() || "U"}
                  </div>
                  <span className="hidden sm:inline-block font-medium text-slate-700">
                    Hi, {user?.name?.split(" ")[0]}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${profileOpen ? "rotate-180" : ""}`} />
                </button>

                {/* Dropdown Menu */}
                {profileOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setProfileOpen(false)} />
                    <div className="absolute right-0 top-full mt-2 w-52 bg-white shadow-2xl rounded-2xl border border-slate-100 overflow-hidden z-20 transition-all animate-in slide-in-from-top-2">
                      <button
                        onClick={() => { setProfileOpen(false); navigate("/profile"); }}
                        className="w-full px-4 py-3.5 flex items-center gap-3 hover:bg-slate-50 transition-colors text-slate-600 font-medium"
                      >
                        <div className="w-8 h-8 rounded flex items-center justify-center bg-blue-50 text-blue-600">
                            <User size={18} />
                        </div>
                        My Profile
                      </button>
                      <button
                        onClick={handleLogout}
                        className="w-full px-4 py-3.5 flex items-center gap-3 hover:bg-red-50 transition-colors text-red-600 font-medium border-t border-slate-50"
                      >
                        <div className="w-8 h-8 rounded flex items-center justify-center bg-red-50 text-red-600">
                            <LogOut size={18} />
                        </div>
                        Logout
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <button
                onClick={() => openAuthModal("login")}
                className="px-6 py-2.5 rounded-xl font-bold text-white bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 transition-all shadow-md hover:shadow-lg active:scale-95"
              >
                Login / Sign Up
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;