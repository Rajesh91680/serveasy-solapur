import React, { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, X } from "lucide-react";

const CATS = [
  "Appliances",
  "Electrical",
  "Plumbing",
  "Cleaning",
  "Carpentry",
  "Pest",
  "Beauty",
  "Other",
];

const empty = {
  name: "",
  category: "",
  description: "",
  status: "active",
};

function AdminServices() {
  const [services, setServices] = useState([]); // Initialize with empty array
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000/api";

  // ✅ 1. FETCH SERVICES: Load from PostgreSQL on page load
  useEffect(() => {
    fetchServices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch(`${API_URL}/services/all`);
      if (response.ok) {
        const data = await response.json();
        setServices(data); // Put database data into state
      }
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setLoading(false);
    }
  };

  const filtered = services.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.category.toLowerCase().includes(search.toLowerCase())
  );

  /* ================= VALIDATION ================= */
  const validate = () => {
    let newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Service name is required";
    } else if (form.name.trim().length < 3) {
      newErrors.name = "Minimum 3 characters required";
    } else {
      // Check if service name already exists (ignoring the one currently being edited)
      const duplicate = services.find(
        (s) =>
          s.name.toLowerCase() === form.name.trim().toLowerCase() &&
          s.id !== editId
      );
      if (duplicate) newErrors.name = "Service already exists";
    }

    if (!form.category) {
      newErrors.category = "Category is required";
    }

    if (form.description && form.description.trim().length < 5) {
      newErrors.description = "Minimum 5 characters required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ================= SAVE (POST / PUT) ================= */
  const save = async () => {
    if (!validate()) return;

    // Decide if we are Creating (POST) or Updating (PUT)
    const url = editId ? `${API_URL}/services/${editId}` : `${API_URL}/services`;
    const method = editId ? "PUT" : "POST";

    try {
      // We use JSON here instead of FormData because there are no images attached to services
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        alert(editId ? "Service updated in DB!" : "Service added to DB!");
        fetchServices(); // Refresh the list from the database
        
        // Reset the form UI
        setShowForm(false);
        setForm(empty);
        setEditId(null);
        setErrors({});
      } else {
        const errorData = await response.json();
        console.error("Backend Error:", errorData);
        alert("Failed to save service. Check console.");
      }
    } catch (error) {
      console.error("Connection error:", error);
      alert("Cannot connect to Django Server.");
    }
  };

  /* ================= DELETE ================= */
  const del = async (id) => {
    if (!window.confirm("Are you sure you want to delete this service from the database?")) return;

    try {
      // Send DELETE request to Django
      const response = await fetch(`${API_URL}/services/delete/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchServices(); // Refresh list to remove the deleted item
      } else {
        alert("Failed to delete service.");
      }
    } catch (error) {
      console.error("Connection error:", error);
    }
  };

  /* ================= FORM OPENERS ================= */
  const openAdd = () => {
    setEditId(null);
    setForm(empty);
    setErrors({});
    setShowForm(true);
  };

  const openEdit = (service) => {
    setEditId(service.id);
    setForm({
      name: service.name,
      category: service.category,
      description: service.description,
      status: service.status,
    });
    setErrors({});
    setShowForm(true);
  };

  return (
    <div>
      {/* HEADER */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-blue-900">Services Catalog</h1>

        <button
          onClick={openAdd}
          className="bg-orange-500 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-orange-600 transition-colors"
        >
          <Plus size={16} /> Add Service
        </button>
      </div>

      {/* ADD / EDIT FORM */}
      {showForm && (
        <div className="bg-white rounded-xl p-6 mb-6 shadow border border-gray-100">
          <div className="flex justify-between mb-4">
            <h2 className="font-bold text-lg text-gray-800">
              {editId ? "Edit" : "Add"} Service
            </h2>

            <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600">
              <X />
            </button>
          </div>

          <div className="grid gap-4">
            {/* SERVICE NAME */}
            <div>
              <label className="block mb-1 font-semibold text-sm text-gray-700">
                Service Name *
              </label>

              <input
                value={form.name}
                onChange={(e) => {
                  setForm({ ...form, name: e.target.value });
                  setErrors({ ...errors, name: null });
                }}
                className={`w-full border-2 p-2 rounded outline-none ${
                  errors.name ? "border-red-500" : "border-gray-200 focus:border-blue-500"
                }`}
              />

              {errors.name && (
                <p className="text-red-500 text-xs mt-1 font-medium">
                  {errors.name}
                </p>
              )}
            </div>

            {/* CATEGORY */}
            <div>
              <label className="block mb-1 font-semibold text-sm text-gray-700">
                Category *
              </label>

              <select
                value={form.category}
                onChange={(e) => {
                  setForm({ ...form, category: e.target.value });
                  setErrors({ ...errors, category: null });
                }}
                className={`w-full border-2 p-2 rounded outline-none ${
                  errors.category
                    ? "border-red-500"
                    : "border-gray-200 focus:border-blue-500"
                }`}
              >
                <option value="">Select Category</option>

                {CATS.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>

              {errors.category && (
                <p className="text-red-500 text-xs mt-1 font-medium">
                  {errors.category}
                </p>
              )}
            </div>

            {/* DESCRIPTION */}
            <div>
              <label className="block mb-1 font-semibold text-sm text-gray-700">
                Description
              </label>

              <input
                value={form.description}
                onChange={(e) => {
                  setForm({ ...form, description: e.target.value });
                  setErrors({ ...errors, description: null });
                }}
                className={`w-full border-2 p-2 rounded outline-none ${
                  errors.description
                    ? "border-red-500"
                    : "border-gray-200 focus:border-blue-500"
                }`}
              />

              {errors.description && (
                <p className="text-red-500 text-xs mt-1 font-medium">
                  {errors.description}
                </p>
              )}
            </div>

            {/* STATUS */}
            <div>
              <label className="block mb-1 font-semibold text-sm text-gray-700">
                Status
              </label>

              <select
                value={form.status}
                onChange={(e) =>
                  setForm({ ...form, status: e.target.value })
                }
                className="w-full border-2 p-2 rounded border-gray-200 outline-none focus:border-blue-500"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <button
              onClick={save}
              className="bg-blue-900 text-white py-2.5 mt-2 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
            >
              {editId ? "Update Service in DB" : "Save Service to DB"}
            </button>
          </div>
        </div>
      )}

      {/* SERVICES TABLE */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="p-5 flex justify-between items-center border-b border-gray-100">
          <span className="font-semibold text-gray-800">
            {loading ? "Loading..." : `All Services (${filtered.length})`}
          </span>

          <input
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border-2 border-gray-200 p-2 rounded-lg outline-none focus:border-blue-500 text-sm w-64"
          />
        </div>

        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="p-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Service</th>
              <th className="p-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
              <th className="p-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="p-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((s) => (
              <tr
                key={s.id}
                className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
              >
                <td className="p-4 font-semibold text-gray-800">{s.name}</td>

                <td className="p-4 text-gray-600">{s.category}</td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      s.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {s.status.toUpperCase()}
                  </span>
                </td>

                <td className="p-4 flex gap-3">
                  <button
                    onClick={() => openEdit(s)}
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                    title="Edit"
                  >
                    <Edit2 size={18} />
                  </button>

                  <button
                    onClick={() => del(s.id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
            
            {!loading && filtered.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-8 text-gray-500">
                  No services found in PostgreSQL.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminServices;