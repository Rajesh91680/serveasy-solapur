// import React, { useState } from "react";
// import { GoogleLogin } from "@react-oauth/google";
// import { jwtDecode } from "jwt-decode";
// import { Eye, EyeOff } from "lucide-react";

// function Login({
//   email,
//   setEmail,
//   password,
//   setPassword,
//   error,
//   onSubmit,
//   onSwitch,
// }) {
//   const [showPassword, setShowPassword] = useState(false);

//   const handleGoogleSuccess = (credentialResponse) => {
//     const user = jwtDecode(credentialResponse.credential);

//     console.log("Google User:", user);

//     // fill email automatically
//     setEmail(user.email);

//     // save user
//     localStorage.setItem("user", JSON.stringify(user));
//   };

//   return (
//     <>
//       <h2 className="text-xl font-semibold text-center mb-4">Login</h2>

//       <form onSubmit={onSubmit} className="flex flex-col gap-3">
        
//         {/* Email */}
//         <input
//           className="border p-2 rounded"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         {/* Password with eye icon */}
//         <div className="relative">
//           <input
//             className="border p-2 rounded w-full"
//             type={showPassword ? "text" : "password"}
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />

//           <button
//             type="button"
//             className="absolute right-3 top-2 text-gray-500"
//             onClick={() => setShowPassword(!showPassword)}
//           >
//             {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//           </button>
//         </div>

//         {error && <p className="text-red-500 text-sm">{error}</p>}

//         {/* Login button */}
//         <button className="bg-orange-500 text-white py-2 rounded">
//           Login
//         </button>
//       </form>

//       {/* Divider */}
//       <div className="flex items-center my-4">
//         <hr className="flex-grow border-gray-300" />
//         <span className="mx-2 text-gray-400 text-sm">OR</span>
//         <hr className="flex-grow border-gray-300" />
//       </div>

//       {/* Google Login */}
//       <p className="text-center mb-2 font-medium">Login with Google</p>

//       <div className="flex justify-center">
//         <GoogleLogin
//           text="signin"
//           onSuccess={handleGoogleSuccess}
//           onError={() => console.log("Google Login Failed")}
//         />
//       </div>

//       {/* Sign Up */}
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
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

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
  const [focused, setFocused] = useState("");

  const handleGoogleSuccess = (credentialResponse) => {
    const user = jwtDecode(credentialResponse.credential);
    console.log("Google User:", user);
    setEmail(user.email);
    localStorage.setItem("user", JSON.stringify(user));
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
        <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
        <p className="text-sm text-gray-400 mt-1">Login to your ServeEasy account</p>
      </div>

      <form onSubmit={onSubmit} className="flex flex-col gap-4">

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
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setFocused("password")}
              onBlur={() => setFocused("")}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-500 transition-colors"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-2.5">
            <p className="text-red-500 text-sm">{error}</p>
          </div>
        )}

        {/* Login Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 text-white font-semibold py-3 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 mt-1"
        >
          Login →
        </button>
      </form>

      {/* Divider */}
      <div className="flex items-center my-5">
        <hr className="flex-grow border-gray-200" />
        <span className="mx-3 text-xs text-gray-400 font-medium uppercase tracking-wider">or</span>
        <hr className="flex-grow border-gray-200" />
      </div>

      {/* Google Login */}
      <div className="flex flex-col items-center gap-2">
        <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Continue with Google</p>
        <GoogleLogin
          text="signin"
          onSuccess={handleGoogleSuccess}
          onError={() => console.log("Google Login Failed")}
        />
      </div>

      {/* Sign Up */}
      <p className="text-center mt-5 text-sm text-gray-500">
        No account?{" "}
        <button
          type="button"
          onClick={onSwitch}
          className="text-orange-500 font-semibold hover:text-orange-600 transition-colors"
        >
          Sign Up
        </button>
      </p>
    </div>
  );
}

export default Login;