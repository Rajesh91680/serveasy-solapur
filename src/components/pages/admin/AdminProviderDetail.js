import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, Star, MapPin, Phone, Briefcase } from "lucide-react";

function AdminProviderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [provider, setProvider] = useState(null);

  // ================= LOAD FROM API =================
  useEffect(() => {
    loadProvider();
  }, []);

  const loadProvider = async () => {
    const res = await fetch(`http://localhost:8000/api/providers/${id}`);
    const data = await res.json();
    setProvider(data);
  };

  if (!provider) {
    return (
      <div className="p-8 text-center text-gray-400">
        Loading...
      </div>
    );
  }

  // ================= TOGGLE STATUS =================
  const toggleStatus = async () => {
    await fetch(`http://localhost:8000/api/providers/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...provider,
        status: provider.status === "active" ? "inactive" : "active",
      }),
    });

    loadProvider(); // refresh
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <button
          onClick={() => navigate("/admin/providers")}
          className="flex items-center gap-1 text-sm text-gray-500"
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </button>

        <h1 className="text-2xl font-bold text-blue-900">
          Provider Detail
        </h1>
      </div>

      {/* Card */}
      <div className="bg-white rounded-xl p-8 max-w-2xl shadow-lg">
        {/* Profile */}
        <div className="flex items-start gap-5 mb-6">
          <img
            src={`http://localhost:8000/api/providers/photo/${provider.id}`}
            className="w-20 h-20 rounded-full object-cover"
          />

          <div>
            <h2 className="text-xl font-bold text-gray-800">
              {provider.name}
            </h2>

            <p className="text-gray-500">{provider.specialty}</p>

            <span
              className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-semibold ${provider.status === "active"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
                }`}
            >
              {provider.status}
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {[
            {
              icon: <MapPin size={14} />,
              label: "Location",
              value: provider.location,
            },
            {
              icon: <Briefcase size={14} />,
              label: "Experience",
              value: provider.experience,
            },
            {
              icon: <Phone size={14} />,
              label: "Phone",
              value: provider.phone,
            },
            {
              icon: <Star size={14} />,
              label: "Rating",
              value: `${provider.rating} (${provider.reviews} reviews)`,
            },
          ].map((item) => (
            <div key={item.label} className="p-4 bg-gray-100 rounded-lg">
              <div className="flex items-center gap-2 text-gray-500 text-xs">
                {item.icon}
                {item.label}
              </div>
              <div className="font-semibold text-gray-800">
                {item.value}
              </div>
            </div>
          ))}
        </div>

        {/* Toggle */}
        <button
          onClick={toggleStatus}
          className={`px-6 py-2 rounded-lg font-semibold ${provider.status === "active"
              ? "bg-red-100 text-red-600"
              : "bg-green-100 text-green-600"
            }`}
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