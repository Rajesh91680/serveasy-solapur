import { useState } from "react";
import { Check } from "lucide-react";
import {
  getUsers,
  saveUsers,
  setCurrentUser,
  getCurrentUser,
} from "../../../services/store";

function AdminSettings() {
  const cu = getCurrentUser();

  const [name, setName] = useState(cu?.name || "Admin");
  const [saved, setSaved] = useState(false);

  const save = () => {
    const users = getUsers();

    const updated = users.map((u) =>
      u.id === cu?.id ? { ...u, name: name.trim() } : u
    );

    saveUsers(updated);

    if (cu) {
      setCurrentUser({ ...cu, name: name.trim() });
    }

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2000);
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1
          style={{
            color: "#1A3C6E",
            fontSize: "28px",
            fontWeight: 700,
          }}
        >
          Settings
        </h1>
      </div>

      {/* Card */}
      <div
        className="bg-white rounded-xl p-8 max-w-xl"
        style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}
      >
        <h2
          style={{
            fontWeight: 700,
            color: "#1e293b",
            marginBottom: "20px",
            fontSize: "16px",
          }}
        >
          Admin Profile
        </h2>

        <div className="space-y-4">
          {/* Name */}
          <div>
            <label
              className="block text-sm font-semibold mb-2"
              style={{ color: "#374151" }}
            >
              Display Name
            </label>

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border-2 border-gray-200 outline-none text-sm"
            />
          </div>

          {/* Email */}
          <div>
            <label
              className="block text-sm font-semibold mb-2"
              style={{ color: "#374151" }}
            >
              Email
            </label>

            <input
              value={cu?.email || "admin@gmail.com"}
              disabled
              className="w-full px-4 py-2.5 rounded-lg border-2 border-gray-100 text-sm bg-gray-50 text-gray-400"
            />
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={save}
          className="mt-6 flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold text-white"
          style={{ background: "#1A3C6E" }}
        >
          <Check className="w-4 h-4" />
          {saved ? "Saved! ✅" : "Save Changes"}
        </button>
      </div>
    </div>
  );
}

export default AdminSettings;