"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type User = {
  name: string;
  accountNumber: string;
};

export default function EditProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) {
      router.replace("/login");
      return;
    }

    const parsed = JSON.parse(currentUser);
    setUser(parsed);
    setName(parsed.name || "");
  }, []);

  const handleSave = async () => {
    if (!name.trim()) {
      alert("Name cannot be empty");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          accountNumber: user?.accountNumber,
          name,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Update failed");
        return;
      }

      // Update localStorage
      const updatedUser = {
        ...user,
        name,
      };
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
      alert("Profile updated successfully");
      router.replace("/dashboard");
    } catch (err) {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto min-h-screen bg-gray-50 pt-20 pb-10 px-4">
      {/* HEADER */}
      <div className="bg-linear-to-r from-blue-600 to-blue-500 text-white rounded-xl p-6 mb-6">
        <h1 className="text-xl font-semibold">Edit Profile</h1>
        <p className="text-sm opacity-90">Update your personal information</p>
      </div>

      {/* FORM */}
      <div className="bg-white rounded-xl shadow border p-6 space-y-4">
        {/* Account Number (Read-only) */}
        <div>
          <label className="text-sm text-gray-500">Account Number</label>
          <input
            value={user.accountNumber}
            disabled
            className="w-full mt-1 px-4 py-2 border rounded-lg bg-gray-100 text-gray-600"
          />
        </div>

        {/* Name */}
        <div>
          <label className="text-sm text-gray-500">Full Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-1 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
