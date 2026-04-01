import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/";

const getCurrentUser = () => {
  const user = sessionStorage.getItem("currentUser");
  return user ? JSON.parse(user) : null;
};

// ─── CHANGE 1: buildWhatsAppLink now includes YES/NO response links ────────────
// Added provider_id and user_id params so backend knows who responded.
// YES link: /api/respond/?provider=<id>&user=<user_id>&status=yes
// NO  link: /api/respond/?provider=<id>&user=<user_id>&status=no
function buildWhatsAppLink(phone, providerName, service, description, providerId, userId) {
  const clean = phone.replace(/\D/g, "");
  const baseUrl = "http://127.0.0.1:8000/api/respond/";

  const yesLink = `${baseUrl}?provider=${providerId}&user=${userId}&status=yes`;
  const noLink  = `${baseUrl}?provider=${providerId}&user=${userId}&status=no`;

const msg = encodeURIComponent(
`Hello ${providerName}! 👋

Service Request: *${service || "Service"}*

Problem:
${description || "Not provided"}

-------------------------

👉 CLICK HERE:

🟢 YES
${yesLink}

🔴 NO
${noLink}

-------------------------

Just tap YES or NO`
);

  return `https://wa.me/91${clean}?text=${msg}`;
}

function initials(n) { return n.split(" ").map((x) => x[0]).join("").slice(0, 2).toUpperCase(); }
function stars(r) { return "★".repeat(Math.round(r)) + "☆".repeat(5 - Math.round(r)); }

// ─── Select Provider Popup ────────────────────────────────────────────────────
function SelectProviderPopup({ providers, alreadySelected, onDone, onClose }) {
  const ref = useRef();
  const [selected, setSelected] = useState(new Set());
  useEffect(() => {
    const h = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);
  const toggle = (id) => setSelected(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  return (
    <div ref={ref} onClick={(e) => e.target === ref.current && onClose()}
      style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)", zIndex: 900, display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
      <div style={{ background: "white", borderRadius: "18px", width: "100%", maxWidth: "480px", maxHeight: "85vh", display: "flex", flexDirection: "column", boxShadow: "0 20px 50px rgba(0,0,0,0.22)" }}>
        <div style={{ padding: "16px 18px 12px", borderBottom: "1px solid #F3F4F6" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div style={{ fontWeight: 800, fontSize: "16px", color: "#1A3C6E" }}>👆 Select Providers</div>
              <div style={{ fontSize: "11px", color: "#6B7280", marginTop: "2px" }}>Tap the providers you want — {selected.size} selected</div>
            </div>
            <button onClick={onClose} style={{ width: "28px", height: "28px", borderRadius: "50%", border: "none", background: "#F3F4F6", cursor: "pointer", fontSize: "13px" }}>✕</button>
          </div>
        </div>
        <div style={{ overflowY: "auto", flex: 1, padding: "10px 14px", display: "flex", flexDirection: "column", gap: "7px" }}>
          {providers.map(p => {
            const checked = selected.has(p.id);
            return (
              <div key={p.id} onClick={() => toggle(p.id)}
                style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 12px", borderRadius: "10px", border: `2px solid ${checked ? "#1A3C6E" : "#E5E7EB"}`, background: checked ? "#EEF4FF" : "#F9FAFB", cursor: "pointer" }}>
                <div style={{ width: "19px", height: "19px", borderRadius: "5px", border: `2px solid ${checked ? "#1A3C6E" : "#CBD5E1"}`, background: checked ? "#1A3C6E" : "white", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {checked && <span style={{ color: "white", fontSize: "11px", fontWeight: 900, lineHeight: 1 }}>✓</span>}
                </div>
                <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "#1A3C6E", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 800, fontSize: "12px", flexShrink: 0 }}>{initials(p.name)}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: "13px", color: "#111827" }}>{p.name}</div>
                  <div style={{ fontSize: "10px", color: "#F97316", fontWeight: 700, textTransform: "uppercase" }}>{p.specialty}</div>
                  <div style={{ fontSize: "10px", color: "#6B7280", marginTop: "1px" }}>⭐ {p.rating} · 📍 {p.location}</div>
                </div>
                <span style={{ padding: "2px 6px", borderRadius: "20px", fontSize: "9px", fontWeight: 700, background: "#F0FDF4", color: "#059669", border: "1px solid #86EFAC", whiteSpace: "nowrap" }}>✔ Verified</span>
              </div>
            );
          })}
        </div>
        <div style={{ padding: "12px 14px 16px", borderTop: "1px solid #F3F4F6", display: "flex", gap: "8px" }}>
          <button onClick={onClose} style={{ flex: 1, padding: "10px", borderRadius: "9px", border: "1.5px solid #D1D5DB", background: "white", color: "#374151", fontWeight: 600, fontSize: "13px", cursor: "pointer" }}>Cancel</button>
          <button disabled={selected.size === 0} onClick={() => { onDone([...selected]); onClose(); }}
            style={{ flex: 2, padding: "10px", borderRadius: "9px", border: "none", background: selected.size > 0 ? "#1A3C6E" : "#E5E7EB", color: selected.size > 0 ? "white" : "#9CA3AF", fontWeight: 700, fontSize: "13px", cursor: selected.size > 0 ? "pointer" : "not-allowed" }}>
            {selected.size > 0 ? `✅ Confirm ${selected.size} Provider${selected.size > 1 ? "s" : ""}` : "Select at least one"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Description Popup ────────────────────────────────────────────────────────
function DescPopup({ provider, value, onChange, onSave, onSendAll, selectedProviders, service, onClose }) {
  const ref = useRef();
  useEffect(() => {
    const h = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  const handleSendAll = () => {
  if (!value.trim()) {
    alert("Please enter a description first.");
    return;
  }

  const userId = getCurrentUser()?.id;

  const link = buildWhatsAppLink(
    provider.phone,
    provider.name,
    service,
    value.trim(),
    provider.id,
    userId
  );

  window.open(link, "_blank", "noreferrer");

  onSendAll(value.trim());
};

  return (
    <div ref={ref} onClick={(e) => e.target === ref.current && onClose()}
      style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)", zIndex: 950, display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
      <div style={{ background: "white", borderRadius: "16px", width: "100%", maxWidth: "400px", padding: "20px", boxShadow: "0 16px 40px rgba(0,0,0,0.18)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
          <div>
            <div style={{ fontWeight: 800, fontSize: "15px", color: "#1A3C6E" }}>📝 Problem Description</div>
            <div style={{ fontSize: "11px", color: "#9CA3AF", marginTop: "1px" }}>For {provider.name}</div>
          </div>
          <button onClick={onClose} style={{ width: "28px", height: "28px", borderRadius: "50%", border: "none", background: "#F3F4F6", cursor: "pointer", fontSize: "13px" }}>✕</button>
        </div>
        <textarea value={value} onChange={(e) => onChange(e.target.value)}
          placeholder="e.g. AC not cooling, pipe leaking, need urgent repair..." autoFocus
          style={{ width: "100%", minHeight: "90px", border: "1.5px solid #FDBA74", borderRadius: "9px", padding: "9px 11px", fontSize: "13px", resize: "vertical", outline: "none", boxSizing: "border-box", fontFamily: "inherit", backgroundColor: "#FFFBEB" }} />
        <div style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
          <button onClick={onClose} style={{ flex: 1, padding: "11px", background: "white", color: "#6B7280", border: "1.5px solid #D1D5DB", borderRadius: "9px", fontWeight: 600, fontSize: "13px", cursor: "pointer" }}>Cancel</button>
          <button onClick={handleSendAll}
            style={{ flex: 2, padding: "11px", background: "#1A3C6E", color: "white", border: "none", borderRadius: "9px", fontWeight: 700, fontSize: "13px", cursor: "pointer" }}>
            💬 Save & Send WhatsApp to All
          </button>
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
      style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(5px)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
      <div style={{ background: "white", borderRadius: "20px", width: "100%", maxWidth: "440px", maxHeight: "90vh", overflowY: "auto", boxShadow: "0 24px 60px rgba(0,0,0,0.22)" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", padding: "20px 20px 0" }}>
          <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
            <div style={{ width: "50px", height: "50px", borderRadius: "12px", background: "#1A3C6E", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 800, fontSize: "18px", flexShrink: 0 }}>{initials(provider.name)}</div>
            <div>
              <div style={{ fontWeight: 800, fontSize: "17px", color: "#111827" }}>{provider.name}</div>
              <div style={{ color: "#F97316", fontWeight: 700, fontSize: "10px", textTransform: "uppercase", marginBottom: "4px" }}>{provider.specialty}</div>
              <span style={{ padding: "2px 8px", borderRadius: "20px", background: "#DCFCE7", color: "#166534", fontWeight: 700, fontSize: "10px", border: "1px solid #86EFAC" }}>✅ Available — Confirmed</span>
            </div>
          </div>
          <button onClick={onClose} style={{ width: "30px", height: "30px", borderRadius: "50%", border: "none", background: "#F3F4F6", cursor: "pointer", fontSize: "13px", flexShrink: 0 }}>✕</button>
        </div>
        <div style={{ padding: "14px 20px", display: "flex", flexDirection: "column", gap: "7px" }}>
          {[
            { icon: "📞", label: "Contact", value: `+91 ${provider.phone}`, action: <a href={`tel:+91${provider.phone}`} style={{ padding: "6px 10px", background: "#DCFCE7", color: "#166534", border: "1px solid #86EFAC", borderRadius: "7px", fontWeight: 700, fontSize: "11px", textDecoration: "none" }}>📲 Call</a> },
            { icon: "📍", label: "Location", value: provider.location },
            { icon: "📋", label: "Status", value: <span style={{ padding: "3px 8px", borderRadius: "20px", background: "#DCFCE7", color: "#166534", fontWeight: 700, fontSize: "11px", border: "1px solid #86EFAC" }}>✅ Confirmed & Available</span> },
            { icon: "⭐", label: "Rating", value: <span style={{ fontWeight: 700, color: "#1A3C6E", fontSize: "13px" }}>{provider.rating}/5.0 <span style={{ color: "#F59E0B" }}>{stars(provider.rating)}</span> <span style={{ color: "#9CA3AF", fontSize: "10px" }}>({provider.reviews})</span></span> },
          ].map(({ icon, label, value, action }) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 12px", background: "#F8FAFC", borderRadius: "10px", border: "1.5px solid #E5E7EB" }}>
              <span style={{ fontSize: "18px", flexShrink: 0 }}>{icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "9px", color: "#9CA3AF", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.4px", marginBottom: "2px" }}>{label}</div>
                <div style={{ fontSize: "12px", color: "#111827" }}>{value}</div>
              </div>
              {action}
            </div>
          ))}
        </div>
        <div style={{ margin: "0 20px 14px", padding: "9px 12px", background: "#F0FDF4", borderRadius: "9px", color: "#166534", fontWeight: 700, fontSize: "11px" }}>✔ Identity Verified by ServeEasySolapur Admin</div>
        <div style={{ display: "flex", gap: "8px", padding: "0 20px 20px" }}>
          <button onClick={handleShare} style={{ flex: 1, padding: "10px", borderRadius: "10px", border: "none", background: "#1A3C6E", color: "white", fontWeight: 700, fontSize: "12px", cursor: "pointer" }}>{copied ? "✓ Copied!" : "🔗 Share Provider"}</button>
          <button onClick={onBook} style={{ flex: 2, padding: "10px", borderRadius: "10px", border: "none", background: "#22C55E", color: "white", fontWeight: 700, fontSize: "13px", cursor: "pointer", boxShadow: "0 3px 10px rgba(34,197,94,0.3)" }}>✅ Book Now →</button>
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
      style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)", zIndex: 1100, display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
      <div style={{ background: "white", borderRadius: "16px", width: "100%", maxWidth: "500px", maxHeight: "88vh", overflowY: "auto", boxShadow: "0 20px 50px rgba(0,0,0,0.22)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 18px 12px", borderBottom: "1px solid #F3F4F6" }}>
          <div>
            <div style={{ fontWeight: 800, fontSize: "15px", color: "#1A3C6E" }}>📄 Verification Documents</div>
            <div style={{ fontSize: "11px", color: "#9CA3AF", marginTop: "1px" }}>{provider.name}</div>
          </div>
          <button onClick={onClose} style={{ width: "28px", height: "28px", borderRadius: "50%", border: "none", background: "#F3F4F6", cursor: "pointer", fontSize: "12px" }}>✕</button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", padding: "14px 18px" }}>
          {[{ label: "🪪 Aadhaar Card", file: docs.aadhar }, { label: "📸 Photo / Certificate", file: docs.photo }].map(({ label, file }) => (
            <div key={label} style={{ border: "1.5px solid #E5E7EB", borderRadius: "10px", overflow: "hidden" }}>
              <div style={{ padding: "7px 10px", background: "#F8FAFC", borderBottom: "1px solid #E5E7EB", fontWeight: 700, fontSize: "11px", color: "#1A3C6E" }}>{label}</div>
              {file ? <div style={{ padding: "7px" }}>{file.endsWith(".pdf") ? <iframe src={file} title={label} style={{ width: "100%", height: "140px", border: "none" }} /> : <img src={file} alt={label} style={{ width: "100%", height: "120px", objectFit: "cover", borderRadius: "5px" }} />}<a href={file} target="_blank" rel="noreferrer" style={{ display: "block", marginTop: "4px", color: "#1A3C6E", fontSize: "10px", fontWeight: 600, textDecoration: "none" }}>🔗 Open full</a></div>
                : <div style={{ padding: "24px 10px", textAlign: "center", color: "#9CA3AF", fontSize: "11px" }}>Not uploaded yet</div>}
            </div>
          ))}
        </div>
        <div style={{ padding: "10px 18px 16px", background: "#F0FDF4", borderTop: "1px solid #DCFCE7", color: "#166534", fontWeight: 700, fontSize: "11px" }}>✔ Identity Verified by ServeEasySolapur Admin</div>
      </div>
    </div>
  );
}

// ─── CHANGE 2: RespondDropdown — Read-Only, no click handlers ─────────────────
// Removed: onClick, onRespond calls, open/close state, dropdown menu.
// Now shows a static status badge based on the availability value from backend.
// All updates come exclusively from backend polling — no manual interaction.
function RespondDropdown({ isYes, isNo }) {
  const bg    = isYes ? "#DCFCE7" : isNo ? "#FEE2E2" : "#F3F4F6";
  const color = isYes ? "#166534" : isNo ? "#991B1B" : "#6B7280";
  const bdr   = isYes ? "#86EFAC" : isNo ? "#FECACA" : "#E5E7EB";
  const label = isYes ? "✅ Yes — Available" : isNo ? "❌ No — Unavailable" : "⏳ Waiting for reply...";

  return (
    <div style={{
      width: "100%",
      padding: "3px 5px",
      borderRadius: "4px",
      border: `1px solid ${bdr}`,
      background: bg,
      color,
      fontWeight: 700,
      fontSize: "8px",
      textAlign: "center",
      userSelect: "none",
      // Read-only: no cursor pointer, no hover effect
      cursor: "default",
    }}>
      {label}
    </div>
  );
}

// ─── Workflow Block ───────────────────────────────────────────────────────────
const STEP_META = [
  { label: "Connect", color: "#3B82F6", bg: "#EFF6FF" },
  { label: "Responded", color: "#F59E0B", bg: "#FFFBEB" },
  { label: "Confirm", color: "#7C3AED", bg: "#F5F3FF" },
  { label: "Review", color: "#22C55E", bg: "#F0FDF4" },
];
// ─── CHANGE 5: WorkflowBlock — Step 2 depends only on pst.availability (from backend) ───
// onRespond prop removed — RespondDropdown is now read-only.
function WorkflowBlock({ step, isYes, isNo, pst, providerId, onConfirm, onReview }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2px", width: "110px", flexShrink: 0 }}>
      {STEP_META.map((s, i) => {
        const done = i < step;
        const active = i === step;
        const locked = (i === 1 && !pst.waSent) || (i === 2 && !isYes && !pst.confirmed) || (i === 3 && !pst.confirmed);
        return (
          <div key={s.label} style={{
            border: `1px solid ${done ? "#22C55E" : active ? s.color : "#E5E7EB"}`,
            borderRadius: "5px",
            background: done ? "#F0FDF4" : active ? s.bg : "#FAFAFA",
            padding: "3px 5px",
            opacity: locked ? 0.45 : 1,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "3px", marginBottom: i === 0 ? "0" : "2px" }}>
              <div style={{ width: "11px", height: "11px", borderRadius: "50%", flexShrink: 0, background: done ? "#22C55E" : active ? s.color : "#CBD5E1", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "6px", fontWeight: 900, color: done || active ? "white" : "#9CA3AF" }}>{done ? "✓" : i + 1}</div>
              <span style={{ fontSize: "7px", fontWeight: 800, textTransform: "uppercase", color: done ? "#22C55E" : active ? s.color : "#9CA3AF" }}>{s.label}</span>
            </div>
            {/* Step 0: Connect — shows WA sent status */}
            {i === 0 && <div style={{ fontSize: "8px", color: pst.waSent ? "#16A34A" : "#9CA3AF", paddingLeft: "14px", lineHeight: 1.2 }}>{pst.waSent ? "✓ Sent" : "Send WA first"}</div>}
            {/* Step 1: Responded — READ-ONLY, auto-updated by polling */}
            {i === 1 && <RespondDropdown isYes={isYes} isNo={isNo} />}
            {/* Step 2: Confirm */}
            {i === 2 && <button disabled={!isYes || pst.confirmed} onClick={onConfirm} style={{ width: "100%", padding: "2px 0", borderRadius: "3px", border: `1px solid ${pst.confirmed ? "#86EFAC" : isYes ? "#7C3AED" : "#E5E7EB"}`, background: pst.confirmed ? "#DCFCE7" : isYes ? "#7C3AED" : "#F3F4F6", color: pst.confirmed ? "#166534" : isYes ? "white" : "#9CA3AF", fontWeight: 700, fontSize: "8px", cursor: isYes && !pst.confirmed ? "pointer" : "not-allowed" }}>{pst.confirmed ? "✓ Done" : isYes ? "Confirm" : "Wait YES"}</button>}
            {/* Step 3: Review/Book */}
            {i === 3 && <button disabled={!pst.confirmed} onClick={onReview} style={{ width: "100%", padding: "2px 0", borderRadius: "3px", border: `1px solid ${pst.confirmed ? "#22C55E" : "#E5E7EB"}`, background: pst.confirmed ? "#22C55E" : "#F3F4F6", color: pst.confirmed ? "white" : "#9CA3AF", fontWeight: 700, fontSize: "8px", cursor: pst.confirmed ? "pointer" : "not-allowed" }}>{pst.confirmed ? "⭐ Book" : "First"}</button>}
          </div>
        );
      })}
    </div>
  );
}

// ─── Select All Desc Modal ────────────────────────────────────────────────────
function SelectAllDescModal({ providers, service, onSend, onClose }) {
  const [desc, setDesc] = useState("");
  const ref = useRef();
  useEffect(() => {
    const h = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  const handleSend = () => {
    if (!desc.trim()) { alert("Please enter a problem description."); return; }
    const description = desc.trim();
    providers.forEach((p, i) => {
      setTimeout(() => {
        const a = document.createElement("a");
        const userId = getCurrentUser()?.id;

a.href = buildWhatsAppLink(
  p.phone,
  p.name,
  service,
  description,
  p.id,
  userId
);
        a.target = "_blank";
        a.rel = "noreferrer";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }, i * 800);
    });
    setTimeout(() => onSend(description), providers.length * 800 + 300);
  };

  return (
    <div ref={ref} onClick={(e) => e.target === ref.current && onClose()}
      style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)", zIndex: 1100, display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
      <div style={{ background: "white", borderRadius: "18px", width: "100%", maxWidth: "420px", boxShadow: "0 24px 60px rgba(0,0,0,0.25)" }}>
        <div style={{ padding: "20px 20px 14px", borderBottom: "1px solid #F3F4F6" }}>
          <div style={{ fontWeight: 800, fontSize: "16px", color: "#1A3C6E", marginBottom: "4px" }}>📝 Describe Your Problem</div>
          <div style={{ fontSize: "12px", color: "#6B7280", marginBottom: "10px" }}>
            WhatsApp will be sent to all <strong>{providers.length} providers</strong>
          </div>
          <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
            {providers.map(p => (
              <span key={p.id} style={{ padding: "2px 8px", background: "#EEF4FF", color: "#1A3C6E", borderRadius: "20px", fontSize: "10px", fontWeight: 600, border: "1px solid #BFDBFE" }}>{p.name}</span>
            ))}
          </div>
        </div>
        <div style={{ padding: "16px 20px" }}>
          <textarea value={desc} onChange={e => setDesc(e.target.value)}
            placeholder="e.g. AC not cooling, pipe is leaking, need urgent repair..."
            autoFocus
            style={{ width: "100%", minHeight: "110px", border: "1.5px solid #FDBA74", borderRadius: "9px", padding: "10px 12px", fontSize: "13px", resize: "vertical", outline: "none", boxSizing: "border-box", fontFamily: "inherit", backgroundColor: "#FFFBEB" }}
          />
          <div style={{ fontSize: "11px", color: "#9CA3AF", marginTop: "5px" }}>💡 Allow pop-ups in browser if asked</div>
        </div>
        <div style={{ padding: "0 20px 20px", display: "flex", gap: "8px" }}>
          <button onClick={onClose} style={{ flex: 1, padding: "12px", borderRadius: "10px", border: "1.5px solid #D1D5DB", background: "white", color: "#374151", fontWeight: 600, fontSize: "13px", cursor: "pointer" }}>Cancel</button>
          <button onClick={handleSend} style={{ flex: 2, padding: "12px", borderRadius: "10px", border: "none", background: "#1A3C6E", color: "white", fontWeight: 800, fontSize: "14px", cursor: "pointer" }}>
            💬 Send WhatsApp to All →
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export function ProviderList() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  const serviceId = state?.serviceId;

  const [allProviders, setAllProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ps, setPs] = useState({});
  const [chosenIds, setChosenIds] = useState([]);
  const [reviewProvider, setReviewProvider] = useState(null);
  const [docProvider, setDocProvider] = useState(null);
  const [descModalFor, setDescModalFor] = useState(null);
  const [selectPopupOpen, setSelectPopupOpen] = useState(false);
  const [selectAllModal, setSelectAllModal] = useState(false);

  // Fetch providers on mount
  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const res = await axios.get(`${API_URL}providers/`);
        const data = Array.isArray(res.data) ? res.data : [res.data];
        setAllProviders(data);

        const s = {};
        data.forEach((p) => {
          s[p.id] = {
            waSent: false,
            availability: null,
            confirmed: false,
            reviewed: false,
            description: ""
          };
        });
        setPs(s);
      } catch (err) {
        console.error("Failed to fetch providers:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProviders();
  }, [state?.description]);

  // ─── Polling — auto-sync availability from backend every 5 seconds ──────────
  // KEY RULE: availability is applied ONLY when waSent === true in this session.
  // If WhatsApp has NOT been sent yet (waSent=false), we ignore whatever value
  // is in the database — it belongs to a previous session and must not bleed in.
  // This guarantees a fresh null state until the user sends a new WhatsApp request.
  useEffect(() => {
    if (!currentUser) return;

    const poll = async () => {
      try {
        const res = await axios.get(`${API_URL}provider-status/`, {
          params: { user_id: currentUser.id }
        });
        const items = Array.isArray(res.data) ? res.data : [];

        setPs(prev => {
          const updated = { ...prev };
          items.forEach(item => {
            const id = item.provider_id ?? item.provider ?? item.id;
            if (!id || !updated[id]) return;

            // ── Guard: skip if WhatsApp has NOT been sent this session ──────
            // Old database values (from previous sessions) are ignored entirely.
            // Only after the user sends WhatsApp in THIS session do we trust
            // the backend availability value.
            if (!updated[id].waSent) return;

            const backendAvailability = item.availability ?? null;
            if (updated[id].availability !== backendAvailability) {
              updated[id] = {
                ...updated[id],
                availability: backendAvailability,
              };
            }
          });
          return updated;
        });
      } catch (err) {
        console.error("Polling failed:", err);
      }
    };

    // Poll immediately, then every 5 seconds
    poll();
    const interval = setInterval(poll, 5000);
    return () => clearInterval(interval);          // Cleanup on unmount
  }, [currentUser?.id, allProviders.length]);
  // ─────────────────────────────────────────────────────────────────────────────

  const upd = (id, patch) => setPs((prev) => ({ ...prev, [id]: { ...prev[id], ...patch } }));

  const selectedAddress = sessionStorage.getItem("selectedAddress") || state?.address || "";

  const getStep = (id) => {
    const p = ps[id];
    if (!p) return 0;
    if (p.reviewed || p.confirmed) return 3;
    if (p.availability === "yes") return 2;
    if (p.waSent) return 1;
    return 0;
  };

  const shownProviders =
    chosenIds.length > 0
      ? allProviders.filter((p) => chosenIds.includes(p.id))
      : allProviders;

  const confirmedCount = shownProviders.filter(p => ps[p.id]?.confirmed).length;

 const handleWaSent = async (id, customDesc = null) => {
  const description = customDesc || ps[id]?.description || "";

  // 🔥 RESET availability (THIS FIXES YOUR BUG)
  upd(id, {
    waSent: true,
    availability: null,   // ✅ IMPORTANT
    description
  });

  if (!currentUser) return;

  try {
    await axios.patch(`${API_URL}provider-status/${id}/wa-sent/`, {
      user_id: currentUser.id,
      description: description,
    });
  } catch (err) {
    console.error(err);
  }
};

  // ─── CHANGE 3: handleRespond removed ─────────────────────────────────────────
  // No PATCH /response/ call anymore.
  // Availability updates come exclusively from backend /respond/ via polling.
  // ─────────────────────────────────────────────────────────────────────────────

  const handleConfirm = async (id) => {
    upd(id, { confirmed: true, reviewed: false });
    setReviewProvider(allProviders.find((p) => p.id === id));

    if (!currentUser) return;
    try {
      await axios.patch(`${API_URL}provider-status/${id}/confirm/`, {
        user_id: currentUser.id,
        confirmed: true,
      });
    } catch (err) {
      console.error("Failed to confirm provider:", err);
    }
  };

  const handleCloseReview = (id) => { setReviewProvider(null); if (id) upd(id, { reviewed: true }); };

  const handleProceed = async () => {
    const confirmedProviders = shownProviders.filter(p => ps[p.id]?.confirmed);
    if (!confirmedProviders.length) return;
    const chosenNames = confirmedProviders.map(p => p.name);
    const finalDesc = confirmedProviders.map(p => ps[p.id]?.description?.trim()).filter(Boolean).join(" | ") || state?.description || "";

    const bookingData = {
      service: state?.service || "General Service",
      address: selectedAddress,
      description: finalDesc,
      date: state?.date || new Date().toLocaleDateString(),
      time: state?.time || "ASAP",
      amount: state?.amount || "₹499",
      providers: chosenNames
    };

    if (!currentUser) {
      sessionStorage.setItem("pendingProviderSelection", JSON.stringify(bookingData));
      window.dispatchEvent(new CustomEvent("openAuth", { detail: { mode: "login" } }));
      return;
    }

    try {
      await axios.post(API_URL + 'bookings/create/', {
        user: currentUser.id,
        ...bookingData,
        status: "requested"
      });
    } catch (err) {
      console.warn("Booking creation failed (backend model maybe missing?)");
    }

    navigate("/booking-request", { state: { ...state, providers: chosenNames, description: finalDesc, time: state?.time || "ASAP", bookingId: `BK${Date.now().toString().slice(-6)}` } });
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#F0F4F8", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>

      {/* Modals */}
      {selectPopupOpen && (
        <SelectProviderPopup providers={allProviders} alreadySelected={chosenIds}
          onDone={(ids) => {
            setChosenIds(ids);
            setPs(prev => { const u = { ...prev }; ids.forEach(id => { if (!u[id]) u[id] = { waSent: false, availability: null, confirmed: false, reviewed: false, description: state?.description || "" }; }); return u; });
            const selected = allProviders.filter(p => ids.includes(p.id));
            setSelectAllModal(selected);
          }}
          onClose={() => setSelectPopupOpen(false)} />
      )}
      {descModalFor && (() => {
        const prov = allProviders.find(p => p.id === descModalFor);
        return prov ? <DescPopup
          provider={prov}
          value={ps[descModalFor]?.description || ""}
          onChange={(v) => upd(descModalFor, { description: v })}
          selectedProviders={[prov]}
          service={state?.service}
          onSave={() => { if (!ps[descModalFor]?.description?.trim()) { alert("Please enter a description."); return; } setDescModalFor(null); }}
          onSendAll={(desc) => {
            handleWaSent(prov.id, desc);
            setDescModalFor(null);
          }}
          onClose={() => setDescModalFor(null)} /> : null;
      })()}
      {docProvider && <DocModal provider={docProvider} onClose={() => setDocProvider(null)} />}
      {selectAllModal && (
        <SelectAllDescModal
          providers={Array.isArray(selectAllModal) ? selectAllModal : allProviders}
          service={state?.service}
          onSend={(desc) => {
            const targets = Array.isArray(selectAllModal) ? selectAllModal : allProviders;
            targets.forEach(p => handleWaSent(p.id, desc));
            setSelectAllModal(false);
          }}
          onClose={() => setSelectAllModal(false)}
        />
      )}
      {reviewProvider && (
        <ReviewModal provider={reviewProvider}
          onClose={() => handleCloseReview(reviewProvider.id)}
          onBook={() => {
            handleCloseReview(reviewProvider.id);
            const p = reviewProvider;
            const desc = ps[p.id]?.description?.trim() || state?.description || "";
            const bookingData = { service: state?.service || "General Service", address: selectedAddress, description: desc, date: state?.date || new Date().toLocaleDateString(), time: state?.time || "ASAP", providers: [p.name], bookingId: `BK${Date.now().toString().slice(-6)}` };
            if (!currentUser) {
              sessionStorage.setItem("pendingProviderSelection", JSON.stringify(bookingData));
              window.dispatchEvent(new CustomEvent("openAuth", { detail: { mode: "login" } }));
              return;
            }
            navigate("/booking-request", { state: { ...state, ...bookingData } });
          }} />
      )}

      <nav style={{ backgroundColor: "white", borderBottom: "1px solid #E5E7EB", height: "50px", display: "flex", alignItems: "center", padding: "0 20px", position: "sticky", top: 0, zIndex: 100, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ width: "30px", height: "30px", borderRadius: "50%", backgroundColor: "#1A3C6E", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px" }}>🏠</div>
          <span style={{ fontSize: "15px", fontWeight: 800, color: "#1A3C6E" }}>ServeEasy<span style={{ color: "#F97316" }}>Solapur</span></span>
        </div>
      </nav>

      <div style={{ maxWidth: "940px", margin: "0 auto", padding: "14px 12px 60px" }}>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px", flexWrap: "wrap", gap: "8px" }}>
          <div>
            <h1 style={{ fontSize: "20px", fontWeight: 800, color: "#1A3C6E", margin: 0 }}>Select Professionals</h1>
            <p style={{ color: "#6B7280", fontSize: "12px", marginTop: "2px" }}>Connect with verified experts in Solapur</p>
          </div>
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <button onClick={() => setSelectPopupOpen(true)}
              style={{ padding: "8px 14px", borderRadius: "9px", border: "2px solid #1A3C6E", fontWeight: 700, fontSize: "12px", cursor: "pointer", background: chosenIds.length > 0 ? "#1A3C6E" : "white", color: chosenIds.length > 0 ? "white" : "#1A3C6E" }}>
              👆 {chosenIds.length > 0 ? `Showing ${chosenIds.length} Provider${chosenIds.length > 1 ? "s" : ""} ✏️` : "Select Provider"}
            </button>
            <button onClick={() => setSelectAllModal(allProviders)}
              style={{ padding: "8px 14px", borderRadius: "9px", border: "2px solid #1A3C6E", fontWeight: 700, fontSize: "12px", cursor: "pointer", background: "white", color: "#1A3C6E" }}>
              👥 Select All Service Providers
            </button>
          </div>
        </div>

        {!currentUser && (
          <div style={{ background: "#FFFBEB", border: "1px solid #FDE68A", borderRadius: "7px", padding: "7px 11px", marginBottom: "9px", color: "#92400E", fontSize: "11px" }}>
            ⚠️ You can proceed without login. Sign-in will be asked on the next step.
          </div>
        )}

        {confirmedCount > 0 && (
          <div style={{ background: "#F0FDF4", border: "1.5px solid #86EFAC", borderRadius: "8px", padding: "8px 13px", marginBottom: "9px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "7px" }}>
            <span style={{ color: "#166534", fontWeight: 600, fontSize: "12px" }}>✅ {confirmedCount} provider{confirmedCount > 1 ? "s" : ""} confirmed</span>
            <button onClick={handleProceed} style={{ padding: "6px 14px", background: "#22C55E", color: "white", border: "none", borderRadius: "7px", fontWeight: 700, fontSize: "12px", cursor: "pointer" }}>Proceed to Booking →</button>
          </div>
        )}

        {shownProviders.length === 0 ? (
          <p style={{ textAlign: "center", color: "#9CA3AF", fontSize: "14px", marginTop: "40px" }}>
            No providers found. Please try again later.
          </p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
            {shownProviders.map((provider) => {
              const pst = ps[provider.id];
              if (!pst) return null;
              const isYes = pst.availability === "yes";
              const isNo = pst.availability === "no";
              const step = getStep(provider.id);
              const bc = pst.confirmed ? "#22C55E" : isYes ? "#6D28D9" : isNo ? "#EF4444" : pst.waSent ? "#F59E0B" : "#E2E8F0";
              return (
                <div key={provider.id} style={{ background: "white", borderRadius: "9px", border: `2px solid ${bc}`, boxShadow: "0 1px 3px rgba(0,0,0,0.05)", opacity: isNo ? 0.76 : 1, transition: "border-color 0.2s", overflow: "hidden" }}>
                  {isYes && !pst.confirmed && <div style={{ padding: "3px 10px", background: "#EDE9FE", fontSize: "10px", fontWeight: 700, color: "#5B21B6" }}>✅ {provider.name} is Available — Confirm now!</div>}
                  {isNo && <div style={{ padding: "3px 10px", background: "#FEE2E2", fontSize: "10px", fontWeight: 700, color: "#991B1B" }}>❌ {provider.name} is Not Available</div>}
                  {pst.confirmed && <div style={{ padding: "3px 10px", background: "#DCFCE7", fontSize: "10px", fontWeight: 700, color: "#166534" }}>🎉 Confirmed for Booking!</div>}
                  <div style={{ display: "flex", alignItems: "stretch" }}>
                    <div style={{ flex: 1, padding: "12px 14px", minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                        <div style={{ position: "relative", flexShrink: 0 }}>
                          <div style={{ width: "42px", height: "42px", borderRadius: "10px", background: "#1A3C6E", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 800, fontSize: "14px" }}>{initials(provider.name)}</div>
                          <div style={{ position: "absolute", bottom: "1px", right: "1px", width: "9px", height: "9px", borderRadius: "50%", border: "2px solid white", background: pst.confirmed ? "#22C55E" : isYes ? "#7C3AED" : isNo ? "#EF4444" : pst.waSent ? "#F59E0B" : "#94A3B8" }} />
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "5px", flexWrap: "wrap" }}>
                            <span style={{ fontWeight: 800, fontSize: "14px", color: "#111827" }}>{provider.name}</span>
                            {pst.confirmed && <span style={{ padding: "1px 6px", borderRadius: "20px", fontSize: "9px", fontWeight: 700, background: "#DCFCE7", color: "#166534", border: "1px solid #86EFAC" }}>🎉 Confirmed</span>}
                            {!pst.confirmed && isYes && <span style={{ padding: "1px 6px", borderRadius: "20px", fontSize: "9px", fontWeight: 700, background: "#EDE9FE", color: "#5B21B6", border: "1px solid #C4B5FD" }}>✅ Available</span>}
                          </div>
                          <div style={{ display: "flex", gap: "5px", flexWrap: "wrap", alignItems: "center", marginTop: "2px" }}>
                            <span style={{ color: "#F97316", fontWeight: 700, fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.4px" }}>{provider.specialty}</span>
                            <span style={{ color: "#D1D5DB" }}>·</span>
                            <span style={{ fontSize: "10px", color: "#6B7280" }}>⭐ {provider.rating} ({provider.reviews})</span>
                            <span style={{ color: "#D1D5DB" }}>·</span>
                            <span style={{ fontSize: "10px", color: "#6B7280" }}>💼 {provider.experience}</span>
                            <span style={{ color: "#D1D5DB" }}>·</span>
                            <span style={{ fontSize: "10px", color: "#6B7280" }}>📍 {provider.location}</span>
                          </div>
                        </div>
                        <div style={{ display: "flex", gap: "5px", alignItems: "center", flexShrink: 0 }}>
                          <span style={{ padding: "2px 7px", background: "#F8FAFC", border: "1px solid #E5E7EB", borderRadius: "5px", fontSize: "10px", color: "#374151" }}>📞 {provider.phone}</span>
                          <button onClick={() => setDocProvider(provider)} style={{ padding: "2px 7px", background: "#F0FDF4", color: "#059669", border: "1px solid #86EFAC", borderRadius: "20px", fontSize: "10px", fontWeight: 700, cursor: "pointer" }}>✔ Verified</button>
                        </div>
                      </div>

                      <div style={{ display: "flex", gap: "6px" }}>
                        <button
                          onClick={() => setDescModalFor(provider.id)}
                          style={{ padding: "6px 12px", background: pst.description ? "#EA6C00" : "#F97316", color: "white", border: "none", borderRadius: "7px", fontWeight: 600, fontSize: "11px", cursor: "pointer" }}>
                          📝 {pst.description ? "Edit Description" : "Add Description"}
                        </button>
                        {/* CHANGE 1 applied here: pass providerId + userId to buildWhatsAppLink */}
                        <button
                          onClick={() => {
                            if (!pst.description?.trim()) {
                              alert("Please add description first");
                              return;
                            }
                            const userId = currentUser?.id ?? "guest";
                            window.open(
                              buildWhatsAppLink(
                                provider.phone,
                                provider.name,
                                state?.service,
                                pst.description,
                                provider.id,   // providerId for YES/NO response links
                                userId         // userId for YES/NO response links
                              ),
                              "_blank",
                              "noreferrer"
                            );
                            handleWaSent(provider.id);
                          }}
                          style={{ padding: "6px 12px", background: pst.waSent ? "#16A34A" : "#22C55E", color: "white", border: "none", borderRadius: "7px", fontWeight: 600, fontSize: "11px", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                          💬 {pst.waSent ? "WhatsApp Sent ✓" : "Send WhatsApp"}
                        </button>
                      </div>
                    </div>
                    <div style={{ width: "1px", background: "#F1F5F9", flexShrink: 0 }} />
                    <div style={{ padding: "6px 6px", flexShrink: 0 }}>
                      {/* CHANGE 3: onRespond prop removed — WorkflowBlock no longer needs it */}
                      <WorkflowBlock
                        step={step}
                        isYes={isYes}
                        isNo={isNo}
                        pst={pst}
                        providerId={provider.id}
                        onConfirm={() => handleConfirm(provider.id)}
                        onReview={() => setReviewProvider(provider)}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {confirmedCount > 0 && (
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <button onClick={handleProceed} style={{ padding: "11px 40px", background: "#22C55E", color: "white", border: "none", borderRadius: "11px", fontWeight: 700, fontSize: "14px", cursor: "pointer", boxShadow: "0 4px 14px rgba(34,197,94,0.32)" }}>
              Proceed with {confirmedCount} Confirmed Provider{confirmedCount > 1 ? "s" : ""} →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProviderList;