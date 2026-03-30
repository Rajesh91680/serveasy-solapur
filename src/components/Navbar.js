// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Home, X, User, LogOut, ChevronDown } from "lucide-react";
// import {
//   getCurrentUser,
//   setCurrentUser,
//   loginUser,
//   registerUser,
// } from "../services/store";

// import Login from "./pages/user/auth/Login";
// import Signup from "./pages/user/auth/Signup";

// export function Navbar({ onAuthSuccess } = {}) {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [mode, setMode] = useState("login");
//   const [user, setUser] = useState(getCurrentUser());
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [profileOpen, setProfileOpen] = useState(false);

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [phone, setPhone] = useState("");

//   const [addressTitle, setAddressTitle] = useState("");
//   const [addressLine1, setAddressLine1] = useState("");
//   const [city, setCity] = useState("");
//   const [area, setArea] = useState("");
//   const [pinCode, setPinCode] = useState("");

//   const navigate = useNavigate();

//   useEffect(() => {
//     const s = () => setIsScrolled(window.scrollY > 10);
//     window.addEventListener("scroll", s);
//     return () => window.removeEventListener("scroll", s);
//   }, []);

//   useEffect(() => {
//     window.__navbarOpenModal = (type = "login") => {
//       openModal(type);
//     };
//     return () => delete window.__navbarOpenModal;
//   }, []);

//   const resetForm = () => {
//     setError("");
//     setSuccess("");
//     setName("");
//     setEmail("");
//     setPassword("");
//     setPhone("");
//     setAddressTitle("");
//     setAddressLine1("");
//     setCity("");
//     setArea("");
//     setPinCode("");
//   };

//   const openModal = (type) => {
//     setMode(type);
//     resetForm();
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setShowModal(false);
//     setError("");
//     setSuccess("");
//   };

//   const handleLogout = () => {
//     setCurrentUser(null);
//     setUser(null);
//     setProfileOpen(false);
//     navigate("/");
//   };

//   const validateLogin = () => {
//     if (!email.trim()) return "Email is required.";
//     if (!password.trim()) return "Password is required.";
//     return "";
//   };

//   const validateSignup = () => {
//     if (!name.trim()) return "Full name is required.";
//     if (name.trim().length < 3) return "Full name must be at least 3 characters.";

//     if (!phone.trim()) return "Phone number is required.";
//     if (!/^\d{10}$/.test(phone.trim())) return "Phone number must be 10 digits.";

//     if (!email.trim()) return "Email is required.";
//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return "Enter a valid email.";

//     if (!password.trim()) return "Password is required.";
//     if (password.length < 6) return "Password must be at least 6 characters.";

//     if (!addressTitle.trim()) return "Address title is required.";
//     if (!addressLine1.trim()) return "Address Line 1 is required.";
//     if (addressLine1.trim().length < 5) return "Address Line 1 is too short.";

//     if (!city.trim()) return "City is required.";
//     if (!area.trim()) return "Area is required.";

//     if (!pinCode.trim()) return "Pin Code is required.";
//     if (!/^\d{6}$/.test(pinCode.trim())) return "Pin Code must be 6 digits.";

//     return "";
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");

//     if (mode === "login") {
//       const validationError = validateLogin();
//       if (validationError) {
//         setError(validationError);
//         return;
//       }

//       const found = loginUser(email.trim(), password);

//       if (!found) {
//         setError("Invalid email or password.");
//         return;
//       }

//       if (found.role === "admin") {
//         setError("Admin access not allowed.");
//         return;
//       }

//       setCurrentUser(found);
//       setUser(found); if (found.role === "admin") { closeModal(); navigate("/admin"); return; }
//       closeModal();

//       if (onAuthSuccess) onAuthSuccess(found);
//     } else {
//       const validationError = validateSignup();
//       if (validationError) {
//         setError(validationError);
//         return;
//       }

//       const created = registerUser(
//         name.trim(),
//         email.trim(),
//         password,
//         phone.trim(),
//         {
//           title: addressTitle.trim(),
//           line1: addressLine1.trim(),
//           city: city.trim(),
//           area: area.trim(),
//           pinCode: pinCode.trim(),
//         }
//       );

//       if (!created) {
//         setError("Email already exists.");
//         return;
//       }

//       setMode("login");
//       setSuccess("Account created successfully. Please login.");
//       setError("");
//       setPassword("");
//     }
//   };

//   return (
//     <>
//       <nav className={`sticky top-0 z-50 bg-white border-b ${isScrolled ? "shadow-md" : ""}`}>
//         <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
//           <div className="flex items-center justify-between h-20">
//             <Link to="/" className="flex items-center gap-2">
//               <div
//                 className="w-10 h-10 rounded-full flex items-center justify-center"
//                 style={{ backgroundColor: "#1A3C6E" }}
//               >
//                 <Home className="w-5 h-5 text-white" />
//               </div>

//               <div>
//                 <span style={{ color: "#1A3C6E", fontWeight: 600 }}>ServeEasy</span>
//                 <span style={{ color: "#F97316", fontWeight: 600 }}>Solapur</span>
//               </div>
//             </Link>

//             {user ? (
//               <div className="relative">
//                 <button
//                   onClick={() => setProfileOpen(!profileOpen)}
//                   className="flex items-center gap-2 px-3 py-2 rounded-lg"
//                   style={{ background: "#EEF4FF" }}
//                 >
//                   <div
//                     className="w-8 h-8 rounded-full flex items-center justify-center text-white"
//                     style={{ background: "#1A3C6E" }}
//                   >
//                     {user?.name?.[0]?.toUpperCase()}
//                   </div>

//                   Hi, {user?.name?.split(" ")[0]}
//                   <ChevronDown className="w-4 h-4" />
//                 </button>

//                 {profileOpen && (
//                   <div className="absolute right-0 top-full mt-2 w-52 bg-white shadow-lg rounded-lg border border-gray-100">
//                     <button
//                       onClick={() => {
//                         setProfileOpen(false);
//                         navigate("/profile");
//                       }}
//                       className="w-full px-4 py-3 flex items-center gap-2 hover:bg-gray-50"
//                     >
//                       <User className="w-4 h-4" />
//                       My Profile
//                     </button>

//                     <button
//                       onClick={handleLogout}
//                       className="w-full px-4 py-3 flex items-center gap-2 hover:bg-red-50 text-red-600"
//                     >
//                       <LogOut className="w-4 h-4" />
//                       Logout
//                     </button>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <button
//                 onClick={() => openModal("login")}
//                 className="px-5 py-2 rounded-lg font-semibold text-white"
//                 style={{ background: "#F97316" }}
//               >
//                 Login / Sign Up
//               </button>
//             )}
//           </div>
//         </div>
//       </nav>

//       {showModal && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] px-4">
//           <div className="bg-white p-8 rounded-xl w-full max-w-[440px] relative max-h-[90vh] overflow-y-auto">
//             <button onClick={closeModal} className="absolute top-4 right-4">
//               <X size={20} />
//             </button>

//             {mode === "login" ? (
//               <Login
//                 email={email}
//                 setEmail={setEmail}
//                 password={password}
//                 setPassword={setPassword}
//                 error={error}
//                 success={success}
//                 onSubmit={handleSubmit}
//                 onSwitch={() => {
//                   setError("");
//                   setSuccess("");
//                   setMode("signup");
//                 }}
//               />
//             ) : (
//               <Signup
//                 name={name}
//                 setName={setName}
//                 phone={phone}
//                 setPhone={setPhone}
//                 email={email}
//                 setEmail={setEmail}
//                 password={password}
//                 setPassword={setPassword}
//                 addressTitle={addressTitle}
//                 setAddressTitle={setAddressTitle}
//                 addressLine1={addressLine1}
//                 setAddressLine1={setAddressLine1}
//                 city={city}
//                 setCity={setCity}
//                 area={area}
//                 setArea={setArea}
//                 pinCode={pinCode}
//                 setPinCode={setPinCode}
//                 error={error}
//                 success={success}
//                 onSubmit={handleSubmit}
//                 onSwitch={() => {
//                   setError("");
//                   setSuccess("");
//                   setMode("login");
//                 }}
//               />
//             )}
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// export default Navbar;



import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Home, X, User, LogOut, ChevronDown } from "lucide-react";
import {
  getCurrentUser,
  setCurrentUser,
  loginUser,
  registerUser,
} from "../services/store";

import Login from "./pages/user/auth/Login";
import Signup from "./pages/user/auth/Signup";
import AddressSelectPopup from "./pages/user/auth/AddressSelectPopup"; // ✅ NEW

export function Navbar({ onAuthSuccess } = {}) {
  const [isScrolled,   setIsScrolled]   = useState(false);
  const [showModal,    setShowModal]    = useState(false);
  const [mode,         setMode]         = useState("login");
  const [user,         setUser]         = useState(getCurrentUser());
  const [error,        setError]        = useState("");
  const [success,      setSuccess]      = useState("");
  const [profileOpen,  setProfileOpen]  = useState(false);

  // ✅ NEW: address popup state
  const [showAddrPopup, setShowAddrPopup] = useState(false);
  const [loggedInUser,  setLoggedInUser]  = useState(null);

  const [name,     setName]     = useState("");
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [phone,    setPhone]    = useState("");

  const [addressTitle, setAddressTitle] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [city,         setCity]         = useState("");
  const [area,         setArea]         = useState("");
  const [pinCode,      setPinCode]      = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const s = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", s);
    return () => window.removeEventListener("scroll", s);
  }, []);

  useEffect(() => {
    window.__navbarOpenModal = (type = "login") => openModal(type);
    return () => delete window.__navbarOpenModal;
  }, []);

  const resetForm = () => {
    setError(""); setSuccess("");
    setName(""); setEmail(""); setPassword(""); setPhone("");
    setAddressTitle(""); setAddressLine1(""); setCity(""); setArea(""); setPinCode("");
  };

  const openModal = (type) => {
    setMode(type);
    resetForm();
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setError(""); setSuccess("");
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setUser(null);
    setProfileOpen(false);
    navigate("/");
  };

  const validateLogin = () => {
    if (!email.trim())    return "Email is required.";
    if (!password.trim()) return "Password is required.";
    return "";
  };

  const validateSignup = () => {
    if (!name.trim())               return "Full name is required.";
    if (name.trim().length < 3)     return "Full name must be at least 3 characters.";
    if (!phone.trim())              return "Phone number is required.";
    if (!/^\d{10}$/.test(phone.trim())) return "Phone number must be 10 digits.";
    if (!email.trim())              return "Email is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return "Enter a valid email.";
    if (!password.trim())           return "Password is required.";
    if (password.length < 6)        return "Password must be at least 6 characters.";
    if (!addressTitle.trim())       return "Address title is required.";
    if (!addressLine1.trim())       return "Address Line 1 is required.";
    if (addressLine1.trim().length < 5) return "Address Line 1 is too short.";
    if (!city.trim())               return "City is required.";
    if (!area.trim())               return "Area is required.";
    if (!pinCode.trim())            return "Pin Code is required.";
    if (!/^\d{6}$/.test(pinCode.trim())) return "Pin Code must be 6 digits.";
    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(""); setSuccess("");

    if (mode === "login") {
      const validationError = validateLogin();
      if (validationError) { setError(validationError); return; }

      const found = loginUser(email.trim(), password);
      if (!found)               { setError("Invalid email or password."); return; }


      setCurrentUser(found);
      setUser(found); if (found.role === "admin") { closeModal(); navigate("/admin"); return; }
      closeModal();

      // ✅ Always show address popup after login
      setLoggedInUser(found);
      setShowAddrPopup(true);

    } else {
      const validationError = validateSignup();
      if (validationError) { setError(validationError); return; }

      const created = registerUser(
        name.trim(), email.trim(), password, phone.trim(),
        {
          title:   addressTitle.trim(),
          line1:   addressLine1.trim(),
          city:    city.trim(),
          area:    area.trim(),
          pinCode: pinCode.trim(),
        }
      );

      if (!created) { setError("Email already exists."); return; }

      setMode("login");
      setSuccess("Account created successfully. Please login.");
      setError("");
      setPassword("");
    }
  };

  // ✅ Called when user confirms address in popup
  const handleAddressConfirm = (addressLine) => {
    setShowAddrPopup(false);

    const pending = sessionStorage.getItem("pendingProviderSelection");

    if (pending) {
      // Pending booking exists → fill address and proceed
      try {
        const data = JSON.parse(pending);
        sessionStorage.setItem(
          "pendingProviderSelection",
          JSON.stringify({ ...data, address: addressLine, addressConfirmed: true })
        );
        if (window.__onAddressConfirmed) {
          window.__onAddressConfirmed(addressLine);
        }
      } catch {
        sessionStorage.removeItem("pendingProviderSelection");
      }
    } else {
      // Normal login — just notify
      if (onAuthSuccess) onAuthSuccess(loggedInUser);
    }
  };

  // ✅ Called when user skips address popup
  const handleAddressSkip = () => {
    setShowAddrPopup(false);
    const pending = sessionStorage.getItem("pendingProviderSelection");
    if (pending && window.__onAddressConfirmed) {
      // Proceed without address
      window.__onAddressConfirmed("");
    } else {
      if (onAuthSuccess) onAuthSuccess(loggedInUser);
    }
  };

  return (
    <>
      <nav className={`sticky top-0 z-50 bg-white border-b ${isScrolled ? "shadow-md" : ""}`}>
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">

            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: "#1A3C6E" }}>
                <Home className="w-5 h-5 text-white" />
              </div>
              <div>
                <span style={{ color: "#1A3C6E", fontWeight: 600 }}>ServeEasy</span>
                <span style={{ color: "#F97316", fontWeight: 600 }}>Solapur</span>
              </div>
            </Link>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg"
                  style={{ background: "#EEF4FF" }}
                >
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white" style={{ background: "#1A3C6E" }}>
                    {user?.name?.[0]?.toUpperCase()}
                  </div>
                  Hi, {user?.name?.split(" ")[0]}
                  <ChevronDown className="w-4 h-4" />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 top-full mt-2 w-52 bg-white shadow-lg rounded-lg border border-gray-100">
                    <button
                      onClick={() => { setProfileOpen(false); navigate("/profile"); }}
                      className="w-full px-4 py-3 flex items-center gap-2 hover:bg-gray-50"
                    >
                      <User className="w-4 h-4" /> My Profile
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-3 flex items-center gap-2 hover:bg-red-50 text-red-600"
                    >
                      <LogOut className="w-4 h-4" /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => openModal("login")}
                className="px-5 py-2 rounded-lg font-semibold text-white"
                style={{ background: "#F97316" }}
              >
                Login / Sign Up
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* ── Login / Signup Modal ── */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] px-4">
          <div className="bg-white p-8 rounded-xl w-full max-w-[440px] relative max-h-[90vh] overflow-y-auto">
            <button onClick={closeModal} className="absolute top-4 right-4">
              <X size={20} />
            </button>

            {mode === "login" ? (
              <Login
                email={email}           setEmail={setEmail}
                password={password}     setPassword={setPassword}
                error={error}           success={success}
                onSubmit={handleSubmit}
                onSwitch={() => { setError(""); setSuccess(""); setMode("signup"); }}
              />
            ) : (
              <Signup
                name={name}               setName={setName}
                phone={phone}             setPhone={setPhone}
                email={email}             setEmail={setEmail}
                password={password}       setPassword={setPassword}
                addressTitle={addressTitle} setAddressTitle={setAddressTitle}
                addressLine1={addressLine1} setAddressLine1={setAddressLine1}
                city={city}               setCity={setCity}
                area={area}               setArea={setArea}
                pinCode={pinCode}         setPinCode={setPinCode}
                error={error}             success={success}
                onSubmit={handleSubmit}
                onSwitch={() => { setError(""); setSuccess(""); setMode("login"); }}
              />
            )}
          </div>
        </div>
      )}

      {/* ✅ NEW: Address Select Popup — shown after login if pending booking */}
      {showAddrPopup && loggedInUser && (
        <AddressSelectPopup
          user={loggedInUser}
          onConfirm={handleAddressConfirm}
          onSkip={handleAddressSkip}
        />
      )}
    </>
  );
}

export default Navbar;