import { useState } from "react";
import { getUsers, saveUsers, getBookings } from "../../../services/store";

function AdminCustomers() {
  const [users, setUsers] = useState(
    getUsers().filter((u) => u.role !== "admin")
  );
  const [search, setSearch] = useState("");

  const bookings = getBookings();

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  const toggleBlock = (id) => {
    const all = getUsers();

    const updatedUsers = all.map((x) =>
      x.id === id
        ? { ...x, status: x.status === "active" ? "blocked" : "active" }
        : x
    );

    saveUsers(updatedUsers);
    setUsers(updatedUsers.filter((x) => x.role !== "admin"));
  };

  return (
    <div>
      <div className="mb-6">
        <h1
          style={{
            color: "#1A3C6E",
            fontSize: "28px",
            fontWeight: 700,
          }}
        >
          Customers
        </h1>
      </div>

      <div
        className="bg-white rounded-xl overflow-hidden"
        style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}
      >
        {/* Header */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <span style={{ fontWeight: 600, color: "#1e293b" }}>
            All Customers ({filtered.length})
          </span>

          <input
            placeholder="Search…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-200 outline-none text-sm"
            style={{ width: "220px" }}
          />
        </div>

        {/* Table */}
        <table className="w-full" style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#F8FAFC" }}>
              {[
                "Customer",
                "Phone",
                "Joined",
                "Bookings",
                "Status",
                "Actions",
              ].map((h) => (
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
            {filtered.map((u) => {
              const userBookings = bookings.filter(
                (b) => b.userId === u.id
              ).length;

              return (
                <tr
                  key={u.id}
                  style={{ borderTop: "1px solid #F1F5F9" }}
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-white text-sm"
                        style={{ background: "#1A3C6E" }}
                      >
                        {u.name[0]}
                      </div>

                      <div>
                        <div
                          style={{
                            fontWeight: 500,
                            color: "#1e293b",
                            fontSize: "14px",
                          }}
                        >
                          {u.name}
                        </div>

                        <div
                          style={{
                            color: "#9CA3AF",
                            fontSize: "12px",
                          }}
                        >
                          {u.email}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td
                    className="px-5 py-4"
                    style={{ color: "#64748B", fontSize: "13px" }}
                  >
                    {u.phone}
                  </td>

                  <td
                    className="px-5 py-4"
                    style={{ color: "#64748B", fontSize: "13px" }}
                  >
                    {u.createdAt}
                  </td>

                  <td
                    className="px-5 py-4"
                    style={{ fontWeight: 600, color: "#1A3C6E" }}
                  >
                    {userBookings}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className="px-2.5 py-1 rounded-full text-xs font-semibold capitalize"
                      style={{
                        background:
                          u.status === "active" ? "#DCFCE7" : "#FEE2E2",
                        color:
                          u.status === "active" ? "#166534" : "#DC2626",
                      }}
                    >
                      {u.status}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <button
                      onClick={() => toggleBlock(u.id)}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold"
                      style={{
                        background:
                          u.status === "active" ? "#FEE2E2" : "#DCFCE7",
                        color:
                          u.status === "active" ? "#DC2626" : "#166534",
                      }}
                    >
                      {u.status === "active" ? "Block" : "Unblock"}
                    </button>
                  </td>
                </tr>
              );
            })}

            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="py-12 text-center"
                  style={{ color: "#94A3B8" }}
                >
                  No customers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminCustomers;