import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { getProviders, saveProviders } from "../../../services/store";

function AdminAddProvider() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    specialty: "",
    location: "",
    experience: "",
    phone: "",
    aadhaarNumber: "",
    photo: null,
    photoPreview: null,
    aadhaarImage: null,
    aadhaarPreview: null,
  });

  const [error, setError] = useState("");

  // Handle text input
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone" || name === "aadhaarNumber") {
      if (!/^\d*$/.test(value)) return;
    }

    setForm({ ...form, [name]: value });
    setError("");
  };

  // Handle image upload
  const handleImageUpload = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Only image files are allowed.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setError("Image size must be less than 2MB.");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      if (type === "photo") {
        setForm((prev) => ({
          ...prev,
          photo: file,
          photoPreview: reader.result,
        }));
      } else {
        setForm((prev) => ({
          ...prev,
          aadhaarImage: file,
          aadhaarPreview: reader.result,
        }));
      }
    };

    reader.readAsDataURL(file);
    setError("");
  };

  const validate = () => {
    if (form.name.trim().length < 3) return "Name must be at least 3 characters.";

    if (!form.specialty.trim()) return "Specialty is required.";

    if (!form.location.trim()) return "Location is required.";

    if (!form.experience.trim()) return "Experience is required.";

    if (form.phone.length !== 10) return "Phone number must be exactly 10 digits.";

    if (form.aadhaarNumber.length !== 12)
      return "Aadhaar number must be exactly 12 digits.";

    if (!form.photo) return "Provider photo is required.";

    if (!form.aadhaarImage) return "Aadhaar card image is required.";

    return null;
  };

  const save = () => {
    const validationError = validate();

    if (validationError) {
      setError(validationError);
      return;
    }

    const newProvider = {
      ...form,
      id: Date.now(),
      rating: 4.5,
      reviews: 0,
      available: true,
      status: "active",
    };

    saveProviders([...getProviders(), newProvider]);
    navigate("/admin/providers");
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
          Add New Provider
        </h1>
      </div>

      {/* Form Card */}
      <div
        className="bg-white rounded-xl p-8 max-w-2xl"
        style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <InputField
            label="Full Name"
            name="name"
            value={form.name}
            onChange={handleChange}
          />

          <InputField
            label="Specialty"
            name="specialty"
            value={form.specialty}
            onChange={handleChange}
          />

          <InputField
            label="Location"
            name="location"
            value={form.location}
            onChange={handleChange}
          />

          <InputField
            label="Experience"
            name="experience"
            value={form.experience}
            onChange={handleChange}
          />

          <InputField
            label="Phone (10 digits)"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            maxLength={10}
          />

          <InputField
            label="Aadhaar Number (12 digits)"
            name="aadhaarNumber"
            value={form.aadhaarNumber}
            onChange={handleChange}
            maxLength={12}
          />

          {/* Provider Photo */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Provider Photo
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, "photo")}
            />

            {form.photoPreview && (
              <img
                src={form.photoPreview}
                alt="Provider"
                className="mt-3 w-24 h-24 rounded-lg object-cover border"
              />
            )}
          </div>

          {/* Aadhaar Card Upload */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Upload Aadhaar Card
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, "aadhaar")}
            />

            {form.aadhaarPreview && (
              <img
                src={form.aadhaarPreview}
                alt="Aadhaar"
                className="mt-3 w-24 h-24 rounded-lg object-cover border"
              />
            )}
          </div>
        </div>

        {/* Error */}
        {error && (
          <div
            className="mt-4 p-3 rounded-lg text-sm"
            style={{ background: "#FEE2E2", color: "#DC2626" }}
          >
            ❌ {error}
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={save}
            className="px-6 py-2.5 rounded-lg font-semibold text-white"
            style={{ background: "#1A3C6E" }}
          >
            Save Provider
          </button>

          <button
            onClick={() => navigate("/admin/providers")}
            className="px-6 py-2.5 rounded-lg font-semibold"
            style={{ background: "#F1F5F9", color: "#64748B" }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

/* Reusable Input */
function InputField({ label, name, value, onChange, maxLength }) {
  return (
    <div>
      <label className="block text-sm font-semibold mb-2">{label}</label>

      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        className="w-full px-4 py-2.5 rounded-lg border-2 border-gray-200 outline-none text-sm"
      />
    </div>
  );
}

export default AdminAddProvider;