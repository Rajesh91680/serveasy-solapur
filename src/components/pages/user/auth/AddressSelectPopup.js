import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/";

// ─── Address Select Popup ─────────────────────────────────────────────────────
// Show after login — user selects or adds an address before proceeding
function AddressSelectPopup({ user, onConfirm, onSkip }) {
  const overlayRef = useRef();
  const [addresses, setAddresses] = useState([]);
  const [selected, setSelected] = useState(null);
  const [adding, setAdding] = useState(false);

  // Pre-fill form with user's registered address if available
  const [newAddr, setNewAddr] = useState({
    title: "Home",
    line1: user?.address_line || "",
    line2: "",
    city:  user?.city || "Solapur",
    area:  user?.area || "",
    pinCode: user?.pin_code || "",
  });
  const [saving, setSaving] = useState(false);

  // ─── Default address quick-fill ───────────────────────────────────────────
  const fillDefault = () => {
    setNewAddr({
      title:   "Home",
      line1:   user?.address_line || "Solapur",
      line2:   "",
      city:    user?.city || "Solapur",
      area:    user?.area || "Jule Solapur",
      pinCode: user?.pin_code || "413001",
    });
  };

  // ─── Fetch saved addresses from backend ───────────────────────────────────
  useEffect(() => {
    const fetchAddresses = async () => {
      if (!user?.id) return;
      try {
        const res = await axios.get(`${API_URL}addresses/user/${user.id}/`);
        const data = Array.isArray(res.data) ? res.data : [];
        setAddresses(data);

        if (data.length > 0) {
          const def = data.find((a) => a.is_default);
          setSelected(def ? def.id : data[0].id);
          setAdding(false);
        } else {
          setAdding(true); // no addresses → show form immediately
        }
      } catch (err) {
        console.error("Failed to fetch addresses:", err);
        setAdding(true);
      }
    };
    fetchAddresses();
  }, [user?.id]);

  // Escape key to skip
  useEffect(() => {
    const h = (e) => { if (e.key === "Escape") onSkip(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onSkip]);

  const selectedAddr = addresses.find((a) => a.id === selected);

  const canConfirm = adding
    ? newAddr.line1.trim().length > 0 && newAddr.pinCode.trim().length === 6
    : !!selectedAddr;

  const typeIcon = (t) => {
    const s = (t || "").toLowerCase();
    return s === "home" ? "🏠" : s === "office" ? "🏢" : "📍";
  };

  const handleConfirm = async () => {
    if (!canConfirm) return;
    setSaving(true);

    try {
      if (adding) {
        // POST new address to backend
        const res = await axios.post(`${API_URL}addresses/create/`, {
          user: user.id,
          address_type: newAddr.title.toLowerCase(),
          address_line1: newAddr.line1.trim(),
          address_line2: newAddr.line2.trim(),
          city: newAddr.city.trim() || "Solapur",
          area: newAddr.area.trim(),
          pincode: newAddr.pinCode.trim(),
          is_default: addresses.length === 0, // first address → set as default
        });

        const a = res.data;
        const addressLine = `${a.address_line1}${a.address_line2 ? ", " + a.address_line2 : ""}, ${a.area ? a.area + ", " : ""}${a.city} - ${a.pincode}`;
        onConfirm(addressLine);
      } else {
        const a = selectedAddr;
        const addressLine = `${a.address_line1}${a.address_line2 ? ", " + a.address_line2 : ""}, ${a.area ? a.area + ", " : ""}${a.city} - ${a.pincode}`;
        onConfirm(addressLine);
      }
    } catch (err) {
      console.error("Failed to save address:", err);
      alert("Failed to save address. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      ref={overlayRef}
      onClick={(e) => { if (e.target === overlayRef.current) onSkip(); }}
      style={S.overlay}
    >
      <div style={S.modal}>

        {/* ── Header ── */}
        <div style={S.header}>
          <div style={S.headerLeft}>
            <div style={S.headerIcon}>📍</div>
            <div>
              <h2 style={S.title}>Select Service Address</h2>
              <p style={S.sub}>Where should the professional come?</p>
            </div>
          </div>
          <button onClick={onSkip} style={S.closeBtn}>✕</button>
        </div>

        <div style={S.body}>

          {/* ── Saved addresses ── */}
          {addresses.length > 0 && (
            <div style={S.section}>
              <div style={S.sectionTitle}>📋 Saved Addresses</div>
              <div style={S.addrList}>
                {addresses.map((addr) => {
                  const isSel = selected === addr.id && !adding;
                  return (
                    <div
                      key={addr.id}
                      onClick={() => { setSelected(addr.id); setAdding(false); }}
                      style={{
                        ...S.addrCard,
                        borderColor:     isSel ? "#1A3C6E" : "#E5E7EB",
                        backgroundColor: isSel ? "#EEF4FF" : "white",
                        boxShadow:       isSel ? "0 0 0 3px rgba(26,60,110,0.12)" : "none",
                      }}
                    >
                      {/* Radio dot */}
                      <div style={S.radioOuter(isSel)}>
                        {isSel && <div style={S.radioInner} />}
                      </div>

                      {/* Info */}
                      <div style={{ flex: 1 }}>
                        <div style={S.addrType}>
                          {typeIcon(addr.address_type)}&nbsp;
                          <span style={{ textTransform: "uppercase" }}>{addr.address_type || "Other"}</span>
                          {addr.is_default && <span style={S.defaultBadge}> ★ Default</span>}
                        </div>
                        <div style={S.addrLine}>
                          {addr.address_line1}{addr.address_line2 ? `, ${addr.address_line2}` : ""}
                        </div>
                        <div style={S.addrCity}>
                          {addr.area ? `${addr.area}, ` : ""}{addr.city} — {addr.pincode}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── Add new address ── */}
          <div style={S.section}>
            {addresses.length > 0 && (
              <button
                onClick={() => { setAdding((p) => !p); if (!adding) setSelected(null); }}
                style={{
                  ...S.addNewBtn,
                  backgroundColor: adding ? "#EEF4FF" : "white",
                  borderColor:     adding ? "#1A3C6E" : "#D1D5DB",
                  color:           adding ? "#1A3C6E" : "#6B7280",
                  marginBottom:    adding ? "14px" : "0",
                }}
              >
                {adding ? "✕ Cancel" : "+ Add New Address"}
              </button>
            )}

            {(adding || addresses.length === 0) && (
              <div style={S.formBox}>

                {/* ── Default fill hint ── */}
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                <span style={{ fontSize: "11px", color: "#6B7280" }}>Quick fill:</span>
                <button
                  type="button"
                  onClick={fillDefault}
                  style={{ padding: "3px 10px", borderRadius: "8px", border: "1.5px solid #1A3C6E", background: "#EEF4FF", color: "#1A3C6E", fontWeight: 700, fontSize: "11px", cursor: "pointer" }}
                >
                  📍 Use My Registered Address
                </button>
              </div>

              {/* Type buttons */}
                <div style={S.formRow}>
                  <label style={S.label}>Address Type</label>
                  <div style={{ display: "flex", gap: "8px" }}>
                    {["Home", "Office", "Other"].map((t) => (
                      <button
                        key={t}
                        onClick={() => setNewAddr((p) => ({ ...p, title: t }))}
                        style={{
                          ...S.typeBtn,
                          backgroundColor: newAddr.title === t ? "#1A3C6E" : "white",
                          color:           newAddr.title === t ? "white"    : "#374151",
                          borderColor:     newAddr.title === t ? "#1A3C6E" : "#D1D5DB",
                        }}
                      >
                        {typeIcon(t)} {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Line 1 */}
                <div style={S.formRow}>
                  <label style={S.label}>Address Line 1 *</label>
                  <input
                    value={newAddr.line1}
                    onChange={(e) => setNewAddr((p) => ({ ...p, line1: e.target.value }))}
                    placeholder="House No, Street Name"
                    style={S.input}
                    autoFocus
                  />
                </div>

                {/* Line 2 */}
                <div style={S.formRow}>
                  <label style={S.label}>Line 2 (Optional)</label>
                  <input
                    value={newAddr.line2}
                    onChange={(e) => setNewAddr((p) => ({ ...p, line2: e.target.value }))}
                    placeholder="Landmark / Near by"
                    style={S.input}
                  />
                </div>

                {/* Area + City + Pincode */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px" }}>
                  <div style={S.formRow}>
                    <label style={S.label}>Area</label>
                    <input
                      value={newAddr.area}
                      onChange={(e) => setNewAddr((p) => ({ ...p, area: e.target.value }))}
                      placeholder="Vijapur Road"
                      style={S.input}
                    />
                  </div>
                  <div style={S.formRow}>
                    <label style={S.label}>City</label>
                    <input
                      value={newAddr.city}
                      onChange={(e) => setNewAddr((p) => ({ ...p, city: e.target.value }))}
                      placeholder="Solapur"
                      style={S.input}
                    />
                  </div>
                  <div style={S.formRow}>
                    <label style={S.label}>Pincode *</label>
                    <input
                      value={newAddr.pinCode}
                      onChange={(e) => setNewAddr((p) => ({ ...p, pinCode: e.target.value.replace(/\D/g, "") }))}
                      placeholder="413001"
                      style={S.input}
                      maxLength={6}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── Footer ── */}
        <div style={S.footer}>
          <button onClick={onSkip} style={S.skipBtn}>
            Skip for now
          </button>
          <button
            onClick={handleConfirm}
            disabled={!canConfirm || saving}
            style={{
              ...S.confirmBtn,
              opacity: canConfirm ? 1 : 0.45,
              cursor:  canConfirm ? "pointer" : "not-allowed",
            }}
          >
            {saving ? "Saving..." : "✅ Confirm Address →"}
          </button>
        </div>

      </div>
    </div>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const S = {
  overlay:      { position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(5px)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" },
  modal:        { backgroundColor: "white", borderRadius: "24px", width: "100%", maxWidth: "500px", maxHeight: "92vh", overflowY: "auto", boxShadow: "0 28px 70px rgba(0,0,0,0.25)", fontFamily: "'Segoe UI', system-ui, sans-serif" },
  header:       { display: "flex", alignItems: "flex-start", justifyContent: "space-between", padding: "24px 24px 16px" },
  headerLeft:   { display: "flex", alignItems: "center", gap: "14px" },
  headerIcon:   { width: "52px", height: "52px", borderRadius: "14px", backgroundColor: "#EEF4FF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "26px", flexShrink: 0 },
  title:        { fontSize: "20px", fontWeight: 800, color: "#1A3C6E", margin: "0 0 4px" },
  sub:          { fontSize: "13px", color: "#6B7280", margin: 0 },
  closeBtn:     { width: "36px", height: "36px", borderRadius: "50%", border: "none", backgroundColor: "#F3F4F6", color: "#374151", fontSize: "16px", cursor: "pointer", flexShrink: 0 },
  body:         { padding: "20px 24px" },
  section:      { marginBottom: "20px" },
  sectionTitle: { fontSize: "12px", fontWeight: 800, color: "#374151", textTransform: "uppercase", letterSpacing: "0.6px", marginBottom: "12px" },
  addrList:     { display: "flex", flexDirection: "column", gap: "10px" },
  addrCard:     { display: "flex", alignItems: "flex-start", gap: "12px", padding: "14px 16px", borderRadius: "14px", border: "2px solid", cursor: "pointer", transition: "all 0.18s" },
  radioOuter:   (sel) => ({ width: "18px", height: "18px", borderRadius: "50%", border: `2px solid ${sel ? "#1A3C6E" : "#D1D5DB"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }),
  radioInner:   { width: "9px", height: "9px", borderRadius: "50%", backgroundColor: "#1A3C6E" },
  addrType:     { fontSize: "11px", fontWeight: 800, color: "#F97316", marginBottom: "4px" },
  defaultBadge: { color: "#1A3C6E", fontWeight: 700, fontSize: "11px", textTransform: "none" },
  addrLine:     { fontSize: "14px", fontWeight: 600, color: "#111827", marginBottom: "2px" },
  addrCity:     { fontSize: "12.5px", color: "#6B7280" },
  addNewBtn:    { width: "100%", padding: "11px 16px", borderRadius: "12px", border: "2px dashed", fontWeight: 700, fontSize: "14px", cursor: "pointer", transition: "all 0.18s" },
  formBox:      { backgroundColor: "#F8FAFC", border: "1.5px solid #E5E7EB", borderRadius: "14px", padding: "16px", display: "flex", flexDirection: "column", gap: "14px" },
  formRow:      { display: "flex", flexDirection: "column", gap: "5px" },
  label:        { fontSize: "11px", fontWeight: 700, color: "#374151", textTransform: "uppercase", letterSpacing: "0.4px" },
  input:        { padding: "10px 12px", border: "1.5px solid #D1D5DB", borderRadius: "10px", fontSize: "14px", outline: "none", fontFamily: "inherit", transition: "border-color 0.18s", width: "100%", boxSizing: "border-box" },
  typeBtn:      { padding: "7px 14px", borderRadius: "9px", border: "1.5px solid", fontSize: "13px", fontWeight: 600, cursor: "pointer" },
  footer:       { display: "flex", gap: "12px", padding: "16px 24px 24px", borderTop: "1px solid #F3F4F6" },
  skipBtn:      { flex: 1, padding: "12px", borderRadius: "12px", border: "2px solid #E5E7EB", backgroundColor: "white", color: "#6B7280", fontWeight: 600, fontSize: "14px", cursor: "pointer" },
  confirmBtn:   { flex: 2, padding: "12px 16px", borderRadius: "12px", border: "none", backgroundColor: "#1A3C6E", color: "white", fontWeight: 700, fontSize: "14px", boxShadow: "0 4px 14px rgba(26,60,110,0.28)", transition: "opacity 0.18s" },
};

export default AddressSelectPopup;

// ─── sessionStorage helper ────────────────────────────────────────────────────
const getCurrentUser = () => {
  const raw = sessionStorage.getItem("currentUser");
  return raw ? JSON.parse(raw) : null;
};

/**
 * AddressSelectPage
 *
 * Mounted at "/address-select" (registered in App.js).
 * Shown immediately after a successful login.
 *
 * Flow:
 *   1. Read logged-in user from sessionStorage.
 *   2. If no user → redirect to "/" (safety guard).
 *   3. Render AddressSelectPopup.
 *   4. On confirm → save selectedAddress in sessionStorage → go to /providers.
 *   5. On skip   → go to /providers without saving.
 */
export function AddressSelectPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      navigate("/", { replace: true });
      return;
    }
    setUser(currentUser);
  }, [navigate]);

  const handleConfirm = (addressLine) => {
    sessionStorage.setItem("selectedAddress", addressLine);
    navigate("/providers", { replace: true });
  };

  const handleSkip = () => {
    navigate("/providers", { replace: true });
  };

  if (!user) return null;

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#F0F4F8",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Segoe UI', system-ui, sans-serif",
      }}
    >
      <AddressSelectPopup
        user={user}
        onConfirm={handleConfirm}
        onSkip={handleSkip}
      />
    </div>
  );
}