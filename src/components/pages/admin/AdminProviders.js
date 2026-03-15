import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Star, MapPin } from "lucide-react";
import { getProviders, saveProviders } from "../../../services/store";

function AdminProviders() {
  const navigate = useNavigate();

  const [providers, setProviders] = useState(getProviders());
  const [search, setSearch] = useState("");

  const filtered = providers.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.specialty.toLowerCase().includes(search.toLowerCase())
  );

  const toggle = (id) => {
    const updated = providers.map((p) =>
      p.id === id
        ? { ...p, status: p.status === "active" ? "inactive" : "active" }
        : p
    );

    saveProviders(updated);
    setProviders(updated);
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1
            style={{
              color: "#1A3C6E",
              fontSize: "28px",
              fontWeight: 700,
            }}
          >
            Service Providers
          </h1>
        </div>

        <button
          onClick={() => navigate("/admin/providers/add")}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-white"
          style={{ backgroundColor: "#F97316" }}
        >
          <Plus className="w-4 h-4" />
          Add Provider
        </button>
      </div>

      {/* Card */}
      <div
        className="bg-white rounded-xl overflow-hidden"
        style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}
      >
        {/* Top Bar */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <span style={{ fontWeight: 600, color: "#1e293b" }}>
            All Providers ({filtered.length})
          </span>

          <input
            placeholder="Search…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-200 outline-none text-sm"
            style={{ width: "220px" }}
          />
        </div>

        {/* Providers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-5">
          {filtered.map((p) => (
            <div
              key={p.id}
              className="rounded-xl p-5 border border-gray-100 hover:shadow-md cursor-pointer"
              onClick={() => navigate(`/admin/providers/${p.id}`)}
            >
              {/* Top */}
              <div className="flex items-start gap-3 mb-3">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white text-lg flex-shrink-0"
                  style={{ background: "#1A3C6E" }}
                >
                  {p.name[0]}
                </div>

                <div className="flex-1 min-w-0">
                  <div
                    className="font-semibold"
                    style={{ color: "#1F2937" }}
                  >
                    {p.name}
                  </div>

                  <div
                    className="text-xs"
                    style={{ color: "#6B7280" }}
                  >
                    {p.specialty}
                  </div>
                </div>

                <span
                  className="px-2 py-1 rounded-full text-xs font-semibold"
                  style={{
                    background:
                      p.status === "active" ? "#DCFCE7" : "#FEE2E2",
                    color:
                      p.status === "active" ? "#166534" : "#DC2626",
                  }}
                >
                  {p.status}
                </span>
              </div>

              {/* Info */}
              <div
                className="space-y-1 text-sm mb-3"
                style={{ color: "#64748B" }}
              >
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  {p.location}
                </div>

                <div className="flex items-center gap-1.5">
                  <Star
                    className="w-3.5 h-3.5 fill-current"
                    style={{ color: "#F59E0B" }}
                  />
                  {p.rating} ({p.reviews} reviews)
                </div>
              </div>

              {/* Toggle Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggle(p.id);
                }}
                className="w-full py-2 rounded-lg text-xs font-semibold"
                style={{
                  background:
                    p.status === "active" ? "#FEF9C3" : "#DCFCE7",
                  color:
                    p.status === "active" ? "#92400E" : "#166534",
                }}
              >
                {p.status === "active" ? "Deactivate" : "Activate"}
              </button>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div
            className="py-12 text-center"
            style={{ color: "#94A3B8" }}
          >
            No providers found.
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminProviders;