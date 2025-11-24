import { useState } from "react";
import api from "../api/axios";

export default function Profile() {
  const [username, setUsername] = useState(localStorage.getItem("username") || "");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!username && !newPassword) {
      alert("Nothing to update");
      return;
    }

    if (newPassword && !oldPassword) {
      alert("Please enter your current password to change it");
      return;
    }

    setLoading(true);

    try {
      const res = await api.put("/users/profile", {
        username: username.trim(),
        oldPassword: oldPassword.trim(),
        newPassword: newPassword.trim(),
      });

      alert(res.data.message);

      // Update username in localStorage if changed
      if (username) localStorage.setItem("username", username);

      setOldPassword("");
      setNewPassword("");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-start bg-[#f0ead6] px-4 py-8">
      <div className="w-full max-w-md p-6 bg-[#f5f1e6] border border-[#4b3621] rounded-xl shadow-md font-serif">
        <h2 className="text-2xl font-bold text-[#4b3621] mb-6 text-center">
          Update Profile ✨
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div>
            <label className="block text-[#4b3621] mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter new username"
              className="w-full p-2 border border-[#4b3621] rounded-lg bg-[#f5f1e6] text-[#4b3621] focus:outline-none"
            />
          </div>

          {/* Old password */}
          <div>
            <label className="block text-[#4b3621] mb-1">Current Password</label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="Enter current password"
              className="w-full p-2 border border-[#4b3621] rounded-lg bg-[#f5f1e6] text-[#4b3621] focus:outline-none"
            />
          </div>

          {/* New password */}
          <div>
            <label className="block text-[#4b3621] mb-1">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full p-2 border border-[#4b3621] rounded-lg bg-[#f5f1e6] text-[#4b3621] focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-full bg-gradient-to-br from-[#a33c1e] to-[#7e1a0a] text-[#f5f1e6] font-serif shadow-md hover:scale-105 transform transition-transform duration-300"
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
  );
}
