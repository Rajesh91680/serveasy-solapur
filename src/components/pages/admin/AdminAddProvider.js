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

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone" || name === "aadhaarNumber") {
      if (!/^\d*$/.test(value)) return;
    }
    setForm({ ...form, [name]: value });
    setError("");
  };

  const handleImageUpload = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      if (type === "photo") {
        setForm((prev) => ({ ...prev, photo: file, photoPreview: reader.result }));
      } else {
        setForm((prev) => ({ ...prev, aadhaarImage: file, aadhaarPreview: reader.result }));
      }
    };
    reader.readAsDataURL(file);
  };

  const validate = () => {
    if (form.name.trim().length < 3) return "Name must be at least 3 characters.";
    if (form.phone.length !== 10) return "Phone number must be exactly 10 digits.";
    return null;
  };

  // UPDATED SAVE FUNCTION: Sends data to Django PostgreSQL instead of localStorage
const save = async () => {
  const validationError = validate();
  if (validationError) {
    setError(validationError);
    return;
  }

  const formData = new FormData();
  formData.append("name", form.name);
  formData.append("specialty", form.specialty);
  formData.append("location", form.location);
  formData.append("experience", form.experience);
  formData.append("phone", form.phone);
  formData.append("photo", form.photo);
  formData.append("aadhaar_image", form.aadhaarImage);
  formData.append("status", "active");

  try {
    const response = await fetch("http://localhost:8000/api/providers", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      alert("Provider saved successfully!");
      navigate("/admin/providers");
    } else {
      const err = await response.json();
      setError(err.error || "Failed to save.");
    }
  } catch (err) {
    setError("Cannot connect to Django server.");
  }
};

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center gap-3">
        <button onClick={() => navigate("/admin/providers")} className="flex items-center gap-1 text-gray-500">
          <ChevronLeft className="w-4 h-4" /> Back
        </button>
        <h1 className="text-2xl font-bold text-blue-900">Add New Provider</h1>
      </div>

      <div className="bg-white rounded-xl p-8 max-w-2xl shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <InputField label="Full Name" name="name" value={form.name} onChange={handleChange} />
          <InputField label="Specialty" name="specialty" value={form.specialty} onChange={handleChange} />
          <InputField label="Location" name="location" value={form.location} onChange={handleChange} />
          <InputField label="Experience" name="experience" value={form.experience} onChange={handleChange} />
          <InputField label="Phone (10 digits)" name="phone" value={form.phone} onChange={handleChange} maxLength={10} />
          <InputField label="Aadhaar Number" name="aadhaarNumber" value={form.aadhaarNumber} onChange={handleChange} maxLength={12} />
          
          <div>
            <label className="block text-sm font-semibold mb-2">Provider Photo</label>
            <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, "photo")} />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Aadhaar Card</label>
            <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, "aadhaar")} />
          </div>
        </div>

        {error && <div className="mt-4 p-3 bg-red-100 text-red-600 rounded-lg">❌ {error}</div>}

        <div className="flex gap-3 mt-6">
          <button onClick={save} className="px-6 py-2.5 bg-blue-900 text-white rounded-lg font-semibold">Save Provider</button>
          <button onClick={() => navigate("/admin/providers")} className="px-6 py-2.5 bg-gray-100 text-gray-600 rounded-lg font-semibold">Cancel</button>
        </div>
      </div>
    </div>
  );
}

function InputField({ label, name, value, onChange, maxLength }) {
  return (
    <div>
      <label className="block text-sm font-semibold mb-2">{label}</label>
      <input type="text" name={name} value={value} onChange={onChange} maxLength={maxLength} className="w-full px-4 py-2 border rounded-lg outline-none" />
    </div>
  );
}

export default AdminAddProvider;