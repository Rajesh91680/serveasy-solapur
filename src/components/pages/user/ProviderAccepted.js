// 📁 ProviderAccepted.js

import { useLocation, useNavigate } from "react-router-dom";
import { Navbar } from "../../Navbar";
import { Footer } from "../../Footer";
import { User, Phone } from "lucide-react";

function ProviderAccepted() {

  const location = useLocation();
  const navigate = useNavigate();

  // ✅ GET DATA FROM PREVIOUS PAGE
  const state = location.state || {};

  const provider = state.provider || "Provider";
  const providerId = state.providerId;
  const userId = state.userId;

  // (optional) if you want service/date
  const service = state.service || "AC Repair";
  const date = state.date || "2026-03-30";

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-2xl mx-auto px-6 py-16 text-center">

        <div className="bg-white rounded-3xl p-10 shadow-sm border">

          {/* ✅ TITLE */}
          <h1 className="text-2xl font-bold mb-2 text-blue-800">
            Provider Accepted Request
          </h1>

          <p className="text-gray-500 mb-8">
            Your booking has been accepted by the provider.
          </p>

          {/* ✅ CARD (SAME UI STYLE AS YOUR IMAGE) */}
          <div className="bg-gray-100 p-6 rounded-2xl text-left space-y-6">

            {/* 👤 PROVIDER NAME */}
            <div>
              <div className="text-sm text-gray-400">Name of Provider</div>
              <div className="font-semibold text-lg">{provider}</div>
            </div>

            {/* ❌ TIME REMOVED COMPLETELY */}

            {/* 📞 CONTACT */}
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-gray-600" />
              <div>
                <div className="text-sm text-gray-400">Contact No</div>
                <div className="font-semibold">9765271022</div>
              </div>
            </div>

          </div>

          {/* ✅ NEXT BUTTON */}
          <button
            onClick={() =>
              navigate("/service-completed", {
                state: {
                  providerId,
                  userId,
                },
              })
            }
            className="w-full py-3 mt-8 text-white rounded-xl font-semibold"
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


