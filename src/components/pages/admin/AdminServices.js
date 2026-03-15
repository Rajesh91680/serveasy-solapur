import { useState } from "react";
import { Plus, Edit2, Trash2, X } from "lucide-react";
import { getServices, saveServices } from "../../../services/store";

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
  const [services, setServices] = useState(getServices() || []);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});
  const [search, setSearch] = useState("");

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
      const duplicate = services.find(
        (s) =>
          s.name.toLowerCase() === form.name.toLowerCase() &&
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

  /* ================= SAVE ================= */

  const save = () => {
    if (!validate()) return;

    if (editId) {
      const updated = services.map((s) =>
        s.id === editId ? { ...s, ...form } : s
      );
      saveServices(updated);
      setServices(updated);
    } else {
      const newService = {
        id:
          form.name.toLowerCase().replace(/\s+/g, "-") +
          "-" +
          Date.now(),
        ...form,
        createdAt: new Date().toISOString(),
      };

      const updated = [newService, ...services];
      saveServices(updated);
      setServices(updated);
    }

    setShowForm(false);
    setForm(empty);
    setEditId(null);
    setErrors({});
  };

  /* ================= DELETE ================= */

  const del = (id) => {
    if (!window.confirm("Delete this service?")) return;

    const updated = services.filter((s) => s.id !== id);
    saveServices(updated);
    setServices(updated);
  };

  /* ================= FORM OPEN ================= */

  const openAdd = () => {
    setEditId(null);
    setForm(empty);
    setErrors({});
    setShowForm(true);
  };

  const openEdit = (service) => {
    setEditId(service.id);
    setForm(service);
    setErrors({});
    setShowForm(true);
  };

  return (
    <div>
      {/* HEADER */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-blue-900">Services</h1>

        <button
          onClick={openAdd}
          className="bg-orange-500 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <Plus size={16} /> Add Service
        </button>
      </div>

      {/* ADD / EDIT FORM */}
      {showForm && (
        <div className="bg-white rounded-xl p-6 mb-6 shadow">
          <div className="flex justify-between mb-4">
            <h2 className="font-bold text-lg">
              {editId ? "Edit" : "Add"} Service
            </h2>

            <button onClick={() => setShowForm(false)}>
              <X />
            </button>
          </div>

          <div className="grid gap-4">
            {/* SERVICE NAME */}
            <div>
              <label className="block mb-1 font-semibold">
                Service Name *
              </label>

              <input
                value={form.name}
                onChange={(e) => {
                  setForm({ ...form, name: e.target.value });
                  setErrors({ ...errors, name: null });
                }}
                className={`w-full border-2 p-2 rounded ${
                  errors.name ? "border-red-500" : "border-gray-200"
                }`}
              />

              {errors.name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.name}
                </p>
              )}
            </div>

            {/* CATEGORY */}
            <div>
              <label className="block mb-1 font-semibold">
                Category *
              </label>

              <select
                value={form.category}
                onChange={(e) => {
                  setForm({ ...form, category: e.target.value });
                  setErrors({ ...errors, category: null });
                }}
                className={`w-full border-2 p-2 rounded ${
                  errors.category
                    ? "border-red-500"
                    : "border-gray-200"
                }`}
              >
                <option value="">Select</option>

                {CATS.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>

              {errors.category && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.category}
                </p>
              )}
            </div>

            {/* DESCRIPTION */}
            <div>
              <label className="block mb-1 font-semibold">
                Description
              </label>

              <input
                value={form.description}
                onChange={(e) => {
                  setForm({
                    ...form,
                    description: e.target.value,
                  });
                  setErrors({ ...errors, description: null });
                }}
                className={`w-full border-2 p-2 rounded ${
                  errors.description
                    ? "border-red-500"
                    : "border-gray-200"
                }`}
              />

              {errors.description && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.description}
                </p>
              )}
            </div>

            {/* STATUS */}
            <div>
              <label className="block mb-1 font-semibold">
                Status
              </label>

              <select
                value={form.status}
                onChange={(e) =>
                  setForm({ ...form, status: e.target.value })
                }
                className="w-full border-2 p-2 rounded border-gray-200"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <button
              onClick={save}
              className="bg-blue-900 text-white py-2 rounded font-semibold"
            >
              {editId ? "Update Service" : "Save Service"}
            </button>
          </div>
        </div>
      )}

      {/* SERVICES TABLE */}
      <div className="bg-white rounded-xl shadow">
        <div className="p-4 flex justify-between">
          <span>All Services ({filtered.length})</span>

          <input
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-2 rounded"
          />
        </div>

        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="p-3 text-left text-xs">Service</th>
              <th className="p-3 text-left text-xs">Category</th>
              <th className="p-3 text-left text-xs">Status</th>
              <th className="p-3 text-left text-xs">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((s) => (
              <tr
                key={s.id}
                className="border-t hover:bg-gray-50"
              >
                <td className="p-3 font-semibold">{s.name}</td>

                <td className="p-3">{s.category}</td>

                <td className="p-3">
                  <span
                    className={
                      s.status === "active"
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {s.status}
                  </span>
                </td>

                <td className="p-3">
                  <button
                    onClick={() => openEdit(s)}
                    className="mr-2 text-blue-600"
                  >
                    <Edit2 size={16} />
                  </button>

                  <button
                    onClick={() => del(s.id)}
                    className="text-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminServices;