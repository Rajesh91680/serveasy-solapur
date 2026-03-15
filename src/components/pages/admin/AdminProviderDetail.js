import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, Star, MapPin, Phone, Briefcase } from "lucide-react";
import { getProviders, saveProviders } from "../../../services/store";

function AdminProviderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [providers, setProviders] = useState(getProviders());

  const provider = providers.find((x) => String(x.id) === id);

  if (!provider) {
    return (
      <div
        className="p-8 text-center"
        style={{ color: "#94A3B8" }}
      >
        Not found.{" "}
        <button
          onClick={() => navigate("/admin/providers")}
          style={{ color: "#1A3C6E" }}
        >
          Go back
        </button>
      </div>
    );
  }

  const toggleStatus = () => {
    const updatedProviders = providers.map((x) =>
      String(x.id) === id
        ? { ...x, status: x.status === "active" ? "inactive" : "active" }
        : x
    );

    saveProviders(updatedProviders);
    setProviders(updatedProviders);
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <button
          onClick={() => navigate("/admin/providers")}
          className="flex items-center gap-1 text-sm"
          style={{ color: "#6B7280" }}
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </button>

        <h1
          style={{
            color: "#1A3C6E",
            fontSize: "24px",
            fontWeight: 700,
          }}
        >
          Provider Detail
        </h1>
      </div>

      {/* Card */}
      <div
        className="bg-white rounded-xl p-8 max-w-2xl"
        style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}
      >
        {/* Profile */}
        <div className="flex items-start gap-5 mb-6">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center font-bold text-white text-3xl"
            style={{ background: "#1A3C6E" }}
          >
            {provider.name[0]}
          </div>

          <div>
            <h2
              style={{
                color: "#1F2937",
                fontSize: "22px",
                fontWeight: 700,
              }}
            >
              {provider.name}
            </h2>

            <p style={{ color: "#6B7280" }}>{provider.specialty}</p>

            <span
              className="inline-block mt-2 px-3 py-1 rounded-full text-sm font-semibold"
              style={{
                background:
                  provider.status === "active" ? "#DCFCE7" : "#FEE2E2",
                color:
                  provider.status === "active" ? "#166534" : "#DC2626",
              }}
            >
              {provider.status}
            </span>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {[
            {
              icon: <MapPin className="w-4 h-4" />,
              label: "Location",
              value: provider.location,
            },
            {
              icon: <Briefcase className="w-4 h-4" />,
              label: "Experience",
              value: provider.experience,
            },
            {
              icon: <Phone className="w-4 h-4" />,
              label: "Phone",
              value: provider.phone,
            },
            {
              icon: (
                <Star
                  className="w-4 h-4 fill-current"
                  style={{ color: "#F59E0B" }}
                />
              ),
              label: "Rating",
              value: `${provider.rating} (${provider.reviews} reviews)`,
            },
          ].map((item) => (
            <div
              key={item.label}
              className="p-4 rounded-xl"
              style={{ background: "#F8FAFC" }}
            >
              <div
                className="flex items-center gap-2 mb-1"
                style={{ color: "#6B7280" }}
              >
                {item.icon}
                <span className="text-xs font-semibold">
                  {item.label}
                </span>
              </div>

              <div style={{ fontWeight: 600, color: "#1F2937" }}>
                {item.value}
              </div>
            </div>
          ))}
        </div>

        {/* Services */}
        <div className="mb-6">
          <div
            className="text-sm font-semibold mb-2"
            style={{ color: "#374151" }}
          >
            Services Offered
          </div>

          <div className="flex flex-wrap gap-2">
            {provider.services.map((service) => (
              <span
                key={service}
                className="px-3 py-1 rounded-lg text-sm"
                style={{ background: "#EEF4FF", color: "#1A3C6E" }}
              >
                {service
                  .split("-")
                  .map((w) => w[0].toUpperCase() + w.slice(1))
                  .join(" ")}
              </span>
            ))}
          </div>
        </div>

        {/* Toggle Status */}
        <button
          onClick={toggleStatus}
          className="px-6 py-2.5 rounded-lg font-semibold"
          style={{
            background:
              provider.status === "active" ? "#FEE2E2" : "#DCFCE7",
            color:
              provider.status === "active" ? "#DC2626" : "#166534",
          }}
        >
          {provider.status === "active"
            ? "Deactivate Provider"
            : "Activate Provider"}
        </button>
      </div>
    </div>
  );
}

export default AdminProviderDetail;