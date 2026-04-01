// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Star } from "lucide-react";
// import { Navbar } from "../../Navbar";
// import { Footer } from "../../Footer";

// function ServiceCompleted() {
//   const navigate = useNavigate();
//   const [rating, setRating] = useState(0);
//   const [review, setReview] = useState("");
//   const [photoName, setPhotoName] = useState("");

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navbar />

//       <div className="max-w-2xl mx-auto px-6 py-16">
//         <div className="bg-white rounded-3xl p-10 shadow-sm border border-gray-100">
//           <h1
//             className="text-center"
//             style={{ color: "#1A3C6E", fontSize: "28px", fontWeight: 700, marginBottom: "8px" }}
//           >
//             Service Completed
//           </h1>

//           <p
//             className="text-center"
//             style={{ color: "#6B7280", fontSize: "15px", marginBottom: "32px" }}
//           >
//             Rate your service
//           </p>

//           <div className="mb-6">
//             <label className="block mb-3 font-semibold" style={{ color: "#1F2937" }}>
//               Rate Your Service
//             </label>
//             <div className="flex gap-2">
//               {[1, 2, 3, 4, 5].map((num) => (
//                 <button
//                   key={num}
//                   type="button"
//                   onClick={() => setRating(num)}
//                   className="p-2 rounded-lg"
//                   style={{ background: "transparent", border: "none" }}
//                 >
//                   <Star
//                     className="w-8 h-8"
//                     style={{
//                       color: num <= rating ? "#F59E0B" : "#D1D5DB",
//                       fill: num <= rating ? "#F59E0B" : "none",
//                     }}
//                   />
//                 </button>
//               ))}
//             </div>
//           </div>

//           <div className="mb-6">
//             <label className="block mb-2 font-semibold" style={{ color: "#1F2937" }}>
//               Write Review
//             </label>
//             <textarea
//               rows={4}
//               value={review}
//               onChange={(e) => setReview(e.target.value)}
//               placeholder="Write your review..."
//               className="w-full rounded-xl p-4 border"
//               style={{ borderColor: "#E5E7EB", outline: "none" }}
//             />
//           </div>

//           <div className="mb-8">
//             <label className="block mb-2 font-semibold" style={{ color: "#1F2937" }}>
//               Upload Work Photo
//             </label>
//             <input
//               type="file"
//               onChange={(e) => setPhotoName(e.target.files?.[0]?.name || "")}
//               className="w-full"
//             />
//             {photoName && (
//               <p className="mt-2 text-sm" style={{ color: "#6B7280" }}>
//                 Selected: {photoName}
//               </p>
//             )}
//           </div>

//           <button
//             onClick={() => {
//               alert("Review submitted successfully");
//               navigate("/profile");
//             }}
//             className="w-full py-3 rounded-xl font-semibold text-white"
//             style={{ background: "#F97316" }}
//           >
//             Submit
//           </button>
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// }

// export default ServiceCompleted;


// import { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { Star } from "lucide-react";
// import { Navbar } from "../../Navbar";// import { Footer } from "../../Footer"; // Uncomment if you have a Footer component

// function ServiceCompleted() {
//   const navigate = useNavigate();
//   const location = useLocation();
  
//   // State for form fields
//   const [rating, setRating] = useState(0);
//   const [review, setReview] = useState("");
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [loading, setLoading] = useState(false);

//   // Get API URL from .env or fallback to localhost
//   const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000/api";

//   // Handle Form Submission
//   const handleSubmit = async () => {
//     // 1. Validation: Ensure rating is given
//     if (rating === 0) {
//       alert("Please select a star rating!");
//       return;
//     }

//     // 2. Get Logged-in User from localStorage
//     const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
//     const userId = storedUser.id;

//     if (!userId) {
//       alert("User not found. Please login again.");
//       return;
//     }

//     // Note: In a real app, providerId would come from navigation state (location.state)
//     // For now, we use a placeholder '1'
//     const providerId = location.state?.providerId || 1;

//     setLoading(true);

//     // 3. Prepare FormData (The "Envelope")
//     // We use FormData because it can carry both Text and Image files
//     const formData = new FormData();
//     formData.append("user", userId);
//     formData.append("provider", providerId);
//     formData.append("rating", rating);
//     formData.append("review_text", review);
    
//     if (selectedFile) {
//       formData.append("work_photo", selectedFile);
//     }

//     try {
//       // 4. Send data to Django Backend
//       const response = await fetch(`${API_URL}/reviews/submit`, {
//         method: "POST",
//         body: formData, // No "Content-Type" header; browser sets it automatically for FormData
//       });

//       const data = await response.json();

//       if (response.ok) {
//         alert("Thank you! Your review has been saved in our database.");
//         navigate("/profile");
//       } else {
//         console.error("Backend Error:", data.error);
//         alert("Failed to save review. Please check console.");
//       }
//     } catch (error) {
//       console.error("Connection Error:", error);
//       alert("Could not connect to the server.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navbar />

//       <div className="max-w-2xl mx-auto px-6 py-16">
//         <div className="bg-white rounded-3xl p-10 shadow-sm border border-gray-100">
//           <h1
//             className="text-center"
//             style={{ color: "#1A3C6E", fontSize: "28px", fontWeight: 700, marginBottom: "8px" }}
//           >
//             Service Completed
//           </h1>

//           <p
//             className="text-center"
//             style={{ color: "#6B7280", fontSize: "15px", marginBottom: "32px" }}
//           >
//             Rate your service
//           </p>

//           {/* Star Rating Section */}
//           <div className="mb-6">
//             <label className="block mb-3 font-semibold" style={{ color: "#1F2937" }}>
//               Rate Your Service
//             </label>
//             <div className="flex gap-2">
//               {[1, 2, 3, 4, 5].map((num) => (
//                 <button
//                   key={num}
//                   type="button"
//                   onClick={() => setRating(num)}
//                   className="p-2 rounded-lg transition-transform hover:scale-110"
//                   style={{ background: "transparent", border: "none" }}
//                 >
//                   <Star
//                     className="w-8 h-8"
//                     style={{
//                       color: num <= rating ? "#F59E0B" : "#D1D5DB",
//                       fill: num <= rating ? "#F59E0B" : "none",
//                     }}
//                   />
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Review Text Section */}
//           <div className="mb-6">
//             <label className="block mb-2 font-semibold" style={{ color: "#1F2937" }}>
//               Write Review
//             </label>
//             <textarea
//               rows={4}
//               value={review}
//               onChange={(e) => setReview(e.target.value)}
//               placeholder="Write your experience..."
//               className="w-full rounded-xl p-4 border focus:ring-2 focus:ring-orange-500"
//               style={{ borderColor: "#E5E7EB", outline: "none" }}
//             />
//           </div>

//           {/* Photo Upload Section */}
//           <div className="mb-8">
//             <label className="block mb-2 font-semibold" style={{ color: "#1F2937" }}>
//               Upload Work Photo
//             </label>
//             <input
//               type="file"
//               accept="image/*"
//               onChange={(e) => setSelectedFile(e.target.files[0])}
//               className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
//             />
//           </div>

//           {/* Submit Button */}
//           <button
//             onClick={handleSubmit}
//             disabled={loading}
//             className={`w-full py-3 rounded-xl font-semibold text-white transition-all ${
//               loading ? "opacity-50 cursor-not-allowed" : "hover:bg-orange-600"
//             }`}
//             style={{ background: "#F97316" }}
//           >
//             {loading ? "Submitting..." : "Submit Review"}
//           </button>
//         </div>
//       </div>
//       {/* <Footer /> */}
//     </div>
//   );
// }

// export default ServiceCompleted;

import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Star, CheckCircle } from "lucide-react"; // Added CheckCircle for icon
import { Navbar } from "../../Navbar";

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

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000/api";

  const handleSubmit = async () => {
    if (rating === 0) {
      alert("Please select a star rating!");
      return;
    }

    const userStorage = localStorage.getItem("sp_current_user") || localStorage.getItem("user");
    const storedUser = JSON.parse(userStorage || "{}");
    const userId = storedUser.id || storedUser.user_id;

    if (!userId) {
      alert("User not found. Please login again.");
      return;
    }

    const providerId = location.state?.providerId || 1;

    setLoading(true);

    const formData = new FormData();
    formData.append("user", userId);
    formData.append("provider", providerId);
    formData.append("rating", rating);
    formData.append("review_text", review);
    
    if (selectedFile) {
      formData.append("work_photo", selectedFile);
    }

    try {
      const response = await fetch(`${API_URL}/reviews/submit`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        // Instead of a simple alert, we switch the screen!
        setIsSubmitted(true);
      } else {
        const data = await response.json();
        alert(`Error: ${JSON.stringify(data)}`);
      }
    } catch (error) {
      alert("Could not connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  // --- THANK YOU UI (Conditional Rendering) ---
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
              Thank you! Your review has been recorded successfully and helps us improve ServeEasy Solapur.”
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
                  <Star className="w-8 h-8" style={{ color: num <= rating ? "#F59E0B" : "#D1D5DB", fill: num <= rating ? "#F59E0B" : "none" }} />
                </button>
              ))}
            </div>
          </div>

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