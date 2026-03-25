import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";

import { Home } from "./components/pages/user/Home";
import Booking from "./components/pages/user/Booking";
import ProviderList from "./components/pages/user/ProviderList";
import BookingRequest from "./components/pages/user/BookingRequest";
import ProviderAccepted from "./components/pages/user/ProviderAccepted";
import ServiceCompleted from "./components/pages/user/ServiceCompleted";
import { UserProfile } from "./components/pages/user/UserProfile";
import { AddressSelectPage } from "./components/pages/user/auth/AddressSelectPopup";
import AuthModal from "./components/auth/AuthModal";

/* ADMIN */
import AdminLayout from "./components/pages/admin/AdminLayout";
import AdminLogin from "./components/pages/admin/AdminLogin";
import AdminDashboard from "./components/pages/admin/AdminDashboard";
import AdminProviders from "./components/pages/admin/AdminProviders";
import AdminAddProvider from "./components/pages/admin/AdminAddProvider";
import AdminProviderDetail from "./components/pages/admin/AdminProviderDetail";
import AdminCustomers from "./components/pages/admin/AdminCustomers";
import AdminRequests from "./components/pages/admin/AdminRequests";
import AdminServices from "./components/pages/admin/AdminServices";
import AdminSettings from "./components/pages/admin/AdminSettings";
import AdminRatings from "./components/pages/admin/AdminRatings";

/**
 * AppContent — Handles the main routing and Modal background logic
 */
function AppContent() {
  const [showAuth, setShowAuth] = useState(false);
  const [authInitialMode, setAuthInitialMode] = useState("login");

  useEffect(() => {
    const handleOpenAuth = (e) => {
      if (e.detail?.mode) setAuthInitialMode(e.detail.mode);
      setShowAuth(true);
    };
    window.addEventListener("openAuth", handleOpenAuth);
    return () => window.removeEventListener("openAuth", handleOpenAuth);
  }, []);

  return (
    <div className="app-container">
      <Routes>
        {/* USER */}
        <Route path="/" element={<Home />} />
        <Route path="/address-select" element={<AddressSelectPage />} />
        <Route path="/booking/:serviceId?" element={<Booking />} />
        <Route path="/providers" element={<ProviderList />} />
        <Route path="/booking-request" element={<BookingRequest />} />
        <Route path="/provider-accepted" element={<ProviderAccepted />} />
        <Route path="/service-completed" element={<ServiceCompleted />} />
        <Route path="/profile" element={<UserProfile />} />

        {/* Standalone Auth Pages (kept as fallback or just redirected) */}
        <Route path="/login" element={<Home />} />
        <Route path="/signup" element={<Home />} />

        {/* ADMIN LOGIN */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* ADMIN PANEL */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="bookings" element={<AdminRequests />} />
          <Route path="providers" element={<AdminProviders />} />
          <Route path="providers/add" element={<AdminAddProvider />} />
          <Route path="providers/:id" element={<AdminProviderDetail />} />
          <Route path="customers" element={<AdminCustomers />} />
          <Route path="ratings" element={<AdminRatings />} />
          <Route path="services" element={<AdminServices />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
      </Routes>
      
      {/* AuthModal managed globally via event state */}
      <AuthModal 
        isOpen={showAuth} 
        onClose={() => setShowAuth(false)} 
        initialMode={authInitialMode} 
      />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;