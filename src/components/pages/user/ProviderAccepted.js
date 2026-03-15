import { useLocation, useNavigate } from "react-router-dom";
import { UserCheck, Clock, Phone } from "lucide-react";
import { Navbar } from "../../Navbar";
import { Footer } from "../../Footer";

function ProviderAccepted() {
  const { state = {} } = useLocation();
  const navigate = useNavigate();

  const {
    providerName = "Ravi Kumar",
    scheduledTime = "10:00 AM",
    contactNo = "9765271022",
  } = state;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-2xl mx-auto px-6 py-16">
        <div className="bg-white rounded-3xl p-10 shadow-sm border border-gray-100 text-center">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ backgroundColor: "#EEF4FF" }}
          >
            <UserCheck className="w-10 h-10" style={{ color: "#1A3C6E" }} />
          </div>

          <h1 style={{ color: "#1A3C6E", fontSize: "28px", fontWeight: 700, marginBottom: "8px" }}>
            Provider Accepted Request
          </h1>

          <p style={{ color: "#6B7280", fontSize: "15px", marginBottom: "32px" }}>
            Your booking has been accepted by the provider.
          </p>

          <div className="text-left space-y-4 mb-8 p-6 rounded-2xl" style={{ background: "#F8FAFC" }}>
            <div>
              <div className="text-xs mb-1" style={{ color: "#9CA3AF" }}>Name of Provider</div>
              <div className="font-semibold" style={{ color: "#1F2937" }}>{providerName}</div>
            </div>

            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5" style={{ color: "#1A3C6E" }} />
              <div>
                <div className="text-xs" style={{ color: "#9CA3AF" }}>Scheduled Time</div>
                <div className="font-semibold" style={{ color: "#1F2937" }}>{scheduledTime}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5" style={{ color: "#1A3C6E" }} />
              <div>
                <div className="text-xs" style={{ color: "#9CA3AF" }}>Contact No</div>
                <div className="font-semibold" style={{ color: "#1F2937" }}>{contactNo}</div>
              </div>
            </div>
          </div>

          <button
            onClick={() => navigate("/service-completed", { state })}
            className="w-full py-3 rounded-xl font-semibold text-white"
            style={{ background: "#F97316" }}
          >
            Next
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default ProviderAccepted;