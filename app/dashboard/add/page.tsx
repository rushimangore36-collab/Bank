"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AddMoneyPage() {
  const router = useRouter();

  const [amount, setAmount] = useState("");
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Load logged-in user
  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) {
      router.replace("/login");
      return;
    }
    setUser(JSON.parse(currentUser));
  }, []);

  const handleAddMoney = async () => {
    if (!amount || Number(amount) <= 0) {
      alert("Enter a valid amount");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          accountNumber: user.accountNumber,
          amount: Number(amount),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to add money");
        return;
      }

      alert("Money added successfully");
      setAmount("");
    } catch (err) {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-gray-50 pt-20 px-4">
      {/* Card */}
      <div className="bg-white rounded-xl shadow border p-6">
        <h1 className="text-xl font-semibold mb-1">Add Money</h1>
        <p className="text-sm text-gray-500 mb-6">
          Account No: {user?.accountNumber}
        </p>

        {/* Amount Input */}
        <label className="text-sm font-medium">Amount</label>
        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full mt-2 mb-4 px-4 py-2 border rounded-lg focus:ring-1 focus:ring-blue-500 outline-none"
        />

        {/* Quick Amount Buttons */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[500, 1000, 2000].map((amt) => (
            <button
              key={amt}
              onClick={() => setAmount(String(amt))}
              className="border rounded-lg py-2 text-sm hover:bg-gray-100"
            >
              ₹{amt}
            </button>
          ))}
        </div>

        {/* Add Button */}
        <button
          onClick={handleAddMoney}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add Money"}
        </button>
      </div>
    </div>
  );
}
