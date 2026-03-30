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

//   const submitReview = async () => {
//     try {
//       const response = await fetch("http://127.0.0.1:8001/api/reviews/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           user: 1,              // current user id
//           provider_id: 101,     // provider id
//           rating: rating,
//           review: review,
//         }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         alert("Error submitting review");
//         return;
//       }

//       alert("Review submitted successfully");
//       navigate("/profile");

//     } catch (error) {
//       alert("Server not running or API error");
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

//           {/* Rating */}
//           <div className="mb-6">
//             <label className="block mb-3 font-semibold">
//               Rate Your Service
//             </label>

//             <div className="flex gap-2">
//               {[1, 2, 3, 4, 5].map((num) => (
//                 <button key={num} type="button" onClick={() => setRating(num)}>
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

//           {/* Review */}
//           <div className="mb-6">
//             <label className="block mb-2 font-semibold">
//               Write Review
//             </label>

//             <textarea
//               rows={4}
//               value={review}
//               onChange={(e) => setReview(e.target.value)}
//               placeholder="Write your review..."
//               className="w-full rounded-xl p-4 border"
//               style={{ borderColor: "#E5E7EB" }}
//             />
//           </div>

//           {/* Photo Upload (UI only) */}
//           <div className="mb-8">
//             <label className="block mb-2 font-semibold">
//               Upload Work Photo
//             </label>

//             <input
//               type="file"
//               onChange={(e) => setPhotoName(e.target.files?.[0]?.name || "")}
//               className="w-full"
//             />

//             {photoName && (
//               <p className="mt-2 text-sm text-gray-500">
//                 Selected: {photoName}
//               </p>
//             )}
//           </div>

//           {/* Submit */}
//           <button
//             onClick={submitReview}
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





import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Star } from "lucide-react";
import { Navbar } from "../../Navbar";
import { Footer } from "../../Footer";

function ServiceCompleted() {
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ GET DATA FROM PREVIOUS PAGE
  const providerId = location.state?.providerId;
  const userId = location.state?.userId;

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [photo, setPhoto] = useState(null);

  const submitReview = async () => {
    // ❌ VALIDATION
    if (!providerId || !userId) {
      alert("Provider/User ID missing ❌");
      return;
    }

    if (!rating) {
      alert("Please select rating ⭐");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("user", userId);
      formData.append("provider_id", providerId);
      formData.append("rating", rating);
      formData.append("review", review);

      if (photo) {
        formData.append("photo", photo);
      }

      console.log("Sending:", {
        user: userId,
        provider_id: providerId,
        rating,
        review,
      });

      const res = await fetch("http://127.0.0.1:8002/api/reviews/", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        console.error(data);
        alert("Error: " + JSON.stringify(data));
        return;
      }

      alert("Review submitted successfully ✅");
      navigate("/profile");

    } catch (err) {
      console.log(err);
      alert("Server error ❌");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-2xl mx-auto px-6 py-16">
        <div className="bg-white rounded-3xl p-10 shadow-sm border">

          <h1 className="text-center text-2xl font-bold mb-2">
            Service Completed
          </h1>

          <p className="text-center text-gray-500 mb-8">
            Rate your service
          </p>

          {/* ⭐ Rating */}
          <div className="flex gap-2 mb-6">
            {[1, 2, 3, 4, 5].map((n) => (
              <Star
                key={n}
                onClick={() => setRating(n)}
                className="w-8 h-8 cursor-pointer"
                style={{
                  color: n <= rating ? "#F59E0B" : "#D1D5DB",
                  fill: n <= rating ? "#F59E0B" : "none",
                }}
              />
            ))}
          </div>

          {/* ✍️ Review */}
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Write your review..."
            className="w-full border p-3 mb-6 rounded"
          />

          {/* 📷 Photo */}
          <input
            type="file"
            onChange={(e) => setPhoto(e.target.files[0])}
          />

          {/* ✅ Submit */}
          <button
            onClick={submitReview}
            className="w-full py-3 mt-6 text-white rounded"
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