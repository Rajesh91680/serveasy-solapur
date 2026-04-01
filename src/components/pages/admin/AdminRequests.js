import { useState, useEffect, useCallback } from "react";
// Removed store.js imports - we use fetch now!

function AdminRequests() {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000/api";

  // 1. Fetch bookings from PostgreSQL
  const loadRequests = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/admin/service-requests`);
      const data = await response.json();
      if (response.ok) {
        setBookings(data);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  }, [API_URL]);

  useEffect(() => {
    loadRequests();
  }, [loadRequests]);

  // 2. Update status in PostgreSQL via API
  const updateStatus = async (id, newStatus) => {
    try {
      const response = await fetch(`${API_URL}/admin/service-requests/${id}/update-status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        // Update local state so UI changes immediately
        setBookings(prev => prev.map((b) => b.id === id ? { ...b, status: newStatus } : b));
      } else {
        alert("Failed to update status on server.");
      }
    } catch (error) {
      alert("Connection error!");
    }
  };

  // 3. Search and Filter Logic (Updated for Backend field names)
  const filtered = bookings.filter((b) => {
    const matchesSearch = 
      (b.user_name?.toLowerCase().includes(search.toLowerCase()) ||
       b.service_name?.toLowerCase().includes(search.toLowerCase()) ||
       String(b.id).includes(search));
    
    const matchesFilter = filter === "all" || b.status === filter;
    
    return matchesSearch && matchesFilter;
  });

  const statusColor = (status) =>
    status === "completed"
      ? { bg: "#DCFCE7", text: "#166534" }
      : status === "confirmed"
      ? { bg: "#DBEAFE", text: "#1E40AF" }
      : status === "cancelled"
      ? { bg: "#FEE2E2", text: "#991B1B" }
      : { bg: "#FEF9C3", text: "#854D0E" }; // Requested/Pending

  return (
    <div>
      <div className="mb-6">
        <h1 style={{ color: "#1A3C6E", fontSize: "28px", fontWeight: 700 }}>Bookings</h1>
      </div>

      <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
        {/* Top Bar (Filter & Search) */}
        <div className="p-5 border-b border-gray-100 flex flex-wrap items-center justify-between gap-3">
          <div className="flex gap-2">
            {["all", "requested", "confirmed", "completed", "cancelled"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="px-4 py-2 rounded-lg text-sm font-semibold capitalize"
                style={{
                  background: filter === f ? "#1A3C6E" : "#F1F5F9",
                  color: filter === f ? "white" : "#64748B",
                }}
              >
                {f}
              </button>
            ))}
          </div>

          <input
            placeholder="Search by name, ID or service..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-200 outline-none text-sm"
            style={{ width: "250px" }}
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr style={{ background: "#F8FAFC" }}>
                {["ID", "Customer", "Service", "Date & Time", "Status", "Actions"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-[12px] font-bold uppercase" style={{ color: "#64748B" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr><td colSpan={6} className="text-center py-10 text-gray-400">Loading bookings...</td></tr>
              ) : filtered.map((b) => {
                const s = statusColor(b.status);
                return (
                  <tr key={b.id} className="border-t border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-4 font-bold text-[#1A3C6E] text-xs">#{b.id}</td>
                    <td className="px-4 py-4">
                      <div className="font-semibold text-[#1e293b] text-sm">{b.user_name}</div>
                    </td>
                    <td className="px-4 py-4 text-sm text-[#374151]">{b.service_name}</td>
                    <td className="px-4 py-4">
                      <div className="text-xs text-[#64748B]">{b.date}</div>
                      <div className="text-[10px] text-gray-400">{b.time}</div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold capitalize" style={{ background: s.bg, color: s.text }}>
                        {b.status}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex gap-2">
                        {b.status === "requested" && (
                          <button onClick={() => updateStatus(b.id, "confirmed")} className="px-2 py-1 rounded text-[10px] font-bold bg-blue-50 text-blue-600 hover:bg-blue-100">
                            Confirm
                          </button>
                        )}
                        {b.status === "confirmed" && (
                          <button onClick={() => updateStatus(b.id, "completed")} className="px-2 py-1 rounded text-[10px] font-bold bg-green-50 text-green-600 hover:bg-green-100">
                            Complete
                          </button>
                        )}
                        {b.status !== "cancelled" && b.status !== "completed" && (
                          <button onClick={() => updateStatus(b.id, "cancelled")} className="px-2 py-1 rounded text-[10px] font-bold bg-red-50 text-red-600 hover:bg-red-100">
                            Cancel
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminRequests;