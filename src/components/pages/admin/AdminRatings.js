import { useEffect, useState, useCallback } from "react";
// Added Check and X icons for the management buttons
import { Star, Check, X } from "lucide-react";

function AdminRatings() {
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000/api";
  const MEDIA_BASE_URL = "http://localhost:8000";

  const loadRatings = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/admin/reviews/all`);
      const data = await response.json();
      
      if (response.ok) {
        setRatings(data);
      }
    } catch (error) {
      console.error("Error fetching ratings:", error);
    } finally {
      setLoading(false);
    }
  }, [API_URL]);

  useEffect(() => {
    loadRatings();
  }, [loadRatings]);

  // ✅ NEW FUNCTION: Update status in PostgreSQL (Approved/Rejected)
  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const response = await fetch(`${API_URL}/admin/reviews/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        // Update the UI locally so the "NEW" badge changes immediately
        setRatings((prev) =>
          prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
        );
      } else {
        alert("Failed to update status on server.");
      }
    } catch (error) {
      console.error("Update Error:", error);
      alert("Connection error!");
    }
  };

  return (
    <div>
      <h1
        style={{
          fontSize: "24px",
          fontWeight: "700",
          marginBottom: "20px",
          color: "#1A3C6E",
        }}
      >
        Ratings Management
      </h1>

      {loading ? (
        <div style={{ color: "#6B7280" }}>Loading ratings...</div>
      ) : ratings.length === 0 ? (
        <div style={{ color: "#6B7280" }}>No ratings submitted yet.</div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {ratings.map((r) => (
            <div
              key={r.id}
              style={{
                background: "white",
                borderRadius: "14px",
                padding: "18px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                boxShadow: "0 4px 14px rgba(0,0,0,0.05)",
                border: r.status === 'rejected' ? '1px solid #FEE2E2' : 'none'
              }}
            >
              <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                {r.work_photo ? (
                  <img
                    src={`${MEDIA_BASE_URL}${r.work_photo}`}
                    alt="work"
                    style={{
                      width: "80px",
                      height: "80px",
                      borderRadius: "10px",
                      objectFit: "cover",
                      border: "2px solid #E5E7EB",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: "80px",
                      height: "80px",
                      borderRadius: "10px",
                      background: "#F3F4F6",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#9CA3AF",
                      fontSize: "12px",
                    }}
                  >
                    No Photo
                  </div>
                )}

                <div>
                  <div style={{ fontWeight: "600", color: "#111827" }}>
                    Customer: {r.user_name}
                  </div>
                  <div style={{ fontSize: "13px", color: "#6B7280" }}>
                    Provider: {r.provider_name}
                  </div>
                  <div style={{ marginTop: "4px", fontSize: "14px", color: "#374151" }}>
                    "{r.review_text || "No comment provided"}"
                  </div>
                  <div style={{ display: "flex", marginTop: "6px" }}>
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={14} 
                        fill={i < r.rating ? "#FBBF24" : "none"} 
                        color={i < r.rating ? "#FBBF24" : "#D1D5DB"} 
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Status Badge & Action Buttons */}
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <span
                  style={{
                    padding: "6px 12px",
                    borderRadius: "20px",
                    fontSize: "11px",
                    fontWeight: "700",
                    textTransform: "uppercase",
                    background: 
                      r.status === "approved" ? "#DCFCE7" : 
                      r.status === "rejected" ? "#FEE2E2" : "#FEF9C3",
                    color: 
                      r.status === "approved" ? "#166534" : 
                      r.status === "rejected" ? "#991B1B" : "#854D0E",
                  }}
                >
                  {r.status || "Pending"}
                </span>

                {/* Approve/Reject Buttons */}
                <div style={{ display: "flex", gap: "8px" }}>
                  <button
                    onClick={() => handleStatusUpdate(r.id, "approved")}
                    title="Approve Review"
                    style={{
                      padding: "8px",
                      borderRadius: "10px",
                      border: "none",
                      background: "#F0FDF4",
                      color: "#16A34A",
                      cursor: "pointer",
                      display: "flex"
                    }}
                  >
                    <Check size={18} />
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(r.id, "rejected")}
                    title="Reject Review"
                    style={{
                      padding: "8px",
                      borderRadius: "10px",
                      border: "none",
                      background: "#FEF2F2",
                      color: "#DC2626",
                      cursor: "pointer",
                      display: "flex"
                    }}
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminRatings;