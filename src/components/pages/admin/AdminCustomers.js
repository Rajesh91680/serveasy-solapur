import { useState, useEffect, useCallback } from "react";

function AdminCustomers() {
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000/api";

  // 1. Fetch Users and Bookings from PostgreSQL
  const fetchData = useCallback(async () => {
    try {
      const userRes = await fetch(`${API_URL}/admin/users`);
      const bookingRes = await fetch(`${API_URL}/admin/service-requests`);
      
      const userData = await userRes.json();
      const bookingData = await bookingRes.json();

      if (userRes.ok) setUsers(userData);
      if (bookingRes.ok) setBookings(bookingData);
    } catch (error) {
      console.error("Error fetching customers:", error);
    } finally {
      setLoading(false);
    }
  }, [API_URL]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // 2. Search Logic
  const filtered = users.filter(
    (u) =>
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase())
  );

  // 3. Status Toggle (Placeholder - requires 'status' field in Django User model)
  const toggleBlock = (id) => {
    alert("Backend Status Update logic will be implemented next!");
  };

  return (
    <div>
      <div className="mb-6">
        <h1 style={{ color: "#1A3C6E", fontSize: "28px", fontWeight: 700 }}>
          Customers
        </h1>
      </div>

      <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
        {/* Header */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <span style={{ fontWeight: 600, color: "#1e293b" }}>
            All Customers ({filtered.length})
          </span>

          <input
            placeholder="Search by name or email…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-200 outline-none text-sm"
            style={{ width: "220px" }}
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr style={{ background: "#F8FAFC" }}>
                {["Customer", "Phone", "Joined", "Bookings", "Actions"].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-[12px] font-bold text-slate-500 uppercase">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr><td colSpan={5} className="text-center py-10 text-gray-400">Loading customers...</td></tr>
              ) : filtered.map((u) => {
                // Calculate real booking count from our database
                const userBookings = bookings.filter((b) => b.user === u.id).length;

                return (
                  <tr key={u.id} className="border-t border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-white text-sm" style={{ background: "#1A3C6E" }}>
                          {u.name ? u.name[0] : "?"}
                        </div>
                        <div>
                          <div style={{ fontWeight: 500, color: "#1e293b", fontSize: "14px" }}>{u.name}</div>
                          <div style={{ color: "#9CA3AF", fontSize: "12px" }}>{u.email}</div>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4" style={{ color: "#64748B", fontSize: "13px" }}>
                      {u.phone || "No phone"}
                    </td>

                    <td className="px-5 py-4" style={{ color: "#64748B", fontSize: "13px" }}>
                      {new Date(u.created_at).toLocaleDateString()}
                    </td>

                    <td className="px-5 py-4" style={{ fontWeight: 600, color: "#1A3C6E" }}>
                      {userBookings}
                    </td>

                    <td className="px-5 py-4">
                      <button
                        onClick={() => toggleBlock(u.id)}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-50 text-red-600 hover:bg-red-100"
                      >
                        Block
                      </button>
                    </td>
                  </tr>
                );
              })}

              {!loading && filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-400">
                    No customers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminCustomers;