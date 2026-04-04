import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Star, CheckCircle } from "lucide-react"; 
import { Navbar } from "../../Navbar";
import axios from "axios";

function ServiceCompleted() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Form States
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // Success Screen State
  const [isSubmitted, setIsSubmitted] = useState(false);

  // API URL Configuration
  const API_URL = "http://127.0.0.1:8000/api";

  const handleSubmit = async () => {
    // 1. Validation: Ensure a rating is selected
    if (rating === 0) {
      alert("Please select a star rating!");
      return;
    }

    // 2. Fetch user from sessionStorage (Using "currentUser" key)
    const userStorage = sessionStorage.getItem("currentUser");
    const storedUser = JSON.parse(userStorage || "{}");
    
    // Get the ID from the stored object
    const userId = storedUser.id;

    if (!userId) {
      alert("User not found. Please log out and log in again.");
      return;
    }

    // 3. Get providerId from navigation state (default to 1 if not passed)
    const providerId = location.state?.providerId || 1;

    setLoading(true);

    // 4. Prepare Multipart Form Data for Text and Image
    const formData = new FormData();
    
    // Important: Force values to be Integers to satisfy Django Backend
    formData.append("user", parseInt(userId)); 
    formData.append("provider", parseInt(providerId));
    formData.append("rating", parseInt(rating));
    formData.append("review_text", review);
    
    // Append the file if selected
    if (selectedFile) {
      formData.append("work_photo", selectedFile);
    }

    try {
      // 5. Send POST request to Backend
      const response = await fetch(`${API_URL}/reviews/submit`, {
        method: "POST",
        body: formData,
        // Fetch automatically handles Content-Type for FormData
      });

      if (response.ok) {
        // Success: Show the Thank You screen
        setIsSubmitted(true);
      } else {
        const data = await response.json();
        console.error("Submission Error:", data);
        alert(`Error: ${JSON.stringify(data)}`);
      }
    } catch (error) {
      console.error("Connection Error:", error);
      alert("Could not connect to the server. Check if Django is running.");
    } finally {
      setLoading(false);
    }
  };

  // --- SUCCESS / THANK YOU SCREEN ---
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center py-20 px-6">
          <div className="bg-white rounded-3xl p-10 shadow-sm border border-gray-100 text-center max-w-md w-full">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h2>
            <p className="text-gray-600 mb-8">
              Thank you! Your review has been recorded successfully and helps us improve ServeEasy Solapur.
            </p>
            <button
              onClick={() => navigate("/profile")}
              className="w-full py-3 rounded-xl font-semibold text-white transition-all hover:bg-orange-600"
              style={{ background: "#F97316" }}
            >
              Back to Profile
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- MAIN RATING FORM UI ---
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-2xl mx-auto px-6 py-16">
        <div className="bg-white rounded-3xl p-10 shadow-sm border border-gray-100">
          <h1 className="text-center" style={{ color: "#1A3C6E", fontSize: "28px", fontWeight: 700, marginBottom: "8px" }}>
            Service Completed
          </h1>

          <p className="text-center" style={{ color: "#6B7280", fontSize: "15px", marginBottom: "32px" }}>
            Rate your service
          </p>

          {/* Rating Section */}
          <div className="mb-6">
            <label className="block mb-3 font-semibold" style={{ color: "#1F2937" }}>Rate Your Service</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setRating(num)}
                  className="p-2 rounded-lg transition-transform hover:scale-110"
                >
                  <Star 
                    className="w-8 h-8" 
                    style={{ 
                      color: num <= rating ? "#F59E0B" : "#D1D5DB", 
                      fill: num <= rating ? "#F59E0B" : "none" 
                    }} 
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Review Text */}
          <div className="mb-6">
            <label className="block mb-2 font-semibold" style={{ color: "#1F2937" }}>Write Review</label>
            <textarea
              rows={4}
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Write your experience..."
              className="w-full rounded-xl p-4 border focus:ring-2 focus:ring-orange-500"
              style={{ borderColor: "#E5E7EB", outline: "none" }}
            />
          </div>

          {/* File Upload */}
          <div className="mb-8">
            <label className="block mb-2 font-semibold" style={{ color: "#1F2937" }}>Upload Work Photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setSelectedFile(e.target.files[0])}
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`w-full py-3 rounded-xl font-semibold text-white transition-all ${loading ? "opacity-50" : "hover:bg-orange-600"}`}
            style={{ background: "#F97316" }}
          >
            {loading ? "Submitting..." : "Submit Review"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ServiceCompleted;