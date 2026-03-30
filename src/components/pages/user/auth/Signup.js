import React from "react";

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
  return (
    <>
      <h2 className="text-xl font-semibold text-center mb-4">Create Account</h2>

      <form onSubmit={onSubmit} className="flex flex-col gap-3">
        <input
          className="border p-2 rounded"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="border p-2 rounded"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          className="border p-2 rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="border p-2 rounded"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          className="border p-2 rounded"
          placeholder="Title (Home / Office / Shop)"
          value={addressTitle}
          onChange={(e) => setAddressTitle(e.target.value)}
        />

        <input
          className="border p-2 rounded"
          placeholder="Address Line 1"
          value={addressLine1}
          onChange={(e) => setAddressLine1(e.target.value)}
        />

        <select
          className="border p-2 rounded"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        >
          <option value="">Select City</option>
          <option value="Solapur">Solapur</option>
        </select>

        <select
          className="border p-2 rounded"
          value={area}
          onChange={(e) => setArea(e.target.value)}
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

        <input
          className="border p-2 rounded"
          placeholder="Pin Code"
          value={pinCode}
          onChange={(e) => setPinCode(e.target.value)}
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button className="bg-orange-500 text-white py-2 rounded">
          Sign Up
        </button>
      </form>

      <p className="text-center mt-3">
        Already have account?
        <button type="button" onClick={onSwitch} className="text-orange-500 ml-2">
          Login
        </button>
      </p>
    </>
  );
}

export default Signup;