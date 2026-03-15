// import { useState, useEffect, useRef } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { getProviders, addBooking, getCurrentUser } from "../../../services/store";
// import AddressSelectPopup from "./auth/AddressSelectPopup";

// function buildWhatsAppLink(phone, providerName, service, description) {
//   const clean = phone.replace(/\D/g, "");
//   const msg = encodeURIComponent(
//     `Hello ${providerName}! 👋\n\nA customer wants to book your *${service || "service"}* on ServeEasySolapur.\n\nProblem Description:\n${description || "Not provided"}\n\nAre you available to provide the service?\n\nPlease reply:\n✅ *YES* – I am available\n❌ *NO* – I am not available`
//   );
//   return `https://wa.me/91${clean}?text=${msg}`;
// }

// function initials(name) {
//   return name
//     .split(" ")
//     .map((n) => n[0])
//     .join("")
//     .slice(0, 2)
//     .toUpperCase();
// }

// function stars(rating) {
//   return "★".repeat(Math.round(rating)) + "☆".repeat(5 - Math.round(rating));
// }

// const STEPS = ["Connect", "Responded", "Confirm", "Review"];

// // ─── Review Modal ─────────────────────────────────────────────────────────────
// function ReviewModal({ provider, onClose, onBook }) {
//   const overlayRef = useRef();
//   const [copied, setCopied] = useState(false);

//   useEffect(() => {
//     const h = (e) => {
//       if (e.key === "Escape") onClose();
//     };
//     window.addEventListener("keydown", h);
//     return () => window.removeEventListener("keydown", h);
//   }, [onClose]);

//   const handleShare = () => {
//     const text = `🔧 Service Provider Details\n\nName: ${provider.name}\nSpecialty: ${provider.specialty}\nPhone: +91 ${provider.phone}\nLocation: ${provider.location}\nRating: ⭐ ${provider.rating}/5.0\n\nBooked via ServeEasySolapur`;

//     if (navigator.share) {
//       navigator.share({ title: provider.name, text });
//     } else {
//       navigator.clipboard.writeText(text).then(() => {
//         setCopied(true);
//         setTimeout(() => setCopied(false), 2000);
//       });
//     }
//   };

//   return (
//     <div
//       ref={overlayRef}
//       onClick={(e) => {
//         if (e.target === overlayRef.current) onClose();
//       }}
//       style={RM.overlay}
//     >
//       <div style={RM.modal}>
//         <div style={RM.header}>
//           <div style={RM.headerLeft}>
//             <div style={RM.bigAvatar}>{initials(provider.name)}</div>
//             <div>
//               <h2 style={RM.name}>{provider.name}</h2>
//               <div
//                 style={{
//                   fontSize: "13px",
//                   color: "#F97316",
//                   fontWeight: 700,
//                   textTransform: "uppercase",
//                   marginBottom: "6px",
//                 }}
//               >
//                 {provider.specialty}
//               </div>
//               <span style={RM.availBadge}>✅ Available — Request Confirmed</span>
//             </div>
//           </div>
//           <button onClick={onClose} style={RM.closeBtn}>
//             ✕
//           </button>
//         </div>

//         <div style={RM.infoSection}>
//           <div style={RM.infoRow}>
//             <div style={RM.infoRowIcon}>👤</div>
//             <div>
//               <div style={RM.infoRowLabel}>Provider Name</div>
//               <div style={RM.infoRowValue}>{provider.name}</div>
//             </div>
//           </div>

//           <div style={RM.infoRow}>
//             <div style={RM.infoRowIcon}>📞</div>
//             <div style={{ flex: 1 }}>
//               <div style={RM.infoRowLabel}>Contact Number</div>
//               <div style={RM.infoRowValue}>+91 {provider.phone}</div>
//             </div>
//             <a href={`tel:+91${provider.phone}`} style={RM.callBtn}>
//               📲 Call Now
//             </a>
//           </div>

//           <div style={RM.infoRow}>
//             <div style={RM.infoRowIcon}>📋</div>
//             <div>
//               <div style={RM.infoRowLabel}>Request Status</div>
//               <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "4px" }}>
//                 <span style={RM.statusBadge}>✅ Confirmed & Available</span>
//               </div>
//             </div>
//           </div>

//           <div style={RM.infoRow}>
//             <div style={RM.infoRowIcon}>⭐</div>
//             <div>
//               <div style={RM.infoRowLabel}>Rating</div>
//               <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "4px" }}>
//                 <span style={RM.infoRowValue}>{provider.rating} / 5.0</span>
//                 <span style={{ color: "#F59E0B", fontSize: "15px" }}>{stars(provider.rating)}</span>
//                 <span style={{ color: "#9CA3AF", fontSize: "12px" }}>
//                   ({provider.reviews} reviews)
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div style={RM.docSection}>
//           <div style={RM.verifiedBadge}>✔ Identity Verified by ServeEasySolapur Admin</div>
//         </div>

//         <div style={RM.actions}>
//           <button onClick={handleShare} style={RM.shareBtn}>
//             {copied ? "✓ Copied!" : "🔗 Share Provider"}
//           </button>
//           <button onClick={onBook} style={RM.bookBtn}>
//             ✅ Book Now →
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// const RM = {
//   overlay: {
//     position: "fixed",
//     inset: 0,
//     backgroundColor: "rgba(0,0,0,0.6)",
//     backdropFilter: "blur(5px)",
//     zIndex: 1000,
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: "16px",
//   },
//   modal: {
//     backgroundColor: "white",
//     borderRadius: "24px",
//     width: "100%",
//     maxWidth: "480px",
//     maxHeight: "92vh",
//     overflowY: "auto",
//     boxShadow: "0 28px 70px rgba(0,0,0,0.25)",
//   },
//   header: {
//     display: "flex",
//     alignItems: "flex-start",
//     justifyContent: "space-between",
//     padding: "24px 24px 0",
//   },
//   headerLeft: { display: "flex", alignItems: "flex-start", gap: "16px" },
//   bigAvatar: {
//     width: "64px",
//     height: "64px",
//     borderRadius: "16px",
//     backgroundColor: "#1A3C6E",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     color: "white",
//     fontWeight: 800,
//     fontSize: "22px",
//     flexShrink: 0,
//   },
//   name: { fontSize: "20px", fontWeight: 800, color: "#111827", margin: "0 0 4px" },
//   availBadge: {
//     display: "inline-block",
//     padding: "4px 10px",
//     borderRadius: "20px",
//     backgroundColor: "#DCFCE7",
//     color: "#166534",
//     fontWeight: 700,
//     fontSize: "12px",
//     border: "1.5px solid #86EFAC",
//   },
//   closeBtn: {
//     width: "34px",
//     height: "34px",
//     borderRadius: "50%",
//     border: "none",
//     backgroundColor: "#F3F4F6",
//     color: "#374151",
//     fontSize: "16px",
//     cursor: "pointer",
//     flexShrink: 0,
//   },

//   infoSection: {
//     padding: "20px 24px",
//     display: "flex",
//     flexDirection: "column",
//     gap: "4px",
//   },
//   infoRow: {
//     display: "flex",
//     alignItems: "flex-start",
//     gap: "14px",
//     padding: "14px 16px",
//     backgroundColor: "#F8FAFC",
//     borderRadius: "14px",
//     border: "1.5px solid #E5E7EB",
//     marginBottom: "8px",
//   },
//   infoRowIcon: { fontSize: "22px", flexShrink: 0, marginTop: "2px" },
//   infoRowLabel: {
//     fontSize: "11px",
//     color: "#9CA3AF",
//     fontWeight: 700,
//     textTransform: "uppercase",
//     letterSpacing: "0.4px",
//     marginBottom: "4px",
//   },
//   infoRowValue: { fontSize: "16px", fontWeight: 800, color: "#1A3C6E" },
//   callBtn: {
//     padding: "8px 14px",
//     backgroundColor: "#DCFCE7",
//     color: "#166534",
//     border: "1.5px solid #86EFAC",
//     borderRadius: "10px",
//     fontWeight: 700,
//     fontSize: "13px",
//     cursor: "pointer",
//     textDecoration: "none",
//     whiteSpace: "nowrap",
//     alignSelf: "center",
//   },
//   statusBadge: {
//     padding: "5px 12px",
//     borderRadius: "20px",
//     backgroundColor: "#DCFCE7",
//     color: "#166534",
//     fontWeight: 700,
//     fontSize: "13px",
//     border: "1.5px solid #86EFAC",
//   },

//   docSection: { padding: "0 24px 20px" },
//   verifiedBadge: {
//     padding: "11px 14px",
//     backgroundColor: "#F0FDF4",
//     borderRadius: "10px",
//     color: "#166534",
//     fontWeight: 700,
//     fontSize: "13px",
//   },

//   actions: { display: "flex", gap: "10px", padding: "0 24px 24px" },
//   shareBtn: {
//     flex: 1,
//     padding: "12px",
//     borderRadius: "12px",
//     border: "none",
//     backgroundColor: "#1A3C6E",
//     color: "white",
//     fontWeight: 700,
//     fontSize: "14px",
//     cursor: "pointer",
//   },
//   bookBtn: {
//     flex: 2,
//     padding: "12px",
//     borderRadius: "12px",
//     border: "none",
//     backgroundColor: "#22C55E",
//     color: "white",
//     fontWeight: 700,
//     fontSize: "14px",
//     cursor: "pointer",
//     boxShadow: "0 4px 14px rgba(34,197,94,0.35)",
//   },
// };

// // ─── Document Modal ───────────────────────────────────────────────────────────
// function DocModal({ provider, onClose }) {
//   const ref = useRef();

//   useEffect(() => {
//     const h = (e) => {
//       if (e.key === "Escape") onClose();
//     };
//     window.addEventListener("keydown", h);
//     return () => window.removeEventListener("keydown", h);
//   }, [onClose]);

//   const docs = provider.documents || {};
//   const aadhar = docs.aadhar || null;
//   const photo = docs.photo || null;

//   return (
//     <div
//       ref={ref}
//       onClick={(e) => {
//         if (e.target === ref.current) onClose();
//       }}
//       style={DM.overlay}
//     >
//       <div style={DM.modal}>
//         <div style={DM.header}>
//           <div>
//             <h2 style={DM.title}>📄 Verification Documents</h2>
//             <p style={DM.sub}>
//               {provider.name} — Identity &amp; Certification
//             </p>
//           </div>
//           <button onClick={onClose} style={DM.closeBtn}>
//             ✕
//           </button>
//         </div>

//         <div style={DM.grid}>
//           {[
//             { label: "🪪 Aadhaar Card", file: aadhar },
//             { label: "📸 Photo / Certificate", file: photo },
//           ].map(({ label, file }) => (
//             <div key={label} style={DM.card}>
//               <div style={DM.cardLabel}>{label}</div>
//               {file ? (
//                 <div style={{ padding: "10px" }}>
//                   {file.endsWith(".pdf") ? (
//                     <iframe src={file} title={label} style={DM.pdfFrame} />
//                   ) : (
//                     <img src={file} alt={label} style={DM.docImg} />
//                   )}
//                   <a href={file} target="_blank" rel="noreferrer" style={DM.openLink}>
//                     🔗 Open Full {file.endsWith(".pdf") ? "PDF" : "Image"}
//                   </a>
//                 </div>
//               ) : (
//                 <div style={DM.noDoc}>Not uploaded yet</div>
//               )}
//             </div>
//           ))}
//         </div>

//         <div style={DM.footer}>✔ Identity Verified by ServeEasySolapur Admin</div>
//       </div>
//     </div>
//   );
// }

// const DM = {
//   overlay: {
//     position: "fixed",
//     inset: 0,
//     backgroundColor: "rgba(0,0,0,0.6)",
//     backdropFilter: "blur(5px)",
//     zIndex: 1100,
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: "16px",
//   },
//   modal: {
//     backgroundColor: "white",
//     borderRadius: "20px",
//     width: "100%",
//     maxWidth: "600px",
//     maxHeight: "90vh",
//     overflowY: "auto",
//     boxShadow: "0 24px 60px rgba(0,0,0,0.25)",
//   },
//   header: {
//     display: "flex",
//     alignItems: "flex-start",
//     justifyContent: "space-between",
//     padding: "22px 24px 16px",
//     borderBottom: "1px solid #F3F4F6",
//   },
//   title: { fontSize: "18px", fontWeight: 800, color: "#1A3C6E", margin: 0 },
//   sub: { color: "#6B7280", fontSize: "13px", marginTop: "4px" },
//   closeBtn: {
//     width: "34px",
//     height: "34px",
//     borderRadius: "50%",
//     border: "none",
//     backgroundColor: "#F3F4F6",
//     color: "#374151",
//     fontSize: "15px",
//     cursor: "pointer",
//     flexShrink: 0,
//   },
//   grid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", padding: "20px 24px" },
//   card: { border: "1.5px solid #E5E7EB", borderRadius: "14px", overflow: "hidden" },
//   cardLabel: {
//     padding: "10px 14px",
//     backgroundColor: "#F8FAFC",
//     borderBottom: "1px solid #E5E7EB",
//     fontWeight: 700,
//     fontSize: "13px",
//     color: "#1A3C6E",
//   },
//   pdfFrame: {
//     width: "100%",
//     height: "200px",
//     border: "none",
//     borderRadius: "8px",
//     backgroundColor: "#F3F4F6",
//   },
//   docImg: {
//     width: "100%",
//     height: "180px",
//     objectFit: "cover",
//     borderRadius: "8px",
//     display: "block",
//   },
//   openLink: {
//     display: "block",
//     marginTop: "6px",
//     color: "#1A3C6E",
//     fontWeight: 600,
//     fontSize: "12px",
//     textDecoration: "none",
//   },
//   noDoc: { padding: "40px 12px", textAlign: "center", color: "#9CA3AF", fontSize: "13px" },
//   footer: {
//     padding: "14px 24px",
//     backgroundColor: "#F0FDF4",
//     borderTop: "1px solid #DCFCE7",
//     color: "#166534",
//     fontWeight: 700,
//     fontSize: "13px",
//     borderRadius: "0 0 20px 20px",
//   },
// };

// // ─── Respond Dropdown ─────────────────────────────────────────────────────────
// function RespondDropdown({ providerId, isYes, isNo, onRespond }) {
//   const [open, setOpen] = useState(false);
//   const wrapRef = useRef();

//   useEffect(() => {
//     const handler = (e) => {
//       if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
//     };
//     document.addEventListener("mousedown", handler);
//     return () => document.removeEventListener("mousedown", handler);
//   }, []);

//   const btnStyle = {
//     ...S.workflowBtn,
//     backgroundColor: isYes ? "#DCFCE7" : isNo ? "#FEE2E2" : "white",
//     color: isYes ? "#166534" : isNo ? "#991B1B" : "#374151",
//     borderColor: isYes ? "#86EFAC" : isNo ? "#FECACA" : "#D1D5DB",
//     opacity: 1,
//   };

//   const label = isYes ? "✅ Yes — Available" : isNo ? "❌ No — Unavailable" : "💬 Responded ▾";

//   return (
//     <div ref={wrapRef} style={{ position: "relative" }}>
//       <button style={btnStyle} onClick={() => setOpen((p) => !p)}>
//         {label}
//       </button>

//       {open && (
//         <div style={S.dropdown}>
//           <div style={S.dropTitle}>Provider replied on WhatsApp:</div>

//           <div
//             style={{
//               ...S.dropItem,
//               backgroundColor: isYes ? "#DCFCE7" : "white",
//               color: "#166534",
//               fontWeight: isYes ? 800 : 600,
//               borderBottom: "1px solid #F3F4F6",
//             }}
//             onMouseDown={() => {
//               onRespond(providerId, "yes");
//               setOpen(false);
//             }}
//             onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#DCFCE7")}
//             onMouseOut={(e) => (e.currentTarget.style.backgroundColor = isYes ? "#DCFCE7" : "white")}
//           >
//             {isYes ? "✅" : "⬜"}&nbsp; Yes, I am available
//           </div>

//           <div
//             style={{
//               ...S.dropItem,
//               backgroundColor: isNo ? "#FEE2E2" : "white",
//               color: "#991B1B",
//               fontWeight: isNo ? 800 : 600,
//             }}
//             onMouseDown={() => {
//               onRespond(providerId, "no");
//               setOpen(false);
//             }}
//             onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#FEE2E2")}
//             onMouseOut={(e) => (e.currentTarget.style.backgroundColor = isNo ? "#FEE2E2" : "white")}
//           >
//             {isNo ? "❌" : "⬜"}&nbsp; No, I am not available
//           </div>

//           {(isYes || isNo) && (
//             <div
//               style={{
//                 ...S.dropItem,
//                 color: "#9CA3AF",
//                 fontSize: "12px",
//                 borderTop: "1px solid #F3F4F6",
//               }}
//               onMouseDown={() => {
//                 onRespond(providerId, null);
//                 setOpen(false);
//               }}
//               onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#F9FAFB")}
//               onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "white")}
//             >
//               ✕ Clear response
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// // ─── Workflow Step Bar ────────────────────────────────────────────────────────
// function WorkflowBar({ step }) {
//   return (
//     <div style={S.workflowBar}>
//       {STEPS.map((label, i) => {
//         const done = i < step;
//         const active = i === step;

//         return (
//           <div key={label} style={{ display: "flex", alignItems: "center" }}>
//             <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
//               <div
//                 style={{
//                   ...S.wfDot,
//                   backgroundColor: done ? "#22C55E" : active ? "#1A3C6E" : "#E5E7EB",
//                   color: done || active ? "white" : "#9CA3AF",
//                   boxShadow: active ? "0 0 0 3px rgba(26,60,110,0.2)" : "none",
//                 }}
//               >
//                 {done ? "✓" : i + 1}
//               </div>
//               <span
//                 style={{
//                   fontSize: "10px",
//                   fontWeight: active ? 800 : 600,
//                   color: done ? "#22C55E" : active ? "#1A3C6E" : "#9CA3AF",
//                   whiteSpace: "nowrap",
//                 }}
//               >
//                 {label}
//               </span>
//             </div>
//             {i < 3 && <div style={{ ...S.wfLine, backgroundColor: done ? "#22C55E" : "#E5E7EB" }} />}
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// // ─── Main Component ───────────────────────────────────────────────────────────
// export function ProviderList() {
//   const { state } = useLocation();
//   const navigate = useNavigate();
//   const currentUser = getCurrentUser();

//   const allProviders = getProviders().filter(
//     (p) => p.status === "active" && (!state?.serviceId || p.services?.includes(state.serviceId))
//   );

//   const [ps, setPs] = useState(() => {
//     const s = {};
//     allProviders.forEach((p) => {
//       s[p.id] = {
//         waSent: false,
//         availability: null,
//         confirmed: false,
//         reviewed: false,
//         description: state?.description || "",
//         descriptionOpen: false,
//       };
//     });
//     return s;
//   });

//   const [selectAll, setSelectAll] = useState(false);
//   const [reviewProvider, setReviewProvider] = useState(null);
//   const [docProvider, setDocProvider] = useState(null);
//   const [globalDescOpen, setGlobalDescOpen] = useState(false);
//   const [globalDesc, setGlobalDesc] = useState(state?.description || "");
//   const [addressModal, setAddressModal] = useState(null);

//   const upd = (id, patch) =>
//     setPs((prev) => ({
//       ...prev,
//       [id]: { ...prev[id], ...patch },
//     }));

//   // ✅ After login redirect — open address popup only if user has no saved address
//   useEffect(() => {
//     const pending = sessionStorage.getItem("pendingProviderSelection");
//     if (!pending) return;

//     const user = getCurrentUser();
//     if (!user) return;

//     try {
//       const data = JSON.parse(pending);
//       sessionStorage.removeItem("pendingProviderSelection");

//       const defaultAddress = user?.addresses?.find((a) => a.isDefault) || user?.addresses?.[0];

//       if (defaultAddress) {
//         const addressLine =
//           `${defaultAddress.line1}` +
//           `${defaultAddress.line2 ? ", " + defaultAddress.line2 : ""}, ` +
//           `${defaultAddress.city} - ${defaultAddress.pinCode}`;

//         addBooking({
//           userId: user.id,
//           userName: user.name,
//           userEmail: user.email,
//           ...data,
//           address: addressLine,
//           status: "requested",
//         });

//         navigate("/booking-request", {
//           replace: true,
//           state: {
//             service: data.service,
//             date: data.date,
//             time: data.time || "ASAP",
//             address: addressLine,
//             providers: data.providers || [],
//             description: data.description || "",
//             bookingId: `BK${Date.now().toString().slice(-6)}`,
//           },
//         });
//       } else {
//         setAddressModal(data);
//       }
//     } catch {
//       sessionStorage.removeItem("pendingProviderSelection");
//     }
//   }, [navigate]);

//   const getStep = (id) => {
//     const p = ps[id];
//     if (p.reviewed || p.confirmed) return 3;
//     if (p.availability === "yes") return 2;
//     if (p.waSent) return 1;
//     return 0;
//   };

//   const handleSelectAll = () => {
//     if (!selectAll) {
//       setGlobalDescOpen(true);
//     } else {
//       setSelectAll(false);
//       setGlobalDescOpen(false);
//       setPs((prev) => {
//         const updated = { ...prev };
//         allProviders.forEach((p) => {
//           updated[p.id] = {
//             ...updated[p.id],
//             waSent: false,
//             descriptionOpen: false,
//           };
//         });
//         return updated;
//       });
//     }
//   };

//   const handleSaveGlobalDesc = () => {
//     if (!globalDesc.trim()) {
//       alert("Please enter a problem description for all experts.");
//       return;
//     }

//     setGlobalDescOpen(false);
//     setSelectAll(true);

//     setPs((prev) => {
//       const updated = { ...prev };
//       allProviders.forEach((p) => {
//         updated[p.id] = {
//           ...updated[p.id],
//           description: globalDesc.trim(),
//           descriptionOpen: false,
//           waSent: true,
//         };
//       });
//       return updated;
//     });
//   };

//   const handleDescriptionChange = (id, value) => upd(id, { description: value });

//   const handleSaveDescription = (id) => {
//     if (!ps[id].description.trim()) {
//       alert("Please enter a problem description.");
//       return;
//     }
//     upd(id, { descriptionOpen: false });
//   };

//   const handleWaSent = (id) => {
//     if (!ps[id].description.trim()) {
//       upd(id, { waSent: true, descriptionOpen: true });
//     } else {
//       upd(id, { waSent: true });
//     }
//   };

//   const handleRespond = (id, answer) => upd(id, { availability: answer });

//   const handleConfirm = (id) => {
//     upd(id, { confirmed: true, reviewed: false });
//     const provider = allProviders.find((p) => p.id === id);
//     setReviewProvider(provider);
//   };

//   const handleCloseReview = (id) => {
//     setReviewProvider(null);
//     if (id) upd(id, { reviewed: true });
//   };

//   const confirmedCount = Object.values(ps).filter((s) => s.confirmed).length;

//   const handleProceed = () => {
//     if (confirmedCount === 0) return;

//     const chosenProviders = allProviders.filter((p) => ps[p.id].confirmed);
//     const chosenNames = chosenProviders.map((p) => p.name);
//     const descriptions = chosenProviders.map((p) => ps[p.id].description?.trim()).filter(Boolean);
//     const finalDescription = descriptions.join(" | ") || state?.description || "";

//     const bookingData = {
//       service: state?.service || "General Service",
//       address: state?.address || "",
//       description: finalDescription,
//       date: state?.date || new Date().toLocaleDateString(),
//       time: state?.time || "ASAP",
//       amount: state?.amount || "₹499",
//       providers: chosenNames,
//     };

//     if (!currentUser) {
//       sessionStorage.setItem("pendingProviderSelection", JSON.stringify(bookingData));
//       if (window.__navbarOpenModal) window.__navbarOpenModal("login");
//       return;
//     }

//     const defaultAddress = currentUser?.addresses?.find((a) => a.isDefault) || currentUser?.addresses?.[0];

//     if (defaultAddress) {
//       const addressLine =
//         `${defaultAddress.line1}` +
//         `${defaultAddress.line2 ? ", " + defaultAddress.line2 : ""}, ` +
//         `${defaultAddress.city} - ${defaultAddress.pinCode}`;

//       addBooking({
//         userId: currentUser.id,
//         userName: currentUser.name,
//         userEmail: currentUser.email,
//         ...bookingData,
//         address: addressLine,
//         status: "requested",
//       });

//       navigate("/booking-request", {
//         state: {
//           ...state,
//           providers: chosenNames,
//           description: finalDescription,
//           time: state?.time || "ASAP",
//           address: addressLine,
//           bookingId: `BK${Date.now().toString().slice(-6)}`,
//         },
//       });
//     } else {
//       setAddressModal(bookingData);
//     }
//   };

//   return (
//     <div style={S.page}>
//       {addressModal && (
//         <AddressSelectPopup
//           user={getCurrentUser()}
//           onSkip={() => setAddressModal(null)}
//           onConfirm={(addressLine) => {
//             const user = getCurrentUser();
//             if (!user) {
//               setAddressModal(null);
//               return;
//             }

//             addBooking({
//               userId: user.id,
//               userName: user.name,
//               userEmail: user.email,
//               ...addressModal,
//               address: addressLine,
//               status: "requested",
//             });

//             setAddressModal(null);

//             navigate("/booking-request", {
//               replace: true,
//               state: {
//                 service: addressModal.service,
//                 date: addressModal.date,
//                 time: addressModal.time || "ASAP",
//                 address: addressLine,
//                 providers: addressModal.providers || [],
//                 description: addressModal.description || "",
//                 bookingId: `BK${Date.now().toString().slice(-6)}`,
//               },
//             });
//           }}
//         />
//       )}

//       {docProvider && <DocModal provider={docProvider} onClose={() => setDocProvider(null)} />}

//       {reviewProvider && (
//         <ReviewModal
//           provider={reviewProvider}
//           onClose={() => handleCloseReview(reviewProvider.id)}
//           onBook={() => {
//             handleCloseReview(reviewProvider.id);
//             handleProceed();
//           }}
//         />
//       )}

//       <nav style={S.nav}>
//         <div style={S.logoWrap}>
//           <div style={S.logoIcon}>🏠</div>
//           <span style={S.logoText}>
//             ServeEasy<span style={{ color: "#F97316" }}>Solapur</span>
//           </span>
//         </div>
//       </nav>

//       <div style={S.container}>
//         <div style={S.pageHeader}>
//           <div>
//             <h1 style={S.h1}>Select Professionals</h1>
//             <p style={S.subtitle}>Connect with verified experts in Solapur</p>
//           </div>

//           <button
//             onClick={handleSelectAll}
//             style={{
//               ...S.selectAllBtn,
//               backgroundColor: selectAll ? "#1A3C6E" : "white",
//               color: selectAll ? "white" : "#1A3C6E",
//             }}
//           >
//             {selectAll ? "✓ All WhatsApp Sent" : "👥 Select All Experts"}
//           </button>
//         </div>

//         {globalDescOpen && (
//           <div style={S.globalDescBox}>
//             <div style={S.globalDescHeader}>
//               <span style={{ fontSize: "22px" }}>📝</span>
//               <div>
//                 <div style={{ fontWeight: 800, fontSize: "15px", color: "#1A3C6E" }}>
//                   Problem Description for All Experts
//                 </div>
//                 <div style={{ fontSize: "13px", color: "#6B7280", marginTop: "2px" }}>
//                   This description will be sent to <strong>all {allProviders.length} experts</strong> via WhatsApp
//                 </div>
//               </div>
//             </div>

//             <textarea
//               value={globalDesc}
//               onChange={(e) => setGlobalDesc(e.target.value)}
//               placeholder="Describe your problem here... (e.g. My tap is leaking, need urgent repair)"
//               style={S.globalDescTextarea}
//               autoFocus
//             />

//             <div style={{ display: "flex", gap: "10px", marginTop: "12px" }}>
//               <button onClick={handleSaveGlobalDesc} style={S.globalDescSaveBtn}>
//                 ✅ Apply to All & Mark WhatsApp Sent
//               </button>
//               <button onClick={() => setGlobalDescOpen(false)} style={S.globalDescCancelBtn}>
//                 Cancel
//               </button>
//             </div>
//           </div>
//         )}

//         {!currentUser && (
//           <div style={S.infoBanner}>
//             ⚠️ You can proceed without login. Sign-in will be asked on the next step.
//           </div>
//         )}

//         {confirmedCount > 0 && (
//           <div style={S.quickBar}>
//             <span style={S.quickText}>
//               ✅ {confirmedCount} provider{confirmedCount > 1 ? "s" : ""} confirmed for booking
//             </span>
//             <button onClick={handleProceed} style={S.quickProceed}>
//               Proceed to Booking →
//             </button>
//           </div>
//         )}

//         <div style={S.list}>
//           {allProviders.length === 0 ? (
//             <div style={S.empty}>
//               <div style={{ fontSize: "48px", marginBottom: "12px" }}>🔍</div>
//               <h2 style={{ color: "#374151", fontWeight: 700 }}>No experts found</h2>
//             </div>
//           ) : (
//             allProviders.map((provider) => {
//               const pst = ps[provider.id];
//               const isYes = pst.availability === "yes";
//               const isNo = pst.availability === "no";
//               const step = getStep(provider.id);

//               return (
//                 <div
//                   key={provider.id}
//                   style={{
//                     ...S.card,
//                     borderColor: pst.confirmed
//                       ? "#22C55E"
//                       : isYes
//                       ? "#6D28D9"
//                       : isNo
//                       ? "#EF4444"
//                       : pst.waSent
//                       ? "#F59E0B"
//                       : "#E5E7EB",
//                     opacity: isNo ? 0.72 : 1,
//                   }}
//                 >
//                   {!pst.confirmed && isYes && (
//                     <div style={S.bannerYes}>
//                       <span style={{ fontSize: "20px" }}>✅</span>
//                       <div>
//                         <div style={{ fontWeight: 800, fontSize: "14px", color: "#5B21B6" }}>
//                           Provider is Available!
//                         </div>
//                         <div style={{ fontSize: "12.5px", color: "#6D28D9", marginTop: "2px" }}>
//                           {provider.name} replied YES — Now confirm to proceed
//                         </div>
//                       </div>
//                     </div>
//                   )}

//                   {isNo && (
//                     <div style={S.bannerRed}>
//                       <span style={{ fontSize: "20px" }}>❌</span>
//                       <div>
//                         <div style={{ fontWeight: 800, fontSize: "14px", color: "#991B1B" }}>
//                           Provider Not Available
//                         </div>
//                         <div style={{ fontSize: "12.5px", color: "#DC2626", marginTop: "2px" }}>
//                           {provider.name} replied NO
//                         </div>
//                       </div>
//                     </div>
//                   )}

//                   <div style={S.cardBody}>
//                     <div style={S.avatarWrap}>
//                       <div style={S.avatar}>{initials(provider.name)}</div>
//                       <div
//                         style={{
//                           ...S.onlineDot,
//                           backgroundColor: pst.confirmed
//                             ? "#22C55E"
//                             : isYes
//                             ? "#7C3AED"
//                             : isNo
//                             ? "#EF4444"
//                             : pst.waSent
//                             ? "#F59E0B"
//                             : "#94A3B8",
//                         }}
//                       />
//                     </div>

//                     <div style={S.info}>
//                       <div style={S.nameRow}>
//                         <h3 style={S.name}>{provider.name}</h3>
//                         {pst.confirmed && <span style={S.badgeConfirmed}>🎉 Confirmed</span>}
//                         {!pst.confirmed && isYes && <span style={S.badgePurple}>✅ Available</span>}
//                         {isNo && <span style={S.badgeRed}>❌ Not Available</span>}
//                       </div>

//                       <div style={S.metaRow}>
//                         <span style={S.specialty}>{provider.specialty}</span>
//                         <span style={{ color: "#D1D5DB" }}>•</span>
//                         <span style={S.rating}>
//                           ⭐ {provider.rating} ({provider.reviews})
//                         </span>
//                       </div>

//                       <div style={S.tags}>
//                         <span style={S.tag}>💼 {provider.experience} Exp</span>
//                         <span style={S.tag}>📍 {provider.location}</span>
//                         <button onClick={() => setDocProvider(provider)} style={S.verifiedChip}>
//                           ✔ Verified 📄
//                         </button>
//                       </div>

//                       <div style={S.contactRow}>
//                         <span style={S.chip}>📞 +91 {provider.phone}</span>
//                       </div>

//                       {!pst.descriptionOpen && (
//                         <button
//                           onClick={() => upd(provider.id, { descriptionOpen: true })}
//                           style={{
//                             ...S.descToggleBtn,
//                             backgroundColor: pst.description ? "#EA6C00" : "#F97316",
//                             borderColor: pst.description ? "#EA6C00" : "#F97316",
//                             color: "white",
//                             boxShadow: "0 3px 10px rgba(249,115,22,0.4)",
//                           }}
//                         >
//                           📝 {pst.description ? "Edit Description ✓" : "Add Description"}
//                         </button>
//                       )}

//                       {pst.descriptionOpen && (
//                         <div style={S.descWrap}>
//                           <label style={S.descLabel}>📝 Problem Description</label>
//                           <textarea
//                             value={pst.description}
//                             onChange={(e) => handleDescriptionChange(provider.id, e.target.value)}
//                             placeholder="Describe your problem for this provider..."
//                             style={S.descBox}
//                             autoFocus
//                           />
//                           <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
//                             <button onClick={() => handleSaveDescription(provider.id)} style={S.descSaveBtn}>
//                               ✅ Save Description
//                             </button>
//                             <button
//                               onClick={() => upd(provider.id, { descriptionOpen: false })}
//                               style={S.descCancelBtn}
//                             >
//                               Cancel
//                             </button>
//                           </div>
//                         </div>
//                       )}

//                       <a
//                         href={buildWhatsAppLink(provider.phone, provider.name, state?.service, pst.description)}
//                         target="_blank"
//                         rel="noreferrer"
//                         onClick={() => handleWaSent(provider.id)}
//                         style={{
//                           ...S.waBtn,
//                           backgroundColor: pst.waSent ? "#16A34A" : "#22C55E",
//                           color: "white",
//                           border: "none",
//                           boxShadow: "0 3px 10px rgba(34,197,94,0.4)",
//                         }}
//                         onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#16A34A")}
//                         onMouseOut={(e) =>
//                           (e.currentTarget.style.backgroundColor = pst.waSent ? "#16A34A" : "#22C55E")
//                         }
//                       >
//                         {pst.waSent ? "WhatsApp Sent ✓" : "Send WhatsApp Request"}
//                       </a>
//                     </div>

//                     <div style={S.workflowCol}>
//                       <WorkflowBar step={step} />

//                       <div style={{ ...S.stepBlock, borderColor: step >= 0 ? "#3B82F6" : "#E5E7EB" }}>
//                         <div style={{ ...S.stepHeader, color: "#3B82F6" }}>① Connect</div>
//                         <div style={{ fontSize: "12px", color: "#6B7280" }}>
//                           {pst.waSent ? "✓ WhatsApp message sent" : "Send WhatsApp to connect"}
//                         </div>
//                       </div>

//                       <div
//                         style={{
//                           ...S.stepBlock,
//                           borderColor: step >= 1 ? "#F59E0B" : "#E5E7EB",
//                           opacity: pst.waSent ? 1 : 0.5,
//                         }}
//                       >
//                         <div style={{ ...S.stepHeader, color: "#D97706" }}>② Responded</div>
//                         <RespondDropdown
//                           providerId={provider.id}
//                           isYes={isYes}
//                           isNo={isNo}
//                           onRespond={handleRespond}
//                         />
//                       </div>

//                       <div
//                         style={{
//                           ...S.stepBlock,
//                           borderColor: step >= 2 ? "#7C3AED" : "#E5E7EB",
//                           opacity: isYes ? 1 : 0.4,
//                         }}
//                       >
//                         <div style={{ ...S.stepHeader, color: "#7C3AED" }}>③ Confirm</div>
//                         <button
//                           disabled={!isYes || pst.confirmed}
//                           onClick={() => handleConfirm(provider.id)}
//                           style={{
//                             ...S.workflowBtn,
//                             backgroundColor: pst.confirmed ? "#DCFCE7" : isYes ? "#7C3AED" : "#F3F4F6",
//                             color: pst.confirmed ? "#166534" : isYes ? "white" : "#9CA3AF",
//                             borderColor: pst.confirmed ? "#86EFAC" : isYes ? "#7C3AED" : "#E5E7EB",
//                             cursor: isYes && !pst.confirmed ? "pointer" : "not-allowed",
//                           }}
//                         >
//                           {pst.confirmed ? "✓ Confirmed" : isYes ? "✅ Confirm Provider" : "Waiting for YES reply"}
//                         </button>
//                       </div>

//                       <div
//                         style={{
//                           ...S.stepBlock,
//                           borderColor: step >= 3 ? "#22C55E" : "#E5E7EB",
//                           opacity: pst.confirmed ? 1 : 0.4,
//                         }}
//                       >
//                         <div style={{ ...S.stepHeader, color: "#16A34A" }}>④ Review</div>
//                         <button
//                           disabled={!pst.confirmed}
//                           onClick={() => setReviewProvider(provider)}
//                           style={{
//                             ...S.workflowBtn,
//                             backgroundColor: pst.confirmed ? "#DCFCE7" : "#F3F4F6",
//                             color: pst.confirmed ? "#166534" : "#9CA3AF",
//                             borderColor: pst.confirmed ? "#86EFAC" : "#E5E7EB",
//                             cursor: pst.confirmed ? "pointer" : "not-allowed",
//                             fontWeight: pst.confirmed ? 800 : 600,
//                           }}
//                         >
//                           {pst.confirmed ? "⭐ View Review" : "Complete steps first"}
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })
//           )}
//         </div>

//         {confirmedCount > 0 && (
//           <div style={{ textAlign: "center", marginTop: "36px" }}>
//             <button onClick={handleProceed} style={S.proceedBtn}>
//               Proceed with {confirmedCount} Confirmed Professional{confirmedCount > 1 ? "s" : ""} →
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// // ─── Styles ───────────────────────────────────────────────────────────────────
// const S = {
//   page: {
//     minHeight: "100vh",
//     backgroundColor: "#F8FAFC",
//     fontFamily: "'Segoe UI', system-ui, sans-serif",
//   },
//   nav: {
//     backgroundColor: "white",
//     borderBottom: "1px solid #E5E7EB",
//     height: "64px",
//     display: "flex",
//     alignItems: "center",
//     padding: "0 24px",
//     position: "sticky",
//     top: 0,
//     zIndex: 100,
//     boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
//   },
//   logoWrap: { display: "flex", alignItems: "center", gap: "10px" },
//   logoIcon: {
//     width: "38px",
//     height: "38px",
//     borderRadius: "50%",
//     backgroundColor: "#1A3C6E",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     fontSize: "18px",
//   },
//   logoText: { fontSize: "18px", fontWeight: 800, color: "#1A3C6E" },
//   container: { maxWidth: "1040px", margin: "0 auto", padding: "36px 16px 60px" },
//   pageHeader: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "space-between",
//     marginBottom: "16px",
//     flexWrap: "wrap",
//     gap: "12px",
//   },
//   h1: { fontSize: "28px", fontWeight: 800, color: "#1A3C6E", margin: 0, letterSpacing: "-0.5px" },
//   subtitle: { color: "#6B7280", fontSize: "15px", marginTop: "4px" },
//   selectAllBtn: {
//     display: "flex",
//     alignItems: "center",
//     gap: "8px",
//     padding: "11px 22px",
//     borderRadius: "12px",
//     border: "2px solid #1A3C6E",
//     fontWeight: 700,
//     fontSize: "14px",
//     cursor: "pointer",
//     transition: "all 0.18s",
//   },

//   globalDescBox: {
//     backgroundColor: "#FFF7ED",
//     border: "2px solid #FED7AA",
//     borderRadius: "16px",
//     padding: "20px 24px",
//     marginBottom: "20px",
//     boxShadow: "0 4px 18px rgba(249,115,22,0.12)",
//   },
//   globalDescHeader: { display: "flex", alignItems: "flex-start", gap: "12px", marginBottom: "14px" },
//   globalDescTextarea: {
//     width: "100%",
//     minHeight: "100px",
//     border: "1.5px solid #FDBA74",
//     borderRadius: "10px",
//     padding: "10px 14px",
//     fontSize: "14px",
//     resize: "vertical",
//     outline: "none",
//     boxSizing: "border-box",
//     backgroundColor: "white",
//     fontFamily: "inherit",
//   },
//   globalDescSaveBtn: {
//     padding: "10px 22px",
//     backgroundColor: "#F97316",
//     color: "white",
//     border: "none",
//     borderRadius: "10px",
//     fontWeight: 700,
//     fontSize: "14px",
//     cursor: "pointer",
//   },
//   globalDescCancelBtn: {
//     padding: "10px 18px",
//     backgroundColor: "white",
//     color: "#6B7280",
//     border: "1.5px solid #D1D5DB",
//     borderRadius: "10px",
//     fontWeight: 600,
//     fontSize: "14px",
//     cursor: "pointer",
//   },

//   descToggleBtn: {
//     display: "inline-flex",
//     alignItems: "center",
//     gap: "6px",
//     marginBottom: "10px",
//     padding: "7px 14px",
//     borderRadius: "8px",
//     border: "1.5px solid",
//     fontWeight: 600,
//     fontSize: "13px",
//     cursor: "pointer",
//     transition: "all 0.18s",
//   },
//   descWrap: {
//     marginBottom: "12px",
//     padding: "12px",
//     backgroundColor: "#FFF7ED",
//     border: "1px solid #FED7AA",
//     borderRadius: "12px",
//   },
//   descLabel: {
//     display: "block",
//     fontSize: "13px",
//     fontWeight: 700,
//     color: "#9A3412",
//     marginBottom: "8px",
//   },
//   descBox: {
//     width: "100%",
//     minHeight: "80px",
//     border: "1px solid #FDBA74",
//     borderRadius: "10px",
//     padding: "10px 12px",
//     fontSize: "14px",
//     resize: "vertical",
//     outline: "none",
//     boxSizing: "border-box",
//     fontFamily: "inherit",
//   },
//   descSaveBtn: {
//     padding: "8px 16px",
//     backgroundColor: "#F97316",
//     color: "white",
//     border: "none",
//     borderRadius: "8px",
//     fontWeight: 700,
//     fontSize: "13px",
//     cursor: "pointer",
//   },
//   descCancelBtn: {
//     padding: "8px 14px",
//     backgroundColor: "white",
//     color: "#6B7280",
//     border: "1.5px solid #D1D5DB",
//     borderRadius: "8px",
//     fontWeight: 600,
//     fontSize: "13px",
//     cursor: "pointer",
//   },

//   infoBanner: {
//     backgroundColor: "#FFFBEB",
//     border: "1px solid #FDE68A",
//     borderRadius: "12px",
//     padding: "13px 18px",
//     marginBottom: "20px",
//     color: "#92400E",
//     fontSize: "14px",
//     fontWeight: 500,
//   },
//   quickBar: {
//     backgroundColor: "#F0FDF4",
//     borderRadius: "12px",
//     padding: "12px 18px",
//     marginBottom: "20px",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "space-between",
//     flexWrap: "wrap",
//     gap: "10px",
//     border: "1.5px solid #86EFAC",
//   },
//   quickText: { color: "#166534", fontWeight: 600, fontSize: "14px" },
//   quickProceed: {
//     padding: "8px 22px",
//     backgroundColor: "#22C55E",
//     color: "white",
//     border: "none",
//     borderRadius: "10px",
//     fontWeight: 700,
//     fontSize: "14px",
//     cursor: "pointer",
//   },
//   list: { display: "flex", flexDirection: "column", gap: "20px" },
//   empty: {
//     padding: "60px 20px",
//     textAlign: "center",
//     backgroundColor: "white",
//     borderRadius: "18px",
//     border: "2px dashed #E5E7EB",
//   },
//   card: {
//     backgroundColor: "white",
//     borderRadius: "18px",
//     border: "2px solid #E5E7EB",
//     boxShadow: "0 2px 14px rgba(0,0,0,0.05)",
//     transition: "border-color 0.2s",
//     overflow: "visible",
//   },

//   bannerYes: {
//     padding: "12px 20px",
//     borderRadius: "16px 16px 0 0",
//     backgroundColor: "#EDE9FE",
//     display: "flex",
//     alignItems: "center",
//     gap: "12px",
//     borderBottom: "1px solid #C4B5FD",
//   },
//   bannerRed: {
//     padding: "12px 20px",
//     borderRadius: "16px 16px 0 0",
//     backgroundColor: "#FEE2E2",
//     display: "flex",
//     alignItems: "center",
//     gap: "12px",
//     borderBottom: "1px solid #FECACA",
//   },

//   cardBody: {
//     padding: "20px",
//     display: "flex",
//     alignItems: "flex-start",
//     gap: "16px",
//     flexWrap: "wrap",
//   },
//   avatarWrap: { position: "relative", flexShrink: 0 },
//   avatar: {
//     width: "60px",
//     height: "60px",
//     borderRadius: "14px",
//     backgroundColor: "#1A3C6E",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     color: "white",
//     fontWeight: 800,
//     fontSize: "20px",
//   },
//   onlineDot: {
//     position: "absolute",
//     bottom: "2px",
//     right: "2px",
//     width: "14px",
//     height: "14px",
//     borderRadius: "50%",
//     border: "2.5px solid white",
//     transition: "background-color 0.3s",
//   },
//   info: { flex: 1, minWidth: "200px" },
//   nameRow: { display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", marginBottom: "4px" },
//   name: { fontSize: "17px", fontWeight: 700, color: "#111827", margin: 0 },
//   badgeConfirmed: {
//     padding: "3px 10px",
//     borderRadius: "20px",
//     fontSize: "12px",
//     fontWeight: 700,
//     backgroundColor: "#DCFCE7",
//     color: "#166534",
//     border: "1.5px solid #86EFAC",
//   },
//   badgePurple: {
//     padding: "3px 10px",
//     borderRadius: "20px",
//     fontSize: "12px",
//     fontWeight: 700,
//     backgroundColor: "#EDE9FE",
//     color: "#5B21B6",
//     border: "1.5px solid #C4B5FD",
//   },
//   badgeRed: {
//     padding: "3px 10px",
//     borderRadius: "20px",
//     fontSize: "12px",
//     fontWeight: 700,
//     backgroundColor: "#FEE2E2",
//     color: "#991B1B",
//     border: "1.5px solid #FECACA",
//   },
//   metaRow: { display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px", flexWrap: "wrap" },
//   specialty: {
//     color: "#F97316",
//     fontWeight: 700,
//     fontSize: "11px",
//     textTransform: "uppercase",
//     letterSpacing: "0.6px",
//   },
//   rating: { fontSize: "13px", color: "#374151", fontWeight: 500 },
//   tags: {
//     display: "flex",
//     flexWrap: "wrap",
//     gap: "8px",
//     fontSize: "12.5px",
//     color: "#6B7280",
//     marginBottom: "8px",
//     alignItems: "center",
//   },
//   tag: { display: "flex", alignItems: "center", gap: "4px" },
//   verifiedChip: {
//     padding: "2px 8px",
//     backgroundColor: "#F0FDF4",
//     color: "#059669",
//     border: "1px solid #86EFAC",
//     borderRadius: "20px",
//     fontSize: "11px",
//     fontWeight: 700,
//     cursor: "pointer",
//   },
//   contactRow: { display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "10px" },
//   chip: {
//     padding: "4px 10px",
//     backgroundColor: "#F8FAFC",
//     border: "1px solid #E5E7EB",
//     borderRadius: "8px",
//     fontSize: "12.5px",
//     color: "#374151",
//     fontWeight: 500,
//   },
//   waBtn: {
//     display: "inline-flex",
//     alignItems: "center",
//     gap: "8px",
//     padding: "9px 16px",
//     color: "#15803D",
//     border: "1.5px solid #86EFAC",
//     borderRadius: "10px",
//     fontSize: "13px",
//     fontWeight: 700,
//     cursor: "pointer",
//     textDecoration: "none",
//     transition: "background-color 0.2s",
//     alignSelf: "flex-start",
//   },

//   workflowCol: {
//     display: "flex",
//     flexDirection: "column",
//     gap: "8px",
//     minWidth: "210px",
//     flexShrink: 0,
//   },
//   workflowBar: {
//     display: "flex",
//     alignItems: "flex-start",
//     justifyContent: "center",
//     gap: "0",
//     marginBottom: "8px",
//     paddingBottom: "8px",
//     borderBottom: "1px solid #F3F4F6",
//   },
//   wfDot: {
//     width: "24px",
//     height: "24px",
//     borderRadius: "50%",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     fontSize: "11px",
//     fontWeight: 800,
//     flexShrink: 0,
//     transition: "all 0.2s",
//   },
//   wfLine: { width: "18px", height: "3px", marginBottom: "10px", transition: "background-color 0.2s" },
//   stepBlock: {
//     border: "1.5px solid #E5E7EB",
//     borderRadius: "12px",
//     padding: "10px 12px",
//     display: "flex",
//     flexDirection: "column",
//     gap: "6px",
//     transition: "border-color 0.2s",
//   },
//   stepHeader: { fontSize: "11px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.5px" },
//   workflowBtn: {
//     width: "100%",
//     padding: "9px 10px",
//     borderRadius: "9px",
//     border: "1.5px solid",
//     fontWeight: 600,
//     fontSize: "13px",
//     cursor: "pointer",
//     transition: "all 0.18s",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     gap: "5px",
//     boxSizing: "border-box",
//     whiteSpace: "nowrap",
//   },

//   dropdown: {
//     position: "absolute",
//     right: 0,
//     top: "calc(100% + 6px)",
//     backgroundColor: "white",
//     border: "1.5px solid #E5E7EB",
//     borderRadius: "14px",
//     boxShadow: "0 8px 28px rgba(0,0,0,0.13)",
//     overflow: "hidden",
//     zIndex: 300,
//     minWidth: "220px",
//   },
//   dropTitle: {
//     padding: "10px 16px 8px",
//     fontSize: "11px",
//     color: "#9CA3AF",
//     fontWeight: 700,
//     textTransform: "uppercase",
//     letterSpacing: "0.5px",
//     borderBottom: "1px solid #F3F4F6",
//   },
//   dropItem: {
//     width: "100%",
//     padding: "12px 16px",
//     textAlign: "left",
//     fontSize: "14px",
//     cursor: "pointer",
//     transition: "background-color 0.15s",
//     userSelect: "none",
//   },

//   proceedBtn: {
//     padding: "14px 52px",
//     backgroundColor: "#22C55E",
//     color: "white",
//     border: "none",
//     borderRadius: "14px",
//     fontWeight: 700,
//     fontSize: "16px",
//     cursor: "pointer",
//     boxShadow: "0 4px 18px rgba(34,197,94,0.38)",
//   },
// };

// export default ProviderList;

// import { useState, useEffect, useRef } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { getProviders, addBooking, getCurrentUser } from "../../../services/store";

// function buildWhatsAppLink(phone, providerName, service, description) {
//   const clean = phone.replace(/\D/g, "");
//   const msg = encodeURIComponent(
//     `Hello ${providerName}! 👋\n\nA customer wants to book your *${service || "service"}* on ServeEasySolapur.\n\nProblem Description:\n${description || "Not provided"}\n\nAre you available to provide the service?\n\nPlease reply:\n✅ *YES* – I am available\n❌ *NO* – I am not available`
//   );
//   return `https://wa.me/91${clean}?text=${msg}`;
// }

// function initials(name) {
//   return name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
// }

// function stars(rating) {
//   return "★".repeat(Math.round(rating)) + "☆".repeat(5 - Math.round(rating));
// }

// const STEPS = ["Connect", "Responded", "Confirm", "Review"];

// // ─── Review Modal ─────────────────────────────────────────────────────────────
// function ReviewModal({ provider, onClose, onBook }) {
//   const overlayRef = useRef();
//   const [copied, setCopied] = useState(false);

//   useEffect(() => {
//     const h = (e) => { if (e.key === "Escape") onClose(); };
//     window.addEventListener("keydown", h);
//     return () => window.removeEventListener("keydown", h);
//   }, [onClose]);

//   const handleShare = () => {
//     const text = `🔧 Service Provider Details\n\nName: ${provider.name}\nSpecialty: ${provider.specialty}\nPhone: +91 ${provider.phone}\nLocation: ${provider.location}\nRating: ⭐ ${provider.rating}/5.0\n\nBooked via ServeEasySolapur`;
//     if (navigator.share) {
//       navigator.share({ title: provider.name, text });
//     } else {
//       navigator.clipboard.writeText(text).then(() => {
//         setCopied(true);
//         setTimeout(() => setCopied(false), 2000);
//       });
//     }
//   };

//   return (
//     <div
//       ref={overlayRef}
//       onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
//       style={RM.overlay}
//     >
//       <div style={RM.modal}>

//         {/* Header */}
//         <div style={RM.header}>
//           <div style={RM.headerLeft}>
//             <div style={RM.bigAvatar}>{initials(provider.name)}</div>
//             <div>
//               <h2 style={RM.name}>{provider.name}</h2>
//               <div style={{ fontSize: "13px", color: "#F97316", fontWeight: 700, textTransform: "uppercase", marginBottom: "6px" }}>{provider.specialty}</div>
//               <span style={RM.availBadge}>✅ Available — Request Confirmed</span>
//             </div>
//           </div>
//           <button onClick={onClose} style={RM.closeBtn}>✕</button>
//         </div>

//         {/* Main info — Name, Contact, Status */}
//         <div style={RM.infoSection}>

//           {/* Provider Name */}
//           <div style={RM.infoRow}>
//             <div style={RM.infoRowIcon}>👤</div>
//             <div>
//               <div style={RM.infoRowLabel}>Provider Name</div>
//               <div style={RM.infoRowValue}>{provider.name}</div>
//             </div>
//           </div>

//           {/* Contact Number */}
//           <div style={RM.infoRow}>
//             <div style={RM.infoRowIcon}>📞</div>
//             <div style={{ flex: 1 }}>
//               <div style={RM.infoRowLabel}>Contact Number</div>
//               <div style={RM.infoRowValue}>+91 {provider.phone}</div>
//             </div>
//             <a href={`tel:+91${provider.phone}`} style={RM.callBtn}>📲 Call Now</a>
//           </div>

//           {/* Status */}
//           <div style={RM.infoRow}>
//             <div style={RM.infoRowIcon}>📋</div>
//             <div>
//               <div style={RM.infoRowLabel}>Request Status</div>
//               <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "4px" }}>
//                 <span style={RM.statusBadge}>✅ Confirmed & Available</span>
//               </div>
//             </div>
//           </div>

//           {/* Rating */}
//           <div style={RM.infoRow}>
//             <div style={RM.infoRowIcon}>⭐</div>
//             <div>
//               <div style={RM.infoRowLabel}>Rating</div>
//               <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "4px" }}>
//                 <span style={RM.infoRowValue}>{provider.rating} / 5.0</span>
//                 <span style={{ color: "#F59E0B", fontSize: "15px" }}>{stars(provider.rating)}</span>
//                 <span style={{ color: "#9CA3AF", fontSize: "12px" }}>({provider.reviews} reviews)</span>
//               </div>
//             </div>
//           </div>

//         </div>

//         {/* Verified badge only */}
//         <div style={RM.docSection}>
//           <div style={RM.verifiedBadge}>✔ Identity Verified by ServeEasySolapur Admin</div>
//         </div>

//         {/* Bottom buttons */}
//         <div style={RM.actions}>
//           <button onClick={handleShare} style={RM.shareBtn}>
//             {copied ? "✓ Copied!" : "🔗 Share Provider"}
//           </button>
//           <button onClick={onBook} style={RM.bookBtn}>
//             ✅ Book Now →
//           </button>
//         </div>

//       </div>
//     </div>
//   );
// }

// const RM = {
//   overlay:        { position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(5px)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" },
//   modal:          { backgroundColor: "white", borderRadius: "24px", width: "100%", maxWidth: "480px", maxHeight: "92vh", overflowY: "auto", boxShadow: "0 28px 70px rgba(0,0,0,0.25)" },
//   header:         { display: "flex", alignItems: "flex-start", justifyContent: "space-between", padding: "24px 24px 0" },
//   headerLeft:     { display: "flex", alignItems: "flex-start", gap: "16px" },
//   bigAvatar:      { width: "64px", height: "64px", borderRadius: "16px", backgroundColor: "#1A3C6E", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 800, fontSize: "22px", flexShrink: 0 },
//   name:           { fontSize: "20px", fontWeight: 800, color: "#111827", margin: "0 0 4px" },
//   availBadge:     { display: "inline-block", padding: "4px 10px", borderRadius: "20px", backgroundColor: "#DCFCE7", color: "#166534", fontWeight: 700, fontSize: "12px", border: "1.5px solid #86EFAC" },
//   closeBtn:       { width: "34px", height: "34px", borderRadius: "50%", border: "none", backgroundColor: "#F3F4F6", color: "#374151", fontSize: "16px", cursor: "pointer", flexShrink: 0 },

//   infoSection:    { padding: "20px 24px", display: "flex", flexDirection: "column", gap: "4px" },
//   infoRow:        { display: "flex", alignItems: "flex-start", gap: "14px", padding: "14px 16px", backgroundColor: "#F8FAFC", borderRadius: "14px", border: "1.5px solid #E5E7EB", marginBottom: "8px" },
//   infoRowIcon:    { fontSize: "22px", flexShrink: 0, marginTop: "2px" },
//   infoRowLabel:   { fontSize: "11px", color: "#9CA3AF", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.4px", marginBottom: "4px" },
//   infoRowValue:   { fontSize: "16px", fontWeight: 800, color: "#1A3C6E" },
//   callBtn:        { padding: "8px 14px", backgroundColor: "#DCFCE7", color: "#166534", border: "1.5px solid #86EFAC", borderRadius: "10px", fontWeight: 700, fontSize: "13px", cursor: "pointer", textDecoration: "none", whiteSpace: "nowrap", alignSelf: "center" },
//   statusBadge:    { padding: "5px 12px", borderRadius: "20px", backgroundColor: "#DCFCE7", color: "#166534", fontWeight: 700, fontSize: "13px", border: "1.5px solid #86EFAC" },

//   docSection:     { padding: "0 24px 20px" },
//   docToggleBtn:   { width: "100%", padding: "11px 16px", backgroundColor: "#EEF4FF", color: "#1A3C6E", border: "1.5px solid #C7D7F8", borderRadius: "12px", fontWeight: 700, fontSize: "13px", cursor: "pointer", textAlign: "left", marginBottom: "10px" },
//   docGrid:        { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" },
//   docCard:        { border: "1.5px solid #E5E7EB", borderRadius: "12px", overflow: "hidden" },
//   docLabel:       { padding: "10px 12px", backgroundColor: "#F8FAFC", borderBottom: "1px solid #E5E7EB", fontWeight: 700, fontSize: "13px", color: "#1A3C6E" },
//   pdfFrame:       { width: "100%", height: "160px", border: "none", borderRadius: "6px", backgroundColor: "#F3F4F6" },
//   docImg:         { width: "100%", height: "130px", objectFit: "cover", borderRadius: "6px", display: "block" },
//   openLink:       { display: "block", marginTop: "6px", color: "#1A3C6E", fontWeight: 600, fontSize: "12px", textDecoration: "none" },
//   noDoc:          { padding: "30px 12px", textAlign: "center", color: "#9CA3AF", fontSize: "12px" },
//   verifiedBadge:  { padding: "11px 14px", backgroundColor: "#F0FDF4", borderRadius: "10px", color: "#166534", fontWeight: 700, fontSize: "13px" },

//   actions:        { display: "flex", gap: "10px", padding: "0 24px 24px" },
//   shareBtn:       { flex: 1, padding: "12px", borderRadius: "12px", border: "none", backgroundColor: "#1A3C6E", color: "white", fontWeight: 700, fontSize: "14px", cursor: "pointer" },
//   bookBtn:        { flex: 2, padding: "12px", borderRadius: "12px", border: "none", backgroundColor: "#22C55E", color: "white", fontWeight: 700, fontSize: "14px", cursor: "pointer", boxShadow: "0 4px 14px rgba(34,197,94,0.35)" },
//   closeActionBtn: { flex: 1, padding: "12px", borderRadius: "12px", border: "2px solid #E5E7EB", backgroundColor: "white", color: "#374151", fontWeight: 600, fontSize: "14px", cursor: "pointer" },
// };

// // ─── Document Modal (opened by clicking ✔ Verified chip) ─────────────────────
// function DocModal({ provider, onClose }) {
//   const ref = useRef();
//   useEffect(() => {
//     const h = (e) => { if (e.key === "Escape") onClose(); };
//     window.addEventListener("keydown", h);
//     return () => window.removeEventListener("keydown", h);
//   }, [onClose]);

//   const docs   = provider.documents || {};
//   const aadhar = docs.aadhar || null;
//   const photo  = docs.photo  || null;

//   return (
//     <div ref={ref} onClick={(e) => { if (e.target === ref.current) onClose(); }} style={DM.overlay}>
//       <div style={DM.modal}>
//         <div style={DM.header}>
//           <div>
//             <h2 style={DM.title}>📄 Verification Documents</h2>
//             <p style={DM.sub}>{provider.name} — Identity &amp; Certification</p>
//           </div>
//           <button onClick={onClose} style={DM.closeBtn}>✕</button>
//         </div>

//         <div style={DM.grid}>
//           {[
//             { label: "🪪 Aadhaar Card", file: aadhar },
//             { label: "📸 Photo / Certificate", file: photo },
//           ].map(({ label, file }) => (
//             <div key={label} style={DM.card}>
//               <div style={DM.cardLabel}>{label}</div>
//               {file ? (
//                 <div style={{ padding: "10px" }}>
//                   {file.endsWith(".pdf") ? (
//                     <iframe src={file} title={label} style={DM.pdfFrame} />
//                   ) : (
//                     <img src={file} alt={label} style={DM.docImg} />
//                   )}
//                   <a href={file} target="_blank" rel="noreferrer" style={DM.openLink}>
//                     🔗 Open Full {file.endsWith(".pdf") ? "PDF" : "Image"}
//                   </a>
//                 </div>
//               ) : (
//                 <div style={DM.noDoc}>Not uploaded yet</div>
//               )}
//             </div>
//           ))}
//         </div>

//         <div style={DM.footer}>✔ Identity Verified by ServeEasySolapur Admin</div>
//       </div>
//     </div>
//   );
// }

// const DM = {
//   overlay:   { position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(5px)", zIndex: 1100, display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" },
//   modal:     { backgroundColor: "white", borderRadius: "20px", width: "100%", maxWidth: "600px", maxHeight: "90vh", overflowY: "auto", boxShadow: "0 24px 60px rgba(0,0,0,0.25)" },
//   header:    { display: "flex", alignItems: "flex-start", justifyContent: "space-between", padding: "22px 24px 16px", borderBottom: "1px solid #F3F4F6" },
//   title:     { fontSize: "18px", fontWeight: 800, color: "#1A3C6E", margin: 0 },
//   sub:       { color: "#6B7280", fontSize: "13px", marginTop: "4px" },
//   closeBtn:  { width: "34px", height: "34px", borderRadius: "50%", border: "none", backgroundColor: "#F3F4F6", color: "#374151", fontSize: "15px", cursor: "pointer", flexShrink: 0 },
//   grid:      { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", padding: "20px 24px" },
//   card:      { border: "1.5px solid #E5E7EB", borderRadius: "14px", overflow: "hidden" },
//   cardLabel: { padding: "10px 14px", backgroundColor: "#F8FAFC", borderBottom: "1px solid #E5E7EB", fontWeight: 700, fontSize: "13px", color: "#1A3C6E" },
//   pdfFrame:  { width: "100%", height: "200px", border: "none", borderRadius: "8px", backgroundColor: "#F3F4F6" },
//   docImg:    { width: "100%", height: "180px", objectFit: "cover", borderRadius: "8px", display: "block" },
//   openLink:  { display: "block", marginTop: "6px", color: "#1A3C6E", fontWeight: 600, fontSize: "12px", textDecoration: "none" },
//   noDoc:     { padding: "40px 12px", textAlign: "center", color: "#9CA3AF", fontSize: "13px" },
//   footer:    { padding: "14px 24px", backgroundColor: "#F0FDF4", borderTop: "1px solid #DCFCE7", color: "#166534", fontWeight: 700, fontSize: "13px", borderRadius: "0 0 20px 20px" },
// };

// // ─── Respond Dropdown ─────────────────────────────────────────────────────────
// function RespondDropdown({ providerId, isYes, isNo, onRespond }) {
//   const [open, setOpen] = useState(false);
//   const wrapRef = useRef();

//   useEffect(() => {
//     const handler = (e) => {
//       if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
//     };
//     document.addEventListener("mousedown", handler);
//     return () => document.removeEventListener("mousedown", handler);
//   }, []);

//   const btnStyle = {
//     ...S.workflowBtn,
//     backgroundColor: isYes ? "#DCFCE7" : isNo ? "#FEE2E2" : "white",
//     color:           isYes ? "#166534" : isNo ? "#991B1B" : "#374151",
//     borderColor:     isYes ? "#86EFAC" : isNo ? "#FECACA" : "#D1D5DB",
//     opacity: 1,
//   };

//   const label = isYes ? "✅ Yes — Available" : isNo ? "❌ No — Unavailable" : "💬 Responded ▾";

//   return (
//     <div ref={wrapRef} style={{ position: "relative" }}>
//       <button style={btnStyle} onClick={() => setOpen((p) => !p)}>{label}</button>

//       {open && (
//         <div style={S.dropdown}>
//           <div style={S.dropTitle}>Provider replied on WhatsApp:</div>
//           <div
//             style={{ ...S.dropItem, backgroundColor: isYes ? "#DCFCE7" : "white", color: "#166534", fontWeight: isYes ? 800 : 600, borderBottom: "1px solid #F3F4F6" }}
//             onMouseDown={() => { onRespond(providerId, "yes"); setOpen(false); }}
//             onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#DCFCE7")}
//             onMouseOut={(e)  => (e.currentTarget.style.backgroundColor = isYes ? "#DCFCE7" : "white")}
//           >
//             {isYes ? "✅" : "⬜"}&nbsp; Yes, I am available
//           </div>
//           <div
//             style={{ ...S.dropItem, backgroundColor: isNo ? "#FEE2E2" : "white", color: "#991B1B", fontWeight: isNo ? 800 : 600 }}
//             onMouseDown={() => { onRespond(providerId, "no"); setOpen(false); }}
//             onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#FEE2E2")}
//             onMouseOut={(e)  => (e.currentTarget.style.backgroundColor = isNo ? "#FEE2E2" : "white")}
//           >
//             {isNo ? "❌" : "⬜"}&nbsp; No, I am not available
//           </div>
//           {(isYes || isNo) && (
//             <div
//               style={{ ...S.dropItem, color: "#9CA3AF", fontSize: "12px", borderTop: "1px solid #F3F4F6" }}
//               onMouseDown={() => { onRespond(providerId, null); setOpen(false); }}
//               onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#F9FAFB")}
//               onMouseOut={(e)  => (e.currentTarget.style.backgroundColor = "white")}
//             >
//               ✕ Clear response
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// // ─── Workflow Step Bar ────────────────────────────────────────────────────────
// function WorkflowBar({ step }) {
//   return (
//     <div style={S.workflowBar}>
//       {STEPS.map((label, i) => {
//         const done   = i < step;
//         const active = i === step;
//         return (
//           <div key={label} style={{ display: "flex", alignItems: "center" }}>
//             <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
//               <div style={{
//                 ...S.wfDot,
//                 backgroundColor: done ? "#22C55E" : active ? "#1A3C6E" : "#E5E7EB",
//                 color: done || active ? "white" : "#9CA3AF",
//                 boxShadow: active ? "0 0 0 3px rgba(26,60,110,0.2)" : "none",
//               }}>
//                 {done ? "✓" : i + 1}
//               </div>
//               <span style={{ fontSize: "10px", fontWeight: active ? 800 : 600, color: done ? "#22C55E" : active ? "#1A3C6E" : "#9CA3AF", whiteSpace: "nowrap" }}>
//                 {label}
//               </span>
//             </div>
//             {i < 3 && <div style={{ ...S.wfLine, backgroundColor: done ? "#22C55E" : "#E5E7EB" }} />}
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// // ─── Main Component ───────────────────────────────────────────────────────────
// export function ProviderList() {
//   const { state }   = useLocation();
//   const navigate    = useNavigate();
//   const currentUser = getCurrentUser();

//   const allProviders = getProviders().filter((p) => p.status === "active");

//   const [ps, setPs] = useState(() => {
//     const s = {};
//     allProviders.forEach((p) => {
//       s[p.id] = {
//         waSent:          false,
//         availability:    null,
//         confirmed:       false,
//         reviewed:        false,
//         description:     state?.description || "",
//         descriptionOpen: false,
//       };
//     });
//     return s;
//   });

//   const [selectAll,      setSelectAll]      = useState(false);
//   const [reviewProvider, setReviewProvider] = useState(null);
//   const [docProvider,    setDocProvider]    = useState(null);
//   const [globalDescOpen, setGlobalDescOpen] = useState(false);
//   const [globalDesc,     setGlobalDesc]     = useState(state?.description || "");

//   const upd = (id, patch) =>
//     setPs((prev) => ({ ...prev, [id]: { ...prev[id], ...patch } }));

//   useEffect(() => {
//     const pending = sessionStorage.getItem("pendingProviderSelection");
//     if (!pending) return;
//     const user = getCurrentUser();
//     if (!user) return;
//     try {
//       const data = JSON.parse(pending);
//       sessionStorage.removeItem("pendingProviderSelection");
//       addBooking({
//         userId: user.id, userName: user.name, userEmail: user.email,
//         service: data.service || "General Service",
//         address: data.address || "", description: data.description || "",
//         status: "requested",
//         date:   data.date   || new Date().toLocaleDateString(),
//         time:   data.time   || "ASAP",
//         amount: data.amount || "₹499",
//         providers: data.providers || [],
//       });
//       navigate("/booking-request", {
//         replace: true,
//         state: {
//           service: data.service, date: data.date, time: data.time || "ASAP",
//           address: data.address, providers: data.providers || [],
//           description: data.description || "",
//           bookingId: `BK${Date.now().toString().slice(-6)}`,
//         },
//       });
//     } catch {
//       sessionStorage.removeItem("pendingProviderSelection");
//     }
//   }, [navigate]);

//   const getStep = (id) => {
//     const p = ps[id];
//     if (p.reviewed || p.confirmed) return 3;
//     if (p.availability === "yes")  return 2;
//     if (p.waSent)                  return 1;
//     return 0;
//   };

//   const handleSelectAll = () => {
//     if (!selectAll) {
//       setGlobalDescOpen(true);
//     } else {
//       setSelectAll(false);
//       setGlobalDescOpen(false);
//       setPs((prev) => {
//         const updated = { ...prev };
//         allProviders.forEach((p) => {
//           updated[p.id] = { ...updated[p.id], waSent: false, descriptionOpen: false };
//         });
//         return updated;
//       });
//     }
//   };

//   const handleSaveGlobalDesc = () => {
//     if (!globalDesc.trim()) {
//       alert("Please enter a problem description for all experts.");
//       return;
//     }
//     setGlobalDescOpen(false);
//     setSelectAll(true);
//     setPs((prev) => {
//       const updated = { ...prev };
//       allProviders.forEach((p) => {
//         updated[p.id] = {
//           ...updated[p.id],
//           description:     globalDesc.trim(),
//           descriptionOpen: false,
//           waSent:          true,
//         };
//       });
//       return updated;
//     });
//   };

//   const handleDescriptionChange = (id, value) => upd(id, { description: value });

//   const handleSaveDescription = (id) => {
//     if (!ps[id].description.trim()) {
//       alert("Please enter a problem description.");
//       return;
//     }
//     upd(id, { descriptionOpen: false });
//   };

//   const handleWaSent = (id) => {
//     if (!ps[id].description.trim()) {
//       upd(id, { waSent: true, descriptionOpen: true });
//     } else {
//       upd(id, { waSent: true });
//     }
//   };

//   const handleRespond = (id, answer) => upd(id, { availability: answer });

//   const handleConfirm = (id) => {
//     upd(id, { confirmed: true, reviewed: false });
//     const provider = allProviders.find((p) => p.id === id);
//     setReviewProvider(provider);
//   };

//   const handleCloseReview = (id) => {
//     setReviewProvider(null);
//     if (id) upd(id, { reviewed: true });
//   };

//   const confirmedCount = Object.values(ps).filter((s) => s.confirmed).length;

//   const handleProceed = () => {
//     if (confirmedCount === 0) return;
//     const chosenProviders = allProviders.filter((p) => ps[p.id].confirmed);
//     const chosenNames     = chosenProviders.map((p) => p.name);
//     const descriptions    = chosenProviders.map((p) => ps[p.id].description?.trim()).filter(Boolean);
//     const finalDescription = descriptions.join(" | ") || state?.description || "";

//     const bookingData = {
//       service:     state?.service || "General Service",
//       address:     state?.address || "",
//       description: finalDescription,
//       date:        state?.date    || new Date().toLocaleDateString(),
//       time:        state?.time    || "ASAP",
//       amount:      state?.amount  || "₹499",
//       providers:   chosenNames,
//     };

//     if (!currentUser) {
//       sessionStorage.setItem("pendingProviderSelection", JSON.stringify(bookingData));
//       if (window.__navbarOpenModal) window.__navbarOpenModal("login");
//       return;
//     }

//     addBooking({
//       userId: currentUser.id, userName: currentUser.name, userEmail: currentUser.email,
//       ...bookingData, status: "requested",
//     });

//     navigate("/booking-request", {
//       state: {
//         ...state, providers: chosenNames, description: finalDescription,
//         time: state?.time || "ASAP",
//         bookingId: `BK${Date.now().toString().slice(-6)}`,
//       },
//     });
//   };

//   return (
//     <div style={S.page}>

//       {docProvider && (
//         <DocModal provider={docProvider} onClose={() => setDocProvider(null)} />
//       )}

//       {reviewProvider && (
//         <ReviewModal
//           provider={reviewProvider}
//           onClose={() => handleCloseReview(reviewProvider.id)}
//           onBook={() => { handleCloseReview(reviewProvider.id); handleProceed(); }}
//         />
//       )}

//       <nav style={S.nav}>
//         <div style={S.logoWrap}>
//           <div style={S.logoIcon}>🏠</div>
//           <span style={S.logoText}>ServeEasy<span style={{ color: "#F97316" }}>Solapur</span></span>
//         </div>
//       </nav>

//       <div style={S.container}>

//         <div style={S.pageHeader}>
//           <div>
//             <h1 style={S.h1}>Select Professionals</h1>
//             <p style={S.subtitle}>Connect with verified experts in Solapur</p>
//           </div>
//           <button
//             onClick={handleSelectAll}
//             style={{ ...S.selectAllBtn, backgroundColor: selectAll ? "#1A3C6E" : "white", color: selectAll ? "white" : "#1A3C6E" }}
//           >
//             {selectAll ? "✓ All WhatsApp Sent" : "👥 Select All Experts"}
//           </button>
//         </div>

//         {/* Global description box for Select All */}
//         {globalDescOpen && (
//           <div style={S.globalDescBox}>
//             <div style={S.globalDescHeader}>
//               <span style={{ fontSize: "22px" }}>📝</span>
//               <div>
//                 <div style={{ fontWeight: 800, fontSize: "15px", color: "#1A3C6E" }}>
//                   Problem Description for All Experts
//                 </div>
//                 <div style={{ fontSize: "13px", color: "#6B7280", marginTop: "2px" }}>
//                   This description will be sent to <strong>all {allProviders.length} experts</strong> via WhatsApp
//                 </div>
//               </div>
//             </div>
//             <textarea
//               value={globalDesc}
//               onChange={(e) => setGlobalDesc(e.target.value)}
//               placeholder="Describe your problem here... (e.g. My tap is leaking, need urgent repair)"
//               style={S.globalDescTextarea}
//               autoFocus
//             />
//             <div style={{ display: "flex", gap: "10px", marginTop: "12px" }}>
//               <button onClick={handleSaveGlobalDesc} style={S.globalDescSaveBtn}>
//                 ✅ Apply to All & Mark WhatsApp Sent
//               </button>
//               <button onClick={() => setGlobalDescOpen(false)} style={S.globalDescCancelBtn}>
//                 Cancel
//               </button>
//             </div>
//           </div>
//         )}

//         {!currentUser && (
//           <div style={S.infoBanner}>⚠️ You can proceed without login. Sign-in will be asked on the next step.</div>
//         )}

//         {confirmedCount > 0 && (
//           <div style={S.quickBar}>
//             <span style={S.quickText}>✅ {confirmedCount} provider{confirmedCount > 1 ? "s" : ""} confirmed for booking</span>
//             <button onClick={handleProceed} style={S.quickProceed}>Proceed to Booking →</button>
//           </div>
//         )}

//         <div style={S.list}>
//           {allProviders.length === 0 ? (
//             <div style={S.empty}>
//               <div style={{ fontSize: "48px", marginBottom: "12px" }}>🔍</div>
//               <h2 style={{ color: "#374151", fontWeight: 700 }}>No experts found</h2>
//             </div>
//           ) : (
//             allProviders.map((provider) => {
//               const pst   = ps[provider.id];
//               const isYes = pst.availability === "yes";
//               const isNo  = pst.availability === "no";
//               const step  = getStep(provider.id);

//               return (
//                 <div
//                   key={provider.id}
//                   style={{
//                     ...S.card,
//                     borderColor: pst.confirmed ? "#22C55E" : isYes ? "#6D28D9" : isNo ? "#EF4444" : pst.waSent ? "#F59E0B" : "#E5E7EB",
//                     opacity: isNo ? 0.72 : 1,
//                   }}
//                 >
//                   {/* Status banners */}
//                   {!pst.confirmed && isYes && (
//                     <div style={S.bannerYes}>
//                       <span style={{ fontSize: "20px" }}>✅</span>
//                       <div>
//                         <div style={{ fontWeight: 800, fontSize: "14px", color: "#5B21B6" }}>Provider is Available!</div>
//                         <div style={{ fontSize: "12.5px", color: "#6D28D9", marginTop: "2px" }}>{provider.name} replied YES — Now confirm to proceed</div>
//                       </div>
//                     </div>
//                   )}
//                   {isNo && (
//                     <div style={S.bannerRed}>
//                       <span style={{ fontSize: "20px" }}>❌</span>
//                       <div>
//                         <div style={{ fontWeight: 800, fontSize: "14px", color: "#991B1B" }}>Provider Not Available</div>
//                         <div style={{ fontSize: "12.5px", color: "#DC2626", marginTop: "2px" }}>{provider.name} replied NO</div>
//                       </div>
//                     </div>
//                   )}

//                   <div style={S.cardBody}>

//                     <div style={S.avatarWrap}>
//                       <div style={S.avatar}>{initials(provider.name)}</div>
//                       <div style={{
//                         ...S.onlineDot,
//                         backgroundColor: pst.confirmed ? "#22C55E" : isYes ? "#7C3AED" : isNo ? "#EF4444" : pst.waSent ? "#F59E0B" : "#94A3B8",
//                       }} />
//                     </div>

//                     <div style={S.info}>
//                       <div style={S.nameRow}>
//                         <h3 style={S.name}>{provider.name}</h3>
//                         {pst.confirmed && <span style={S.badgeConfirmed}>🎉 Confirmed</span>}
//                         {!pst.confirmed && isYes && <span style={S.badgePurple}>✅ Available</span>}
//                         {isNo && <span style={S.badgeRed}>❌ Not Available</span>}
//                       </div>
//                       <div style={S.metaRow}>
//                         <span style={S.specialty}>{provider.specialty}</span>
//                         <span style={{ color: "#D1D5DB" }}>•</span>
//                         <span style={S.rating}>⭐ {provider.rating} ({provider.reviews})</span>
//                       </div>
//                       <div style={S.tags}>
//                         <span style={S.tag}>💼 {provider.experience} Exp</span>
//                         <span style={S.tag}>📍 {provider.location}</span>
//                         <button onClick={() => setDocProvider(provider)} style={S.verifiedChip}>✔ Verified 📄</button>
//                       </div>
//                       <div style={S.contactRow}>
//                         <span style={S.chip}>📞 +91 {provider.phone}</span>
//                       </div>

//                       {/* Description toggle button */}
//                       {!pst.descriptionOpen && (
//                         <button
//                           onClick={() => upd(provider.id, { descriptionOpen: true })}
//                           style={{
//                             ...S.descToggleBtn,
//                             backgroundColor: pst.description ? "#EA6C00" : "#F97316",
//                             borderColor:     pst.description ? "#EA6C00" : "#F97316",
//                             color:           "white",
//                             boxShadow:       "0 3px 10px rgba(249,115,22,0.4)",
//                           }}
//                         >
//                           📝 {pst.description ? "Edit Description ✓" : "Add Description"}
//                         </button>
//                       )}

//                       {/* Description input box */}
//                       {pst.descriptionOpen && (
//                         <div style={S.descWrap}>
//                           <label style={S.descLabel}>📝 Problem Description</label>
//                           <textarea
//                             value={pst.description}
//                             onChange={(e) => handleDescriptionChange(provider.id, e.target.value)}
//                             placeholder="Describe your problem for this provider..."
//                             style={S.descBox}
//                             autoFocus
//                           />
//                           <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
//                             <button onClick={() => handleSaveDescription(provider.id)} style={S.descSaveBtn}>
//                               ✅ Save Description
//                             </button>
//                             <button
//                               onClick={() => upd(provider.id, { descriptionOpen: false })}
//                               style={S.descCancelBtn}
//                             >
//                               Cancel
//                             </button>
//                           </div>
//                         </div>
//                       )}

//                       {/* WhatsApp link */}
//                       <a
//                         href={buildWhatsAppLink(provider.phone, provider.name, state?.service, pst.description)}
//                         target="_blank"
//                         rel="noreferrer"
//                         onClick={() => handleWaSent(provider.id)}
//                         style={{
//                           ...S.waBtn,
//                           backgroundColor: pst.waSent ? "#16A34A" : "#22C55E",
//                           color: "white",
//                           border: "none",
//                           boxShadow: "0 3px 10px rgba(34,197,94,0.4)",
//                         }}
//                         onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#16A34A")}
//                         onMouseOut={(e)  => (e.currentTarget.style.backgroundColor = pst.waSent ? "#16A34A" : "#22C55E")}
//                       >
//                         {pst.waSent ? "WhatsApp Sent ✓" : "Send WhatsApp Request"}
//                       </a>
//                     </div>

//                     {/* ── Workflow Buttons Column ── */}
//                     <div style={S.workflowCol}>

//                       <WorkflowBar step={step} />

//                       {/* Step 1 — Connect */}
//                       <div style={{ ...S.stepBlock, borderColor: step >= 0 ? "#3B82F6" : "#E5E7EB" }}>
//                         <div style={{ ...S.stepHeader, color: "#3B82F6" }}>① Connect</div>
//                         <div style={{ fontSize: "12px", color: "#6B7280" }}>
//                           {pst.waSent ? "✓ WhatsApp message sent" : "Send WhatsApp to connect"}
//                         </div>
//                       </div>

//                       {/* Step 2 — Responded */}
//                       <div style={{ ...S.stepBlock, borderColor: step >= 1 ? "#F59E0B" : "#E5E7EB", opacity: pst.waSent ? 1 : 0.5 }}>
//                         <div style={{ ...S.stepHeader, color: "#D97706" }}>② Responded</div>
//                         <RespondDropdown
//                           providerId={provider.id}
//                           isYes={isYes}
//                           isNo={isNo}
//                           onRespond={handleRespond}
//                         />
//                       </div>

//                       {/* Step 3 — Confirm */}
//                       <div style={{ ...S.stepBlock, borderColor: step >= 2 ? "#7C3AED" : "#E5E7EB", opacity: isYes ? 1 : 0.4 }}>
//                         <div style={{ ...S.stepHeader, color: "#7C3AED" }}>③ Confirm</div>
//                         <button
//                           disabled={!isYes || pst.confirmed}
//                           onClick={() => handleConfirm(provider.id)}
//                           style={{
//                             ...S.workflowBtn,
//                             backgroundColor: pst.confirmed ? "#DCFCE7" : isYes ? "#7C3AED" : "#F3F4F6",
//                             color:           pst.confirmed ? "#166534"  : isYes ? "white"    : "#9CA3AF",
//                             borderColor:     pst.confirmed ? "#86EFAC"  : isYes ? "#7C3AED"  : "#E5E7EB",
//                             cursor:          isYes && !pst.confirmed ? "pointer" : "not-allowed",
//                           }}
//                         >
//                           {pst.confirmed ? "✓ Confirmed" : isYes ? "✅ Confirm Provider" : "Waiting for YES reply"}
//                         </button>
//                       </div>

//                       {/* Step 4 — Review */}
//                       <div style={{ ...S.stepBlock, borderColor: step >= 3 ? "#22C55E" : "#E5E7EB", opacity: pst.confirmed ? 1 : 0.4 }}>
//                         <div style={{ ...S.stepHeader, color: "#16A34A" }}>④ Review</div>
//                         <button
//                           disabled={!pst.confirmed}
//                           onClick={() => setReviewProvider(provider)}
//                           style={{
//                             ...S.workflowBtn,
//                             backgroundColor: pst.confirmed ? "#DCFCE7" : "#F3F4F6",
//                             color:           pst.confirmed ? "#166534"  : "#9CA3AF",
//                             borderColor:     pst.confirmed ? "#86EFAC"  : "#E5E7EB",
//                             cursor:          pst.confirmed ? "pointer"  : "not-allowed",
//                             fontWeight:      pst.confirmed ? 800 : 600,
//                           }}
//                         >
//                           {pst.confirmed ? "⭐ View Review" : "Complete steps first"}
//                         </button>
//                       </div>

//                     </div>
//                   </div>
//                 </div>
//               );
//             })
//           )}
//         </div>

//         {confirmedCount > 0 && (
//           <div style={{ textAlign: "center", marginTop: "36px" }}>
//             <button onClick={handleProceed} style={S.proceedBtn}>
//               Proceed with {confirmedCount} Confirmed Professional{confirmedCount > 1 ? "s" : ""} →
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// // ─── Styles ───────────────────────────────────────────────────────────────────
// const S = {
//   page:          { minHeight: "100vh", backgroundColor: "#F8FAFC", fontFamily: "'Segoe UI', system-ui, sans-serif" },
//   nav:           { backgroundColor: "white", borderBottom: "1px solid #E5E7EB", height: "64px", display: "flex", alignItems: "center", padding: "0 24px", position: "sticky", top: 0, zIndex: 100, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" },
//   logoWrap:      { display: "flex", alignItems: "center", gap: "10px" },
//   logoIcon:      { width: "38px", height: "38px", borderRadius: "50%", backgroundColor: "#1A3C6E", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" },
//   logoText:      { fontSize: "18px", fontWeight: 800, color: "#1A3C6E" },
//   container:     { maxWidth: "1040px", margin: "0 auto", padding: "36px 16px 60px" },
//   pageHeader:    { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px", flexWrap: "wrap", gap: "12px" },
//   h1:            { fontSize: "28px", fontWeight: 800, color: "#1A3C6E", margin: 0, letterSpacing: "-0.5px" },
//   subtitle:      { color: "#6B7280", fontSize: "15px", marginTop: "4px" },
//   selectAllBtn:  { display: "flex", alignItems: "center", gap: "8px", padding: "11px 22px", borderRadius: "12px", border: "2px solid #1A3C6E", fontWeight: 700, fontSize: "14px", cursor: "pointer", transition: "all 0.18s" },

//   globalDescBox:       { backgroundColor: "#FFF7ED", border: "2px solid #FED7AA", borderRadius: "16px", padding: "20px 24px", marginBottom: "20px", boxShadow: "0 4px 18px rgba(249,115,22,0.12)" },
//   globalDescHeader:    { display: "flex", alignItems: "flex-start", gap: "12px", marginBottom: "14px" },
//   globalDescTextarea:  { width: "100%", minHeight: "100px", border: "1.5px solid #FDBA74", borderRadius: "10px", padding: "10px 14px", fontSize: "14px", resize: "vertical", outline: "none", boxSizing: "border-box", backgroundColor: "white", fontFamily: "inherit" },
//   globalDescSaveBtn:   { padding: "10px 22px", backgroundColor: "#F97316", color: "white", border: "none", borderRadius: "10px", fontWeight: 700, fontSize: "14px", cursor: "pointer" },
//   globalDescCancelBtn: { padding: "10px 18px", backgroundColor: "white", color: "#6B7280", border: "1.5px solid #D1D5DB", borderRadius: "10px", fontWeight: 600, fontSize: "14px", cursor: "pointer" },

//   descToggleBtn: { display: "inline-flex", alignItems: "center", gap: "6px", marginBottom: "10px", padding: "7px 14px", borderRadius: "8px", border: "1.5px solid", fontWeight: 600, fontSize: "13px", cursor: "pointer", transition: "all 0.18s" },
//   descWrap:      { marginBottom: "12px", padding: "12px", backgroundColor: "#FFF7ED", border: "1px solid #FED7AA", borderRadius: "12px" },
//   descLabel:     { display: "block", fontSize: "13px", fontWeight: 700, color: "#9A3412", marginBottom: "8px" },
//   descBox:       { width: "100%", minHeight: "80px", border: "1px solid #FDBA74", borderRadius: "10px", padding: "10px 12px", fontSize: "14px", resize: "vertical", outline: "none", boxSizing: "border-box", fontFamily: "inherit" },
//   descSaveBtn:   { padding: "8px 16px", backgroundColor: "#F97316", color: "white", border: "none", borderRadius: "8px", fontWeight: 700, fontSize: "13px", cursor: "pointer" },
//   descCancelBtn: { padding: "8px 14px", backgroundColor: "white", color: "#6B7280", border: "1.5px solid #D1D5DB", borderRadius: "8px", fontWeight: 600, fontSize: "13px", cursor: "pointer" },

//   legendBar:     { display: "flex", alignItems: "center", flexWrap: "wrap", gap: "10px", backgroundColor: "white", border: "1.5px solid #E5E7EB", borderRadius: "14px", padding: "12px 18px", marginBottom: "20px" },
//   legendTitle:   { fontWeight: 700, fontSize: "13px", color: "#374151", marginRight: "4px" },
//   legendDot:     { width: "20px", height: "20px", borderRadius: "50%", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "11px", fontWeight: 800 },
//   legendLabel:   { fontSize: "13px", fontWeight: 600, color: "#374151" },
//   infoBanner:    { backgroundColor: "#FFFBEB", border: "1px solid #FDE68A", borderRadius: "12px", padding: "13px 18px", marginBottom: "20px", color: "#92400E", fontSize: "14px", fontWeight: 500 },
//   quickBar:      { backgroundColor: "#F0FDF4", borderRadius: "12px", padding: "12px 18px", marginBottom: "20px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "10px", border: "1.5px solid #86EFAC" },
//   quickText:     { color: "#166534", fontWeight: 600, fontSize: "14px" },
//   quickProceed:  { padding: "8px 22px", backgroundColor: "#22C55E", color: "white", border: "none", borderRadius: "10px", fontWeight: 700, fontSize: "14px", cursor: "pointer" },
//   list:          { display: "flex", flexDirection: "column", gap: "20px" },
//   empty:         { padding: "60px 20px", textAlign: "center", backgroundColor: "white", borderRadius: "18px", border: "2px dashed #E5E7EB" },
//   card:          { backgroundColor: "white", borderRadius: "18px", border: "2px solid #E5E7EB", boxShadow: "0 2px 14px rgba(0,0,0,0.05)", transition: "border-color 0.2s", overflow: "visible" },

//   bannerConfirmed: { padding: "12px 20px", borderRadius: "16px 16px 0 0", backgroundColor: "#DCFCE7", display: "flex", alignItems: "center", gap: "12px", borderBottom: "1px solid #86EFAC" },
//   bannerYes:       { padding: "12px 20px", borderRadius: "16px 16px 0 0", backgroundColor: "#EDE9FE", display: "flex", alignItems: "center", gap: "12px", borderBottom: "1px solid #C4B5FD" },
//   bannerRed:       { padding: "12px 20px", borderRadius: "16px 16px 0 0", backgroundColor: "#FEE2E2", display: "flex", alignItems: "center", gap: "12px", borderBottom: "1px solid #FECACA" },

//   cardBody:      { padding: "20px", display: "flex", alignItems: "flex-start", gap: "16px", flexWrap: "wrap" },
//   avatarWrap:    { position: "relative", flexShrink: 0 },
//   avatar:        { width: "60px", height: "60px", borderRadius: "14px", backgroundColor: "#1A3C6E", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 800, fontSize: "20px" },
//   onlineDot:     { position: "absolute", bottom: "2px", right: "2px", width: "14px", height: "14px", borderRadius: "50%", border: "2.5px solid white", transition: "background-color 0.3s" },
//   info:          { flex: 1, minWidth: "200px" },
//   nameRow:       { display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", marginBottom: "4px" },
//   name:          { fontSize: "17px", fontWeight: 700, color: "#111827", margin: 0 },
//   badgeConfirmed:{ padding: "3px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: 700, backgroundColor: "#DCFCE7", color: "#166534", border: "1.5px solid #86EFAC" },
//   badgePurple:   { padding: "3px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: 700, backgroundColor: "#EDE9FE", color: "#5B21B6", border: "1.5px solid #C4B5FD" },
//   badgeRed:      { padding: "3px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: 700, backgroundColor: "#FEE2E2", color: "#991B1B", border: "1.5px solid #FECACA" },
//   metaRow:       { display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px", flexWrap: "wrap" },
//   specialty:     { color: "#F97316", fontWeight: 700, fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.6px" },
//   rating:        { fontSize: "13px", color: "#374151", fontWeight: 500 },
//   tags:          { display: "flex", flexWrap: "wrap", gap: "8px", fontSize: "12.5px", color: "#6B7280", marginBottom: "8px", alignItems: "center" },
//   tag:           { display: "flex", alignItems: "center", gap: "4px" },
//   verifiedChip:  { padding: "2px 8px", backgroundColor: "#F0FDF4", color: "#059669", border: "1px solid #86EFAC", borderRadius: "20px", fontSize: "11px", fontWeight: 700, cursor: "pointer" },
//   contactRow:    { display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "10px" },
//   chip:          { padding: "4px 10px", backgroundColor: "#F8FAFC", border: "1px solid #E5E7EB", borderRadius: "8px", fontSize: "12.5px", color: "#374151", fontWeight: 500 },
//   waBtn:         { display: "inline-flex", alignItems: "center", gap: "8px", padding: "9px 16px", color: "#15803D", border: "1.5px solid #86EFAC", borderRadius: "10px", fontSize: "13px", fontWeight: 700, cursor: "pointer", textDecoration: "none", transition: "background-color 0.2s", alignSelf: "flex-start" },

//   workflowCol:   { display: "flex", flexDirection: "column", gap: "8px", minWidth: "210px", flexShrink: 0 },
//   workflowBar:   { display: "flex", alignItems: "flex-start", justifyContent: "center", gap: "0", marginBottom: "8px", paddingBottom: "8px", borderBottom: "1px solid #F3F4F6" },
//   wfDot:         { width: "24px", height: "24px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 800, flexShrink: 0, transition: "all 0.2s" },
//   wfLine:        { width: "18px", height: "3px", marginBottom: "10px", transition: "background-color 0.2s" },
//   stepBlock:     { border: "1.5px solid #E5E7EB", borderRadius: "12px", padding: "10px 12px", display: "flex", flexDirection: "column", gap: "6px", transition: "border-color 0.2s" },
//   stepHeader:    { fontSize: "11px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.5px" },
//   workflowBtn:   { width: "100%", padding: "9px 10px", borderRadius: "9px", border: "1.5px solid", fontWeight: 600, fontSize: "13px", cursor: "pointer", transition: "all 0.18s", display: "flex", alignItems: "center", justifyContent: "center", gap: "5px", boxSizing: "border-box", whiteSpace: "nowrap" },

//   dropdown:      { position: "absolute", right: 0, top: "calc(100% + 6px)", backgroundColor: "white", border: "1.5px solid #E5E7EB", borderRadius: "14px", boxShadow: "0 8px 28px rgba(0,0,0,0.13)", overflow: "hidden", zIndex: 300, minWidth: "220px" },
//   dropTitle:     { padding: "10px 16px 8px", fontSize: "11px", color: "#9CA3AF", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px", borderBottom: "1px solid #F3F4F6" },
//   dropItem:      { width: "100%", padding: "12px 16px", textAlign: "left", fontSize: "14px", cursor: "pointer", transition: "background-color 0.15s", userSelect: "none" },

//   proceedBtn:    { padding: "14px 52px", backgroundColor: "#22C55E", color: "white", border: "none", borderRadius: "14px", fontWeight: 700, fontSize: "16px", cursor: "pointer", boxShadow: "0 4px 18px rgba(34,197,94,0.38)" },
// };

// export default ProviderList;


// import { useState, useEffect, useRef } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { getProviders, addBooking, getCurrentUser } from "../../../services/store";

// function buildWhatsAppLink(phone, providerName, service, description) {
//   const clean = phone.replace(/\D/g, "");
//   const msg = encodeURIComponent(
//     `Hello ${providerName}! 👋\n\nA customer wants to book your *${service || "service"}* on ServeEasySolapur.\n\nProblem Description:\n${description || "Not provided"}\n\nAre you available to provide the service?\n\nPlease reply:\n✅ *YES* – I am available\n❌ *NO* – I am not available`
//   );
//   return `https://wa.me/91${clean}?text=${msg}`;
// }

// function initials(name) {
//   return name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
// }

// function stars(rating) {
//   return "★".repeat(Math.round(rating)) + "☆".repeat(5 - Math.round(rating));
// }

// const STEPS = ["Connect", "Responded", "Confirm", "Review"];

// // ─── Review Modal ─────────────────────────────────────────────────────────────
// function ReviewModal({ provider, onClose, onBook }) {
//   const overlayRef = useRef();
//   const [copied, setCopied] = useState(false);

//   useEffect(() => {
//     const h = (e) => { if (e.key === "Escape") onClose(); };
//     window.addEventListener("keydown", h);
//     return () => window.removeEventListener("keydown", h);
//   }, [onClose]);

//   const handleShare = () => {
//     const text = `🔧 Service Provider Details\n\nName: ${provider.name}\nSpecialty: ${provider.specialty}\nPhone: +91 ${provider.phone}\nLocation: ${provider.location}\nRating: ⭐ ${provider.rating}/5.0\n\nBooked via ServeEasySolapur`;
//     if (navigator.share) {
//       navigator.share({ title: provider.name, text });
//     } else {
//       navigator.clipboard.writeText(text).then(() => {
//         setCopied(true);
//         setTimeout(() => setCopied(false), 2000);
//       });
//     }
//   };

//   return (
//     <div
//       ref={overlayRef}
//       onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
//       style={RM.overlay}
//     >
//       <div style={RM.modal}>

//         {/* Header */}
//         <div style={RM.header}>
//           <div style={RM.headerLeft}>
//             <div style={RM.bigAvatar}>{initials(provider.name)}</div>
//             <div>
//               <h2 style={RM.name}>{provider.name}</h2>
//               <div style={{ fontSize: "13px", color: "#F97316", fontWeight: 700, textTransform: "uppercase", marginBottom: "6px" }}>{provider.specialty}</div>
//               <span style={RM.availBadge}>✅ Available — Request Confirmed</span>
//             </div>
//           </div>
//           <button onClick={onClose} style={RM.closeBtn}>✕</button>
//         </div>

//         {/* Main info — Name, Contact, Status */}
//         <div style={RM.infoSection}>

//           {/* Provider Name */}
//           <div style={RM.infoRow}>
//             <div style={RM.infoRowIcon}>👤</div>
//             <div>
//               <div style={RM.infoRowLabel}>Provider Name</div>
//               <div style={RM.infoRowValue}>{provider.name}</div>
//             </div>
//           </div>

//           {/* Contact Number */}
//           <div style={RM.infoRow}>
//             <div style={RM.infoRowIcon}>📞</div>
//             <div style={{ flex: 1 }}>
//               <div style={RM.infoRowLabel}>Contact Number</div>
//               <div style={RM.infoRowValue}>+91 {provider.phone}</div>
//             </div>
//             <a href={`tel:+91${provider.phone}`} style={RM.callBtn}>📲 Call Now</a>
//           </div>

//           {/* Status */}
//           <div style={RM.infoRow}>
//             <div style={RM.infoRowIcon}>📋</div>
//             <div>
//               <div style={RM.infoRowLabel}>Request Status</div>
//               <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "4px" }}>
//                 <span style={RM.statusBadge}>✅ Confirmed & Available</span>
//               </div>
//             </div>
//           </div>

//           {/* Rating */}
//           <div style={RM.infoRow}>
//             <div style={RM.infoRowIcon}>⭐</div>
//             <div>
//               <div style={RM.infoRowLabel}>Rating</div>
//               <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "4px" }}>
//                 <span style={RM.infoRowValue}>{provider.rating} / 5.0</span>
//                 <span style={{ color: "#F59E0B", fontSize: "15px" }}>{stars(provider.rating)}</span>
//                 <span style={{ color: "#9CA3AF", fontSize: "12px" }}>({provider.reviews} reviews)</span>
//               </div>
//             </div>
//           </div>

//         </div>

//         {/* Verified badge only */}
//         <div style={RM.docSection}>
//           <div style={RM.verifiedBadge}>✔ Identity Verified by ServeEasySolapur Admin</div>
//         </div>

//         {/* Bottom buttons */}
//         <div style={RM.actions}>
//           <button onClick={handleShare} style={RM.shareBtn}>
//             {copied ? "✓ Copied!" : "🔗 Share Provider"}
//           </button>
//           <button onClick={onBook} style={RM.bookBtn}>
//             ✅ Book Now →
//           </button>
//         </div>

//       </div>
//     </div>
//   );
// }

// const RM = {
//   overlay:        { position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(5px)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" },
//   modal:          { backgroundColor: "white", borderRadius: "24px", width: "100%", maxWidth: "480px", maxHeight: "92vh", overflowY: "auto", boxShadow: "0 28px 70px rgba(0,0,0,0.25)" },
//   header:         { display: "flex", alignItems: "flex-start", justifyContent: "space-between", padding: "24px 24px 0" },
//   headerLeft:     { display: "flex", alignItems: "flex-start", gap: "16px" },
//   bigAvatar:      { width: "64px", height: "64px", borderRadius: "16px", backgroundColor: "#1A3C6E", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 800, fontSize: "22px", flexShrink: 0 },
//   name:           { fontSize: "20px", fontWeight: 800, color: "#111827", margin: "0 0 4px" },
//   availBadge:     { display: "inline-block", padding: "4px 10px", borderRadius: "20px", backgroundColor: "#DCFCE7", color: "#166534", fontWeight: 700, fontSize: "12px", border: "1.5px solid #86EFAC" },
//   closeBtn:       { width: "34px", height: "34px", borderRadius: "50%", border: "none", backgroundColor: "#F3F4F6", color: "#374151", fontSize: "16px", cursor: "pointer", flexShrink: 0 },

//   infoSection:    { padding: "20px 24px", display: "flex", flexDirection: "column", gap: "4px" },
//   infoRow:        { display: "flex", alignItems: "flex-start", gap: "14px", padding: "14px 16px", backgroundColor: "#F8FAFC", borderRadius: "14px", border: "1.5px solid #E5E7EB", marginBottom: "8px" },
//   infoRowIcon:    { fontSize: "22px", flexShrink: 0, marginTop: "2px" },
//   infoRowLabel:   { fontSize: "11px", color: "#9CA3AF", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.4px", marginBottom: "4px" },
//   infoRowValue:   { fontSize: "16px", fontWeight: 800, color: "#1A3C6E" },
//   callBtn:        { padding: "8px 14px", backgroundColor: "#DCFCE7", color: "#166534", border: "1.5px solid #86EFAC", borderRadius: "10px", fontWeight: 700, fontSize: "13px", cursor: "pointer", textDecoration: "none", whiteSpace: "nowrap", alignSelf: "center" },
//   statusBadge:    { padding: "5px 12px", borderRadius: "20px", backgroundColor: "#DCFCE7", color: "#166534", fontWeight: 700, fontSize: "13px", border: "1.5px solid #86EFAC" },

//   docSection:     { padding: "0 24px 20px" },
//   docToggleBtn:   { width: "100%", padding: "11px 16px", backgroundColor: "#EEF4FF", color: "#1A3C6E", border: "1.5px solid #C7D7F8", borderRadius: "12px", fontWeight: 700, fontSize: "13px", cursor: "pointer", textAlign: "left", marginBottom: "10px" },
//   docGrid:        { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" },
//   docCard:        { border: "1.5px solid #E5E7EB", borderRadius: "12px", overflow: "hidden" },
//   docLabel:       { padding: "10px 12px", backgroundColor: "#F8FAFC", borderBottom: "1px solid #E5E7EB", fontWeight: 700, fontSize: "13px", color: "#1A3C6E" },
//   pdfFrame:       { width: "100%", height: "160px", border: "none", borderRadius: "6px", backgroundColor: "#F3F4F6" },
//   docImg:         { width: "100%", height: "130px", objectFit: "cover", borderRadius: "6px", display: "block" },
//   openLink:       { display: "block", marginTop: "6px", color: "#1A3C6E", fontWeight: 600, fontSize: "12px", textDecoration: "none" },
//   noDoc:          { padding: "30px 12px", textAlign: "center", color: "#9CA3AF", fontSize: "12px" },
//   verifiedBadge:  { padding: "11px 14px", backgroundColor: "#F0FDF4", borderRadius: "10px", color: "#166534", fontWeight: 700, fontSize: "13px" },

//   actions:        { display: "flex", gap: "10px", padding: "0 24px 24px" },
//   shareBtn:       { flex: 1, padding: "12px", borderRadius: "12px", border: "none", backgroundColor: "#1A3C6E", color: "white", fontWeight: 700, fontSize: "14px", cursor: "pointer" },
//   bookBtn:        { flex: 2, padding: "12px", borderRadius: "12px", border: "none", backgroundColor: "#22C55E", color: "white", fontWeight: 700, fontSize: "14px", cursor: "pointer", boxShadow: "0 4px 14px rgba(34,197,94,0.35)" },
//   closeActionBtn: { flex: 1, padding: "12px", borderRadius: "12px", border: "2px solid #E5E7EB", backgroundColor: "white", color: "#374151", fontWeight: 600, fontSize: "14px", cursor: "pointer" },
// };

// // ─── Document Modal (opened by clicking ✔ Verified chip) ─────────────────────
// function DocModal({ provider, onClose }) {
//   const ref = useRef();
//   useEffect(() => {
//     const h = (e) => { if (e.key === "Escape") onClose(); };
//     window.addEventListener("keydown", h);
//     return () => window.removeEventListener("keydown", h);
//   }, [onClose]);

//   const docs   = provider.documents || {};
//   const aadhar = docs.aadhar || null;
//   const photo  = docs.photo  || null;

//   return (
//     <div ref={ref} onClick={(e) => { if (e.target === ref.current) onClose(); }} style={DM.overlay}>
//       <div style={DM.modal}>
//         <div style={DM.header}>
//           <div>
//             <h2 style={DM.title}>📄 Verification Documents</h2>
//             <p style={DM.sub}>{provider.name} — Identity &amp; Certification</p>
//           </div>
//           <button onClick={onClose} style={DM.closeBtn}>✕</button>
//         </div>

//         <div style={DM.grid}>
//           {[
//             { label: "🪪 Aadhaar Card", file: aadhar },
//             { label: "📸 Photo / Certificate", file: photo },
//           ].map(({ label, file }) => (
//             <div key={label} style={DM.card}>
//               <div style={DM.cardLabel}>{label}</div>
//               {file ? (
//                 <div style={{ padding: "10px" }}>
//                   {file.endsWith(".pdf") ? (
//                     <iframe src={file} title={label} style={DM.pdfFrame} />
//                   ) : (
//                     <img src={file} alt={label} style={DM.docImg} />
//                   )}
//                   <a href={file} target="_blank" rel="noreferrer" style={DM.openLink}>
//                     🔗 Open Full {file.endsWith(".pdf") ? "PDF" : "Image"}
//                   </a>
//                 </div>
//               ) : (
//                 <div style={DM.noDoc}>Not uploaded yet</div>
//               )}
//             </div>
//           ))}
//         </div>

//         <div style={DM.footer}>✔ Identity Verified by ServeEasySolapur Admin</div>
//       </div>
//     </div>
//   );
// }

// const DM = {
//   overlay:   { position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(5px)", zIndex: 1100, display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" },
//   modal:     { backgroundColor: "white", borderRadius: "20px", width: "100%", maxWidth: "600px", maxHeight: "90vh", overflowY: "auto", boxShadow: "0 24px 60px rgba(0,0,0,0.25)" },
//   header:    { display: "flex", alignItems: "flex-start", justifyContent: "space-between", padding: "22px 24px 16px", borderBottom: "1px solid #F3F4F6" },
//   title:     { fontSize: "18px", fontWeight: 800, color: "#1A3C6E", margin: 0 },
//   sub:       { color: "#6B7280", fontSize: "13px", marginTop: "4px" },
//   closeBtn:  { width: "34px", height: "34px", borderRadius: "50%", border: "none", backgroundColor: "#F3F4F6", color: "#374151", fontSize: "15px", cursor: "pointer", flexShrink: 0 },
//   grid:      { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", padding: "20px 24px" },
//   card:      { border: "1.5px solid #E5E7EB", borderRadius: "14px", overflow: "hidden" },
//   cardLabel: { padding: "10px 14px", backgroundColor: "#F8FAFC", borderBottom: "1px solid #E5E7EB", fontWeight: 700, fontSize: "13px", color: "#1A3C6E" },
//   pdfFrame:  { width: "100%", height: "200px", border: "none", borderRadius: "8px", backgroundColor: "#F3F4F6" },
//   docImg:    { width: "100%", height: "180px", objectFit: "cover", borderRadius: "8px", display: "block" },
//   openLink:  { display: "block", marginTop: "6px", color: "#1A3C6E", fontWeight: 600, fontSize: "12px", textDecoration: "none" },
//   noDoc:     { padding: "40px 12px", textAlign: "center", color: "#9CA3AF", fontSize: "13px" },
//   footer:    { padding: "14px 24px", backgroundColor: "#F0FDF4", borderTop: "1px solid #DCFCE7", color: "#166534", fontWeight: 700, fontSize: "13px", borderRadius: "0 0 20px 20px" },
// };

// // ─── Respond Dropdown ─────────────────────────────────────────────────────────
// function RespondDropdown({ providerId, isYes, isNo, onRespond }) {
//   const [open, setOpen] = useState(false);
//   const wrapRef = useRef();

//   useEffect(() => {
//     const handler = (e) => {
//       if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
//     };
//     document.addEventListener("mousedown", handler);
//     return () => document.removeEventListener("mousedown", handler);
//   }, []);

//   const btnStyle = {
//     ...S.workflowBtn,
//     backgroundColor: isYes ? "#DCFCE7" : isNo ? "#FEE2E2" : "white",
//     color:           isYes ? "#166534" : isNo ? "#991B1B" : "#374151",
//     borderColor:     isYes ? "#86EFAC" : isNo ? "#FECACA" : "#D1D5DB",
//     opacity: 1,
//   };

//   const label = isYes ? "✅ Yes — Available" : isNo ? "❌ No — Unavailable" : "💬 Responded ▾";

//   return (
//     <div ref={wrapRef} style={{ position: "relative" }}>
//       <button style={btnStyle} onClick={() => setOpen((p) => !p)}>{label}</button>

//       {open && (
//         <div style={S.dropdown}>
//           <div style={S.dropTitle}>Provider replied on WhatsApp:</div>
//           <div
//             style={{ ...S.dropItem, backgroundColor: isYes ? "#DCFCE7" : "white", color: "#166534", fontWeight: isYes ? 800 : 600, borderBottom: "1px solid #F3F4F6" }}
//             onMouseDown={() => { onRespond(providerId, "yes"); setOpen(false); }}
//             onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#DCFCE7")}
//             onMouseOut={(e)  => (e.currentTarget.style.backgroundColor = isYes ? "#DCFCE7" : "white")}
//           >
//             {isYes ? "✅" : "⬜"}&nbsp; Yes, I am available
//           </div>
//           <div
//             style={{ ...S.dropItem, backgroundColor: isNo ? "#FEE2E2" : "white", color: "#991B1B", fontWeight: isNo ? 800 : 600 }}
//             onMouseDown={() => { onRespond(providerId, "no"); setOpen(false); }}
//             onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#FEE2E2")}
//             onMouseOut={(e)  => (e.currentTarget.style.backgroundColor = isNo ? "#FEE2E2" : "white")}
//           >
//             {isNo ? "❌" : "⬜"}&nbsp; No, I am not available
//           </div>
//           {(isYes || isNo) && (
//             <div
//               style={{ ...S.dropItem, color: "#9CA3AF", fontSize: "12px", borderTop: "1px solid #F3F4F6" }}
//               onMouseDown={() => { onRespond(providerId, null); setOpen(false); }}
//               onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#F9FAFB")}
//               onMouseOut={(e)  => (e.currentTarget.style.backgroundColor = "white")}
//             >
//               ✕ Clear response
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// // ─── Workflow Step Bar ────────────────────────────────────────────────────────
// function WorkflowBar({ step }) {
//   return (
//     <div style={S.workflowBar}>
//       {STEPS.map((label, i) => {
//         const done   = i < step;
//         const active = i === step;
//         return (
//           <div key={label} style={{ display: "flex", alignItems: "center" }}>
//             <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
//               <div style={{
//                 ...S.wfDot,
//                 backgroundColor: done ? "#22C55E" : active ? "#1A3C6E" : "#E5E7EB",
//                 color: done || active ? "white" : "#9CA3AF",
//                 boxShadow: active ? "0 0 0 3px rgba(26,60,110,0.2)" : "none",
//               }}>
//                 {done ? "✓" : i + 1}
//               </div>
//               <span style={{ fontSize: "10px", fontWeight: active ? 800 : 600, color: done ? "#22C55E" : active ? "#1A3C6E" : "#9CA3AF", whiteSpace: "nowrap" }}>
//                 {label}
//               </span>
//             </div>
//             {i < 3 && <div style={{ ...S.wfLine, backgroundColor: done ? "#22C55E" : "#E5E7EB" }} />}
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// // ─── Main Component ───────────────────────────────────────────────────────────
// export function ProviderList() {
//   const { state }   = useLocation();
//   const navigate    = useNavigate();
//   const currentUser = getCurrentUser();

//   const allProviders = getProviders().filter(
//     (p) =>
//       p.status === "active" &&
//       (!state?.serviceId || p.services?.includes(state.serviceId))
//   );

//   const [ps, setPs] = useState(() => {
//     const s = {};
//     allProviders.forEach((p) => {
//       s[p.id] = {
//         waSent:          false,
//         availability:    null,
//         confirmed:       false,
//         reviewed:        false,
//         description:     state?.description || "",
//         descriptionOpen: false,
//       };
//     });
//     return s;
//   });

//   const [selectAll,      setSelectAll]      = useState(false);
//   const [reviewProvider, setReviewProvider] = useState(null);
//   const [docProvider,    setDocProvider]    = useState(null);
//   const [globalDescOpen, setGlobalDescOpen] = useState(false);
//   const [globalDesc,     setGlobalDesc]     = useState(state?.description || "");


//   const upd = (id, patch) =>
//     setPs((prev) => ({ ...prev, [id]: { ...prev[id], ...patch } }));

//   // ✅ Hook for Navbar address confirm → completes booking
//   useEffect(() => {
//     window.__onAddressConfirmed = (addressLine) => {
//       const pending = sessionStorage.getItem("pendingProviderSelection");
//       if (!pending) return;
//       try {
//         const data = JSON.parse(pending);
//         sessionStorage.removeItem("pendingProviderSelection");
//         const user = getCurrentUser();
//         if (!user) return;
//         addBooking({
//           userId: user.id, userName: user.name, userEmail: user.email,
//           ...data, address: addressLine, status: "requested",
//         });
//         navigate("/booking-request", {
//           replace: true,
//           state: {
//             service:     data.service,
//             date:        data.date,
//             time:        data.time || "ASAP",
//             address:     addressLine,
//             providers:   data.providers || [],
//             description: data.description || "",
//             bookingId:   `BK${Date.now().toString().slice(-6)}`,
//           },
//         });
//       } catch {
//         sessionStorage.removeItem("pendingProviderSelection");
//       }
//     };
//     return () => delete window.__onAddressConfirmed;
//   }, [navigate]);

//   // ✅ After login redirect — check if address already confirmed
//   useEffect(() => {
//     const pending = sessionStorage.getItem("pendingProviderSelection");
//     if (!pending) return;
//     const user = getCurrentUser();
//     if (!user) return;
//     try {
//       const data = JSON.parse(pending);
//       if (data.addressConfirmed && data.address) {
//         // Address already chosen in Navbar popup → book directly
//         sessionStorage.removeItem("pendingProviderSelection");
//         addBooking({
//           userId: user.id, userName: user.name, userEmail: user.email,
//           ...data, status: "requested",
//         });
//         navigate("/booking-request", {
//           replace: true,
//           state: {
//             service:     data.service,
//             date:        data.date,
//             time:        data.time || "ASAP",
//             address:     data.address,
//             providers:   data.providers || [],
//             description: data.description || "",
//             bookingId:   `BK${Date.now().toString().slice(-6)}`,
//           },
//         });
//       } else {
//         // No address popup in ProviderList — just clear pending
//         sessionStorage.removeItem("pendingProviderSelection");
//       }
//     } catch {
//       sessionStorage.removeItem("pendingProviderSelection");
//     }
//   }, [navigate]);

//   const getStep = (id) => {
//     const p = ps[id];
//     if (p.reviewed || p.confirmed) return 3;
//     if (p.availability === "yes")  return 2;
//     if (p.waSent)                  return 1;
//     return 0;
//   };

//   const handleSelectAll = () => {
//     if (!selectAll) {
//       setGlobalDescOpen(true);
//     } else {
//       setSelectAll(false);
//       setGlobalDescOpen(false);
//       setPs((prev) => {
//         const updated = { ...prev };
//         allProviders.forEach((p) => {
//           updated[p.id] = { ...updated[p.id], waSent: false, descriptionOpen: false };
//         });
//         return updated;
//       });
//     }
//   };

//   const handleSaveGlobalDesc = () => {
//     if (!globalDesc.trim()) {
//       alert("Please enter a problem description for all Providers.");
//       return;
//     }
//     setGlobalDescOpen(false);
//     setSelectAll(true);
//     setPs((prev) => {
//       const updated = { ...prev };
//       allProviders.forEach((p) => {
//         updated[p.id] = {
//           ...updated[p.id],
//           description:     globalDesc.trim(),
//           descriptionOpen: false,
//           waSent:          true,
//         };
//       });
//       return updated;
//     });
//   };

//   const handleDescriptionChange = (id, value) => upd(id, { description: value });

//   const handleSaveDescription = (id) => {
//     if (!ps[id].description.trim()) {
//       alert("Please enter a problem description.");
//       return;
//     }
//     upd(id, { descriptionOpen: false });
//   };

//   const handleWaSent = (id) => {
//     if (!ps[id].description.trim()) {
//       upd(id, { waSent: true, descriptionOpen: true });
//     } else {
//       upd(id, { waSent: true });
//     }
//   };

//   const handleRespond = (id, answer) => upd(id, { availability: answer });

//   const handleConfirm = (id) => {
//     upd(id, { confirmed: true, reviewed: false });
//     const provider = allProviders.find((p) => p.id === id);
//     setReviewProvider(provider);
//   };

//   const handleCloseReview = (id) => {
//     setReviewProvider(null);
//     if (id) upd(id, { reviewed: true });
//   };

//   const confirmedCount = Object.values(ps).filter((s) => s.confirmed).length;

//   const handleProceed = () => {
//     if (confirmedCount === 0) return;
//     const chosenProviders = allProviders.filter((p) => ps[p.id].confirmed);
//     const chosenNames     = chosenProviders.map((p) => p.name);
//     const descriptions    = chosenProviders.map((p) => ps[p.id].description?.trim()).filter(Boolean);
//     const finalDescription = descriptions.join(" | ") || state?.description || "";

//     const bookingData = {
//       service:     state?.service || "General Service",
//       address:     state?.address || "",
//       description: finalDescription,
//       date:        state?.date    || new Date().toLocaleDateString(),
//       time:        state?.time    || "ASAP",
//       amount:      state?.amount  || "₹499",
//       providers:   chosenNames,
//     };

//     if (!currentUser) {
//       sessionStorage.setItem("pendingProviderSelection", JSON.stringify(bookingData));
//       if (window.__navbarOpenModal) window.__navbarOpenModal("login");
//       return;
//     }

//     // Logged in — book directly
//     addBooking({
//       userId: currentUser.id, userName: currentUser.name, userEmail: currentUser.email,
//       ...bookingData, status: "requested",
//     });

//     navigate("/booking-request", {
//       state: {
//         ...state, providers: chosenNames, description: finalDescription,
//         time: state?.time || "ASAP",
//         bookingId: `BK${Date.now().toString().slice(-6)}`,
//       },
//     });
//   };

//   return (
//     <div style={S.page}>

//       {docProvider && (
//         <DocModal provider={docProvider} onClose={() => setDocProvider(null)} />
//       )}

//       {reviewProvider && (
//         <ReviewModal
//           provider={reviewProvider}
//           onClose={() => handleCloseReview(reviewProvider.id)}
//           onBook={() => { handleCloseReview(reviewProvider.id); handleProceed(); }}
//         />
//       )}

//       <nav style={S.nav}>
//         <div style={S.logoWrap}>
//           <div style={S.logoIcon}>🏠</div>
//           <span style={S.logoText}>ServeEasy<span style={{ color: "#F97316" }}>Solapur</span></span>
//         </div>
//       </nav>

//       <div style={S.container}>

//         <div style={S.pageHeader}>
//           <div>
//             <h1 style={S.h1}>Select Professionals</h1>
//             <p style={S.subtitle}>Connect with verified experts in Solapur</p>
//           </div>
//           <button
//             onClick={handleSelectAll}
//             style={{ ...S.selectAllBtn, backgroundColor: selectAll ? "#1A3C6E" : "white", color: selectAll ? "white" : "#1A3C6E" }}
//           >
//             {selectAll ? "✓ All WhatsApp Sent" : "👥 Select All Providers"}
//           </button>
//         </div>

//         {/* Global description box for Select All */}
//         {globalDescOpen && (
//           <div style={S.globalDescBox}>
//             <div style={S.globalDescHeader}>
//               <span style={{ fontSize: "22px" }}>📝</span>
//               <div>
//                 <div style={{ fontWeight: 800, fontSize: "15px", color: "#1A3C6E" }}>
//                   Problem Description for All Experts
//                 </div>
//                 <div style={{ fontSize: "13px", color: "#6B7280", marginTop: "2px" }}>
//                   This description will be sent to <strong>all {allProviders.length} providers</strong> via WhatsApp
//                 </div>
//               </div>
//             </div>
//             <textarea
//               value={globalDesc}
//               onChange={(e) => {
//                 setGlobalDesc(e.target.value);
//                 e.target.style.height = "auto";
//                 e.target.style.height = e.target.scrollHeight + "px";
//               }}
//               placeholder="Describe your problem here... (e.g. My tap is leaking, need urgent repair)"
//               style={S.globalDescTextarea}
//               autoFocus
//             />
//             <div style={{ display: "flex", gap: "10px", marginTop: "12px" }}>
//               <button onClick={handleSaveGlobalDesc} style={S.globalDescSaveBtn}>
//                 ✅ Send to All Providers
//               </button>
//               <button onClick={() => setGlobalDescOpen(false)} style={S.globalDescCancelBtn}>
//                 Cancel
//               </button>
//             </div>
//           </div>
//         )}

//         {!currentUser && (
//           <div style={S.infoBanner}>⚠️ You can proceed without login. Sign-in will be asked on the next step.</div>
//         )}

//         {confirmedCount > 0 && (
//           <div style={S.quickBar}>
//             <span style={S.quickText}>✅ {confirmedCount} provider{confirmedCount > 1 ? "s" : ""} confirmed for booking</span>
//             <button onClick={handleProceed} style={S.quickProceed}>Proceed to Booking →</button>
//           </div>
//         )}

//         <div style={S.list}>
//           {allProviders.length === 0 ? (
//             <div style={S.empty}>
//               <div style={{ fontSize: "48px", marginBottom: "12px" }}>🔍</div>
//               <h2 style={{ color: "#374151", fontWeight: 700 }}>No experts found</h2>
//             </div>
//           ) : (
//             allProviders.map((provider) => {
//               const pst   = ps[provider.id];
//               const isYes = pst.availability === "yes";
//               const isNo  = pst.availability === "no";
//               const step  = getStep(provider.id);

//               return (
//                 <div
//                   key={provider.id}
//                   style={{
//                     ...S.card,
//                     borderColor: pst.confirmed ? "#22C55E" : isYes ? "#6D28D9" : isNo ? "#EF4444" : pst.waSent ? "#F59E0B" : "#E5E7EB",
//                     opacity: isNo ? 0.72 : 1,
//                   }}
//                 >
//                   {/* Status banners */}
//                   {!pst.confirmed && isYes && (
//                     <div style={S.bannerYes}>
//                       <span style={{ fontSize: "20px" }}>✅</span>
//                       <div>
//                         <div style={{ fontWeight: 800, fontSize: "14px", color: "#5B21B6" }}>Provider is Available!</div>
//                         <div style={{ fontSize: "12.5px", color: "#6D28D9", marginTop: "2px" }}>{provider.name} replied YES — Now confirm to proceed</div>
//                       </div>
//                     </div>
//                   )}
//                   {isNo && (
//                     <div style={S.bannerRed}>
//                       <span style={{ fontSize: "20px" }}>❌</span>
//                       <div>
//                         <div style={{ fontWeight: 800, fontSize: "14px", color: "#991B1B" }}>Provider Not Available</div>
//                         <div style={{ fontSize: "12.5px", color: "#DC2626", marginTop: "2px" }}>{provider.name} replied NO</div>
//                       </div>
//                     </div>
//                   )}

//                   <div style={S.cardBody}>

//                     <div style={S.avatarWrap}>
//                       <div style={S.avatar}>{initials(provider.name)}</div>
//                       <div style={{
//                         ...S.onlineDot,
//                         backgroundColor: pst.confirmed ? "#22C55E" : isYes ? "#7C3AED" : isNo ? "#EF4444" : pst.waSent ? "#F59E0B" : "#94A3B8",
//                       }} />
//                     </div>

//                     <div style={S.info}>
//                       <div style={S.nameRow}>
//                         <h3 style={S.name}>{provider.name}</h3>
//                         {pst.confirmed && <span style={S.badgeConfirmed}>🎉 Confirmed</span>}
//                         {!pst.confirmed && isYes && <span style={S.badgePurple}>✅ Available</span>}
//                         {isNo && <span style={S.badgeRed}>❌ Not Available</span>}
//                       </div>
//                       <div style={S.metaRow}>
//                         <span style={S.specialty}>{provider.specialty}</span>
//                         <span style={{ color: "#D1D5DB" }}>•</span>
//                         <span style={S.rating}>⭐ {provider.rating} ({provider.reviews})</span>
//                       </div>
//                       <div style={S.tags}>
//                         <span style={S.tag}>💼 {provider.experience} Exp</span>
//                         <span style={S.tag}>📍 {provider.location}</span>
//                         <button onClick={() => setDocProvider(provider)} style={S.verifiedChip}>✔ Verified 📄</button>
//                       </div>
//                       <div style={S.contactRow}>
//                         <span style={S.chip}>📞 +91 {provider.phone}</span>
//                       </div>

//                       {/* Description toggle button */}
//                       {!pst.descriptionOpen && (
//                         <button
//                           onClick={() => upd(provider.id, { descriptionOpen: true })}
//                           style={{
//                             ...S.descToggleBtn,
//                             backgroundColor: pst.description ? "#EA6C00" : "#F97316",
//                             borderColor:     pst.description ? "#EA6C00" : "#F97316",
//                             color:           "white",
//                             boxShadow:       "0 3px 10px rgba(249,115,22,0.4)",
//                           }}
//                         >
//                           📝 {pst.description ? "Edit Description ✓" : "Add Description"}
//                         </button>
//                       )}

//                       {/* Description input box */}
//                       {pst.descriptionOpen && (
//                         <div style={S.descWrap}>
//                           <label style={S.descLabel}>📝 Problem Description</label>
//                           <textarea
//                             value={pst.description}
//                             onChange={(e) => {
//                               handleDescriptionChange(provider.id, e.target.value);
//                               e.target.style.height = "auto";
//                               e.target.style.height = e.target.scrollHeight + "px";
//                             }}
//                             placeholder="Describe your problem for this provider..."
//                             style={S.descBox}
//                             autoFocus
//                           />
//                           <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
//                             <button onClick={() => handleSaveDescription(provider.id)} style={S.descSaveBtn}>
//                               ✅ Save Description
//                             </button>
//                             <button
//                               onClick={() => upd(provider.id, { descriptionOpen: false })}
//                               style={S.descCancelBtn}
//                             >
//                               Cancel
//                             </button>
//                           </div>
//                         </div>
//                       )}

//                       {/* WhatsApp link */}
//                       <a
//                         href={buildWhatsAppLink(provider.phone, provider.name, state?.service, pst.description)}
//                         target="_blank"
//                         rel="noreferrer"
//                         onClick={() => handleWaSent(provider.id)}
//                         style={{
//                           ...S.waBtn,
//                           backgroundColor: pst.waSent ? "#16A34A" : "#22C55E",
//                           color: "white",
//                           border: "none",
//                           boxShadow: "0 3px 10px rgba(34,197,94,0.4)",
//                         }}
//                         onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#16A34A")}
//                         onMouseOut={(e)  => (e.currentTarget.style.backgroundColor = pst.waSent ? "#16A34A" : "#22C55E")}
//                       >
//                         {pst.waSent ? "WhatsApp Sent ✓" : "Send WhatsApp Request"}
//                       </a>
//                     </div>

//                     {/* ── Workflow Buttons Column ── */}
//                     <div style={S.workflowCol}>

//                       <WorkflowBar step={step} />

//                       {/* Step 1 — Connect */}
//                       <div style={{ ...S.stepBlock, borderColor: step >= 0 ? "#3B82F6" : "#E5E7EB" }}>
//                         <div style={{ ...S.stepHeader, color: "#3B82F6" }}>① Connect</div>
//                         <div style={{ fontSize: "12px", color: "#6B7280" }}>
//                           {pst.waSent ? "✓ WhatsApp message sent" : "Send WhatsApp to connect"}
//                         </div>
//                       </div>

//                       {/* Step 2 — Responded */}
//                       <div style={{ ...S.stepBlock, borderColor: step >= 1 ? "#F59E0B" : "#E5E7EB", opacity: pst.waSent ? 1 : 0.5 }}>
//                         <div style={{ ...S.stepHeader, color: "#D97706" }}>② Responded</div>
//                         <RespondDropdown
//                           providerId={provider.id}
//                           isYes={isYes}
//                           isNo={isNo}
//                           onRespond={handleRespond}
//                         />
//                       </div>

//                       {/* Step 3 — Confirm */}
//                       <div style={{ ...S.stepBlock, borderColor: step >= 2 ? "#7C3AED" : "#E5E7EB", opacity: isYes ? 1 : 0.4 }}>
//                         <div style={{ ...S.stepHeader, color: "#7C3AED" }}>③ Confirm</div>
//                         <button
//                           disabled={!isYes || pst.confirmed}
//                           onClick={() => handleConfirm(provider.id)}
//                           style={{
//                             ...S.workflowBtn,
//                             backgroundColor: pst.confirmed ? "#DCFCE7" : isYes ? "#7C3AED" : "#F3F4F6",
//                             color:           pst.confirmed ? "#166534"  : isYes ? "white"    : "#9CA3AF",
//                             borderColor:     pst.confirmed ? "#86EFAC"  : isYes ? "#7C3AED"  : "#E5E7EB",
//                             cursor:          isYes && !pst.confirmed ? "pointer" : "not-allowed",
//                           }}
//                         >
//                           {pst.confirmed ? "✓ Confirmed" : isYes ? "✅ Confirm Provider" : "Waiting for YES reply"}
//                         </button>
//                       </div>

//                       {/* Step 4 — Review */}
//                       <div style={{ ...S.stepBlock, borderColor: step >= 3 ? "#22C55E" : "#E5E7EB", opacity: pst.confirmed ? 1 : 0.4 }}>
//                         <div style={{ ...S.stepHeader, color: "#16A34A" }}>④ Review</div>
//                         <button
//                           disabled={!pst.confirmed}
//                           onClick={() => setReviewProvider(provider)}
//                           style={{
//                             ...S.workflowBtn,
//                             backgroundColor: pst.confirmed ? "#DCFCE7" : "#F3F4F6",
//                             color:           pst.confirmed ? "#166534"  : "#9CA3AF",
//                             borderColor:     pst.confirmed ? "#86EFAC"  : "#E5E7EB",
//                             cursor:          pst.confirmed ? "pointer"  : "not-allowed",
//                             fontWeight:      pst.confirmed ? 800 : 600,
//                           }}
//                         >
//                           {pst.confirmed ? "⭐ View Review" : "Complete steps first"}
//                         </button>
//                       </div>

//                     </div>
//                   </div>
//                 </div>
//               );
//             })
//           )}
//         </div>

//         {confirmedCount > 0 && (
//           <div style={{ textAlign: "center", marginTop: "36px" }}>
//             <button onClick={handleProceed} style={S.proceedBtn}>
//               Proceed with {confirmedCount} Confirmed Professional{confirmedCount > 1 ? "s" : ""} →
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// // ─── Styles ───────────────────────────────────────────────────────────────────
// const S = {
//   page:          { minHeight: "100vh", backgroundColor: "#F8FAFC", fontFamily: "'Segoe UI', system-ui, sans-serif" },
//   nav:           { backgroundColor: "white", borderBottom: "1px solid #E5E7EB", height: "64px", display: "flex", alignItems: "center", padding: "0 24px", position: "sticky", top: 0, zIndex: 100, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" },
//   logoWrap:      { display: "flex", alignItems: "center", gap: "10px" },
//   logoIcon:      { width: "38px", height: "38px", borderRadius: "50%", backgroundColor: "#1A3C6E", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" },
//   logoText:      { fontSize: "18px", fontWeight: 800, color: "#1A3C6E" },
//   container:     { maxWidth: "1040px", margin: "0 auto", padding: "36px 16px 60px" },
//   pageHeader:    { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px", flexWrap: "wrap", gap: "12px" },
//   h1:            { fontSize: "28px", fontWeight: 800, color: "#1A3C6E", margin: 0, letterSpacing: "-0.5px" },
//   subtitle:      { color: "#6B7280", fontSize: "15px", marginTop: "4px" },
//   selectAllBtn:  { display: "flex", alignItems: "center", gap: "8px", padding: "11px 22px", borderRadius: "12px", border: "2px solid #1A3C6E", fontWeight: 700, fontSize: "14px", cursor: "pointer", transition: "all 0.18s" },

//   globalDescBox:       { backgroundColor: "#FFF7ED", border: "2px solid #FED7AA", borderRadius: "16px", padding: "20px 24px", marginBottom: "20px", boxShadow: "0 4px 18px rgba(249,115,22,0.12)" },
//   globalDescHeader:    { display: "flex", alignItems: "flex-start", gap: "12px", marginBottom: "14px" },
//   globalDescTextarea:  { width: "100%", minHeight: "80px", height: "80px", border: "1.5px solid #FDBA74", borderRadius: "10px", padding: "10px 14px", fontSize: "14px", resize: "none", overflow: "hidden", outline: "none", boxSizing: "border-box", backgroundColor: "white", fontFamily: "inherit", lineHeight: "1.6", transition: "border-color 0.2s" },
//   globalDescSaveBtn:   { padding: "10px 22px", backgroundColor: "#F97316", color: "white", border: "none", borderRadius: "10px", fontWeight: 700, fontSize: "14px", cursor: "pointer" },
//   globalDescCancelBtn: { padding: "10px 18px", backgroundColor: "white", color: "#6B7280", border: "1.5px solid #D1D5DB", borderRadius: "10px", fontWeight: 600, fontSize: "14px", cursor: "pointer" },

//   descToggleBtn: { display: "inline-flex", alignItems: "center", gap: "6px", marginBottom: "10px", padding: "7px 14px", borderRadius: "8px", border: "1.5px solid", fontWeight: 600, fontSize: "13px", cursor: "pointer", transition: "all 0.18s" },
//   descWrap:      { marginBottom: "12px", padding: "12px", backgroundColor: "#FFF7ED", border: "1px solid #FED7AA", borderRadius: "12px" },
//   descLabel:     { display: "block", fontSize: "13px", fontWeight: 700, color: "#9A3412", marginBottom: "8px" },
//   descBox:       { width: "100%", minHeight: "72px", height: "72px", border: "1px solid #FDBA74", borderRadius: "10px", padding: "10px 12px", fontSize: "14px", resize: "none", overflow: "hidden", outline: "none", boxSizing: "border-box", fontFamily: "inherit", lineHeight: "1.6", transition: "border-color 0.2s" },
//   descSaveBtn:   { padding: "8px 16px", backgroundColor: "#F97316", color: "white", border: "none", borderRadius: "8px", fontWeight: 700, fontSize: "13px", cursor: "pointer" },
//   descCancelBtn: { padding: "8px 14px", backgroundColor: "white", color: "#6B7280", border: "1.5px solid #D1D5DB", borderRadius: "8px", fontWeight: 600, fontSize: "13px", cursor: "pointer" },

//   legendBar:     { display: "flex", alignItems: "center", flexWrap: "wrap", gap: "10px", backgroundColor: "white", border: "1.5px solid #E5E7EB", borderRadius: "14px", padding: "12px 18px", marginBottom: "20px" },
//   legendTitle:   { fontWeight: 700, fontSize: "13px", color: "#374151", marginRight: "4px" },
//   legendDot:     { width: "20px", height: "20px", borderRadius: "50%", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "11px", fontWeight: 800 },
//   legendLabel:   { fontSize: "13px", fontWeight: 600, color: "#374151" },
//   infoBanner:    { backgroundColor: "#FFFBEB", border: "1px solid #FDE68A", borderRadius: "12px", padding: "13px 18px", marginBottom: "20px", color: "#92400E", fontSize: "14px", fontWeight: 500 },
//   quickBar:      { backgroundColor: "#F0FDF4", borderRadius: "12px", padding: "12px 18px", marginBottom: "20px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "10px", border: "1.5px solid #86EFAC" },
//   quickText:     { color: "#166534", fontWeight: 600, fontSize: "14px" },
//   quickProceed:  { padding: "8px 22px", backgroundColor: "#22C55E", color: "white", border: "none", borderRadius: "10px", fontWeight: 700, fontSize: "14px", cursor: "pointer" },
//   list:          { display: "flex", flexDirection: "column", gap: "20px" },
//   empty:         { padding: "60px 20px", textAlign: "center", backgroundColor: "white", borderRadius: "18px", border: "2px dashed #E5E7EB" },
//   card:          { backgroundColor: "white", borderRadius: "18px", border: "2px solid #E5E7EB", boxShadow: "0 2px 14px rgba(0,0,0,0.05)", transition: "border-color 0.2s", overflow: "visible" },

//   bannerConfirmed: { padding: "12px 20px", borderRadius: "16px 16px 0 0", backgroundColor: "#DCFCE7", display: "flex", alignItems: "center", gap: "12px", borderBottom: "1px solid #86EFAC" },
//   bannerYes:       { padding: "12px 20px", borderRadius: "16px 16px 0 0", backgroundColor: "#EDE9FE", display: "flex", alignItems: "center", gap: "12px", borderBottom: "1px solid #C4B5FD" },
//   bannerRed:       { padding: "12px 20px", borderRadius: "16px 16px 0 0", backgroundColor: "#FEE2E2", display: "flex", alignItems: "center", gap: "12px", borderBottom: "1px solid #FECACA" },

//   cardBody:      { padding: "20px", display: "flex", alignItems: "flex-start", gap: "16px", flexWrap: "wrap" },
//   avatarWrap:    { position: "relative", flexShrink: 0 },
//   avatar:        { width: "60px", height: "60px", borderRadius: "14px", backgroundColor: "#1A3C6E", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 800, fontSize: "20px" },
//   onlineDot:     { position: "absolute", bottom: "2px", right: "2px", width: "14px", height: "14px", borderRadius: "50%", border: "2.5px solid white", transition: "background-color 0.3s" },
//   info:          { flex: 1, minWidth: "200px" },
//   nameRow:       { display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", marginBottom: "4px" },
//   name:          { fontSize: "17px", fontWeight: 700, color: "#111827", margin: 0 },
//   badgeConfirmed:{ padding: "3px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: 700, backgroundColor: "#DCFCE7", color: "#166534", border: "1.5px solid #86EFAC" },
//   badgePurple:   { padding: "3px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: 700, backgroundColor: "#EDE9FE", color: "#5B21B6", border: "1.5px solid #C4B5FD" },
//   badgeRed:      { padding: "3px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: 700, backgroundColor: "#FEE2E2", color: "#991B1B", border: "1.5px solid #FECACA" },
//   metaRow:       { display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px", flexWrap: "wrap" },
//   specialty:     { color: "#F97316", fontWeight: 700, fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.6px" },
//   rating:        { fontSize: "13px", color: "#374151", fontWeight: 500 },
//   tags:          { display: "flex", flexWrap: "wrap", gap: "8px", fontSize: "12.5px", color: "#6B7280", marginBottom: "8px", alignItems: "center" },
//   tag:           { display: "flex", alignItems: "center", gap: "4px" },
//   verifiedChip:  { padding: "2px 8px", backgroundColor: "#F0FDF4", color: "#059669", border: "1px solid #86EFAC", borderRadius: "20px", fontSize: "11px", fontWeight: 700, cursor: "pointer" },
//   contactRow:    { display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "10px" },
//   chip:          { padding: "4px 10px", backgroundColor: "#F8FAFC", border: "1px solid #E5E7EB", borderRadius: "8px", fontSize: "12.5px", color: "#374151", fontWeight: 500 },
//   waBtn:         { display: "inline-flex", alignItems: "center", gap: "8px", padding: "9px 16px", color: "#15803D", border: "1.5px solid #86EFAC", borderRadius: "10px", fontSize: "13px", fontWeight: 700, cursor: "pointer", textDecoration: "none", transition: "background-color 0.2s", alignSelf: "flex-start" },

//   workflowCol:   { display: "flex", flexDirection: "column", gap: "8px", minWidth: "210px", flexShrink: 0 },
//   workflowBar:   { display: "flex", alignItems: "flex-start", justifyContent: "center", gap: "0", marginBottom: "8px", paddingBottom: "8px", borderBottom: "1px solid #F3F4F6" },
//   wfDot:         { width: "24px", height: "24px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 800, flexShrink: 0, transition: "all 0.2s" },
//   wfLine:        { width: "18px", height: "3px", marginBottom: "10px", transition: "background-color 0.2s" },
//   stepBlock:     { border: "1.5px solid #E5E7EB", borderRadius: "12px", padding: "10px 12px", display: "flex", flexDirection: "column", gap: "6px", transition: "border-color 0.2s" },
//   stepHeader:    { fontSize: "11px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.5px" },
//   workflowBtn:   { width: "100%", padding: "9px 10px", borderRadius: "9px", border: "1.5px solid", fontWeight: 600, fontSize: "13px", cursor: "pointer", transition: "all 0.18s", display: "flex", alignItems: "center", justifyContent: "center", gap: "5px", boxSizing: "border-box", whiteSpace: "nowrap" },

//   dropdown:      { position: "absolute", right: 0, top: "calc(100% + 6px)", backgroundColor: "white", border: "1.5px solid #E5E7EB", borderRadius: "14px", boxShadow: "0 8px 28px rgba(0,0,0,0.13)", overflow: "hidden", zIndex: 300, minWidth: "220px" },
//   dropTitle:     { padding: "10px 16px 8px", fontSize: "11px", color: "#9CA3AF", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px", borderBottom: "1px solid #F3F4F6" },
//   dropItem:      { width: "100%", padding: "12px 16px", textAlign: "left", fontSize: "14px", cursor: "pointer", transition: "background-color 0.15s", userSelect: "none" },

//   proceedBtn:    { padding: "14px 52px", backgroundColor: "#22C55E", color: "white", border: "none", borderRadius: "14px", fontWeight: 700, fontSize: "16px", cursor: "pointer", boxShadow: "0 4px 18px rgba(34,197,94,0.38)" },
// };

// export default ProviderList;


import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getProviders, addBooking, getCurrentUser } from "../../../services/store";

function buildWhatsAppLink(phone, providerName, service, description) {
  const clean = phone.replace(/\D/g, "");
  const msg = encodeURIComponent(
    `Hello ${providerName}! 👋\n\nA customer wants to book your *${service || "service"}* on ServeEasySolapur.\n\nProblem Description:\n${description || "Not provided"}\n\nAre you available to provide the service?\n\nPlease reply:\n✅ *YES* – I am available\n❌ *NO* – I am not available`
  );
  return `https://wa.me/91${clean}?text=${msg}`;
}
function initials(n) { return n.split(" ").map((x) => x[0]).join("").slice(0, 2).toUpperCase(); }
function stars(r)    { return "★".repeat(Math.round(r)) + "☆".repeat(5 - Math.round(r)); }

// ─── Select Provider Popup ────────────────────────────────────────────────────
function SelectProviderPopup({ providers, alreadySelected, onDone, onClose }) {
  const ref = useRef();
  const [selected, setSelected] = useState(new Set());

  useEffect(() => {
    const h = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  const toggle = (id) =>
    setSelected(prev => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });

  return (
    <div ref={ref} onClick={(e) => e.target === ref.current && onClose()}
      style={{ position:"fixed", inset:0, backgroundColor:"rgba(0,0,0,0.5)", backdropFilter:"blur(4px)", zIndex:900, display:"flex", alignItems:"center", justifyContent:"center", padding:"16px" }}>
      <div style={{ background:"white", borderRadius:"18px", width:"100%", maxWidth:"480px", maxHeight:"85vh", display:"flex", flexDirection:"column", boxShadow:"0 20px 50px rgba(0,0,0,0.22)" }}>

        {/* Header */}
        <div style={{ padding:"16px 18px 12px", borderBottom:"1px solid #F3F4F6" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"10px" }}>
            <div>
              <div style={{ fontWeight:800, fontSize:"16px", color:"#1A3C6E" }}>👆 Select Providers</div>
              <div style={{ fontSize:"11px", color:"#6B7280", marginTop:"2px" }}>Tap the providers you want — {selected.size} selected</div>
            </div>
            <button onClick={onClose} style={{ width:"28px", height:"28px", borderRadius:"50%", border:"none", background:"#F3F4F6", cursor:"pointer", fontSize:"13px", flexShrink:0 }}>✕</button>
          </div>

        </div>

        {/* Provider list */}
        <div style={{ overflowY:"auto", flex:1, padding:"10px 14px", display:"flex", flexDirection:"column", gap:"7px" }}>
          {providers.map(p => {
            const checked = selected.has(p.id);
            return (
              <div key={p.id} onClick={() => toggle(p.id)}
                style={{ display:"flex", alignItems:"center", gap:"12px", padding:"10px 12px", borderRadius:"10px", border:`2px solid ${checked?"#1A3C6E":"#E5E7EB"}`, background:checked?"#EEF4FF":"#F9FAFB", cursor:"pointer", transition:"all 0.14s" }}>
                {/* Checkbox */}
                <div style={{ width:"19px", height:"19px", borderRadius:"5px", border:`2px solid ${checked?"#1A3C6E":"#CBD5E1"}`, background:checked?"#1A3C6E":"white", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  {checked && <span style={{ color:"white", fontSize:"11px", fontWeight:900, lineHeight:1 }}>✓</span>}
                </div>
                {/* Avatar */}
                <div style={{ width:"36px", height:"36px", borderRadius:"8px", background:"#1A3C6E", display:"flex", alignItems:"center", justifyContent:"center", color:"white", fontWeight:800, fontSize:"12px", flexShrink:0 }}>{initials(p.name)}</div>
                {/* Info */}
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontWeight:700, fontSize:"13px", color:"#111827" }}>{p.name}</div>
                  <div style={{ fontSize:"10px", color:"#F97316", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.3px" }}>{p.specialty}</div>
                  <div style={{ fontSize:"10px", color:"#6B7280", marginTop:"1px" }}>⭐ {p.rating} · 📍 {p.location}</div>
                </div>
                {/* Verified chip */}
                <span style={{ padding:"2px 6px", borderRadius:"20px", fontSize:"9px", fontWeight:700, background:"#F0FDF4", color:"#059669", border:"1px solid #86EFAC", whiteSpace:"nowrap" }}>✔ Verified</span>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div style={{ padding:"12px 14px 16px", borderTop:"1px solid #F3F4F6", display:"flex", gap:"8px" }}>
          <button onClick={onClose}
            style={{ flex:1, padding:"10px", borderRadius:"9px", border:"1.5px solid #D1D5DB", background:"white", color:"#374151", fontWeight:600, fontSize:"13px", cursor:"pointer" }}>
            Cancel
          </button>
          <button
            disabled={selected.size === 0}
            onClick={() => { onDone([...selected]); onClose(); }}
            style={{ flex:2, padding:"10px", borderRadius:"9px", border:"none", background:selected.size>0?"#1A3C6E":"#E5E7EB", color:selected.size>0?"white":"#9CA3AF", fontWeight:700, fontSize:"13px", cursor:selected.size>0?"pointer":"not-allowed" }}>
            {selected.size > 0 ? `✅ Confirm ${selected.size} Provider${selected.size>1?"s":""}` : "Select at least one"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Description Popup ────────────────────────────────────────────────────────
function DescPopup({ provider, value, onChange, onSave, onClose }) {
  const ref = useRef();
  useEffect(() => {
    const h = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);
  return (
    <div ref={ref} onClick={(e) => e.target === ref.current && onClose()}
      style={{ position:"fixed", inset:0, backgroundColor:"rgba(0,0,0,0.45)", backdropFilter:"blur(4px)", zIndex:950, display:"flex", alignItems:"center", justifyContent:"center", padding:"16px" }}>
      <div style={{ background:"white", borderRadius:"16px", width:"100%", maxWidth:"380px", padding:"20px", boxShadow:"0 16px 40px rgba(0,0,0,0.18)" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"12px" }}>
          <div>
            <div style={{ fontWeight:800, fontSize:"15px", color:"#1A3C6E" }}>📝 Problem Description</div>
            <div style={{ fontSize:"11px", color:"#9CA3AF", marginTop:"1px" }}>For {provider.name}</div>
          </div>
          <button onClick={onClose} style={{ width:"28px", height:"28px", borderRadius:"50%", border:"none", background:"#F3F4F6", cursor:"pointer", fontSize:"13px" }}>✕</button>
        </div>
        <textarea value={value} onChange={(e) => onChange(e.target.value)}
          placeholder="e.g. AC not cooling, pipe leaking, need urgent repair..." autoFocus
          style={{ width:"100%", minHeight:"90px", border:"1.5px solid #FDBA74", borderRadius:"9px", padding:"9px 11px", fontSize:"13px", resize:"vertical", outline:"none", boxSizing:"border-box", fontFamily:"inherit", backgroundColor:"#FFFBEB" }} />
        <div style={{ display:"flex", gap:"8px", marginTop:"10px" }}>
          <button onClick={onSave} style={{ flex:2, padding:"9px", background:"#F97316", color:"white", border:"none", borderRadius:"9px", fontWeight:700, fontSize:"13px", cursor:"pointer" }}>✅ Save</button>
          <button onClick={onClose} style={{ flex:1, padding:"9px", background:"white", color:"#6B7280", border:"1.5px solid #D1D5DB", borderRadius:"9px", fontWeight:600, fontSize:"13px", cursor:"pointer" }}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

// ─── Review Modal ─────────────────────────────────────────────────────────────
function ReviewModal({ provider, onClose, onBook }) {
  const ref = useRef();
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    const h = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  const handleShare = () => {
    const text =
`🔧 Service Provider Details
Name: ${provider.name}
Specialty: ${provider.specialty}
Phone: +91 ${provider.phone}
Location: ${provider.location}
Rating: ⭐ ${provider.rating}/5.0
Booked via ServeEasySolapur`;
    if (navigator.share) {
      navigator.share({ title: "Service Provider Details", text });
    } else {
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      });
    }
  };

  return (
    <div ref={ref} onClick={(e) => e.target === ref.current && onClose()}
      style={{ position:"fixed", inset:0, backgroundColor:"rgba(0,0,0,0.6)", backdropFilter:"blur(5px)", zIndex:1000, display:"flex", alignItems:"center", justifyContent:"center", padding:"16px" }}>
      <div style={{ background:"white", borderRadius:"20px", width:"100%", maxWidth:"440px", maxHeight:"90vh", overflowY:"auto", boxShadow:"0 24px 60px rgba(0,0,0,0.22)" }}>

        {/* Header */}
        <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", padding:"20px 20px 0" }}>
          <div style={{ display:"flex", gap:"12px", alignItems:"flex-start" }}>
            <div style={{ width:"50px", height:"50px", borderRadius:"12px", background:"#1A3C6E", display:"flex", alignItems:"center", justifyContent:"center", color:"white", fontWeight:800, fontSize:"18px", flexShrink:0 }}>{initials(provider.name)}</div>
            <div>
              <div style={{ fontWeight:800, fontSize:"17px", color:"#111827" }}>{provider.name}</div>
              <div style={{ color:"#F97316", fontWeight:700, fontSize:"10px", textTransform:"uppercase", marginBottom:"4px" }}>{provider.specialty}</div>
              <span style={{ padding:"2px 8px", borderRadius:"20px", background:"#DCFCE7", color:"#166534", fontWeight:700, fontSize:"10px", border:"1px solid #86EFAC" }}>✅ Available — Confirmed</span>
            </div>
          </div>
          {/* ✕ closes modal and goes back to page */}
          <button onClick={onClose} style={{ width:"30px", height:"30px", borderRadius:"50%", border:"none", background:"#F3F4F6", cursor:"pointer", fontSize:"13px", flexShrink:0 }}>✕</button>
        </div>

        {/* Info rows — no amount */}
        <div style={{ padding:"14px 20px", display:"flex", flexDirection:"column", gap:"7px" }}>
          {[
            { icon:"📞", label:"Contact",  value:`+91 ${provider.phone}`, action:<a href={`tel:+91${provider.phone}`} style={{ padding:"6px 10px", background:"#DCFCE7", color:"#166534", border:"1px solid #86EFAC", borderRadius:"7px", fontWeight:700, fontSize:"11px", textDecoration:"none" }}>📲 Call</a> },
            { icon:"📍", label:"Location", value:provider.location },
            { icon:"📋", label:"Status",   value:<span style={{ padding:"3px 8px", borderRadius:"20px", background:"#DCFCE7", color:"#166534", fontWeight:700, fontSize:"11px", border:"1px solid #86EFAC" }}>✅ Confirmed & Available</span> },
            { icon:"⭐", label:"Rating",   value:<span style={{ fontWeight:700, color:"#1A3C6E", fontSize:"13px" }}>{provider.rating}/5.0 <span style={{ color:"#F59E0B" }}>{stars(provider.rating)}</span> <span style={{ color:"#9CA3AF", fontSize:"10px" }}>({provider.reviews})</span></span> },
          ].map(({ icon, label, value, action }) => (
            <div key={label} style={{ display:"flex", alignItems:"center", gap:"10px", padding:"10px 12px", background:"#F8FAFC", borderRadius:"10px", border:"1.5px solid #E5E7EB" }}>
              <span style={{ fontSize:"18px", flexShrink:0 }}>{icon}</span>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:"9px", color:"#9CA3AF", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.4px", marginBottom:"2px" }}>{label}</div>
                <div style={{ fontSize:"12px", color:"#111827" }}>{value}</div>
              </div>
              {action}
            </div>
          ))}
        </div>

        <div style={{ margin:"0 20px 14px", padding:"9px 12px", background:"#F0FDF4", borderRadius:"9px", color:"#166534", fontWeight:700, fontSize:"11px" }}>
          ✔ Identity Verified by ServeEasySolapur Admin
        </div>

        {/* Footer buttons */}
        <div style={{ display:"flex", gap:"8px", padding:"0 20px 20px" }}>
          {/* Share Provider — shares provider details */}
          <button onClick={handleShare}
            style={{ flex:1, padding:"10px", borderRadius:"10px", border:"none", background:"#1A3C6E", color:"white", fontWeight:700, fontSize:"12px", cursor:"pointer" }}>
            {copied ? "✓ Copied!" : "🔗 Share Provider"}
          </button>
          {/* Book Now — books and navigates to booking page */}
          <button onClick={onBook}
            style={{ flex:2, padding:"10px", borderRadius:"10px", border:"none", background:"#22C55E", color:"white", fontWeight:700, fontSize:"13px", cursor:"pointer", boxShadow:"0 3px 10px rgba(34,197,94,0.3)" }}>
            ✅ Book Now →
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Doc Modal ────────────────────────────────────────────────────────────────
function DocModal({ provider, onClose }) {
  const ref = useRef();
  useEffect(() => {
    const h = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);
  const docs = provider.documents || {};
  return (
    <div ref={ref} onClick={(e) => e.target === ref.current && onClose()}
      style={{ position:"fixed", inset:0, backgroundColor:"rgba(0,0,0,0.55)", backdropFilter:"blur(4px)", zIndex:1100, display:"flex", alignItems:"center", justifyContent:"center", padding:"16px" }}>
      <div style={{ background:"white", borderRadius:"16px", width:"100%", maxWidth:"500px", maxHeight:"88vh", overflowY:"auto", boxShadow:"0 20px 50px rgba(0,0,0,0.22)" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"16px 18px 12px", borderBottom:"1px solid #F3F4F6" }}>
          <div>
            <div style={{ fontWeight:800, fontSize:"15px", color:"#1A3C6E" }}>📄 Verification Documents</div>
            <div style={{ fontSize:"11px", color:"#9CA3AF", marginTop:"1px" }}>{provider.name}</div>
          </div>
          <button onClick={onClose} style={{ width:"28px", height:"28px", borderRadius:"50%", border:"none", background:"#F3F4F6", cursor:"pointer", fontSize:"12px" }}>✕</button>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"12px", padding:"14px 18px" }}>
          {[{ label:"🪪 Aadhaar Card", file:docs.aadhar }, { label:"📸 Photo / Certificate", file:docs.photo }].map(({ label, file }) => (
            <div key={label} style={{ border:"1.5px solid #E5E7EB", borderRadius:"10px", overflow:"hidden" }}>
              <div style={{ padding:"7px 10px", background:"#F8FAFC", borderBottom:"1px solid #E5E7EB", fontWeight:700, fontSize:"11px", color:"#1A3C6E" }}>{label}</div>
              {file ? (
                <div style={{ padding:"7px" }}>
                  {file.endsWith(".pdf") ? <iframe src={file} title={label} style={{ width:"100%", height:"140px", border:"none" }} /> : <img src={file} alt={label} style={{ width:"100%", height:"120px", objectFit:"cover", borderRadius:"5px" }} />}
                  <a href={file} target="_blank" rel="noreferrer" style={{ display:"block", marginTop:"4px", color:"#1A3C6E", fontSize:"10px", fontWeight:600, textDecoration:"none" }}>🔗 Open full</a>
                </div>
              ) : <div style={{ padding:"24px 10px", textAlign:"center", color:"#9CA3AF", fontSize:"11px" }}>Not uploaded yet</div>}
            </div>
          ))}
        </div>
        <div style={{ padding:"10px 18px 16px", background:"#F0FDF4", borderTop:"1px solid #DCFCE7", color:"#166534", fontWeight:700, fontSize:"11px" }}>✔ Identity Verified by ServeEasySolapur Admin</div>
      </div>
    </div>
  );
}

// ─── Respond Dropdown ─────────────────────────────────────────────────────────
function RespondDropdown({ providerId, isYes, isNo, onRespond }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef();
  useEffect(() => {
    const h = (e) => { if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  const bg    = isYes?"#DCFCE7":isNo?"#FEE2E2":"white";
  const color = isYes?"#166534":isNo?"#991B1B":"#374151";
  const bdr   = isYes?"#86EFAC":isNo?"#FECACA":"#D1D5DB";
  const label = isYes?"✅ Yes — Available":isNo?"❌ No — Unavailable":"💬 Mark Response ▾";
  return (
    <div ref={wrapRef} style={{ position:"relative" }}>
      <button onClick={() => setOpen(p=>!p)}
        style={{ width:"100%", padding:"5px 7px", borderRadius:"6px", border:`1.5px solid ${bdr}`, background:bg, color, fontWeight:600, fontSize:"11px", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
        {label}
      </button>
      {open && (
        <div style={{ position:"absolute", left:0, right:0, top:"calc(100% + 3px)", background:"white", border:"1.5px solid #E5E7EB", borderRadius:"10px", boxShadow:"0 8px 24px rgba(0,0,0,0.12)", overflow:"hidden", zIndex:500 }}>
          <div style={{ padding:"6px 10px 4px", fontSize:"9px", color:"#9CA3AF", fontWeight:700, textTransform:"uppercase", borderBottom:"1px solid #F3F4F6" }}>Provider replied:</div>
          {[["yes","✅ Yes, available","#DCFCE7","#166534"],["no","❌ No, not available","#FEE2E2","#991B1B"]].map(([val,txt,hbg,hclr]) => (
            <div key={val} onMouseDown={() => { onRespond(providerId, val); setOpen(false); }}
              style={{ padding:"8px 10px", cursor:"pointer", fontSize:"12px", background:(val==="yes"&&isYes)||(val==="no"&&isNo)?hbg:"white", color:(val==="yes"&&isYes)||(val==="no"&&isNo)?hclr:"#374151", fontWeight:(val==="yes"&&isYes)||(val==="no"&&isNo)?800:500 }}
              onMouseOver={(e)=>e.currentTarget.style.background=hbg}
              onMouseOut={(e) =>e.currentTarget.style.background=(val==="yes"&&isYes)||(val==="no"&&isNo)?hbg:"white"}>
              {txt}
            </div>
          ))}
          {(isYes||isNo) && (
            <div onMouseDown={() => { onRespond(providerId, null); setOpen(false); }}
              style={{ padding:"6px 10px", cursor:"pointer", fontSize:"10px", color:"#9CA3AF", borderTop:"1px solid #F3F4F6" }}
              onMouseOver={(e)=>e.currentTarget.style.background="#F9FAFB"}
              onMouseOut={(e) =>e.currentTarget.style.background="white"}>✕ Clear</div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Vertical Workflow Block ─────────────────────────────────────────────────
const STEP_META = [
  { label:"Connect",   color:"#3B82F6", bg:"#EFF6FF" },
  { label:"Responded", color:"#F59E0B", bg:"#FFFBEB" },
  { label:"Confirm",   color:"#7C3AED", bg:"#F5F3FF" },
  { label:"Review",    color:"#22C55E", bg:"#F0FDF4" },
];
function WorkflowBlock({ step, isYes, isNo, pst, providerId, onRespond, onConfirm, onReview }) {
  return (
    <div style={{ border:"1.5px solid #E2E8F0", borderRadius:"10px", overflow:"hidden", width:"170px", flexShrink:0 }}>
      {STEP_META.map((s, i) => {
        const done   = i < step;
        const active = i === step;
        const locked = (i===1&&!pst.waSent)||(i===2&&!isYes&&!pst.confirmed)||(i===3&&!pst.confirmed);
        return (
          <div key={s.label} style={{
            borderLeft:`4px solid ${done?"#22C55E":active?s.color:"#E2E8F0"}`,
            background: done?s.bg:active?s.bg:"white",
            padding:"6px 9px",
            borderBottom: i<3?"1px solid #F1F5F9":"none",
            opacity: locked?0.42:1,
            transition:"all 0.2s",
          }}>
            <div style={{ display:"flex", alignItems:"center", gap:"5px", marginBottom: i===1||i===2||i===3?"4px":"0" }}>
              <div style={{ width:"15px", height:"15px", borderRadius:"50%", flexShrink:0,
                background:done?"#22C55E":active?s.color:"#E2E8F0",
                display:"flex", alignItems:"center", justifyContent:"center",
                fontSize:"8px", fontWeight:900, color:done||active?"white":"#9CA3AF" }}>
                {done?"✓":i+1}
              </div>
              <span style={{ fontSize:"9px", fontWeight:800, textTransform:"uppercase", letterSpacing:"0.4px",
                color:done?"#22C55E":active?s.color:"#9CA3AF" }}>
                {s.label}
              </span>
            </div>
            <div style={{ paddingLeft:"20px" }}>
              {i===0 && <span style={{ fontSize:"10px", color:pst.waSent?"#22C55E":"#9CA3AF" }}>{pst.waSent?"✓ WhatsApp sent":"Send WhatsApp first"}</span>}
              {i===1 && <RespondDropdown providerId={providerId} isYes={isYes} isNo={isNo} onRespond={onRespond} />}
              {i===2 && (
                <button disabled={!isYes||pst.confirmed} onClick={onConfirm}
                  style={{ width:"100%", padding:"4px 0", borderRadius:"5px",
                    border:`1.5px solid ${pst.confirmed?"#86EFAC":isYes?"#7C3AED":"#E5E7EB"}`,
                    background:pst.confirmed?"#DCFCE7":isYes?"#7C3AED":"#F3F4F6",
                    color:pst.confirmed?"#166534":isYes?"white":"#9CA3AF",
                    fontWeight:700, fontSize:"10px", cursor:isYes&&!pst.confirmed?"pointer":"not-allowed" }}>
                  {pst.confirmed?"✓ Confirmed":isYes?"Confirm Now":"Waiting YES"}
                </button>
              )}
              {i===3 && (
                <button disabled={!pst.confirmed} onClick={onReview}
                  style={{ width:"100%", padding:"4px 0", borderRadius:"5px",
                    border:`1.5px solid ${pst.confirmed?"#22C55E":"#E5E7EB"}`,
                    background:pst.confirmed?"#22C55E":"#F3F4F6",
                    color:pst.confirmed?"white":"#9CA3AF",
                    fontWeight:700, fontSize:"10px", cursor:pst.confirmed?"pointer":"not-allowed" }}>
                  {pst.confirmed?"⭐ View & Book":"Complete first"}
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export function ProviderList() {
  const { state }   = useLocation();
  const navigate    = useNavigate();
  const currentUser = getCurrentUser();

  const allProviders = getProviders().filter((p) => p.status === "active");

  // Per-provider workflow state
  const [ps, setPs] = useState(() => {
    const s = {};
    allProviders.forEach((p) => { s[p.id] = { waSent:false, availability:null, confirmed:false, reviewed:false, description:state?.description||"" }; });
    return s;
  });

  // IDs the user has manually picked via popup (empty = show all)
  const [chosenIds, setChosenIds] = useState([]);

  const [reviewProvider,     setReviewProvider]     = useState(null);
  const [docProvider,        setDocProvider]        = useState(null);
  const [descModalFor,       setDescModalFor]       = useState(null);
  const [selectPopupOpen,    setSelectPopupOpen]    = useState(false);
  const [selectAll,          setSelectAll]          = useState(false);
  const [globalDescOpen,     setGlobalDescOpen]     = useState(false);
  const [globalDesc,         setGlobalDesc]         = useState(state?.description||"");

  const upd = (id, patch) => setPs((prev) => ({ ...prev, [id]:{ ...prev[id], ...patch } }));

  // booking restore hooks
  useEffect(() => {
    window.__onAddressConfirmed = (addressLine) => {
      const pending = sessionStorage.getItem("pendingProviderSelection");
      if (!pending) return;
      try {
        const data = JSON.parse(pending);
        sessionStorage.removeItem("pendingProviderSelection");
        const user = getCurrentUser();
        if (!user) return;
        addBooking({ userId:user.id, userName:user.name, userEmail:user.email, ...data, address:addressLine, status:"requested" });
        navigate("/booking-request", { replace:true, state:{ ...data, address:addressLine, bookingId:`BK${Date.now().toString().slice(-6)}` } });
      } catch { sessionStorage.removeItem("pendingProviderSelection"); }
    };
    return () => delete window.__onAddressConfirmed;
  }, [navigate]);

  useEffect(() => {
    const pending = sessionStorage.getItem("pendingProviderSelection");
    if (!pending) return;
    const user = getCurrentUser();
    if (!user) return;
    try {
      const data = JSON.parse(pending);
      if (data.addressConfirmed && data.address) {
        sessionStorage.removeItem("pendingProviderSelection");
        addBooking({ userId:user.id, userName:user.name, userEmail:user.email, ...data, status:"requested" });
        navigate("/booking-request", { replace:true, state:{ ...data, bookingId:`BK${Date.now().toString().slice(-6)}` } });
      } else { sessionStorage.removeItem("pendingProviderSelection"); }
    } catch { sessionStorage.removeItem("pendingProviderSelection"); }
  }, [navigate]);

  const getStep = (id) => {
    const p = ps[id];
    if (p.reviewed||p.confirmed) return 3;
    if (p.availability==="yes")  return 2;
    if (p.waSent)                return 1;
    return 0;
  };

  const handleSelectAll = () => {
    if (!selectAll) { setGlobalDescOpen(true); }
    else {
      setSelectAll(false); setGlobalDescOpen(false);
      setPs((prev) => { const u={...prev}; allProviders.forEach((p)=>{ u[p.id]={...u[p.id],waSent:false}; }); return u; });
    }
  };
  const handleSaveGlobalDesc = () => {
    if (!globalDesc.trim()) { alert("Please enter a problem description."); return; }
    setGlobalDescOpen(false); setSelectAll(true);
    setPs((prev) => { const u={...prev}; allProviders.forEach((p)=>{ u[p.id]={...u[p.id],description:globalDesc.trim(),waSent:true}; }); return u; });
  };

  const handleWaSent    = (id)    => upd(id, { waSent:true });
  const handleRespond   = (id, v) => upd(id, { availability:v });
  const handleConfirm   = (id)    => { upd(id, { confirmed:true, reviewed:false }); setReviewProvider(allProviders.find((p)=>p.id===id)); };
  const handleCloseReview=(id)    => { setReviewProvider(null); if (id) upd(id, { reviewed:true }); };

  const confirmedCount = chosenIds.filter(id => ps[id]?.confirmed).length;

  const handleProceed = () => {
    const confirmedProviders = allProviders.filter((p) => chosenIds.includes(p.id) && ps[p.id]?.confirmed);
    if (confirmedProviders.length === 0) return;
    const chosenNames = confirmedProviders.map((p) => p.name);
    const finalDesc   = confirmedProviders.map((p) => ps[p.id]?.description?.trim()).filter(Boolean).join(" | ") || state?.description||"";
    const bookingData = { service:state?.service||"General Service", address:state?.address||"", description:finalDesc, date:state?.date||new Date().toLocaleDateString(), time:state?.time||"ASAP", amount:state?.amount||"₹499", providers:chosenNames };
    if (!currentUser) {
      sessionStorage.setItem("pendingProviderSelection", JSON.stringify(bookingData));
      if (window.__navbarOpenModal) window.__navbarOpenModal("login");
      return;
    }
    addBooking({ userId:currentUser.id, userName:currentUser.name, userEmail:currentUser.email, ...bookingData, status:"requested" });
    navigate("/booking-request", { state:{ ...state, providers:chosenNames, description:finalDesc, time:state?.time||"ASAP", bookingId:`BK${Date.now().toString().slice(-6)}` } });
  };

  // Providers currently shown as cards
  // Show all providers if none chosen yet, else only chosen ones
  const shownProviders = chosenIds.length === 0 ? allProviders : allProviders.filter(p => chosenIds.includes(p.id));

  return (
    <div style={{ minHeight:"100vh", backgroundColor:"#F0F4F8", fontFamily:"'Segoe UI', system-ui, sans-serif" }}>

      {/* Modals */}
      {selectPopupOpen && (
        <SelectProviderPopup
          providers={allProviders}
          alreadySelected={chosenIds}
          onDone={(ids) => {
            setChosenIds(ids);
            // init state for any newly added provider
            setPs(prev => {
              const u = {...prev};
              ids.forEach(id => { if (!u[id]) u[id] = { waSent:false, availability:null, confirmed:false, reviewed:false, description:state?.description||"" }; });
              return u;
            });
          }}
          onClose={() => setSelectPopupOpen(false)}
        />
      )}
      {descModalFor && (() => {
        const prov = allProviders.find((p) => p.id === descModalFor);
        return prov ? (
          <DescPopup provider={prov} value={ps[descModalFor]?.description||""} onChange={(v)=>upd(descModalFor,{description:v})}
            onSave={() => { if (!ps[descModalFor]?.description?.trim()) { alert("Please enter a description."); return; } setDescModalFor(null); }}
            onClose={() => setDescModalFor(null)} />
        ) : null;
      })()}
      {docProvider    && <DocModal provider={docProvider} onClose={() => setDocProvider(null)} />}
      {reviewProvider && (
        <ReviewModal provider={reviewProvider}
          onClose={() => handleCloseReview(reviewProvider.id)}
          onBook={() => {
            handleCloseReview(reviewProvider.id);
            const p = reviewProvider;
            const desc = ps[p.id]?.description?.trim() || state?.description || "";
            const bookingData = {
              service: state?.service || "General Service",
              address: state?.address || "",
              description: desc,
              date: state?.date || new Date().toLocaleDateString(),
              time: state?.time || "ASAP",
              providers: [p.name],
              bookingId: `BK${Date.now().toString().slice(-6)}`,
            };
            if (!currentUser) {
              sessionStorage.setItem("pendingProviderSelection", JSON.stringify(bookingData));
              if (window.__navbarOpenModal) window.__navbarOpenModal("login");
              return;
            }
            addBooking({ userId:currentUser.id, userName:currentUser.name, userEmail:currentUser.email, ...bookingData, status:"requested" });
            navigate("/booking-request", { state: { ...state, ...bookingData } });
          }} />
      )}

      {/* Navbar */}
      <nav style={{ backgroundColor:"white", borderBottom:"1px solid #E5E7EB", height:"50px", display:"flex", alignItems:"center", padding:"0 20px", position:"sticky", top:0, zIndex:100, boxShadow:"0 1px 4px rgba(0,0,0,0.06)" }}>
        <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
          <div style={{ width:"30px", height:"30px", borderRadius:"50%", backgroundColor:"#1A3C6E", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"14px" }}>🏠</div>
          <span style={{ fontSize:"15px", fontWeight:800, color:"#1A3C6E" }}>ServeEasy<span style={{ color:"#F97316" }}>Solapur</span></span>
        </div>
      </nav>

      <div style={{ maxWidth:"940px", margin:"0 auto", padding:"14px 12px 60px" }}>

        {/* Page header */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"12px", flexWrap:"wrap", gap:"8px" }}>
          <div>
            <h1 style={{ fontSize:"20px", fontWeight:800, color:"#1A3C6E", margin:0 }}>Select Professionals</h1>
            <p style={{ color:"#6B7280", fontSize:"12px", marginTop:"2px" }}>Connect with verified experts in Solapur</p>
          </div>
          <div style={{ display:"flex", gap:"8px", alignItems:"center" }}>
            <button onClick={() => setSelectPopupOpen(true)}
              style={{ padding:"8px 14px", borderRadius:"9px", border:"2px solid #1A3C6E", fontWeight:700, fontSize:"12px", cursor:"pointer", background:chosenIds.length>0?"#1A3C6E":"white", color:chosenIds.length>0?"white":"#1A3C6E" }}>
              👆 {chosenIds.length > 0 ? `Showing ${chosenIds.length} Provider${chosenIds.length>1?"s":""} ✏️` : "Select Provider"}
            </button>
            <button onClick={handleSelectAll}
              style={{ padding:"8px 14px", borderRadius:"9px", border:"2px solid #1A3C6E", fontWeight:700, fontSize:"12px", cursor:"pointer", background:selectAll?"#1A3C6E":"white", color:selectAll?"white":"#1A3C6E" }}>
              {selectAll ? "✓ All Sent" : "👥 Select All Service Providers"}
            </button>
          </div>
        </div>

        {globalDescOpen && (
          <div style={{ background:"#FFF7ED", border:"2px solid #FED7AA", borderRadius:"10px", padding:"12px 14px", marginBottom:"10px" }}>
            <div style={{ fontWeight:800, fontSize:"12px", color:"#1A3C6E", marginBottom:"2px" }}>📝 Description for All {allProviders.length} Providers</div>
            <div style={{ fontSize:"11px", color:"#6B7280", marginBottom:"7px" }}>This will be sent to all providers via WhatsApp</div>
            <textarea value={globalDesc} onChange={(e) => setGlobalDesc(e.target.value)} placeholder="Describe your problem..."
              style={{ width:"100%", minHeight:"60px", border:"1.5px solid #FDBA74", borderRadius:"7px", padding:"7px 9px", fontSize:"12px", resize:"vertical", outline:"none", boxSizing:"border-box", fontFamily:"inherit" }} autoFocus />
            <div style={{ display:"flex", gap:"7px", marginTop:"7px" }}>
              <button onClick={handleSaveGlobalDesc} style={{ padding:"7px 16px", background:"#F97316", color:"white", border:"none", borderRadius:"7px", fontWeight:700, fontSize:"12px", cursor:"pointer" }}>✅ Send to All</button>
              <button onClick={() => setGlobalDescOpen(false)} style={{ padding:"7px 12px", background:"white", color:"#6B7280", border:"1.5px solid #D1D5DB", borderRadius:"7px", fontWeight:600, fontSize:"12px", cursor:"pointer" }}>Cancel</button>
            </div>
          </div>
        )}

        {!currentUser && (
          <div style={{ background:"#FFFBEB", border:"1px solid #FDE68A", borderRadius:"7px", padding:"7px 11px", marginBottom:"9px", color:"#92400E", fontSize:"11px" }}>
            ⚠️ You can proceed without login. Sign-in will be asked on the next step.
          </div>
        )}

        {confirmedCount > 0 && (
          <div style={{ background:"#F0FDF4", border:"1.5px solid #86EFAC", borderRadius:"8px", padding:"8px 13px", marginBottom:"9px", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:"7px" }}>
            <span style={{ color:"#166534", fontWeight:600, fontSize:"12px" }}>✅ {confirmedCount} provider{confirmedCount>1?"s":""} confirmed</span>
            <button onClick={handleProceed} style={{ padding:"6px 14px", background:"#22C55E", color:"white", border:"none", borderRadius:"7px", fontWeight:700, fontSize:"12px", cursor:"pointer" }}>Proceed to Booking →</button>
          </div>
        )}

        {/* Cards */}
        <div style={{ display:"flex", flexDirection:"column", gap:"7px" }}>
            {shownProviders.map((provider) => {
              const pst   = ps[provider.id];
              const isYes = pst.availability==="yes";
              const isNo  = pst.availability==="no";
              const step  = getStep(provider.id);
              const bc    = pst.confirmed?"#22C55E":isYes?"#6D28D9":isNo?"#EF4444":pst.waSent?"#F59E0B":"#E2E8F0";

              return (
                <div key={provider.id} style={{ background:"white", borderRadius:"9px", border:`2px solid ${bc}`, boxShadow:"0 1px 3px rgba(0,0,0,0.05)", opacity:isNo?0.76:1, transition:"border-color 0.2s", overflow:"hidden" }}>

                  {/* Status strip */}
                  {isYes&&!pst.confirmed && <div style={{ padding:"3px 10px", background:"#EDE9FE", fontSize:"10px", fontWeight:700, color:"#5B21B6" }}>✅ {provider.name} is Available — Confirm now!</div>}
                  {isNo  && <div style={{ padding:"3px 10px", background:"#FEE2E2", fontSize:"10px", fontWeight:700, color:"#991B1B" }}>❌ {provider.name} is Not Available</div>}
                  {pst.confirmed && <div style={{ padding:"3px 10px", background:"#DCFCE7", fontSize:"10px", fontWeight:700, color:"#166534" }}>🎉 Confirmed for Booking!</div>}

                  {/* CARD BODY — left info | right vertical workflow */}
                  <div style={{ display:"flex", alignItems:"stretch" }}>

                    {/* LEFT: full provider info */}
                    <div style={{ flex:1, padding:"12px 14px", minWidth:0 }}>
                      {/* Avatar + name row */}
                      <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"6px" }}>
                        <div style={{ position:"relative", flexShrink:0 }}>
                          <div style={{ width:"42px", height:"42px", borderRadius:"10px", background:"#1A3C6E", display:"flex", alignItems:"center", justifyContent:"center", color:"white", fontWeight:800, fontSize:"14px" }}>{initials(provider.name)}</div>
                          <div style={{ position:"absolute", bottom:"1px", right:"1px", width:"9px", height:"9px", borderRadius:"50%", border:"2px solid white", background:pst.confirmed?"#22C55E":isYes?"#7C3AED":isNo?"#EF4444":pst.waSent?"#F59E0B":"#94A3B8" }} />
                        </div>
                        <div style={{ flex:1, minWidth:0 }}>
                          <div style={{ display:"flex", alignItems:"center", gap:"5px", flexWrap:"wrap" }}>
                            <span style={{ fontWeight:800, fontSize:"14px", color:"#111827" }}>{provider.name}</span>
                            {pst.confirmed && <span style={{ padding:"1px 6px", borderRadius:"20px", fontSize:"9px", fontWeight:700, background:"#DCFCE7", color:"#166534", border:"1px solid #86EFAC" }}>🎉 Confirmed</span>}
                            {!pst.confirmed&&isYes && <span style={{ padding:"1px 6px", borderRadius:"20px", fontSize:"9px", fontWeight:700, background:"#EDE9FE", color:"#5B21B6", border:"1px solid #C4B5FD" }}>✅ Available</span>}
                          </div>
                          <div style={{ display:"flex", gap:"5px", flexWrap:"wrap", alignItems:"center", marginTop:"2px" }}>
                            <span style={{ color:"#F97316", fontWeight:700, fontSize:"9px", textTransform:"uppercase", letterSpacing:"0.4px" }}>{provider.specialty}</span>
                            <span style={{ color:"#D1D5DB" }}>·</span>
                            <span style={{ fontSize:"10px", color:"#6B7280" }}>⭐ {provider.rating} ({provider.reviews})</span>
                            <span style={{ color:"#D1D5DB" }}>·</span>
                            <span style={{ fontSize:"10px", color:"#6B7280" }}>💼 {provider.experience}</span>
                            <span style={{ color:"#D1D5DB" }}>·</span>
                            <span style={{ fontSize:"10px", color:"#6B7280" }}>📍 {provider.location}</span>
                          </div>
                        </div>
                        {/* Phone + verified top-right */}
                        <div style={{ display:"flex", gap:"5px", alignItems:"center", flexShrink:0 }}>
                          <span style={{ padding:"2px 7px", background:"#F8FAFC", border:"1px solid #E5E7EB", borderRadius:"5px", fontSize:"10px", color:"#374151" }}>📞 {provider.phone}</span>
                          <button onClick={() => setDocProvider(provider)} style={{ padding:"2px 7px", background:"#F0FDF4", color:"#059669", border:"1px solid #86EFAC", borderRadius:"20px", fontSize:"10px", fontWeight:700, cursor:"pointer" }}>✔ Verified</button>
                        </div>
                      </div>

                      {/* Working hours only — no charge */}
                      {provider.workingHours && (
                        <div style={{ marginBottom:"6px" }}>
                          <span style={{ fontSize:"11px", color:"#6B7280" }}>🕐 {provider.workingHours}</span>
                        </div>
                      )}

                      {/* About */}
                      {provider.about && (
                        <div style={{ fontSize:"11px", color:"#4B5563", lineHeight:"1.6", marginBottom:"7px", background:"#F8FAFC", borderRadius:"7px", padding:"6px 10px", borderLeft:"3px solid #CBD5E1" }}>
                          {provider.about}
                        </div>
                      )}

                      {/* Service tags + language tags */}
                      <div style={{ display:"flex", gap:"4px", flexWrap:"wrap", marginBottom:"10px" }}>
                        {(provider.servicesOffered||[]).map((s,i) => (
                          <span key={i} style={{ padding:"2px 8px", background:"#EFF6FF", color:"#1D4ED8", borderRadius:"20px", fontSize:"9px", fontWeight:600, border:"1px solid #BFDBFE" }}>{s}</span>
                        ))}
                        {(provider.languages||[]).map((l,i) => (
                          <span key={i} style={{ padding:"2px 8px", background:"#F5F3FF", color:"#6D28D9", borderRadius:"20px", fontSize:"9px", fontWeight:600, border:"1px solid #DDD6FE" }}>🗣 {l}</span>
                        ))}
                      </div>

                      {/* Action buttons */}
                      <div style={{ display:"flex", gap:"6px" }}>
                        <button onClick={() => setDescModalFor(provider.id)}
                          style={{ padding:"6px 12px", background:pst.description?"#EA6C00":"#F97316", color:"white", border:"none", borderRadius:"7px", fontWeight:600, fontSize:"11px", cursor:"pointer" }}>
                          📝 {pst.description?"Edit Description":"Add Description"}
                        </button>
                        <a href={buildWhatsAppLink(provider.phone, provider.name, state?.service, pst.description)}
                          target="_blank" rel="noreferrer" onClick={() => handleWaSent(provider.id)}
                          style={{ padding:"6px 12px", background:pst.waSent?"#16A34A":"#22C55E", color:"white", border:"none", borderRadius:"7px", fontWeight:600, fontSize:"11px", cursor:"pointer", textDecoration:"none", display:"inline-flex", alignItems:"center", gap:"4px" }}>
                        {pst.waSent?"WhatsApp Sent ✓":"Send WhatsApp"}
                        </a>
                      </div>
                    </div>

                    {/* DIVIDER */}
                    <div style={{ width:"1px", background:"#F1F5F9", flexShrink:0 }} />

                    {/* RIGHT: vertical workflow */}
                    <div style={{ padding:"10px 10px", flexShrink:0 }}>
                      <WorkflowBlock
                        step={step} isYes={isYes} isNo={isNo} pst={pst} providerId={provider.id}
                        onRespond={handleRespond}
                        onConfirm={() => handleConfirm(provider.id)}
                        onReview={() => setReviewProvider(provider)}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
        </div>

        {confirmedCount > 0 && (
          <div style={{ textAlign:"center", marginTop:"20px" }}>
            <button onClick={handleProceed} style={{ padding:"11px 40px", background:"#22C55E", color:"white", border:"none", borderRadius:"11px", fontWeight:700, fontSize:"14px", cursor:"pointer", boxShadow:"0 4px 14px rgba(34,197,94,0.32)" }}>
              Proceed with {confirmedCount} Confirmed Provider{confirmedCount>1?"s":""} →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProviderList;