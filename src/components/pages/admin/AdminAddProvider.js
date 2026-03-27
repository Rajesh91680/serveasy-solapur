import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

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

  // ================= HANDLE INPUT =================
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone" || name === "aadhaarNumber") {
      if (!/^\d*$/.test(value)) return;
    }

    setForm({ ...form, [name]: value });
    setError("");
  };

  // ================= IMAGE UPLOAD =================
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

  // ================= VALIDATION =================
  const validate = () => {
    if (form.name.trim().length < 3)
      return "Name must be at least 3 characters.";

    if (!form.specialty.trim()) return "Specialty is required.";
    if (!form.location.trim()) return "Location is required.";
    if (!form.experience.trim()) return "Experience is required.";

    if (form.phone.length !== 10)
      return "Phone number must be exactly 10 digits.";

    if (form.aadhaarNumber.length !== 12)
      return "Aadhaar number must be exactly 12 digits.";

    if (!form.photo) return "Provider photo is required.";
    if (!form.aadhaarImage) return "Aadhaar card image is required.";

    return null;
  };

  // ================= SAVE (FIXED API) =================
  const save = async () => {
    const validationError = validate();

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("specialty", form.specialty);
      formData.append("location", form.location);
      formData.append("experience", form.experience);
      formData.append("phone", form.phone);

      // ❌ REMOVE THIS (not in model)
      // formData.append("aadhaar_number", form.aadhaarNumber);

      formData.append("photo", form.photo);
      formData.append("aadhaar_image", form.aadhaarImage);

      formData.append("rating", 4.5);
      formData.append("reviews", 0);
      formData.append("status", "active");

      // ✅ CORRECT API
      const res = await fetch(
        "http://127.0.0.1:8000/api/providers/create",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      console.log("RESPONSE:", data);

      if (!res.ok) {
        setError(JSON.stringify(data));
        return;
      }

      alert("Provider added successfully ✅");

      navigate("/admin/providers");

    } catch (error) {
      console.error("Error saving provider:", error);
      setError("Failed to save provider");
    }
  };

  return (
    <div>
      {/* HEADER */}
      <div className="mb-6 flex items-center gap-3">
        <button
          onClick={() => navigate("/admin/providers")}
          className="flex items-center gap-1 text-sm text-gray-500"
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </button>

        <h1 className="text-2xl font-bold text-blue-900">
          Add New Provider
        </h1>
      </div>

      {/* FORM */}
      <div className="bg-white rounded-xl p-8 max-w-2xl shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <InputField label="Full Name" name="name" value={form.name} onChange={handleChange} />
          <InputField label="Specialty" name="specialty" value={form.specialty} onChange={handleChange} />
          <InputField label="Location" name="location" value={form.location} onChange={handleChange} />
          <InputField label="Experience" name="experience" value={form.experience} onChange={handleChange} />
          <InputField label="Phone (10 digits)" name="phone" value={form.phone} onChange={handleChange} maxLength={10} />
          <InputField label="Aadhaar Number (12 digits)" name="aadhaarNumber" value={form.aadhaarNumber} onChange={handleChange} maxLength={12} />

          {/* PHOTO */}
          <div>
            <label className="block mb-2 font-semibold">Provider Photo</label>
            <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, "photo")} />
            {form.photoPreview && (
              <img src={form.photoPreview} className="mt-3 w-24 h-24 rounded object-cover" />
            )}
          </div>

          {/* AADHAAR */}
          <div>
            <label className="block mb-2 font-semibold">Aadhaar Image</label>
            <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, "aadhaar")} />
            {form.aadhaarPreview && (
              <img src={form.aadhaarPreview} className="mt-3 w-24 h-24 rounded object-cover" />
            )}
          </div>
        </div>

        {/* ERROR */}
        {error && (
          <div className="mt-4 p-3 bg-red-100 text-red-600 rounded">
            ❌ {error}
          </div>
        )}

        {/* BUTTONS */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={save}
            className="px-6 py-2 rounded bg-blue-900 text-white"
          >
            Save Provider
          </button>

          <button
            onClick={() => navigate("/admin/providers")}
            className="px-6 py-2 rounded bg-gray-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

// INPUT COMPONENT
function InputField({ label, name, value, onChange, maxLength }) {
  return (
    <div>
      <label className="block mb-2 font-semibold">{label}</label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        className="w-full p-2 border rounded"
      />
    </div>
  );
}

export default AdminAddProvider;