// import React from "react";

// function Login({
//   email,
//   setEmail,
//   password,
//   setPassword,
//   error,
//   onSubmit,
//   onSwitch,
// }) {
//   return (
//     <>
//       <h2 className="text-xl font-semibold text-center mb-4">Login</h2>

//       <form onSubmit={onSubmit} className="flex flex-col gap-3">
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

//         {error && <p className="text-red-500 text-sm">{error}</p>}

//         <button className="bg-orange-500 text-white py-2 rounded">Login</button>
//       </form>

//       <p className="text-center mt-3">
//         No account?
//         <button onClick={onSwitch} className="text-orange-500 ml-2">
//           Sign Up
//         </button>
//       </p>
//     </>
//   );
// }

// export default Login;


import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { Eye, EyeOff } from "lucide-react";

function Login({
  email,
  setEmail,
  password,
  setPassword,
  error,
  onSubmit,
  onSwitch,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const handleGoogleSuccess = (credentialResponse) => {
    const user = jwtDecode(credentialResponse.credential);

    console.log("Google User:", user);

    // fill email automatically
    setEmail(user.email);

    // save user
    localStorage.setItem("user", JSON.stringify(user));
  };

  return (
    <>
      <h2 className="text-xl font-semibold text-center mb-4">Login</h2>

      <form onSubmit={onSubmit} className="flex flex-col gap-3">
        
        {/* Email */}
        <input
          className="border p-2 rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password with eye icon */}
        <div className="relative">
          <input
            className="border p-2 rounded w-full"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="button"
            className="absolute right-3 top-2 text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        {/* Login button */}
        <button className="bg-orange-500 text-white py-2 rounded">
          Login
        </button>
      </form>

      {/* Divider */}
      <div className="flex items-center my-4">
        <hr className="flex-grow border-gray-300" />
        <span className="mx-2 text-gray-400 text-sm">OR</span>
        <hr className="flex-grow border-gray-300" />
      </div>

      {/* Google Login */}
      <p className="text-center mb-2 font-medium">Login with Google</p>

      <div className="flex justify-center">
        <GoogleLogin
          text="signin"
          onSuccess={handleGoogleSuccess}
          onError={() => console.log("Google Login Failed")}
        />
      </div>

      {/* Sign Up */}
      <p className="text-center mt-3">
        No account?
        <button onClick={onSwitch} className="text-orange-500 ml-2">
          Sign Up
        </button>
      </p>
    </>
  );
}

export default Login;