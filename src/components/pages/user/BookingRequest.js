// // // import { useLocation, useNavigate } from "react-router-dom";
// // // import { Bell, Calendar, Clock, User, Home } from "lucide-react";
// // // import { Navbar } from "../../Navbar";
// // // import { Footer } from "../../Footer";
// // // import { useEffect, useState } from "react";

// // // function BookingRequest() {
// // //   const { state = {} } = useLocation();
// // //   const { service, date, time, address, providers } = state;
// // //   const navigate = useNavigate();

// // //   const [bookingId, setBookingId] = useState(null);

// // //   useEffect(() => {
// // //     async function createBooking() {
// // //       try {
// // //         const res = await fetch("http://127.0.0.1:8001/api/service-requests/", {
// // //           method: "POST",
// // //           headers: {
// // //             "Content-Type": "application/json",
// // //           },
// // //           body: JSON.stringify({
// // //             user_id: 1,                  // TEMP HARDCODE (later login)
// // //             provider_name: providers?.[0] || "Ravi Kumar",
// // //             service_name: service,
// // //             address: address,
// // //             date: date,
// // //             time: time,
// // //             provider_id: 101
// // //           }),
// // //         });

// // //         const data = await res.json();
// // //         setBookingId(data.id);
// // //       } catch (err) {
// // //         console.log("Booking Error:", err);
// // //       }
// // //     }

// // //     createBooking();
// // //   }, []);

// // //   return (
// // //     <div className="min-h-screen bg-gray-50">
// // //       <Navbar />

// // //       <div className="max-w-2xl mx-auto px-6 py-16 text-center">
// // //         <div className="bg-white rounded-3xl p-10 shadow-sm border border-gray-100">
// // //           <div
// // //             className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
// // //             style={{ backgroundColor: "#EEF4FF" }}
// // //           >
// // //             <Bell className="w-10 h-10" style={{ color: "#1A3C6E" }} />
// // //           </div>

// // //           <h1 style={{ color: "#1A3C6E", fontSize: "28px", fontWeight: 700, marginBottom: "8px" }}>
// // //             Booking Request Sent
// // //           </h1>

// // //           <p style={{ color: "#6B7280", fontSize: "15px", marginBottom: "8px" }}>
// // //             Your request has been sent successfully.
// // //           </p>

// // //           <p style={{ color: "#9CA3AF", fontSize: "13px", marginBottom: "32px" }}>
// // //             Provider will respond soon.
// // //           </p>

// // //           <div className="text-left space-y-4 mb-8 p-6 rounded-2xl" style={{ background: "#F8FAFC" }}>
// // //             {service && (
// // //               <div className="flex items-center gap-3">
// // //                 <Home className="w-4 h-4" style={{ color: "#1A3C6E" }} />
// // //                 <div>
// // //                   <div className="text-xs" style={{ color: "#9CA3AF" }}>Service</div>
// // //                   <div className="font-semibold" style={{ color: "#1F2937" }}>{service}</div>
// // //                 </div>
// // //               </div>
// // //             )}

// // //             {date && (
// // //               <div className="flex items-center gap-3">
// // //                 <Calendar className="w-4 h-4" style={{ color: "#1A3C6E" }} />
// // //                 <div>
// // //                   <div className="text-xs" style={{ color: "#9CA3AF" }}>Date</div>
// // //                   <div className="font-semibold" style={{ color: "#1F2937" }}>{date}</div>
// // //                 </div>
// // //               </div>
// // //             )}

// // //             {time && (
// // //               <div className="flex items-center gap-3">
// // //                 <Clock className="w-4 h-4" style={{ color: "#1A3C6E" }} />
// // //                 <div>
// // //                   <div className="text-xs" style={{ color: "#9CA3AF" }}>Time Slot</div>
// // //                   <div className="font-semibold" style={{ color: "#1F2937" }}>{time}</div>
// // //                 </div>
// // //               </div>
// // //             )}

// // //             {address && (
// // //               <div>
// // //                 <div className="text-xs" style={{ color: "#9CA3AF" }}>Address</div>
// // //                 <div className="font-semibold" style={{ color: "#1F2937" }}>{address}</div>
// // //               </div>
// // //             )}

// // //             {providers?.length > 0 && (
// // //               <div>
// // //                 <div className="text-xs" style={{ color: "#9CA3AF" }}>Selected Providers</div>
// // //                 <div className="font-semibold" style={{ color: "#1F2937" }}>
// // //                   {providers.join(", ")}
// // //                 </div>
// // //               </div>
// // //             )}

// // //             {bookingId && (
// // //               <div>
// // //                 <div className="text-xs" style={{ color: "#9CA3AF" }}>Booking ID</div>
// // //                 <div className="font-semibold" style={{ color: "#1F2937" }}>{bookingId}</div>
// // //               </div>
// // //             )}
// // //           </div>

// // //           <button
// // //             onClick={() => navigate("/profile")}
// // //             className="w-full py-3 rounded-xl font-semibold text-white"
// // //             style={{ background: "#F97316" }}
// // //           >
// // //             Go to My Booking
// // //           </button>
// // //         </div>
// // //       </div>

// // //       <Footer />
// // //     </div>
// // //   );
// // // }

// // // export default BookingRequest;



// import { useLocation, useNavigate } from "react-router-dom";
// import { Bell, Calendar, Clock, User, Home } from "lucide-react";
// import { Navbar } from "../../Navbar";
// import { Footer } from "../../Footer";
// import { useEffect, useState } from "react";

// function BookingRequest() {
//   const { state = {} } = useLocation();
//   const { service, date, time, address, provider } = state;
//   const navigate = useNavigate();

//   const [bookingId, setBookingId] = useState(null);

//   useEffect(() => {
//     async function createBooking() {
//       try {
//         const res = await fetch("http://127.0.0.1:8001/api/service-requests/", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             user_id: 1,
//             provider_name: provider,
//             service_name: service,
//             address: address,
//             date: date,
//             provider_id: 101,
//           }),
//         });

//         const data = await res.json();
//         setBookingId(data.id);
//       } catch (err) {
//         console.log("Booking Error:", err);
//       }
//     }

//     createBooking();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navbar />

//       <div className="max-w-2xl mx-auto px-6 py-16 text-center">
//         <div className="bg-white rounded-3xl p-10 shadow-sm border border-gray-100">
//           <div
//             className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
//             style={{ backgroundColor: "#EEF4FF" }}
//           >
//             <Bell className="w-10 h-10" style={{ color: "#1A3C6E" }} />
//           </div>

//           <h1
//             style={{
//               color: "#1A3C6E",
//               fontSize: "28px",
//               fontWeight: 700,
//               marginBottom: "8px",
//             }}
//           >
//             Booking Request Sent
//           </h1>

//           <p
//             style={{
//               color: "#6B7280",
//               fontSize: "15px",
//               marginBottom: "8px",
//             }}
//           >
//             Your request has been sent successfully.
//           </p>

//           <p
//             style={{
//               color: "#9CA3AF",
//               fontSize: "13px",
//               marginBottom: "32px",
//             }}
//           >
//             Provider will respond soon.
//           </p>

//           <div
//             className="text-left space-y-4 mb-8 p-6 rounded-2xl"
//             style={{ background: "#F8FAFC" }}
//           >
//             <div className="flex items-center gap-3">
//               <Home className="w-4 h-4" style={{ color: "#1A3C6E" }} />
//               <div>
//                 <div className="text-xs" style={{ color: "#9CA3AF" }}>
//                   Service
//                 </div>
//                 <div className="font-semibold" style={{ color: "#1F2937" }}>
//                   {service}
//                 </div>
//               </div>
//             </div>

//             <div className="flex items-center gap-3">
//               <Calendar className="w-4 h-4" style={{ color: "#1A3C6E" }} />
//               <div>
//                 <div className="text-xs" style={{ color: "#9CA3AF" }}>
//                   Date
//                 </div>
//                 <div className="font-semibold" style={{ color: "#1F2937" }}>
//                   {date}
//                 </div>
//               </div>
//             </div>

//             <div className="flex items-center gap-3">
//               <Clock className="w-4 h-4" style={{ color: "#1A3C6E" }} />
//               <div>
//                 <div className="text-xs" style={{ color: "#9CA3AF" }}>
//                   Time Slot
//                 </div>
//                 <div className="font-semibold" style={{ color: "#1F2937" }}>
//                   {time}
//                 </div>
//               </div>
//             </div>

//             <div className="flex items-center gap-3">
//               <User className="w-4 h-4" style={{ color: "#1A3C6E" }} />
//               <div>
//                 <div className="text-xs" style={{ color: "#9CA3AF" }}>
//                   Selected Provider
//                 </div>
//                 <div className="font-semibold" style={{ color: "#1F2937" }}>
//                   {provider}
//                 </div>
//               </div>
//             </div>

//             {bookingId && (
//               <div>
//                 <div className="text-xs" style={{ color: "#9CA3AF" }}>
//                   Booking ID
//                 </div>
//                 <div className="font-semibold" style={{ color: "#1F2937" }}>
//                   BK{bookingId}
//                 </div>
//               </div>
//             )}
//           </div>

//           <button
//             onClick={() => navigate("/profile")}
//             className="w-full py-3 rounded-xl font-semibold text-white"
//             style={{ background: "#F97316" }}
//           >
//             Go to My Booking
//           </button>
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// }

// export default BookingRequest;



import { useLocation, useNavigate } from "react-router-dom";
import { Bell, Calendar, Clock, User, Home } from "lucide-react";
import { Navbar } from "../../Navbar";
import { Footer } from "../../Footer";
import { useEffect, useState } from "react";

function BookingRequest() {
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state || {};

  // ✅ SAFE DATA (NO CRASH)
  const service = state.service || "AC Repair";
  const date = state.date || new Date().toISOString().split("T")[0];
  const time = state.time || "ASAP";
  const address = state.address || "Not provided";
  const provider = state.provider || "Provider";
  const providerId = state.providerId || 101; // fallback

  const [bookingId, setBookingId] = useState(null);

  // ✅ DATE FIX (IMPORTANT)
  const formatDate = (d) => {
    if (!d) return new Date().toISOString().split("T")[0];

    if (d.includes("/")) {
      const [m, day, y] = d.split("/");
      return `${y}-${m.padStart(2, "0")}-${day.padStart(2, "0")}`;
    }

    return d;
  };

  useEffect(() => {
    async function createBooking() {
      try {
        console.log("BOOKING DATA:", {
          service,
          date,
          providerId,
        });

        const res = await fetch("http://127.0.0.1:8002/api/service-requests/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: 1,
            provider_id: providerId,
            service: service,        // ✅ FIXED
            address: address,
            date: formatDate(date),  // ✅ FIXED
            status: "pending",
          }),
        });

        const data = await res.json();

        if (res.ok) {
          setBookingId(data.id);
        } else {
          console.log("ERROR:", data);
        }
      } catch (err) {
        console.log("Booking Error:", err);
      }
    }

    createBooking();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-2xl mx-auto px-6 py-16 text-center">
        <div className="bg-white rounded-3xl p-10 shadow-sm border border-gray-100">

          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ backgroundColor: "#EEF4FF" }}
          >
            <Bell className="w-10 h-10" style={{ color: "#1A3C6E" }} />
          </div>

          <h1 style={{ color: "#1A3C6E", fontSize: "28px", fontWeight: 700 }}>
            Booking Request Sent
          </h1>

          <p style={{ color: "#6B7280", fontSize: "15px" }}>
            Your request has been sent successfully.
          </p>

          <p style={{ color: "#9CA3AF", fontSize: "13px", marginBottom: "32px" }}>
            Provider will respond soon.
          </p>

          {/* ✅ OLD UI SAME */}
          <div className="text-left space-y-4 mb-8 p-6 rounded-2xl" style={{ background: "#F8FAFC" }}>

            <div className="flex items-center gap-3">
              <Home className="w-4 h-4" style={{ color: "#1A3C6E" }} />
              <div>
                <div className="text-xs text-gray-400">Service</div>
                <div className="font-semibold">{service}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Calendar className="w-4 h-4" style={{ color: "#1A3C6E" }} />
              <div>
                <div className="text-xs text-gray-400">Date</div>
                <div className="font-semibold">{formatDate(date)}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Clock className="w-4 h-4" style={{ color: "#1A3C6E" }} />
              <div>
                <div className="text-xs text-gray-400">Time Slot</div>
                <div className="font-semibold">{time}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <User className="w-4 h-4" style={{ color: "#1A3C6E" }} />
              <div>
                <div className="text-xs text-gray-400">Selected Provider</div>
                <div className="font-semibold">{provider}</div>
              </div>
            </div>

            {bookingId && (
              <div>
                <div className="text-xs text-gray-400">Booking ID</div>
                <div className="font-semibold">BK{bookingId}</div>
              </div>
            )}
          </div>

          <button
            onClick={() =>
              navigate("/provider-accepted", {
                state: {
                  providerId,
                  userId: 1,
                  service,
                  date: formatDate(date),
                },
              })
            }
            className="w-full py-3 rounded-xl font-semibold text-white"
            style={{ background: "#F97316" }}
          >
            View Provider Details
          </button>

        </div>
      </div>

      <Footer />
    </div>
  );
}

export default BookingRequest;