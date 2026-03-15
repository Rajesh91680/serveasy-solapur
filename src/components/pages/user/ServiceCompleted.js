import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Star } from "lucide-react";
import { Navbar } from "../../Navbar";
import { Footer } from "../../Footer";

function ServiceCompleted() {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [photoName, setPhotoName] = useState("");

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-2xl mx-auto px-6 py-16">
        <div className="bg-white rounded-3xl p-10 shadow-sm border border-gray-100">
          <h1
            className="text-center"
            style={{ color: "#1A3C6E", fontSize: "28px", fontWeight: 700, marginBottom: "8px" }}
          >
            Service Completed
          </h1>

          <p
            className="text-center"
            style={{ color: "#6B7280", fontSize: "15px", marginBottom: "32px" }}
          >
            Rate your service
          </p>

          <div className="mb-6">
            <label className="block mb-3 font-semibold" style={{ color: "#1F2937" }}>
              Rate Your Service
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setRating(num)}
                  className="p-2 rounded-lg"
                  style={{ background: "transparent", border: "none" }}
                >
                  <Star
                    className="w-8 h-8"
                    style={{
                      color: num <= rating ? "#F59E0B" : "#D1D5DB",
                      fill: num <= rating ? "#F59E0B" : "none",
                    }}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="block mb-2 font-semibold" style={{ color: "#1F2937" }}>
              Write Review
            </label>
            <textarea
              rows={4}
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Write your review..."
              className="w-full rounded-xl p-4 border"
              style={{ borderColor: "#E5E7EB", outline: "none" }}
            />
          </div>

          <div className="mb-8">
            <label className="block mb-2 font-semibold" style={{ color: "#1F2937" }}>
              Upload Work Photo
            </label>
            <input
              type="file"
              onChange={(e) => setPhotoName(e.target.files?.[0]?.name || "")}
              className="w-full"
            />
            {photoName && (
              <p className="mt-2 text-sm" style={{ color: "#6B7280" }}>
                Selected: {photoName}
              </p>
            )}
          </div>

          <button
            onClick={() => {
              alert("Review submitted successfully");
              navigate("/profile");
            }}
            className="w-full py-3 rounded-xl font-semibold text-white"
            style={{ background: "#F97316" }}
          >
            Submit
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default ServiceCompleted;