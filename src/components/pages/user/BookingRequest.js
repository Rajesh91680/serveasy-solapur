import { useLocation, useNavigate } from "react-router-dom";
import { Bell, Calendar, Clock, User, Home } from "lucide-react";
import { Navbar } from "../../Navbar";
import { Footer } from "../../Footer";

function BookingRequest() {
  const { state = {} } = useLocation();
  const { service, date, time, address, providers, bookingId } = state;
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-2xl mx-auto px-6 py-16 text-center">
        <div className="bg-white rounded-3xl p-10 shadow-sm border border-gray-100">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ backgroundColor: "#EEF4FF" }}
          >
            <Bell className="w-10 h-10" style={{ color: "#1A3C6E" }} />
          </div>

          <h1
            style={{
              color: "#1A3C6E",
              fontSize: "28px",
              fontWeight: 700,
              marginBottom: "8px",
            }}
          >
            Booking Request Sent
          </h1>

          <p
            style={{
              color: "#6B7280",
              fontSize: "15px",
              marginBottom: "8px",
            }}
          >
            Your request has been sent successfully.
          </p>

          <p
            style={{
              color: "#9CA3AF",
              fontSize: "13px",
              marginBottom: "32px",
            }}
          >
            Provider will respond soon.
          </p>

          <div
            className="text-left space-y-4 mb-8 p-6 rounded-2xl"
            style={{ background: "#F8FAFC" }}
          >
            {service && (
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: "#EEF4FF" }}
                >
                  <Home className="w-4 h-4" style={{ color: "#1A3C6E" }} />
                </div>
                <div>
                  <div className="text-xs" style={{ color: "#9CA3AF" }}>
                    Service
                  </div>
                  <div className="font-semibold" style={{ color: "#1F2937" }}>
                    {service}
                  </div>
                </div>
              </div>
            )}

            {date && (
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: "#EEF4FF" }}
                >
                  <Calendar className="w-4 h-4" style={{ color: "#1A3C6E" }} />
                </div>
                <div>
                  <div className="text-xs" style={{ color: "#9CA3AF" }}>
                    Date
                  </div>
                  <div className="font-semibold" style={{ color: "#1F2937" }}>
                    {date}
                  </div>
                </div>
              </div>
            )}

            {time && (
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: "#EEF4FF" }}
                >
                  <Clock className="w-4 h-4" style={{ color: "#1A3C6E" }} />
                </div>
                <div>
                  <div className="text-xs" style={{ color: "#9CA3AF" }}>
                    Time Slot
                  </div>
                  <div className="font-semibold" style={{ color: "#1F2937" }}>
                    {time}
                  </div>
                </div>
              </div>
            )}

            {address && (
              <div>
                <div className="text-xs" style={{ color: "#9CA3AF" }}>
                  Address
                </div>
                <div className="font-semibold" style={{ color: "#1F2937" }}>
                  {address}
                </div>
              </div>
            )}

            {providers?.length > 0 && (
              <div className="flex items-start gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: "#EEF4FF" }}
                >
                  <User className="w-4 h-4" style={{ color: "#1A3C6E" }} />
                </div>
                <div>
                  <div className="text-xs" style={{ color: "#9CA3AF" }}>
                    Selected Providers
                  </div>
                  <div className="font-semibold" style={{ color: "#1F2937" }}>
                    {providers.join(", ")}
                  </div>
                </div>
              </div>
            )}

            {bookingId && (
              <div>
                <div className="text-xs" style={{ color: "#9CA3AF" }}>
                  Booking ID
                </div>
                <div className="font-semibold" style={{ color: "#1F2937" }}>
                  {bookingId}
                </div>
              </div>
            )}
          </div>

          <button
  onClick={() => navigate("/profile")}
  className="w-full py-3 rounded-xl font-semibold text-white"
  style={{ background: "#F97316" }}
>
  Go to My Booking
</button>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default BookingRequest;