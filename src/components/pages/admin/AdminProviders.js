import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Star, MapPin } from "lucide-react";

function AdminProviders() {
  const navigate = useNavigate();

  const [providers, setProviders] = useState([]);
  const [search, setSearch] = useState("");

  // ================= LOAD PROVIDERS =================
  useEffect(() => {
    loadProviders();
  }, []);

  const loadProviders = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/providers");
      const data = await res.json();

      console.log("PROVIDERS:", data); // 🔥 DEBUG

      setProviders(data); // ✅ simple & correct
    } catch (error) {
      console.error("Error fetching providers:", error);
    }
  };

  // ================= FILTER =================
  const filtered = providers.filter(
    (p) =>
      (p.name || "").toLowerCase().includes(search.toLowerCase()) ||
      (p.specialty || "").toLowerCase().includes(search.toLowerCase())
  );

  // ================= TOGGLE STATUS =================
  const toggle = async (id) => {
    try {
      const provider = providers.find((p) => p.id === id);

      await fetch(`http://127.0.0.1:8000/api/providers/${id}/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...provider,
          status: provider.status === "active" ? "inactive" : "active",
        }),
      });

      loadProviders(); // refresh after toggle
    } catch (error) {
      console.error("Error updating provider:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* HEADER */}
      <div className="mb-6 flex items-center justify-between">
        <h1 style={{ color: "#1A3C6E", fontSize: "28px", fontWeight: 700 }}>
          Service Providers
        </h1>

        <button
          onClick={() => navigate("/admin/providers/add")}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-white"
          style={{ backgroundColor: "#F97316" }}
        >
          <Plus className="w-4 h-4" />
          Add Provider
        </button>
      </div>

      {/* CARD */}
      <div className="bg-white rounded-xl shadow">

        {/* SEARCH */}
        <div className="p-5 flex justify-between items-center">
          <span className="font-semibold text-gray-600">
            All Providers ({filtered.length})
          </span>

          <input
            placeholder="Search…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 border rounded"
          />
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-5">
          {filtered.map((p) => (
            <div
              key={p.id}
              className="rounded-xl p-5 border hover:shadow-md cursor-pointer"
              onClick={() => navigate(`/admin/providers/${p.id}`)}
            >
              {/* TOP */}
              <div className="flex items-start gap-3 mb-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white bg-blue-900">
                  {(p.name || "A")[0]}
                </div>

                <div className="flex-1">
                  <div className="font-semibold">{p.name || "No Name"}</div>
                  <div className="text-xs text-gray-500">
                    {p.specialty || "No Specialty"}
                  </div>
                </div>

                <span
                  className={`px-2 py-1 text-xs rounded ${
                    p.status === "active"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {p.status || "inactive"}
                </span>
              </div>

              {/* INFO */}
              <div className="text-sm text-gray-500 mb-3 space-y-1">
                <div className="flex items-center gap-1">
                  <MapPin size={14} />
                  {p.location || "No location"}
                </div>

                <div className="flex items-center gap-1">
                  <Star size={14} />
                  {p.rating || 0} ({p.reviews || 0} reviews)
                </div>
              </div>

              {/* TOGGLE */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggle(p.id);
                }}
                className="w-full py-2 text-xs font-semibold rounded bg-yellow-100"
              >
                {p.status === "active" ? "Deactivate" : "Activate"}
              </button>
            </div>
          ))}
        </div>

        {/* EMPTY */}
        {filtered.length === 0 && (
          <div className="py-12 text-center text-gray-400">
            No providers found.
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminProviders;