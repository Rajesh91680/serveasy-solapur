// import React from "react";

// function Signup({
//   name,
//   setName,
//   phone,
//   setPhone,
//   email,
//   setEmail,
//   password,
//   setPassword,
//   addressTitle,
//   setAddressTitle,
//   addressLine1,
//   setAddressLine1,
//   city,
//   setCity,
//   area,
//   setArea,
//   pinCode,
//   setPinCode,
//   error,
//   onSubmit,
//   onSwitch,
// }) {
//   return (
//     <>
//       <h2 className="text-xl font-semibold text-center mb-4">Create Account</h2>

//       <form onSubmit={onSubmit} className="flex flex-col gap-3">
//         <input
//           className="border p-2 rounded"
//           placeholder="Full Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />

//         <input
//           className="border p-2 rounded"
//           placeholder="Phone"
//           value={phone}
//           onChange={(e) => setPhone(e.target.value)}
//         />

//         <input
//           className="border p-2 rounded"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <input
//           className="border p-2 rounded"
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <input
//           className="border p-2 rounded"
//           placeholder="Title (Home / Office / Shop)"
//           value={addressTitle}
//           onChange={(e) => setAddressTitle(e.target.value)}
//         />

//         <input
//           className="border p-2 rounded"
//           placeholder="Address Line 1"
//           value={addressLine1}
//           onChange={(e) => setAddressLine1(e.target.value)}
//         />

//         <select
//           className="border p-2 rounded"
//           value={city}
//           onChange={(e) => setCity(e.target.value)}
//         >
//           <option value="">Select City</option>
//           <option value="Solapur">Solapur</option>
//         </select>

//         <select
//           className="border p-2 rounded"
//           value={area}
//           onChange={(e) => setArea(e.target.value)}
//         >
//           <option value="">Select Area</option>
//           <option value="Jule Solapur">Jule Solapur</option>
//           <option value="Hotgi Road">Hotgi Road</option>
//           <option value="Akkalkot Road">Akkalkot Road</option>
//           <option value="Railway Lines">Railway Lines</option>
//           <option value="Vijapur Road">Vijapur Road</option>
//           <option value="Datta Nagar">Datta Nagar</option>
//           <option value="Budhwar Peth">Budhwar Peth</option>
//           <option value="Sakhar Peth">Sakhar Peth</option>
//           <option value="Siddheshwar Peth">Siddheshwar Peth</option>
//           <option value="Mangalwar Peth">Mangalwar Peth</option>
//           <option value="Shivaji Nagar">Shivaji Nagar</option>
//           <option value="Kambar Ali">Kambar Ali</option>
//           <option value="Murarji Peth">Murarji Peth</option>
//         </select>

//         <input
//           className="border p-2 rounded"
//           placeholder="Pin Code"
//           value={pinCode}
//           onChange={(e) => setPinCode(e.target.value)}
//         />

//         {error && <p className="text-red-500 text-sm">{error}</p>}

//         <button className="bg-orange-500 text-white py-2 rounded">
//           Sign Up
//         </button>
//       </form>

//       <p className="text-center mt-3">
//         Already have account?
//         <button type="button" onClick={onSwitch} className="text-orange-500 ml-2">
//           Login
//         </button>
//       </p>
//     </>
//   );
// }

// export default Signup;

import React, { useState } from "react";
import { Eye, EyeOff, User, Phone, Mail, Lock, MapPin, Home, Building2, Store } from "lucide-react";

function Signup({
  name,
  setName,
  phone,
  setPhone,
  email,
  setEmail,
  password,
  setPassword,
  addressTitle,
  setAddressTitle,
  addressLine1,
  setAddressLine1,
  city,
  setCity,
  area,
  setArea,
  pinCode,
  setPinCode,
  error,
  onSubmit,
  onSwitch,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState("");

  // Phone: only allow digits, max 10
  const handlePhoneChange = (e) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 10);
    setPhone(val);
  };

  // Pin Code: only allow digits, max 6
  const handlePinChange = (e) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 6);
    setPinCode(val);
  };

  const inputClass = (field) =>
    `w-full bg-white border-2 rounded-xl px-4 py-2.5 text-sm text-gray-700 outline-none transition-all duration-200 ${
      focused === field
        ? "border-orange-400 shadow-[0_0_0_3px_rgba(251,146,60,0.15)]"
        : "border-gray-200 hover:border-gray-300"
    }`;

  const labelClass = "block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide";

  return (
    <div className="font-sans">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Create Account</h2>
        <p className="text-sm text-gray-400 mt-1">Join ServeEasy Solapur today</p>
      </div>

      <form onSubmit={onSubmit} className="flex flex-col gap-4">

        {/* Full Name */}
        <div>
          <label className={labelClass}>Full Name</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <User size={15} />
            </span>
            <input
              className={`${inputClass("name")} pl-9`}
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onFocus={() => setFocused("name")}
              onBlur={() => setFocused("")}
            />
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className={labelClass}>Phone Number</label>
          <div className="flex gap-2">
            {/* +91 prefix badge */}
            <div className="flex items-center bg-orange-50 border-2 border-orange-200 rounded-xl px-3 text-orange-600 font-bold text-sm whitespace-nowrap select-none">
              🇮🇳 +91
            </div>
            <input
              className={inputClass("phone")}
              placeholder="10-digit mobile number"
              value={phone}
              onChange={handlePhoneChange}
              onFocus={() => setFocused("phone")}
              onBlur={() => setFocused("")}
              inputMode="numeric"
              maxLength={10}
            />
          </div>
          {phone.length > 0 && phone.length < 10 && (
            <p className="text-xs text-orange-400 mt-1">
              {10 - phone.length} more digits needed
            </p>
          )}
          {phone.length === 10 && (
            <p className="text-xs text-green-500 mt-1">✓ Valid number</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className={labelClass}>Email</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Mail size={15} />
            </span>
            <input
              className={`${inputClass("email")} pl-9`}
              placeholder="your@email.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setFocused("email")}
              onBlur={() => setFocused("")}
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className={labelClass}>Password</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Lock size={15} />
            </span>
            <input
              className={`${inputClass("password")} pl-9 pr-10`}
              type={showPassword ? "text" : "password"}
              placeholder="Min 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setFocused("password")}
              onBlur={() => setFocused("")}
              minLength={8}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-500 transition-colors"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {/* Password strength bar */}
          {password.length > 0 && (
            <div className="mt-1.5">
              <div className="flex gap-1">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                      password.length >= i * 2
                        ? password.length >= 8
                          ? "bg-green-400"
                          : "bg-orange-400"
                        : "bg-gray-200"
                    }`}
                  />
                ))}
              </div>
              <p className={`text-xs mt-0.5 ${password.length >= 8 ? "text-green-500" : "text-orange-400"}`}>
                {password.length < 8 ? `${8 - password.length} more characters needed` : "✓ Strong password"}
              </p>
            </div>
          )}
        </div>

        {/* Address Title - Dropdown */}
        <div>
          <label className={labelClass}>Address Type</label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { value: "Home", icon: <Home size={14} />, label: "Home" },
              { value: "Office", icon: <Building2 size={14} />, label: "Office" },
              { value: "Other", icon: <Store size={14} />, label: "Other" },
            ].map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setAddressTitle(opt.value)}
                className={`flex items-center justify-center gap-1.5 py-2.5 rounded-xl border-2 text-sm font-medium transition-all duration-200 ${
                  addressTitle === opt.value
                    ? "border-orange-400 bg-orange-50 text-orange-600 shadow-[0_0_0_3px_rgba(251,146,60,0.15)]"
                    : "border-gray-200 text-gray-500 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                {opt.icon}
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Address Line 1 */}
        <div>
          <label className={labelClass}>Address Line 1</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <MapPin size={15} />
            </span>
            <input
              className={`${inputClass("address")} pl-9`}
              placeholder="House / Flat / Street"
              value={addressLine1}
              onChange={(e) => setAddressLine1(e.target.value)}
              onFocus={() => setFocused("address")}
              onBlur={() => setFocused("")}
            />
          </div>
        </div>

        {/* City & Area in a row */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>City</label>
            <select
              className={inputClass("city")}
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onFocus={() => setFocused("city")}
              onBlur={() => setFocused("")}
            >
              <option value="">Select City</option>
              <option value="Solapur">Solapur</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Area</label>
            <select
              className={inputClass("area")}
              value={area}
              onChange={(e) => setArea(e.target.value)}
              onFocus={() => setFocused("area")}
              onBlur={() => setFocused("")}
            >
              <option value="">Select Area</option>
              <option value="Jule Solapur">Jule Solapur</option>
              <option value="Hotgi Road">Hotgi Road</option>
              <option value="Akkalkot Road">Akkalkot Road</option>
              <option value="Railway Lines">Railway Lines</option>
              <option value="Vijapur Road">Vijapur Road</option>
              <option value="Datta Nagar">Datta Nagar</option>
              <option value="Budhwar Peth">Budhwar Peth</option>
              <option value="Sakhar Peth">Sakhar Peth</option>
              <option value="Siddheshwar Peth">Siddheshwar Peth</option>
              <option value="Mangalwar Peth">Mangalwar Peth</option>
              <option value="Shivaji Nagar">Shivaji Nagar</option>
              <option value="Kambar Ali">Kambar Ali</option>
              <option value="Murarji Peth">Murarji Peth</option>
            </select>
          </div>
        </div>

        {/* Pin Code */}
        <div>
          <label className={labelClass}>Pin Code</label>
          <input
            className={inputClass("pin")}
            placeholder="6-digit PIN code"
            value={pinCode}
            onChange={handlePinChange}
            onFocus={() => setFocused("pin")}
            onBlur={() => setFocused("")}
            inputMode="numeric"
            maxLength={6}
          />
          {pinCode.length > 0 && pinCode.length < 6 && (
            <p className="text-xs text-orange-400 mt-1">
              {6 - pinCode.length} more digits needed
            </p>
          )}
          {pinCode.length === 6 && (
            <p className="text-xs text-green-500 mt-1">✓ Valid PIN</p>
          )}
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-2.5">
            <p className="text-red-500 text-sm">{error}</p>
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 text-white font-semibold py-3 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 mt-1"
        >
          Create Account →
        </button>
      </form>

      <p className="text-center mt-4 text-sm text-gray-500">
        Already have an account?{" "}
        <button
          type="button"
          onClick={onSwitch}
          className="text-orange-500 font-semibold hover:text-orange-600 transition-colors"
        >
          Login
        </button>
      </p>
    </div>
  );
}

export default Signup;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          