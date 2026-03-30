import { useEffect, useState } from "react";
import { CheckCircle, XCircle, Star } from "lucide-react";
import { getRatings, updateRatingStatus } from "../../../services/store";

function AdminRatings() {
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    loadRatings();
  }, []);

  const loadRatings = () => {
    const data = getRatings();
    setRatings(data);
  };

  const changeStatus = (id, status) => {
    updateRatingStatus(id, status);
    loadRatings();
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

      {ratings.length === 0 && (
        <div style={{ color: "#6B7280" }}>
          No ratings submitted yet.
        </div>
      )}

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
            }}
          >
            {/* LEFT SECTION */}
            <div
              style={{
                display: "flex",
                gap: "16px",
                alignItems: "center",
              }}
            >
              {/* PHOTO */}
              {r.photo ? (
                <img
                  src={r.photo}
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

              {/* TEXT INFO */}
              <div>
                <div
                  style={{
                    fontWeight: "600",
                    color: "#111827",
                  }}
                >
                  Customer: {r.customerName}
                </div>

                <div
                  style={{
                    fontSize: "13px",
                    color: "#6B7280",
                  }}
                >
                  Provider: {r.providerName}
                </div>

                <div
                  style={{
                    marginTop: "4px",
                    fontSize: "14px",
                  }}
                >
                  {r.description}
                </div>

                {/* STARS */}
                <div
                  style={{
                    display: "flex",
                    marginTop: "6px",
                  }}
                >
                  {[...Array(r.rating)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      fill="#FBBF24"
                      color="#FBBF24"
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT SECTION */}
            <div>
              {r.status === "pending" ? (
                <div
                  style={{
                    display: "flex",
                    gap: "8px",
                  }}
                >
                  <button
                    onClick={() => changeStatus(r.id, "approved")}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      background: "#16A34A",
                      color: "white",
                      border: "none",
                      padding: "8px 12px",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontSize: "13px",
                    }}
                  >
                    <CheckCircle size={16} />
                    Approve
                  </button>

                  <button
                    onClick={() => changeStatus(r.id, "rejected")}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      background: "#DC2626",
                      color: "white",
                      border: "none",
                      padding: "8px 12px",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontSize: "13px",
                    }}
                  >
                    <XCircle size={16} />
                    Reject
                  </button>
                </div>
              ) : (
                <span
                  style={{
                    padding: "6px 12px",
                    borderRadius: "20px",
                    fontSize: "12px",
                    fontWeight: "600",
                    background:
                      r.status === "approved"
                        ? "rgba(34,197,94,0.15)"
                        : "rgba(239,68,68,0.15)",
                    color:
                      r.status === "approved"
                        ? "#16A34A"
                        : "#DC2626",
                  }}
                >
                  {r.status.toUpperCase()}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminRatings;