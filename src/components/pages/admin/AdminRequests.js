import { useState } from "react";
import { getBookings, saveBookings } from "../../../services/store";

function AdminRequests() {
  const [bookings, setBookings] = useState(getBookings());
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filtered = bookings.filter(
    (b) =>
      (b.userName.toLowerCase().includes(search.toLowerCase()) ||
        b.service.toLowerCase().includes(search.toLowerCase()) ||
        b.id.toLowerCase().includes(search.toLowerCase())) &&
      (filter === "all" || b.status === filter)
  );

  const updateStatus = (id, status) => {
    const updated = bookings.map((b) =>
      b.id === id ? { ...b, status } : b
    );
    saveBookings(updated);
    setBookings(updated);
  };

  const statusColor = (status) =>
    status === "completed"
      ? { bg: "#DCFCE7", text: "#166534" }
      : status === "confirmed"
      ? { bg: "#DBEAFE", text: "#1E40AF" }
      : { bg: "#FEE2E2", text: "#991B1B" };

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1
          style={{
            color: "#1A3C6E",
            fontSize: "28px",
            fontWeight: 700,
          }}
        >
          Bookings
        </h1>
      </div>

      <div
        className="bg-white rounded-xl overflow-hidden"
        style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}
      >
        {/* Top Bar */}
        <div className="p-5 border-b border-gray-100 flex flex-wrap items-center justify-between gap-3">
          <div className="flex gap-2">
            {["all", "confirmed", "completed", "cancelled"].map((f) => (
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
            placeholder="Search…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-200 outline-none text-sm"
            style={{ width: "220px" }}
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full" style={{ borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#F8FAFC" }}>
                {[
                  "ID",
                  "Customer",
                  "Service",
                  "Date",
                  "Address",
                  "Amount",
                  "Status",
                  "Actions",
                ].map((h) => (
                  <th
                    key={h}
                    className="text-left px-4 py-3"
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
              {filtered.map((b) => {
                const s = statusColor(b.status);

                return (
                  <tr
                    key={b.id}
                    style={{ borderTop: "1px solid #F1F5F9" }}
                  >
                    <td
                      className="px-4 py-4"
                      style={{
                        fontWeight: 600,
                        color: "#1A3C6E",
                        fontSize: "12px",
                      }}
                    >
                      {b.id}
                    </td>

                    <td className="px-4 py-4">
                      <div
                        style={{
                          fontWeight: 500,
                          color: "#1e293b",
                          fontSize: "13px",
                        }}
                      >
                        {b.userName}
                      </div>

                      <div
                        style={{
                          color: "#9CA3AF",
                          fontSize: "11px",
                        }}
                      >
                        {b.userEmail}
                      </div>
                    </td>

                    <td
                      className="px-4 py-4"
                      style={{ color: "#374151", fontSize: "13px" }}
                    >
                      {b.service}
                    </td>

                    <td
                      className="px-4 py-4"
                      style={{ color: "#64748B", fontSize: "12px" }}
                    >
                      {b.date} {b.time}
                    </td>

                    <td
                      className="px-4 py-4"
                      style={{ color: "#64748B", fontSize: "12px" }}
                    >
                      {b.address}
                    </td>

                    <td
                      className="px-4 py-4"
                      style={{
                        fontWeight: 700,
                        color: "#16A34A",
                        fontSize: "13px",
                      }}
                    >
                      {b.amount}
                    </td>

                    <td className="px-4 py-4">
                      <span
                        className="px-2.5 py-1 rounded-full text-xs font-semibold capitalize"
                        style={{
                          background: s.bg,
                          color: s.text,
                        }}
                      >
                        {b.status}
                      </span>
                    </td>

                    <td className="px-4 py-4">
                      <div className="flex gap-1">
                        {b.status === "confirmed" && (
                          <button
                            onClick={() =>
                              updateStatus(b.id, "completed")
                            }
                            className="px-2 py-1 rounded text-xs font-semibold"
                            style={{
                              background: "#DCFCE7",
                              color: "#166534",
                            }}
                          >
                            Complete
                          </button>
                        )}

                        {b.status !== "cancelled" && (
                          <button
                            onClick={() =>
                              updateStatus(b.id, "cancelled")
                            }
                            className="px-2 py-1 rounded text-xs font-semibold"
                            style={{
                              background: "#FEE2E2",
                              color: "#DC2626",
                            }}
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}

              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={8}
                    className="px-5 py-12 text-center"
                    style={{ color: "#94A3B8" }}
                  >
                    No bookings found.
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

export default AdminRequests;