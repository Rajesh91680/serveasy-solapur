import { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  UserCircle,
  ClipboardList,
  Settings,
  Home,
  LogOut,
  Wrench,
  ChevronDown,
  Star,
} from "lucide-react";

import {
  isAdminLoggedIn,
  setAdminLoggedIn,
  setCurrentUser,
} from "../../../services/store";

const navItems = [
  { path: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { path: "/admin/bookings", label: "Bookings", icon: ClipboardList },
  { path: "/admin/customers", label: "Customers", icon: UserCircle },
  { path: "/admin/providers", label: "Service Providers", icon: Users },
  { path: "/admin/services", label: "Services Catalog", icon: Wrench },

  // Ratings Menu
  { path: "/admin/ratings", label: "Ratings", icon: Star },

  { path: "/admin/settings", label: "Settings", icon: Settings },
];

function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    if (!isAdminLoggedIn()) navigate("/admin/login", { replace: true });
  }, [navigate]);

  if (!isAdminLoggedIn()) return null;

  const handleLogout = () => {
    setAdminLoggedIn(false);
    setCurrentUser(null);
    navigate("/");
  };

  const isActive = (item) =>
    item.exact
      ? location.pathname === item.path
      : location.pathname.startsWith(item.path);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside
        className="w-[240px] fixed left-0 top-0 h-full flex flex-col"
        style={{ backgroundColor: "#0F172A" }}
      >
        <div className="p-6 flex-1 overflow-y-auto">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-8">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "#F97316" }}
            >
              <Home className="w-5 h-5 text-white" />
            </div>

            <div>
              <span
                style={{
                  color: "white",
                  fontWeight: 700,
                  fontSize: "18px",
                }}
              >
                ServeEasy
              </span>

              <div style={{ color: "#64748B", fontSize: "11px" }}>
                Admin Panel
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const active = isActive(item);
              const Icon = item.icon;

              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all"
                  style={{
                    backgroundColor: active
                      ? "rgba(249,115,22,0.15)"
                      : "transparent",
                    borderLeft: active
                      ? "3px solid #F97316"
                      : "3px solid transparent",
                    color: active ? "white" : "#94A3B8",
                  }}
                >
                  <Icon className="w-5 h-5" />

                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: active ? 600 : 400,
                    }}
                  >
                    {item.label}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Logout */}
        <div className="p-4 border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg"
            style={{
              background: "rgba(239,68,68,0.15)",
              color: "#FCA5A5",
            }}
          >
            <LogOut className="w-5 h-5" />
            <span style={{ fontSize: "14px" }}>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="ml-[240px] flex-1">
        {/* Header */}
        <header
          className="h-16 border-b flex items-center justify-between px-8 sticky top-0 z-40"
          style={{
            backgroundColor: "white",
            borderColor: "#E5E7EB",
          }}
        >
          <span
            style={{
              color: "#111827",
              fontSize: "18px",
              fontWeight: 600,
            }}
          >
            Admin Panel
          </span>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50"
              style={{ border: "1.5px solid #E5E7EB" }}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-white text-sm"
                style={{ backgroundColor: "#F97316" }}
              >
                A
              </div>

              <div className="text-left">
                <div
                  style={{
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "#1F2937",
                  }}
                >
                  Admin
                </div>

                <div
                  style={{
                    fontSize: "11px",
                    color: "#9CA3AF",
                  }}
                >
                  admin@gmail.com
                </div>
              </div>

              <ChevronDown
                className="w-4 h-4"
                style={{ color: "#9CA3AF" }}
              />
            </button>

            {profileOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setProfileOpen(false)}
                />

                <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-xl shadow-lg border border-gray-100 z-50 overflow-hidden">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <div
                      style={{
                        fontSize: "13px",
                        fontWeight: 600,
                        color: "#1F2937",
                      }}
                    >
                      Administrator
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setProfileOpen(false);
                      navigate("/admin/settings");
                    }}
                    className="w-full text-left px-4 py-3 text-sm hover:bg-gray-50 flex items-center gap-2"
                    style={{ color: "#374151" }}
                  >
                    <Settings className="w-4 h-4" />
                    Settings
                  </button>

                  <div className="border-t border-gray-100">
                    <button
                      onClick={() => {
                        setProfileOpen(false);
                        handleLogout();
                      }}
                      className="w-full text-left px-4 py-3 text-sm hover:bg-red-50 flex items-center gap-2"
                      style={{ color: "#DC2626" }}
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </header>

        {/* Page Content */}
        <main
          className="p-8"
          style={{
            backgroundColor: "#F8F9FA",
            minHeight: "calc(100vh - 4rem)",
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;