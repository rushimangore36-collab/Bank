"use client";

import { get } from "http";
import { useEffect, useState } from "react";

export default function WithdrawPage() {
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [user, setUser] = useState<any>(null);
  const [withdraws, setWithdraws] = useState<any[]>([]);
  const [balance, setBalance] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  // Load user once
  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      const parsedUser = JSON.parse(currentUser);
      setUser(parsedUser);
      fetchBalance(parsedUser.accountNumber);
    }
    getWithdraws();
  }, []);

  useEffect(() => {
    if (user) {
      getWithdraws();
    }
  }, [user]);

  // Fetch balance
  const fetchBalance = async (accountNumber: string) => {
    const res = await fetch("/api/balance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ accountNumber }),
    });

    const data = await res.json();
    setBalance(data.balance);
  };

  const handleWithdraw = async () => {
    const amount = Number(withdrawAmount);

    if (!amount || amount <= 0) {
      alert("Enter valid amount");
      return;
    }

    if (amount > balance) {
      alert("Insufficient balance");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/withdraw", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        accountNumber: user.accountNumber,
        amount,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Withdrawal failed");
      setLoading(false);
      return;
    }

    // Update balance in UI
    const newBalance = balance - amount;
    setBalance(newBalance);

    const updatedUser = { ...user, balance: newBalance };
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    setUser(updatedUser);

    setWithdrawAmount("");
    setLoading(false);
    alert("Withdrawal successful");
    getWithdraws();
  };

  const getWithdraws = async () => {
    const res = await fetch(
      `/api/withdraw?accountNumber=${user?.accountNumber}`
    );
    const data = await res.json();
    setWithdraws(data.withdraws);
  };

  if (!user) {
    return <p className="text-center pt-20">Loading...</p>;
  }

  return (
    <div className="max-w-md mx-auto min-h-screen bg-gray-50 pt-20 px-4 pb-10">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <p className="text-lg font-semibold">{user.name}</p>
        <p className="text-sm text-gray-500">A/C: {user.accountNumber}</p>
        <p className="mt-2 text-green-600 font-medium">Balance: ₹{balance}</p>
      </div>

      {/* Withdraw Card */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Withdraw Money</h2>

        <input
          type="number"
          placeholder="Enter amount"
          value={withdrawAmount}
          onChange={(e) => setWithdrawAmount(e.target.value)}
          className="w-full border rounded-lg px-4 py-3 mb-4 outline-none focus:ring-2 focus:ring-red-500"
        />

        <button
          onClick={handleWithdraw}
          disabled={loading}
          className="w-full bg-red-600 text-white py-3 rounded-lg font-medium hover:bg-red-700 transition disabled:opacity-50"
        >
          {loading ? "Processing..." : "Withdraw"}
        </button>
      </div>
      <div className="bg-white rounded-xl shadow-sm mt-6">
        <h3 className="text-lg font-semibold px-4 py-3 border-b">
          Withdrawal History
        </h3>

        {withdraws.length === 0 ? (
          <p className="text-center text-gray-500 py-6">No withdrawals yet</p>
        ) : (
          <div className="divide-y">
            {withdraws.map((withdraw) => (
              <div
                key={withdraw._id}
                className="flex justify-between items-center px-4 py-3"
              >
                <div>
                  <p className="font-medium text-gray-800">
                    ₹{withdraw.amount}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(withdraw.createdAt).toLocaleString()}
                  </p>
                </div>

                <span className="text-red-600 font-semibold">Debit</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
