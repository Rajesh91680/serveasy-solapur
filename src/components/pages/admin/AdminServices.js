import { useState, useEffect } from "react";
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
  const [services, setServices] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});
  const [search, setSearch] = useState("");

  // ================= LOAD FROM API =================
  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/services");
      const data = await res.json();
      setServices(data);
    } catch (error) {
      console.error("Error loading services:", error);
    }
  };

  // ================= FILTER =================
  const filtered = services.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.category.toLowerCase().includes(search.toLowerCase())
  );

  // ================= VALIDATION =================
  const validate = () => {
    let newErrors = {};

    if (!form.name.trim()) newErrors.name = "Service name is required";
    if (!form.category) newErrors.category = "Category is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ================= SAVE =================
  const save = async () => {
    if (!validate()) return;

    const url = editId
      ? `http://localhost:8000/api/services/update/${editId}`
      : "http://localhost:8000/api/services/create";

    const method = editId ? "PUT" : "POST";

    try {
      await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      await loadServices();

      setShowForm(false);
      setForm(empty);
      setEditId(null);
    } catch (error) {
      console.error("Error saving service:", error);
    }
  };

  // ================= DELETE =================
  const del = async (id) => {
    if (!window.confirm("Delete this service?")) return;

    try {
      await fetch(`http://localhost:8000/api/services/delete/${id}`, {
        method: "DELETE",
      });

      await loadServices();
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };

  // ================= FORM =================
  const openAdd = () => {
    setEditId(null);
    setForm(empty);
    setShowForm(true);
  };

  const openEdit = (service) => {
    setEditId(service.id);
    setForm(service);
    setShowForm(true);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-900">Services</h1>

        <button
          onClick={openAdd}
          className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg flex items-center gap-2 shadow"
        >
          <Plus size={16} /> Add Service
        </button>
      </div>

      {/* FORM */}
      {showForm && (
        <div className="bg-white p-6 mb-6 rounded-xl shadow-lg max-w-xl">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-700">
              {editId ? "Edit Service" : "Add Service"}
            </h2>

            <button onClick={() => setShowForm(false)}>
              <X className="text-gray-500" />
            </button>
          </div>

          <div className="space-y-3">
            <input
              placeholder="Service Name"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-400"
            />

            <select
              value={form.category}
              onChange={(e) =>
                setForm({ ...form, category: e.target.value })
              }
              className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select Category</option>
              {CATS.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>

            <input
              placeholder="Description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-400"
            />

            <button
              onClick={save}
              className="w-full bg-blue-900 hover:bg-blue-800 text-white py-2 rounded-lg font-semibold"
            >
              {editId ? "Update Service" : "Save Service"}
            </button>
          </div>
        </div>
      )}

      {/* TABLE CARD */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-4 flex justify-between items-center border-b">
          <span className="font-semibold text-gray-600">
            All Services ({filtered.length})
          </span>

          <input
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-3 py-1 rounded-lg focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-3 text-left">Service</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((s) => (
              <tr key={s.id} className="border-t hover:bg-gray-50">
                <td className="p-3 font-medium">{s.name}</td>
                <td className="p-3">{s.category}</td>

                <td className="p-3">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      s.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {s.status}
                  </span>
                </td>

                <td className="p-3 flex gap-3">
                  <button
                    onClick={() => openEdit(s)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Edit2 size={16} />
                  </button>

                  <button
                    onClick={() => del(s.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="text-center py-10 text-gray-400">
            No services found
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminServices;