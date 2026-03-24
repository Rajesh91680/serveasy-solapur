import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Star, MapPin } from "lucide-react";

function AdminProviders() {
  const navigate = useNavigate();

  // State Management
  const [providers, setProviders] = useState([]); // Initially empty array for database records
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true); // Tracks the initial data fetch

  const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000/api";

// ✅ 1. FETCH DATA: Trigger API call when the component loads
  useEffect(() => {
    fetchProviders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Function to get all providers from the Django PostgreSQL database
  const fetchProviders = async () => {
    try {
      const response = await fetch(`${API_URL}/providers/all`);
      if (response.ok) {
        const data = await response.json();
        setProviders(data); // Populate the UI with real database records
      } else {
        console.error("Failed to fetch providers from API");
      }
    } catch (error) {
      console.error("Error connecting to Django backend:", error);
    } finally {
      setLoading(false); // Stop the loading spinner/text
    }
  };

  // Filter providers based on the search bar input
  const filtered = providers.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.specialty.toLowerCase().includes(search.toLowerCase())
  );

  // ✅ 2. UPDATE DATA: Toggle Provider Status (Active/Inactive) in Database
  const toggle = async (id) => {
    const providerToUpdate = providers.find((p) => p.id === id);
    const newStatus = providerToUpdate.status === "active" ? "inactive" : "active";

    // Optimistic UI Update: Change the UI instantly before the API finishes
    const updated = providers.map((p) =>
      p.id === id ? { ...p, status: newStatus } : p
    );
    setProviders(updated);

    try {
      // Prepare data to send to Django
      const formData = new FormData();
      formData.append("status", newStatus);
      
      // We must append required fields so the serializer doesn't reject the PUT request
      formData.append("name", providerToUpdate.name);
      formData.append("specialty", providerToUpdate.specialty);
      formData.append("location", providerToUpdate.location);
      formData.append("experience", providerToUpdate.experience);
      formData.append("phone", providerToUpdate.phone);
      
      // Send PUT request to update the specific provider
      const response = await fetch(`${API_URL}/providers/${id}`, {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to update status in PostgreSQL");
      }
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update status. Reverting changes.");
      fetchProviders(); // Revert UI to the actual database state if the API fails
    }
  };

  // Render a loading screen while waiting for the API response
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-500 font-semibold text-lg">
        Loading Providers from Database... ⏳
      </div>
    );
  }

  return (
    <div>
      {/* Header Section */}
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

        {/* Add New Provider Button */}
        <button
          onClick={() => navigate("/admin/providers/add")}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: "#F97316" }}
        >
          <Plus className="w-4 h-4" />
          Add Provider
        </button>
      </div>

      {/* Main Content Card */}
      <div
        className="bg-white rounded-xl overflow-hidden"
        style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}
      >
        {/* Top Bar: Count & Search */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <span style={{ fontWeight: 600, color: "#1e293b" }}>
            All Providers ({filtered.length})
          </span>

          <input
            placeholder="Search…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-200 outline-none text-sm focus:border-blue-500 transition-colors"
            style={{ width: "220px" }}
          />
        </div>

        {/* Providers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-5">
          {filtered.map((p) => (
            <div
              key={p.id}
              className="rounded-xl p-5 border border-gray-100 hover:shadow-md cursor-pointer transition-shadow"
              onClick={() => navigate(`/admin/providers/${p.id}`)}
            >
              {/* Card Top: Image/Initials, Name, Status */}
              <div className="flex items-start gap-3 mb-3">
                
                {/* Dynamically render uploaded photo or fallback to Name Initials */}
                {p.photo ? (
                  <img 
                    src={`http://127.0.0.1:8000${p.photo}`} 
                    alt={p.name} 
                    className="w-12 h-12 rounded-full object-cover border border-gray-200"
                  />
                ) : (
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white text-lg flex-shrink-0"
                    style={{ background: "#1A3C6E" }}
                  >
                    {p.name ? p.name[0].toUpperCase() : "P"}
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <div
                    className="font-semibold truncate"
                    style={{ color: "#1F2937" }}
                  >
                    {p.name}
                  </div>

                  <div
                    className="text-xs truncate"
                    style={{ color: "#6B7280" }}
                  >
                    {p.specialty}
                  </div>
                </div>

                {/* Status Badge */}
                <span
                  className="px-2 py-1 rounded-full text-xs font-semibold"
                  style={{
                    background: p.status === "active" ? "#DCFCE7" : "#FEE2E2",
                    color: p.status === "active" ? "#166534" : "#DC2626",
                  }}
                >
                  {p.status}
                </span>
              </div>

              {/* Card Info: Location & Ratings */}
              <div
                className="space-y-1 text-sm mb-3"
                style={{ color: "#64748B" }}
              >
                <div className="flex items-center gap-1.5 truncate">
                  <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                  {p.location}
                </div>

                <div className="flex items-center gap-1.5">
                  <Star
                    className="w-3.5 h-3.5 fill-current flex-shrink-0"
                    style={{ color: "#F59E0B" }}
                  />
                  {p.rating} ({p.reviews} reviews)
                </div>
              </div>

              {/* Toggle Activate/Deactivate Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevents triggering the card's onClick (navigation)
                  toggle(p.id);
                }}
                className="w-full py-2 rounded-lg text-xs font-semibold transition-colors hover:brightness-95"
                style={{
                  background: p.status === "active" ? "#FEF9C3" : "#DCFCE7",
                  color: p.status === "active" ? "#92400E" : "#166534",
                }}
              >
                {p.status === "active" ? "Deactivate" : "Activate"}
              </button>
            </div>
          ))}
        </div>

        {/* Empty State / No Results */}
        {filtered.length === 0 && (
          <div
            className="py-12 text-center"
            style={{ color: "#94A3B8" }}
          >
            No providers found in the database.
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminProviders;