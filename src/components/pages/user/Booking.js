// import { useState, useEffect } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import {
//   MapPin,
//   Wrench,
//   ArrowRight,
//   ShieldCheck,
//   ChevronLeft,
//   Calendar,
//   Clock,
// } from "lucide-react";

// import { Navbar } from "../../Navbar";
// import { Footer } from "../../Footer";
// import { getServices, getCurrentUser } from "../../../services/store";

// function Booking() {
//   const { serviceId } = useParams();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const services = getServices();
//   const currentUser = getCurrentUser();

//   const searchParams = new URLSearchParams(location.search);

//   const [address, setAddress] = useState(
//     location.state?.address || searchParams.get("address") || ""
//   );
//   const [serviceType, setServiceType] = useState("");
//   const [description, setDescription] = useState(
//     location.state?.description || searchParams.get("description") || ""
//   );
//   const [date, setDate] = useState("");
//   const [time, setTime] = useState("");
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (serviceId) {
//       setServiceType(serviceId);
//     } else if (services.length > 0 && !serviceType) {
//       setServiceType(services[0].id);
//     }
//   }, [serviceId, services, serviceType]);

//   const handleNext = () => {
//     if (!address.trim()) {
//       alert("Please enter your address");
//       return;
//     }
//     if (!serviceType) {
//       alert("Please select a service type");
//       return;
//     }
//     if (!description.trim()) {
//       alert("Please describe your problem");
//       return;
//     }
//     if (!time) {
//       alert("Please select time slot");
//       return;
//     }
//     if (!date) {
//       alert("Please select date");
//       return;
//     }

//     setLoading(true);

//     setTimeout(() => {
//       const selectedService = services.find((s) => s.id === serviceType);

//       const bookingState = {
//         userId: currentUser?.id || "guest",
//         userName: currentUser?.name || "Guest User",
//         userEmail: currentUser?.email || "guest@example.com",
//         serviceId: serviceType,
//         service: selectedService?.name || serviceType,
//         address,
//         description,
//         date,
//         time,
//         amount: selectedService?.basePrice || "₹499",
//       };

//       navigate("/providers", {
//         state: bookingState,
//       });

//       setLoading(false);
//     }, 500);
//   };

//   return (
//     <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans text-slate-900">
//       <Navbar />

//       <main className="flex-grow flex items-center justify-center py-12 px-4">
//         <div className="max-w-2xl w-full">
//           <div className="mb-10">
//             <button
//               onClick={() => navigate("/")}
//               className="flex items-center text-slate-500 hover:text-[#1A3C6E] transition-colors mb-6 group text-sm font-bold"
//             >
//               <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
//               Back to Home
//             </button>

//             <h1 className="text-4xl font-black text-[#1A3C6E] leading-tight">
//               Book a <span className="text-[#F97316]">Service</span>
//             </h1>
//             <p className="text-slate-500 mt-2 font-medium">
//               Fill your booking details and continue to provider selection.
//             </p>
//           </div>

//           <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-indigo-100/50 border border-slate-100 overflow-hidden">
//             <div className="p-8 md:p-12">
//               <div className="space-y-8">
//                 {/* Address */}
//                 <div className="group">
//                   <label
//                     htmlFor="address"
//                     className="block text-xs font-black text-[#1A3C6E] mb-3 uppercase tracking-widest"
//                   >
//                     Address
//                   </label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
//                       <MapPin className="w-5 h-5" />
//                     </div>
//                     <input
//                       type="text"
//                       id="address"
//                       value={address}
//                       onChange={(e) => setAddress(e.target.value)}
//                       placeholder="e.g. 104, Blue Bells, Solapur"
//                       className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-slate-100 focus:border-[#1A3C6E] focus:ring-4 focus:ring-[#1A3C6E]/5 transition-all outline-none bg-slate-50 placeholder:text-slate-400 font-bold text-slate-800"
//                     />
//                   </div>
//                 </div>

//                 {/* Service */}
//                 <div className="group">
//                   <label
//                     htmlFor="serviceType"
//                     className="block text-xs font-black text-[#1A3C6E] mb-3 uppercase tracking-widest"
//                   >
//                     Service
//                   </label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
//                       <Wrench className="w-5 h-5" />
//                     </div>
//                     <select
//                       id="serviceType"
//                       value={serviceType}
//                       onChange={(e) => setServiceType(e.target.value)}
//                       className="w-full pl-12 pr-10 py-4 rounded-2xl border-2 border-slate-100 focus:border-[#1A3C6E] focus:ring-4 focus:ring-[#1A3C6E]/5 transition-all outline-none bg-slate-50 appearance-none cursor-pointer font-bold text-slate-800"
//                     >
//                       <option value="" disabled>
//                         Select a service...
//                       </option>
//                       {services.map((s) => (
//                         <option key={s.id} value={s.id}>
//                           {s.name}
//                         </option>
//                       ))}
//                     </select>
//                     <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-slate-400">
//                       <ArrowRight className="w-5 h-5 rotate-90" />
//                     </div>
//                   </div>
//                 </div>

//                 {/* Description */}
//                 <div className="group">
//                   <label
//                     htmlFor="description"
//                     className="block text-xs font-black text-[#1A3C6E] mb-3 uppercase tracking-widest"
//                   >
//                     Description
//                   </label>
//                   <textarea
//                     id="description"
//                     rows="4"
//                     value={description}
//                     onChange={(e) => setDescription(e.target.value)}
//                     placeholder="Briefly explain what you need help with..."
//                     className="w-full px-6 py-4 rounded-2xl border-2 border-slate-100 focus:border-[#1A3C6E] focus:ring-4 focus:ring-[#1A3C6E]/5 transition-all outline-none bg-slate-50 font-bold text-slate-800 placeholder:text-slate-400 resize-none shadow-inner"
//                   ></textarea>
//                 </div>

//                 {/* Time and Date */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-xs font-black text-[#1A3C6E] mb-3 uppercase tracking-widest">
//                       <span className="inline-flex items-center gap-2">
//                         <Clock className="w-4 h-4" />
//                         Time
//                       </span>
//                     </label>
//                     <select
//                       value={time}
//                       onChange={(e) => setTime(e.target.value)}
//                       className="w-full px-4 py-4 rounded-2xl border-2 border-slate-100 focus:border-[#1A3C6E] focus:ring-4 focus:ring-[#1A3C6E]/5 transition-all outline-none bg-slate-50 font-bold text-slate-800"
//                     >
//                       <option value="">Select time slot</option>
//                       <option value="7-11 AM">7-11 AM</option>
//                       <option value="12-4 PM">12-4 PM</option>
//                       <option value="5-8 PM">5-8 PM</option>
//                     </select>
//                   </div>

//                   <div>
//                     <label className="block text-xs font-black text-[#1A3C6E] mb-3 uppercase tracking-widest">
//                       <span className="inline-flex items-center gap-2">
//                         <Calendar className="w-4 h-4" />
//                         Date
//                       </span>
//                     </label>
//                     <input
//                       type="date"
//                       value={date}
//                       onChange={(e) => setDate(e.target.value)}
//                       className="w-full px-4 py-4 rounded-2xl border-2 border-slate-100 focus:border-[#1A3C6E] focus:ring-4 focus:ring-[#1A3C6E]/5 transition-all outline-none bg-slate-50 font-bold text-slate-800"
//                     />
//                   </div>
//                 </div>

//                 {/* Next */}
//                 <button
//                   onClick={handleNext}
//                   disabled={loading}
//                   className={`w-full py-5 rounded-2xl font-black text-white text-lg transition-all flex items-center justify-center gap-3 shadow-xl transform active:scale-[0.98] ${
//                     loading
//                       ? "bg-slate-300"
//                       : "bg-[#F97316] hover:bg-[#EA580C] hover:shadow-orange-200"
//                   }`}
//                 >
//                   {loading ? (
//                     <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
//                   ) : (
//                     <>
//                       Next Step
//                       <ArrowRight className="w-6 h-6" />
//                     </>
//                   )}
//                 </button>
//               </div>
//             </div>

//             <div className="bg-slate-50 px-8 py-4 flex items-center justify-center gap-6 border-t border-slate-100">
//               <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
//                 <ShieldCheck className="w-4 h-4 text-green-500" />
//                 Secure Booking
//               </div>
//               <div className="w-1 h-1 bg-slate-200 rounded-full"></div>
//               <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">
//                 Solapur Verified
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// }

// export default Booking;     


// import { useState, useEffect } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import {
//   ChevronLeft,
// } from "lucide-react";

// import { Navbar } from "../../Navbar";
// import { Footer } from "../../Footer";
// import { getServices, getCurrentUser } from "../../../services/store";

// function Booking() {
//   const { serviceId } = useParams();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const services = getServices();
//   const currentUser = getCurrentUser();

//   const searchParams = new URLSearchParams(location.search);

//   const [address, setAddress] = useState(
//     location.state?.address || searchParams.get("address") || ""
//   );
//   const [serviceType, setServiceType] = useState("");
//   const [description, setDescription] = useState(
//     location.state?.description || searchParams.get("description") || ""
//   );
//   const [date, setDate] = useState("");
//   const [time, setTime] = useState("");
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (serviceId) {
//       setServiceType(serviceId);
//     } else if (services.length > 0 && !serviceType) {
//       setServiceType(services[0].id);
//     }
//   }, [serviceId, services, serviceType]);

//   const handleNext = () => {
//     if (!address.trim()) {
//       alert("Please enter your address");
//       return;
//     }
//     if (!serviceType) {
//       alert("Please select a service type");
//       return;
//     }
//     if (!description.trim()) {
//       alert("Please describe your problem");
//       return;
//     }
//     if (!time) {
//       alert("Please select time slot");
//       return;
//     }
//     if (!date) {
//       alert("Please select date");
//       return;
//     }

//     setLoading(true);

//     setTimeout(() => {
//       const selectedService = services.find((s) => s.id === serviceType);

//       const bookingState = {
//         user_id: currentUser?.id || 1,
//         service_name: selectedService?.name || serviceType,
//         address,
//         description,
//         date,
//         time,
//       };

//       // ✅ IMPORTANT: GO TO PROVIDER SELECTION (NOT BOOKING REQUEST PAGE)
//       navigate("/providers", {
//         state: bookingState,
//       });

//       setLoading(false);
//     }, 500);
//   };

//   return (
//     <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans text-slate-900">
//       <Navbar />

//       <main className="flex-grow flex items-center justify-center py-12 px-4">
//         <div className="max-w-2xl w-full">
//           <div className="mb-10">
//             <button
//               onClick={() => navigate("/")}
//               className="flex items-center text-slate-500 hover:text-[#1A3C6E] transition-colors mb-6 group text-sm font-bold"
//             >
//               <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
//               Back to Home
//             </button>

//             <h1 className="text-4xl font-black text-[#1A3C6E] leading-tight">
//               Book a <span className="text-[#F97316]">Service</span>
//             </h1>
//             <p className="text-slate-500 mt-2 font-medium">
//               Fill your booking details and continue to provider selection.
//             </p>
//           </div>

//           <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-indigo-100/50 border border-slate-100 overflow-hidden">
//             <div className="p-8 md:p-12">
//               <div className="space-y-8">

//                 {/* Address */}
//                 <div>
//                   <label className="block text-xs font-black text-[#1A3C6E] mb-3 uppercase tracking-widest">
//                     Address
//                   </label>
//                   <input
//                     type="text"
//                     value={address}
//                     onChange={(e) => setAddress(e.target.value)}
//                     placeholder="Enter service address"
//                     className="w-full px-4 py-4 rounded-2xl border-2"
//                   />
//                 </div>

//                 {/* Service */}
//                 <div>
//                   <label className="block text-xs font-black text-[#1A3C6E] mb-3 uppercase tracking-widest">
//                     Service
//                   </label>
//                   <select
//                     value={serviceType}
//                     onChange={(e) => setServiceType(e.target.value)}
//                     className="w-full px-4 py-4 rounded-2xl border-2"
//                   >
//                     {services.map((s) => (
//                       <option key={s.id} value={s.id}>
//                         {s.name}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 {/* Description */}
//                 <textarea
//                   rows="3"
//                   value={description}
//                   onChange={(e) => setDescription(e.target.value)}
//                   placeholder="Describe your issue"
//                   className="w-full px-4 py-4 rounded-2xl border-2"
//                 />

//                 {/* Time + Date */}
//                 <div className="grid grid-cols-2 gap-4">
//                   <select
//                     value={time}
//                     onChange={(e) => setTime(e.target.value)}
//                     className="px-4 py-4 rounded-2xl border-2"
//                   >
//                     <option value="">Time Slot</option>
//                     <option>ASAP</option>
//                     <option>Morning</option>
//                     <option>Evening</option>
//                   </select>

//                   <input
//                     type="date"
//                     value={date}
//                     onChange={(e) => setDate(e.target.value)}
//                     className="px-4 py-4 rounded-2xl border-2"
//                   />
//                 </div>

//                 <button
//                   onClick={handleNext}
//                   className="w-full py-5 rounded-2xl font-black text-white bg-[#F97316]"
//                 >
//                   Next Step →
//                 </button>

//               </div>
//             </div>
//           </div>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// }

// export default Booking;



import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

import { Navbar } from "../../Navbar";
import { Footer } from "../../Footer";
import { getServices, getCurrentUser } from "../../../services/store";

function Booking() {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const services = getServices();
  const currentUser = getCurrentUser();

  const searchParams = new URLSearchParams(location.search);

  const [address, setAddress] = useState(
    location.state?.address || searchParams.get("address") || ""
  );
  const [serviceType, setServiceType] = useState("");
  const [description, setDescription] = useState(
    location.state?.description || searchParams.get("description") || ""
  );
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    if (serviceId) {
      setServiceType(serviceId);
    } else if (services.length > 0 && !serviceType) {
      setServiceType(services[0].id);
    }
  }, [serviceId, services, serviceType]);

  const handleNext = () => {
    if (!address || !description || !date || !time) {
      alert("Fill all fields");
      return;
    }

    const selectedService = services.find((s) => s.id === serviceType);

    navigate("/providers", {
      state: {
        service: selectedService?.name,
        address,
        description,
        date,
        time,
        user_id: currentUser?.id || 1
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      <Navbar />

      <main className="flex-grow flex items-center justify-center py-12 px-4">
        <div className="max-w-2xl w-full">

          <button
            onClick={() =>
  navigate("/provider-accepted", {
    state: {
      providerId: provider.id,
      bookingId: "BK" + Date.now(),
    },
  })
}
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back
          </button>

          <h1 className="text-4xl font-black text-[#1A3C6E]">
            Book Service
          </h1>

          <div className="bg-white rounded-3xl p-8 mt-6 shadow">

            <input
              className="w-full border p-3 mb-3"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            <select
              className="w-full border p-3 mb-3"
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
            >
              {services.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>

            <textarea
              className="w-full border p-3 mb-3"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <select
              className="w-full border p-3 mb-3"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            >
              <option>ASAP</option>
              <option>Morning</option>
              <option>Evening</option>
            </select>

            <input
              type="date"
              className="w-full border p-3 mb-3"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />

            <button
              onClick={handleNext}
              className="w-full bg-orange-500 text-white py-3 rounded"
            >
              Next Step →
            </button>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Booking;