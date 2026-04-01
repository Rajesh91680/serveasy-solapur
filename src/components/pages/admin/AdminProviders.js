import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Star, MapPin } from "lucide-react";

function AdminProviders() {
  const navigate = useNavigate();

  // State Management
  const [providers, setProviders] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000/api";
  const BASE_URL = "http://127.0.0.1:8000"; // For media files

  // ✅ 1. FETCH DATA: Wrapped in useCallback to fix ESLint warnings
  const fetchProviders = useCallback(async () => {
    try {
      // Note: Make sure your backend URL is 'admin/providers' or 'providers/all'
      const response = await fetch(`${API_URL}/admin/providers`); 
      if (response.ok) {
        const data = await response.json();
        setProviders(data);
      }
    } catch (error) {
      console.error("Error connecting to Django backend:", error);
    } finally {
      setLoading(false);
    }
  }, [API_URL]);

  useEffect(() => {
    fetchProviders();
  }, [fetchProviders]);

  // Filter providers based on search
  const filtered = providers.filter(
    (p) =>
      p.name?.toLowerCase().includes(search.toLowerCase()) ||
      p.specialty?.toLowerCase().includes(search.toLowerCase())
  );

  // ✅ 2. UPDATE DATA: Toggle Provider Status
  const toggleStatus = async (id) => {
    const providerToUpdate = providers.find((p) => p.id === id);
    const newStatus = providerToUpdate.status === "active" ? "inactive" : "active";

    // Optimistic Update: Change UI instantly
    setProviders(prev => prev.map((p) => 
        p.id === id ? { ...p, status: newStatus } : p
    ));

    try {
      // We only need to send the field we want to change
      const response = await fetch(`${API_URL}/providers/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) throw new Error("Failed to update");
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update status. Reverting...");
      fetchProviders(); // Revert to database state
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-400 font-medium">
        Loading specialists from Solapur... ⏳
      </div>
    );
  }

  return (
    <div>
      {/* Header Section */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 style={{ color: "#1A3C6E", fontSize: "28px", fontWeight: 700 }}>
            Service Providers
          </h1>
          <p className="text-sm text-slate-500">Manage your team of professionals.</p>
        </div>

        <button
          onClick={() => navigate("/admin/providers/add")}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-white transition-all hover:shadow-lg active:scale-95"
          style={{ backgroundColor: "#F97316" }}
        >
          <Plus className="w-4 h-4" />
          Add New
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm mb-6">
        <div className="p-5 flex items-center justify-between">
          <span className="font-bold text-slate-700">
            Total Professionals ({filtered.length})
          </span>

          <input
            placeholder="Search by name or specialty..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 rounded-xl border border-slate-200 outline-none text-sm focus:ring-2 focus:ring-blue-100 transition-all"
            style={{ width: "280px" }}
          />
        </div>

        {/* Grid View */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-6 bg-slate-50/50">
          {filtered.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-2xl p-5 border border-slate-100 hover:shadow-md transition-all cursor-pointer group"
              onClick={() => navigate(`/admin/providers/${p.id}`)}
            >
              <div className="flex items-start gap-4 mb-4">
                {/* Photo or Initial */}
                {p.photo ? (
                  <img 
                    src={p.photo.startsWith('http') ? p.photo : `${BASE_URL}${p.photo}`} 
                    alt={p.name} 
                    className="w-14 h-14 rounded-2xl object-cover ring-2 ring-slate-50"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-white text-xl" style={{ background: "#1A3C6E" }}>
                    {p.name ? p.name[0].toUpperCase() : "P"}
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <div className="font-bold text-slate-800 truncate group-hover:text-blue-700 transition-colors">
                    {p.name}
                  </div>
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    {p.specialty}
                  </div>
                </div>

                <span
                  className="px-2 py-0.5 rounded-lg text-[10px] font-bold uppercase"
                  style={{
                    background: p.status === "active" ? "#DCFCE7" : "#FEE2E2",
                    color: p.status === "active" ? "#166534" : "#DC2626",
                  }}
                >
                  {p.status}
                </span>
              </div>

              <div className="space-y-2 text-sm text-slate-500 mb-4">
                <div className="flex items-center gap-2">
                  <MapPin size={14} className="text-slate-300" />
                  <span className="truncate">{p.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star size={14} className="fill-orange-400 text-orange-400" />
                  <span className="font-bold text-slate-700">{p.rating}</span>
                  <span className="text-xs text-slate-300">({p.reviews} reviews)</span>
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleStatus(p.id);
                }}
                className="w-full py-2.5 rounded-xl text-xs font-bold transition-all"
                style={{
                  background: p.status === "active" ? "#F1F5F9" : "#DCFCE7",
                  color: p.status === "active" ? "#64748B" : "#166534",
                }}
              >
                {p.status === "active" ? "Deactivate Account" : "Activate Account"}
              </button>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-20 text-center text-slate-400 font-medium">
            No specialists found matching "{search}"
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminProviders;