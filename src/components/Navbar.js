import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Home, User, LogOut, ChevronDown } from "lucide-react";

// sessionStorage helper
const getCurrentUser = () => {
  const user = sessionStorage.getItem("currentUser");
  return user ? JSON.parse(user) : null;
};

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState(getCurrentUser());
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();

  // scroll shadow
  useEffect(() => {
    const s = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", s);
    return () => window.removeEventListener("scroll", s);
  }, []);

  // update navbar on login/logout
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
    setProfileOpen(false);
    navigate("/");
  };

  return (
    <nav className={`sticky top-0 z-50 bg-white border-b ${isScrolled ? "shadow-md" : ""}`}>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: "#1A3C6E" }}>
              <Home className="w-5 h-5 text-white" />
            </div>
            <div>
              <span style={{ color: "#1A3C6E", fontWeight: 600 }}>ServeEasy</span>
              <span style={{ color: "#F97316", fontWeight: 600 }}>Solapur</span>
            </div>
          </Link>

          {/* Right side */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg"
                style={{ background: "#EEF4FF" }}
              >
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white" style={{ background: "#1A3C6E" }}>
                  {user?.name?.[0]?.toUpperCase()}
                </div>
                Hi, {user?.name?.split(" ")[0]}
                <ChevronDown className="w-4 h-4" />
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-full mt-2 w-52 bg-white shadow-lg rounded-lg border border-gray-100">
                  <button
                    onClick={() => { setProfileOpen(false); navigate("/profile"); }}
                    className="w-full px-4 py-3 flex items-center gap-2 hover:bg-gray-50"
                  >
                    <User className="w-4 h-4" /> My Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-3 flex items-center gap-2 hover:bg-red-50 text-red-600"
                  >
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <button
                onClick={() => window.dispatchEvent(new CustomEvent("openAuth", { detail: { mode: "login" } }))}
                className="px-5 py-2 rounded-lg font-semibold text-white"
                style={{ background: "#F97316" }}
              >
                Login/Sign up
              </button>

            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;