import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Phone,
  Mail,
  Calendar,
  LogOut,
  Edit2,
  Check,
  X,
  Clock,
  UserCheck,
  MapPin,
  Plus,
  Home,
} from "lucide-react";
import { Navbar } from "../../Navbar";
import { Footer } from "../../Footer";
import {
  getCurrentUser,
  setCurrentUser,
  getBookings,
  getUsers,
  saveUsers,
  getProviders,
  addUserAddress,
  setDefaultAddress,
  getDefaultAddress,
} from "../../../services/store";

export function UserProfile() {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();

  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(currentUser?.name || "");
  const [phone, setPhone] = useState(currentUser?.phone || "");
  const [saved, setSaved] = useState(false);

  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addressError, setAddressError] = useState("");
  const [addressSaved, setAddressSaved] = useState(false);

  const [title, setTitle] = useState("");
  const [line1, setLine1] = useState("");
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");
  const [pinCode, setPinCode] = useState("");

  if (!currentUser) {
    setTimeout(() => {
      if (!getCurrentUser()) navigate("/");
    }, 0);
    return null;
  }

  const refreshedUser = getCurrentUser();
  const userBookings = getBookings().filter((b) => b.userId === refreshedUser.id);
  const allProviders = getProviders();
  const userAddresses = Array.isArray(refreshedUser.addresses) ? refreshedUser.addresses : [];
  const defaultAddress = getDefaultAddress(refreshedUser);

  const cityOptions = ["Solapur", "Pune", "Mumbai"];
  const areaOptions = [
    "Vijapur Road",
    "Hotgi Road",
    "Akkalkot Road",
    "Datta Nagar",
    "Railway Lines",
    "Budhwar Peth",
    "Sakhar Peth",
    "Siddheshwar Peth",
    "Mangalwar Peth",
    "Shivaji Nagar",
    "Kambar Ali",
    "Murarji Peth",
    "Jule Solapur",
  ];

  const handleSave = () => {
    if (!name.trim()) return;
    if (!/^\d{10}$/.test(phone.trim())) return;

    const users = getUsers();
    const updatedUsers = users.map((u) =>
      u.id === refreshedUser.id ? { ...u, name: name.trim(), phone: phone.trim() } : u
    );

    saveUsers(updatedUsers);

    const updatedCurrentUser = {
      ...refreshedUser,
      name: name.trim(),
      phone: phone.trim(),
    };

    setCurrentUser(updatedCurrentUser);
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    navigate("/");
  };

  const resetAddressForm = () => {
    setTitle("");
    setLine1("");
    setCity("");
    setArea("");
    setPinCode("");
    setAddressError("");
  };

  const handleAddAddress = () => {
    setAddressError("");

    if (!title.trim()) {
      setAddressError("Address title is required.");
      return;
    }

    if (!line1.trim()) {
      setAddressError("Address Line 1 is required.");
      return;
    }

    if (line1.trim().length < 5) {
      setAddressError("Address Line 1 is too short.");
      return;
    }

    if (!city.trim()) {
      setAddressError("Please select city.");
      return;
    }

    if (!area.trim()) {
      setAddressError("Please select area.");
      return;
    }

    if (!/^\d{6}$/.test(pinCode.trim())) {
      setAddressError("Pin Code must be 6 digits.");
      return;
    }

    addUserAddress(refreshedUser.id, {
      title: title.trim(),
      line1: line1.trim(),
      city: city.trim(),
      area: area.trim(),
      pinCode: pinCode.trim(),
    });

    setAddressSaved(true);
    setShowAddressForm(false);
    resetAddressForm();
    setTimeout(() => setAddressSaved(false), 2000);
  };

  const handleSetDefaultAddress = (addressId) => {
    setDefaultAddress(refreshedUser.id, addressId);
    setAddressSaved(true);
    setTimeout(() => setAddressSaved(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 style={{ color: "#1A3C6E", fontSize: "28px", fontWeight: 700 }}>My Profile</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex flex-col items-center mb-6">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center font-bold text-white text-3xl mb-3"
                  style={{ background: "#1A3C6E" }}
                >
                  {refreshedUser.name[0].toUpperCase()}
                </div>

                {saved && (
                  <span
                    className="text-xs px-3 py-1 rounded-full"
                    style={{ background: "#DCFCE7", color: "#166534" }}
                  >
                    ✅ Profile Updated!
                  </span>
                )}

                {addressSaved && (
                  <span
                    className="text-xs px-3 py-1 rounded-full mt-2"
                    style={{ background: "#DCFCE7", color: "#166534" }}
                  >
                    ✅ Address Saved!
                  </span>
                )}
              </div>

              {editing ? (
                <div className="space-y-3 mb-4">
                  <div>
                    <label className="text-xs font-semibold block mb-1" style={{ color: "#6B7280" }}>
                      Full Name
                    </label>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border-2 border-gray-200 outline-none text-sm"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold block mb-1" style={{ color: "#6B7280" }}>
                      Phone
                    </label>
                    <input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border-2 border-gray-200 outline-none text-sm"
                    />
                    {phone && !/^\d{10}$/.test(phone.trim()) && (
                      <p className="text-xs text-red-500 mt-1">Phone must be 10 digits.</p>
                    )}
                  </div>

                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={handleSave}
                      className="flex-1 py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-1"
                      style={{ background: "#1A3C6E", color: "white" }}
                    >
                      <Check className="w-4 h-4" />
                      Save
                    </button>

                    <button
                      onClick={() => {
                        setEditing(false);
                        setName(refreshedUser.name);
                        setPhone(refreshedUser.phone);
                      }}
                      className="flex-1 py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-1"
                      style={{ background: "#F1F5F9", color: "#64748B" }}
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3 mb-4">
                  {[
                    { i: <User className="w-4 h-4" />, l: "Name", v: refreshedUser.name },
                    { i: <Mail className="w-4 h-4" />, l: "Email", v: refreshedUser.email },
                    { i: <Phone className="w-4 h-4" />, l: "Phone", v: refreshedUser.phone || "—" },
                    {
                      i: <Calendar className="w-4 h-4" />,
                      l: "Member Since",
                      v: refreshedUser.createdAt,
                    },
                  ].map((x) => (
                    <div key={x.l} className="flex items-center gap-3">
                      <span className="flex-shrink-0" style={{ color: "#6B7280" }}>
                        {x.i}
                      </span>
                      <div>
                        <div className="text-xs" style={{ color: "#9CA3AF" }}>
                          {x.l}
                        </div>
                        <div className="font-semibold text-sm" style={{ color: "#1F2937" }}>
                          {x.v}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {!editing && (
                <button
                  onClick={() => setEditing(true)}
                  className="w-full py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 mb-2"
                  style={{ background: "#EEF4FF", color: "#1A3C6E" }}
                >
                  <Edit2 className="w-4 h-4" />
                  Edit Profile
                </button>
              )}

              <button
                onClick={handleLogout}
                className="w-full py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2"
                style={{ background: "#FEE2E2", color: "#DC2626" }}
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mt-4">
              <div className="flex items-center justify-between mb-3">
                <div className="text-sm font-semibold" style={{ color: "#1A3C6E" }}>
                  My Addresses
                </div>

                <button
                  onClick={() => {
                    setShowAddressForm(!showAddressForm);
                    setAddressError("");
                  }}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1"
                  style={{ background: "#F97316", color: "white" }}
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add
                </button>
              </div>

              {defaultAddress ? (
                <div
                  className="p-3 rounded-xl mb-3 border"
                  style={{ background: "#F8FAFC", borderColor: "#E5E7EB" }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Home className="w-4 h-4" style={{ color: "#1A3C6E" }} />
                    <span className="text-sm font-bold" style={{ color: "#1F2937" }}>
                      Default Address
                    </span>
                  </div>

                  <div className="text-xs font-semibold mb-1" style={{ color: "#F97316" }}>
                    {defaultAddress.title || "Address"}
                  </div>
                  <div className="text-sm" style={{ color: "#374151", lineHeight: 1.5 }}>
                    {defaultAddress.line1}
                    <br />
                    {defaultAddress.area}, {defaultAddress.city} - {defaultAddress.pinCode}
                  </div>
                </div>
              ) : (
                <div className="text-sm mb-3" style={{ color: "#94A3B8" }}>
                  No address added yet.
                </div>
              )}

              {showAddressForm && (
                <div className="mt-3 p-4 rounded-xl border border-gray-200 bg-gray-50">
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs font-semibold block mb-1" style={{ color: "#6B7280" }}>
                        Title
                      </label>
                      <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Home / Office / Shop"
                        className="w-full px-3 py-2 rounded-lg border border-gray-200 outline-none text-sm"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold block mb-1" style={{ color: "#6B7280" }}>
                        Address Line 1
                      </label>
                      <input
                        value={line1}
                        onChange={(e) => setLine1(e.target.value)}
                        placeholder="Enter address"
                        className="w-full px-3 py-2 rounded-lg border border-gray-200 outline-none text-sm"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold block mb-1" style={{ color: "#6B7280" }}>
                        City
                      </label>
                      <select
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-gray-200 outline-none text-sm bg-white"
                      >
                        <option value="">Select City</option>
                        {cityOptions.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-semibold block mb-1" style={{ color: "#6B7280" }}>
                        Area
                      </label>
                      <select
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-gray-200 outline-none text-sm bg-white"
                      >
                        <option value="">Select Area</option>
                        {areaOptions.map((a) => (
                          <option key={a} value={a}>
                            {a}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-semibold block mb-1" style={{ color: "#6B7280" }}>
                        Pin Code
                      </label>
                      <input
                        value={pinCode}
                        onChange={(e) => setPinCode(e.target.value)}
                        placeholder="413001"
                        className="w-full px-3 py-2 rounded-lg border border-gray-200 outline-none text-sm"
                      />
                    </div>

                    {addressError && <p className="text-xs text-red-500">{addressError}</p>}

                    <div className="flex gap-2 pt-1">
                      <button
                        onClick={handleAddAddress}
                        className="flex-1 py-2 rounded-lg text-sm font-semibold"
                        style={{ background: "#F97316", color: "white" }}
                      >
                        Save Address
                      </button>

                      <button
                        onClick={() => {
                          setShowAddressForm(false);
                          resetAddressForm();
                        }}
                        className="flex-1 py-2 rounded-lg text-sm font-semibold"
                        style={{ background: "#E5E7EB", color: "#374151" }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {userAddresses.length > 0 && (
                <div className="mt-4 space-y-3">
                  {userAddresses.map((addr) => (
                    <div
                      key={addr.id}
                      className="p-3 rounded-xl border"
                      style={{ background: "#fff", borderColor: "#E5E7EB" }}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-2">
                          <MapPin className="w-4 h-4 mt-0.5" style={{ color: "#1A3C6E" }} />
                          <div>
                            <div className="text-sm font-bold" style={{ color: "#1F2937" }}>
                              {addr.title || "Address"}
                            </div>
                            <div className="text-xs mt-1" style={{ color: "#6B7280", lineHeight: 1.5 }}>
                              {addr.line1}
                              <br />
                              {addr.area}, {addr.city} - {addr.pinCode}
                            </div>
                          </div>
                        </div>

                        {!addr.isDefault ? (
                          <button
                            onClick={() => handleSetDefaultAddress(addr.id)}
                            className="px-2.5 py-1 rounded-lg text-[11px] font-semibold"
                            style={{ background: "#EEF4FF", color: "#1A3C6E" }}
                          >
                            Set Default
                          </button>
                        ) : (
                          <span
                            className="px-2.5 py-1 rounded-lg text-[11px] font-semibold"
                            style={{ background: "#DCFCE7", color: "#166534" }}
                          >
                            Default
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mt-4">
              <div className="text-sm font-semibold mb-3" style={{ color: "#1A3C6E" }}>
                Booking Stats
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                {[
                  { l: "Total", v: userBookings.length, c: "#1A3C6E" },
                  {
                    l: "Done",
                    v: userBookings.filter((b) => b.status === "completed").length,
                    c: "#16A34A",
                  },
                  {
                    l: "Active",
                    v: userBookings.filter((b) => b.status !== "completed").length,
                    c: "#F97316",
                  },
                ].map((s) => (
                  <div key={s.l} className="p-2 rounded-lg" style={{ background: "#F8FAFC" }}>
                    <div className="text-xl font-bold" style={{ color: s.c }}>
                      {s.v}
                    </div>
                    <div className="text-xs" style={{ color: "#94A3B8" }}>
                      {s.l}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <h2 style={{ fontWeight: 700, color: "#1A3C6E", fontSize: "16px" }}>
                  My Bookings ({userBookings.length})
                </h2>
                <button
                  onClick={() => navigate("/")}
                  className="text-sm font-semibold px-4 py-2 rounded-lg"
                  style={{ background: "#F97316", color: "white" }}
                >
                  + New
                </button>
              </div>

              {userBookings.length === 0 ? (
                <div className="text-center py-16">
                  <div style={{ fontSize: "48px", marginBottom: "12px" }}>📋</div>
                  <div style={{ color: "#94A3B8" }}>No bookings yet.</div>
                  <button
                    onClick={() => navigate("/")}
                    className="mt-4 px-6 py-2.5 rounded-lg font-semibold text-sm"
                    style={{ background: "#1A3C6E", color: "white" }}
                  >
                    Book a Service
                  </button>
                </div>
              ) : (
                <div className="divide-y divide-gray-50">
                  {userBookings.map((b) => (
                    <div key={b.id} className="p-6 hover:bg-gray-50 transition-all duration-200">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div
                            className="font-bold flex items-center gap-2"
                            style={{ color: "#1F2937", fontSize: "18px" }}
                          >
                            {b.service}
                          </div>
                          <div className="text-sm" style={{ color: "#6B7280", marginTop: "2px" }}>
                            {b.subType || "General Maintenance"}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-[10px] text-gray-400">ID: {b.id}</div>
                        </div>
                      </div>

                      <div
                        className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm mt-3 pt-3 border-t border-gray-100"
                        style={{ color: "#4B5563" }}
                      >
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-blue-500" />
                          <span>
                            {b.date} · {b.time}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 overflow-hidden">
                          <Check className="w-4 h-4 text-green-500" />
                          <span className="truncate" title={b.address}>
                            {b.address}
                          </span>
                        </div>
                      </div>

                      <div className="mt-5 flex flex-wrap gap-3">
                        <button
                          onClick={() =>
                            navigate("/booking-request", {
                              state: {
                                service: b.service,
                                date: b.date,
                                time: b.time,
                                address: b.address,
                                providers: b.providers || [],
                                bookingId: `BK${String(b.id).slice(-6)}`,
                              },
                            })
                          }
                          className="px-4 py-2 rounded-lg text-sm font-semibold"
                          style={{ background: "#EEF4FF", color: "#1A3C6E" }}
                        >
                          View Booking Request
                        </button>

                        <button
                          onClick={() =>
                            navigate("/provider-accepted", {
                              state: {
                                providerName: b.providers?.[0] || "Ravi Kumar",
                                scheduledTime: b.time || "10:00 AM",
                                contactNo: "9765271022",
                              },
                            })
                          }
                          className="px-4 py-2 rounded-lg text-sm font-semibold"
                          style={{ background: "#DBEAFE", color: "#1D4ED8" }}
                        >
                          <span className="inline-flex items-center gap-2">
                            <UserCheck className="w-4 h-4" />
                            Provider Accepted Page
                          </span>
                        </button>

                        <button
                          onClick={() => navigate("/service-completed")}
                          className="px-4 py-2 rounded-lg text-sm font-semibold"
                          style={{ background: "#F97316", color: "white" }}
                        >
                          <span className="inline-flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            Service Completed Page
                          </span>
                        </button>
                      </div>

                      {b.providers && b.providers.length > 0 && (
                        <div className="mt-6">
                          <div className="flex items-center justify-between mb-3 border-b border-gray-50 pb-2">
                            <h4
                              className="text-[11px] font-extrabold"
                              style={{
                                color: "#94A3B8",
                                textTransform: "uppercase",
                                letterSpacing: "0.05em",
                              }}
                            >
                              Professional Assignment & Status
                            </h4>
                          </div>

                          <div className="space-y-4">
                            {b.providers.map((pName) => {
                              const pEntry = allProviders.find((px) => px.name === pName);

                              return (
                                <div
                                  key={pName}
                                  className="bg-white border border-gray-100 p-4 rounded-2xl shadow-sm hover:border-blue-200 transition-all duration-300"
                                >
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                      <div className="w-12 h-12 rounded-full bg-blue-50 border-2 border-white shadow-sm flex items-center justify-center text-blue-700 font-extrabold text-lg">
                                        {pName[0].toUpperCase()}
                                      </div>
                                      <div>
                                        <div className="text-base font-bold" style={{ color: "#1F2937" }}>
                                          {pName}
                                        </div>
                                        <div className="flex flex-wrap items-center gap-2 mt-1.5">
                                          <span
                                            className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                                            style={{
                                              background: pEntry?.available ? "#DCFCE7" : "#FEF3C7",
                                              color: pEntry?.available ? "#166534" : "#92400E",
                                            }}
                                          >
                                            {pEntry?.available ? "Available" : "Pending"}
                                          </span>
                                          <span
                                            className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                                            style={{ background: "#EFF6FF", color: "#1E40AF" }}
                                          >
                                            Contract Given
                                          </span>
                                        </div>
                                      </div>
                                    </div>

                                    <a
                                      href={`tel:${pEntry?.phone}`}
                                      className="p-2.5 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-md active:scale-90"
                                      title="Call Professional"
                                    >
                                      <Phone className="w-5 h-5" />
                                    </a>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}



export default UserProfile;