import { useState, useEffect, useCallback } from "react"; // Added useCallback
import { useNavigate } from "react-router-dom";
import { Users, ClipboardList, UserCircle, Wrench } from "lucide-react";

function AdminDashboard() {
  const navigate = useNavigate();

  // State to store real data from Backend
  const [stats, setStats] = useState({
    total_users: 0,
    total_providers: 0,
    active_providers: 0,
    total_requests: 0,
    completed_requests: 0,
  });
  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000/api";

  // 1. Wrapped fetchDashboardData in useCallback to fix ESLint warning
  // This "memorizes" the function so it doesn't change on every render
  const fetchDashboardData = useCallback(async () => {
    try {
      // Fetch Stats (Total counts)
      const statsRes = await fetch(`${API_URL}/admin/stats`);
      const statsData = await statsRes.json();

      // Fetch Recent Bookings (For the table)
      const bookingsRes = await fetch(`${API_URL}/admin/service-requests`);
      const bookingsData = await bookingsRes.json();

      if (statsRes.ok) setStats(statsData);
      if (bookingsRes.ok) setRecentBookings(bookingsData.slice(0, 5)); // Only top 5
    } catch (error) {
      console.error("Dashboard Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  }, [API_URL]); // Function only recreates if API_URL changes

  // 2. Added fetchDashboardData to the dependency array
  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  // Card configuration using real stats
  const statCards = [
    {
      label: "Total Bookings",
      value: stats.total_requests,
      icon: ClipboardList,
      color: "#1A3C6E",
      bg: "#EEF4FF",
      path: "/admin/bookings",
    },
    {
      label: "Completed",
      value: stats.completed_requests,
      icon: Wrench,
      color: "#16A34A",
      bg: "#DCFCE7",
      path: "/admin/bookings",
    },
    {
      label: "Active Providers",
      value: stats.active_providers,
      icon: Users,
      color: "#F97316",
      bg: "#FFF7ED",
      path: "/admin/providers",
    },
    {
      label: "Customers",
      value: stats.total_users,
      icon: UserCircle,
      color: "#7C3AED",
      bg: "#EDE9FE",
      path: "/admin/customers",
    },
  ];

  const statusColor = (status) =>
    status === "completed"
      ? { bg: "#DCFCE7", text: "#166534" }
      : status === "confirmed"
        ? { bg: "#DBEAFE", text: "#1E40AF" }
        : { bg: "#FEE2E2", text: "#991B1B" };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 style={{ color: "#1A3C6E", fontSize: "28px", fontWeight: 700 }}>Dashboard</h1>
        <p style={{ color: "#6B7280", fontSize: "14px" }}>Welcome back, Admin.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {statCards.map((s) => {
          const Icon = s.icon;
          return (
            <button
              key={s.label}
              onClick={() => navigate(s.path)}
              className="bg-white rounded-xl p-6 text-left hover:shadow-md transition-shadow"
              style={{ border: "1px solid #F1F5F9" }}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: s.bg }}>
                <Icon className="w-6 h-6" style={{ color: s.color }} />
              </div>
              <div style={{ fontSize: "32px", fontWeight: 700, color: s.color, lineHeight: 1 }}>
                {loading ? "..." : s.value}
              </div>
              <div style={{ color: "#64748B", fontSize: "13px", marginTop: "4px" }}>{s.label}</div>
            </button>
          );
        })}
      </div>

      {/* Recent Bookings Table */}
      <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
          <h2 style={{ fontWeight: 700, color: "#1e293b", fontSize: "16px" }}>Recent Bookings</h2>
          <button onClick={() => navigate("/admin/bookings")} className="text-sm font-semibold" style={{ color: "#1A3C6E" }}>
            View All →
          </button>
        </div>

        <table className="w-full border-collapse">
          <thead>
            <tr style={{ background: "#F8FAFC" }}>
              {["ID", "Customer", "Service", "Date", "Status"].map((h) => (
                <th key={h} className="text-left px-5 py-3 text-xs font-bold uppercase" style={{ color: "#64748B" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {recentBookings.map((b) => {
              const s = statusColor(b.status);
              return (
                <tr key={b.id} className="border-t border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4 font-bold text-sm" style={{ color: "#1A3C6E" }}>#{b.id}</td>
                  <td className="px-5 py-4">
                    <div className="font-semibold text-sm text-slate-800">{b.user_name}</div>
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-600">{b.service_name}</td>
                  <td className="px-5 py-4 text-xs text-slate-400">{b.date}</td>
                  <td className="px-5 py-4">
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase" style={{ background: s.bg, color: s.text }}>
                      {b.status}
                    </span>
                  </td>
                </tr>
              );
            })}
            {!loading && recentBookings.length === 0 && (
              <tr>
                <td colSpan={5} className="py-12 text-center text-slate-400">No bookings yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminDashboard;