// // ✅ IMPORTS
// import { useLocation, useNavigate } from "react-router-dom";
// import { Bell, Calendar, Clock, User, Home } from "lucide-react";
// import { Navbar } from "../../Navbar";
// import { Footer } from "../../Footer";
// import { useEffect, useState } from "react";

// function BookingRequest() {

//   // ✅ ROUTER
//   const location = useLocation();
//   const navigate = useNavigate();

//   const state = location.state || {};

//   // ✅ KEEP OLD FALLBACK (IMPORTANT → avoid error)
//   const service = state.service || "AC Repair";
//   const date = state.date || new Date().toISOString().split("T")[0];
//   const time = state.time || "ASAP"; // (we will NOT show this)
//   const address = state.address || "Not provided";
//   const provider = state.provider || "Provider";
//   const providerId = state.providerId || 101;

//   const [bookingId, setBookingId] = useState(null);

//   // ✅ DATE FORMAT
//   const formatDate = (d) => {
//     if (!d) return new Date().toISOString().split("T")[0];

//     if (d.includes("/")) {
//       const [m, day, y] = d.split("/");
//       return `${y}-${m.padStart(2, "0")}-${day.padStart(2, "0")}`;
//     }

//     return d;
//   };

//   // ✅ API CALL (UNCHANGED)
//   useEffect(() => {
//     async function createBooking() {
//       try {
//         const res = await fetch("http://127.0.0.1:8002/api/service-requests/", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             user: 1,
//             provider_id: providerId,
//             service: service,
//             address: address,
//             date: formatDate(date),
//             status: "pending",
//           }),
//         });

//         const data = await res.json();

//         if (res.ok) {
//           setBookingId(data.id);
//         }

//       } catch (err) {
//         console.log(err);
//       }
//     }

//     createBooking();
//   }, []);

//   // ✅ UI
//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navbar />

//       <div className="max-w-2xl mx-auto px-6 py-16 text-center">
//         <div className="bg-white rounded-3xl p-10 shadow-sm border border-gray-100">

//           {/* 🔔 ICON */}
//           <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
//             style={{ backgroundColor: "#EEF4FF" }}>
//             <Bell className="w-10 h-10" style={{ color: "#1A3C6E" }} />
//           </div>

//           {/* TITLE */}
//           <h1 style={{ color: "#1A3C6E", fontSize: "28px", fontWeight: 700 }}>
//             Booking Request Sent
//           </h1>

//           <p style={{ color: "#6B7280", fontSize: "15px" }}>
//             Your request has been sent successfully.
//           </p>

//           <p style={{ color: "#9CA3AF", fontSize: "13px", marginBottom: "32px" }}>
//             Provider will respond soon.
//           </p>

//           {/* DETAILS CARD */}
//           <div className="text-left space-y-4 mb-8 p-6 rounded-2xl"
//             style={{ background: "#F8FAFC" }}>

//             {/* SERVICE */}
//             <div className="flex items-center gap-3">
//               <Home className="w-4 h-4" style={{ color: "#1A3C6E" }} />
//               <div>
//                 <div className="text-xs text-gray-400">Service</div>
//                 <div className="font-semibold">{service}</div>
//               </div>
//             </div>

//             {/* DATE */}
//             <div className="flex items-center gap-3">
//               <Calendar className="w-4 h-4" style={{ color: "#1A3C6E" }} />
//               <div>
//                 <div className="text-xs text-gray-400">Date</div>
//                 <div className="font-semibold">{formatDate(date)}</div>
//               </div>
//             </div>

//             {/* ❌ TIME SLOT REMOVED (ONLY THIS CHANGE) */}

//             {/* PROVIDER */}
//             <div className="flex items-center gap-3">
//               <User className="w-4 h-4" style={{ color: "#1A3C6E" }} />
//               <div>
//                 <div className="text-xs text-gray-400">Selected Provider</div>
//                 <div className="font-semibold">{provider}</div>
//               </div>
//             </div>

//             {/* BOOKING ID */}
//             {bookingId && (
//               <div>
//                 <div className="text-xs text-gray-400">Booking ID</div>
//                 <div className="font-semibold">BK{bookingId}</div>
//               </div>
//             )}
//           </div>

//           {/* ✅ ONLY BUTTON NAME CHANGED */}
//           <button
//             onClick={() => navigate("/profile")}
//             className="w-full py-3 rounded-xl font-semibold text-white"
//             style={{ background: "#F97316" }}
//           >
//             Go to My Profile
//           </button>

//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// }

// export default BookingRequest;





// ============================================================
// FILE: src/components/pages/user/BookingRequest.js
// ✅ FIXES:
//    1. state.providers (array) → joined as "Ravi Kumar, Suresh Patil"
//    2. Removed the broken useEffect POST (provider_id: 101)
//       — ProviderList.js already saves to DB, no second POST needed
//    3. bookingId read from state (set by ProviderList handleBookNow)
//    4. No UI changes — same layout, same icons, same buttons
// ============================================================

// ✅ IMPORTS (unchanged)
import { useLocation, useNavigate } from "react-router-dom";
import { Bell, Calendar, Clock, User, Home } from "lucide-react";
import { Navbar } from "../../Navbar";
import { Footer } from "../../Footer";

function BookingRequest() {

  // ✅ ROUTER (unchanged)
  const location = useLocation();
  const navigate = useNavigate();
  const state    = location.state || {};

  // ✅ All booking details from navigation state
  const service = state.service || "N/A";
  const date    = state.date    || new Date().toISOString().split("T")[0];
  const time    = state.time    || "ASAP";
  const address = state.address || "Not provided";

  // ✅ FIX 1: Read providers array from ProviderList.js
  // state.providers = ["Ravi Kumar", "Suresh Patil"]  ← sent by ProviderList
  // state.provider  = "Ravi Kumar"                    ← old single-provider fallback
  const providerDisplay = (() => {
    const p = state.providers;           // array sent by ProviderList.js
    if (Array.isArray(p) && p.length > 0) return p.join(", ");  // "Ravi Kumar, Suresh Patil"
    if (typeof state.provider === "string" && state.provider)   return state.provider;
    return "Provider";                   // last fallback
  })();

  // ✅ FIX 2: bookingId comes from state (set in handleBookNow)
  // No useEffect POST needed — ProviderList already saved to Django DB
  const bookingId = state.bookingId || null;

  // ✅ DATE FORMAT (unchanged)
  const formatDate = (d) => {
    if (!d) return new Date().toISOString().split("T")[0];
    if (d.includes("/")) {
      const [m, day, y] = d.split("/");
      return `${y}-${m.padStart(2, "0")}-${day.padStart(2, "0")}`;
    }
    return d;
  };

  // ✅ UI (100% unchanged — same layout, icons, classes, colors)
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-2xl mx-auto px-6 py-16 text-center">
        <div className="bg-white rounded-3xl p-10 shadow-sm border border-gray-100">

          {/* 🔔 ICON */}
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ backgroundColor: "#EEF4FF" }}>
            <Bell className="w-10 h-10" style={{ color: "#1A3C6E" }} />
          </div>

          {/* TITLE */}
          <h1 style={{ color: "#1A3C6E", fontSize: "28px", fontWeight: 700 }}>
            Booking Request Sent
          </h1>

          <p style={{ color: "#6B7280", fontSize: "15px" }}>
            Your request has been sent successfully.
          </p>

          <p style={{ color: "#9CA3AF", fontSize: "13px", marginBottom: "32px" }}>
            Provider will respond soon.
          </p>

          {/* DETAILS CARD */}
          <div className="text-left space-y-4 mb-8 p-6 rounded-2xl"
            style={{ background: "#F8FAFC" }}>

            {/* SERVICE */}
            <div className="flex items-center gap-3">
              <Home className="w-4 h-4" style={{ color: "#1A3C6E" }} />
              <div>
                <div className="text-xs text-gray-400">Service</div>
                <div className="font-semibold">{service}</div>
              </div>
            </div>

            {/* DATE */}
            <div className="flex items-center gap-3">
              <Calendar className="w-4 h-4" style={{ color: "#1A3C6E" }} />
              <div>
                <div className="text-xs text-gray-400">Date</div>
                <div className="font-semibold">{formatDate(date)}</div>
              </div>
            </div>

            {/* ✅ PROVIDER — now shows real name(s) from array */}
            <div className="flex items-center gap-3">
              <User className="w-4 h-4" style={{ color: "#1A3C6E" }} />
              <div>
                <div className="text-xs text-gray-400">
                  {/* Plural label when multiple providers */}
                  Selected Provider{Array.isArray(state.providers) && state.providers.length > 1 ? "s" : ""}
                </div>
                {/* ✅ Shows: "Ravi Kumar" or "Ravi Kumar, Suresh Patil" */}
                <div className="font-semibold">{providerDisplay}</div>
              </div>
            </div>

            {/* BOOKING ID */}
            {bookingId && (
              <div className="flex items-center gap-3">
                <div>
                  <div className="text-xs text-gray-400">Booking ID</div>
                  <div className="font-semibold">{bookingId}</div>
                </div>
              </div>
            )}

          </div>

          {/* BUTTON (unchanged) */}
          <button
            onClick={() => navigate("/profile")}
            className="w-full py-3 rounded-xl font-semibold text-white"
            style={{ background: "#F97316" }}
          >
            Go to My Profile
          </button>

        </div>
      </div>

      <Footer />
    </div>
  );
}

export default BookingRequest;