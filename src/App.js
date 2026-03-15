import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import { Home } from "./components/pages/user/Home";
import Booking from "./components/pages/user/Booking";
import ProviderList from "./components/pages/user/ProviderList";
import BookingRequest from "./components/pages/user/BookingRequest";
import ProviderAccepted from "./components/pages/user/ProviderAccepted";
import ServiceCompleted from "./components/pages/user/ServiceCompleted";
import { UserProfile } from "./components/pages/user/UserProfile";

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

function App() {
  return (
    <Router>
      <Routes>
        {/* USER */}
        <Route path="/" element={<Home />} />
        <Route path="/booking/:serviceId?" element={<Booking />} />
        <Route path="/providers" element={<ProviderList />} />
        <Route path="/booking-request" element={<BookingRequest />} />
        <Route path="/provider-accepted" element={<ProviderAccepted />} />
        <Route path="/service-completed" element={<ServiceCompleted />} />
        <Route path="/profile" element={<UserProfile />} />

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
    </Router>
  );
}

export default App;