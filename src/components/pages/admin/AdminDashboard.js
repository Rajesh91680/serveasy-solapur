import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Users, ClipboardList, UserCircle, Wrench } from "lucide-react";
import { getBookings, getProviders, getUsers } from "../../../services/store";

function AdminDashboard() {
  const navigate = useNavigate();

  const [bookings] = useState(getBookings());
  const [providers] = useState(getProviders());
  const [users] = useState(getUsers());

  const stats = [
    {
      label: "Total Bookings",
      value: bookings.length,
      icon: ClipboardList,
      color: "#1A3C6E",
      bg: "#EEF4FF",
      path: "/admin/bookings",
    },
    {
      label: "Completed",
      value: bookings.filter((b) => b.status === "completed").length,
      icon: Wrench,
      color: "#16A34A",
      bg: "#DCFCE7",
      path: "/admin/bookings",
    },
    {
      label: "Active Providers",
      value: providers.filter((p) => p.status === "active").length,
      icon: Users,
      color: "#F97316",
      bg: "#FFF7ED",
      path: "/admin/providers",
    },
    {
      label: "Customers",
      value: users.filter((u) => u.role !== "admin").length,
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
        <h1 style={{ color: "#1A3C6E", fontSize: "28px", fontWeight: 700 }}>
          Dashboard
        </h1>
        <p style={{ color: "#6B7280", fontSize: "14px" }}>
          Welcome back, Admin.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {stats.map((s) => {
          const Icon = s.icon;

          return (
            <button
              key={s.label}
              onClick={() => navigate(s.path)}
              className="bg-white rounded-xl p-6 text-left hover:shadow-md"
              style={{ border: "1px solid #F1F5F9" }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: s.bg }}
              >
                <Icon className="w-6 h-6" style={{ color: s.color }} />
              </div>

              <div
                style={{
                  fontSize: "32px",
                  fontWeight: 700,
                  color: s.color,
                  lineHeight: 1,
                }}
              >
                {s.value}
              </div>

              <div
                style={{
                  color: "#64748B",
                  fontSize: "13px",
                  marginTop: "4px",
                }}
              >
                {s.label}
              </div>
            </button>
          );
        })}
      </div>

      {/* Recent Bookings */}
      <div
        className="bg-white rounded-xl overflow-hidden"
        style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}
      >
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
          <h2
            style={{
              fontWeight: 700,
              color: "#1e293b",
              fontSize: "16px",
            }}
          >
            Recent Bookings
          </h2>

          <button
            onClick={() => navigate("/admin/bookings")}
            className="text-sm font-semibold"
            style={{ color: "#1A3C6E" }}
          >
            View All →
          </button>
        </div>

        <table className="w-full" style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#F8FAFC" }}>
              {["ID", "Customer", "Service", "Date", "Status"].map((h) => (
                <th
                  key={h}
                  className="text-left px-5 py-3"
                  style={{
                    color: "#64748B",
                    fontSize: "12px",
                    fontWeight: 600,
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {bookings.slice(0, 5).map((b) => {
              const s = statusColor(b.status);

              return (
                <tr
                  key={b.id}
                  style={{ borderTop: "1px solid #F1F5F9" }}
                >
                  <td
                    className="px-5 py-4"
                    style={{
                      fontWeight: 600,
                      color: "#1A3C6E",
                      fontSize: "13px",
                    }}
                  >
                    {b.id}
                  </td>

                  <td className="px-5 py-4">
                    <div
                      style={{
                        fontWeight: 500,
                        color: "#1e293b",
                        fontSize: "14px",
                      }}
                    >
                      {b.userName}
                    </div>

                    <div
                      style={{
                        color: "#9CA3AF",
                        fontSize: "12px",
                      }}
                    >
                      {b.userEmail}
                    </div>
                  </td>

                  <td
                    className="px-5 py-4"
                    style={{ color: "#374151", fontSize: "14px" }}
                  >
                    {b.service}
                  </td>

                  <td
                    className="px-5 py-4"
                    style={{ color: "#64748B", fontSize: "13px" }}
                  >
                    {b.date}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className="px-2.5 py-1 rounded-full text-xs font-semibold capitalize"
                      style={{ background: s.bg, color: s.text }}
                    >
                      {b.status}
                    </span>
                  </td>
                </tr>
              );
            })}

            {bookings.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="py-12 text-center"
                  style={{ color: "#94A3B8" }}
                >
                  No bookings yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
        {[
          { label: "Manage Bookings", path: "/admin/bookings", color: "#1A3C6E" },
          { label: "Manage Providers", path: "/admin/providers", color: "#F97316" },
          { label: "View Customers", path: "/admin/customers", color: "#7C3AED" },
          { label: "Services Catalog", path: "/admin/services", color: "#16A34A" },
          { label: "Settings", path: "/admin/settings", color: "#0EA5E9" },
        ].map((a) => (
          <button
            key={a.label}
            onClick={() => navigate(a.path)}
            className="py-4 px-5 rounded-xl text-left font-semibold text-white hover:opacity-90"
            style={{ background: a.color, fontSize: "14px" }}
          >
            {a.label} →
          </button>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;