import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, Star, MapPin, Phone, Briefcase } from "lucide-react";

function AdminProviderDetail() {
  const { id } = useParams(); // Gets the ID from the URL (e.g., /admin/providers/12)
  const navigate = useNavigate();

  // State Management
  const [provider, setProvider] = useState(null); // Holds the single provider's data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000/api";

  // ✅ 1. FETCH SINGLE PROVIDER ON LOAD
  useEffect(() => {
    fetchProviderDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchProviderDetails = async () => {
    try {
      // In Django, we don't have a specific "GET /api/providers/:id" endpoint yet,
      // but we can fetch all and find the one we need by ID.
      // (If you add a specific detail endpoint in Django later, change this URL).
      const response = await fetch(`${API_URL}/providers/all`);
      
      if (response.ok) {
        const allProviders = await response.json();
        // Find the provider whose ID matches the URL parameter
        // Ensure both are treated as strings or numbers for comparison
        const foundProvider = allProviders.find((p) => String(p.id) === String(id));
        
        if (foundProvider) {
          setProvider(foundProvider);
        } else {
          setError("Provider not found in database.");
        }
      } else {
        setError("Failed to load data from server.");
      }
    } catch (err) {
      console.error("Error fetching provider details:", err);
      setError("Cannot connect to Django Server.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ 2. TOGGLE STATUS
  const toggleStatus = async () => {
    if (!provider) return;
    
    const newStatus = provider.status === "active" ? "inactive" : "active";

    // Optimistic UI Update
    setProvider({ ...provider, status: newStatus });

    try {
      const formData = new FormData();
      formData.append("status", newStatus);
      formData.append("name", provider.name);
      formData.append("specialty", provider.specialty);
      formData.append("location", provider.location);
      formData.append("experience", provider.experience);
      formData.append("phone", provider.phone);
      
      const response = await fetch(`${API_URL}/providers/${id}`, {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to update status");
      }
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update status. Reverting changes.");
      fetchProviderDetails(); // Revert on failure
    }
  };

  // Loading State
  if (loading) {
    return (
      <div className="p-8 text-center" style={{ color: "#64748B" }}>
        Loading provider details from database... ⏳
      </div>
    );
  }

  // Error / Not Found State
  if (error || !provider) {
    return (
      <div className="p-8 text-center" style={{ color: "#94A3B8" }}>
        {error || "Not found."} <br />
        <button
          onClick={() => navigate("/admin/providers")}
          className="mt-4 px-4 py-2 font-semibold underline"
          style={{ color: "#1A3C6E" }}
        >
          Go back to Providers List
        </button>
      </div>
    );
  }

  // Render the Provider Details
  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <button
          onClick={() => navigate("/admin/providers")}
          className="flex items-center gap-1 text-sm transition-opacity hover:opacity-75"
          style={{ color: "#6B7280" }}
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </button>

        <h1
          style={{
            color: "#1A3C6E",
            fontSize: "24px",
            fontWeight: 700,
          }}
        >
          Provider Detail
        </h1>
      </div>

      {/* Main Detail Card */}
      <div
        className="bg-white rounded-xl p-8 max-w-2xl"
        style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}
      >
        {/* Profile Section */}
        <div className="flex items-start gap-5 mb-8 pb-6 border-b border-gray-100">
          
          {/* Dynamically display uploaded photo or fallback initials */}
          {provider.photo ? (
            <img 
              src={`http://127.0.0.1:8000${provider.photo}`} 
              alt={provider.name} 
              className="w-20 h-20 rounded-full object-cover border-2 border-gray-100 shadow-sm"
            />
          ) : (
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center font-bold text-white text-3xl shadow-sm"
              style={{ background: "#1A3C6E" }}
            >
              {provider.name ? provider.name[0].toUpperCase() : "P"}
            </div>
          )}

          <div>
            <h2
              style={{
                color: "#1F2937",
                fontSize: "24px",
                fontWeight: 700,
                lineHeight: "1.2",
              }}
            >
              {provider.name}
            </h2>

            <p style={{ color: "#6B7280", marginTop: "4px" }}>
              {provider.specialty}
            </p>

            <span
              className="inline-block mt-3 px-3 py-1 rounded-full text-sm font-semibold shadow-sm"
              style={{
                background: provider.status === "active" ? "#DCFCE7" : "#FEE2E2",
                color: provider.status === "active" ? "#166534" : "#DC2626",
              }}
            >
              {provider.status.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Info Grid (Location, Experience, Phone, Ratings) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {[
            {
              icon: <MapPin className="w-4 h-4" />,
              label: "Location",
              value: provider.location,
            },
            {
              icon: <Briefcase className="w-4 h-4" />,
              label: "Experience",
              value: provider.experience,
            },
            {
              icon: <Phone className="w-4 h-4" />,
              label: "Phone",
              value: provider.phone,
            },
            {
              icon: (
                <Star
                  className="w-4 h-4 fill-current"
                  style={{ color: "#F59E0B" }}
                />
              ),
              label: "Rating",
              value: `${provider.rating} (${provider.reviews} reviews)`,
            },
          ].map((item) => (
            <div
              key={item.label}
              className="p-4 rounded-xl border border-gray-100"
              style={{ background: "#F8FAFC" }}
            >
              <div
                className="flex items-center gap-2 mb-1.5"
                style={{ color: "#6B7280" }}
              >
                {item.icon}
                <span className="text-xs font-semibold uppercase tracking-wider">
                  {item.label}
                </span>
              </div>

              <div style={{ fontWeight: 600, color: "#1F2937", fontSize: "15px" }}>
                {item.value}
              </div>
            </div>
          ))}
        </div>

        {/* Aadhaar Information Section (New!) */}
        <div className="mb-8">
           <div
            className="text-sm font-semibold mb-3"
            style={{ color: "#374151" }}
          >
            Verification Details
          </div>
          <div className="p-4 rounded-xl border border-gray-100 bg-gray-50 flex items-center justify-between">
            <div>
              <span className="block text-xs text-gray-500 font-semibold mb-1">Aadhaar Number</span>
              <span className="font-mono text-gray-800 font-medium">
                {provider.aadhaar_number || "Not provided"}
              </span>
            </div>
            
            {provider.aadhaar_image ? (
              <a 
                href={`http://127.0.0.1:8000${provider.aadhaar_image}`} 
                target="_blank" 
                rel="noreferrer"
                className="text-sm text-blue-600 font-semibold hover:underline"
              >
                View Document
              </a>
            ) : (
              <span className="text-sm text-gray-400">No image uploaded</span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4 border-t border-gray-100">
          <button
            onClick={toggleStatus}
            className="px-6 py-2.5 rounded-lg font-semibold transition-colors flex-1"
            style={{
              background: provider.status === "active" ? "#FEE2E2" : "#DCFCE7",
              color: provider.status === "active" ? "#DC2626" : "#166534",
            }}
          >
            {provider.status === "active" ? "Deactivate Provider" : "Activate Provider"}
          </button>
        </div>

      </div>
    </div>
  );
}

export default AdminProviderDetail;