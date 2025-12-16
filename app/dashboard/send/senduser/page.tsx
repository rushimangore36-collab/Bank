"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type SelectedUser = {
  name: string;
  accountNumber: string;
};

type Transaction = {
  _id: string;
  from: string;
  to: string;
  amount: number;
  createdAt: string;
};

export default function SendMoneyPage() {
  const [amount, setAmount] = useState("");
  const [user, setUser] = useState<SelectedUser | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [currentUser, setCurrentUser] = useState<{
    accountNumber: string;
  } | null>(null);

  // Load selected user
  useEffect(() => {
    const cu = JSON.parse(localStorage.getItem("currentUser") || "{}");
    setCurrentUser(cu);
    const selectedUser = localStorage.getItem("selectedUser");
    if (selectedUser) {
      const parsed = JSON.parse(selectedUser);
      setUser({
        name: parsed.name,
        accountNumber: parsed.accountNumber,
      });
    }
  }, []);

  // Fetch transactions when user is ready
  useEffect(() => {
    if (user) {
      getTransactions();
    }
  }, [user]);

  const handleSend = async () => {
    if (!amount || !user) return;
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
    await fetch("/api/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        from: currentUser.accountNumber,
        to: user.accountNumber,
        amount: Number(amount),
      }),
    });

    setAmount("");
    getTransactions();
  };

  const getTransactions = async () => {
    const res = await fetch(
      `/api/transactions?accountNumber=${user?.accountNumber}`
    );
    const data = await res.json();
    setTransactions(data.transactions);
  };

  return (
    <div className="max-w-md mx-auto h-150 bg-gray-50 flex flex-col pt-16">
      {/* TOP BAR */}
      <div className="bg-white border-b px-4 py-3 flex justify-between">
        <div>
          <div className="font-semibold text-lg">{user?.name}</div>
          <div className="text-sm text-gray-500">
            A/C: {user?.accountNumber}
          </div>
        </div>
        <Link className="pt-3 pr-3 text-gray-500" href="/dashboard/send">
          Back &gt;
        </Link>
      </div>

      {/* TRANSACTIONS */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {transactions.length === 0 ? (
          <p className="text-center text-gray-400 text-sm">
            No transactions yet
          </p>
        ) : (
          transactions.map((tx) => (
            <div
              key={tx._id}
              className="bg-white mb-3 p-3 rounded-lg flex justify-between"
            >
              <div>
                <div className="text-sm font-medium">
                  {tx.from === currentUser?.accountNumber ? "Sent" : "Received"}
                </div>
                <div className="text-xs text-gray-500">
                  {new Date(tx.createdAt).toLocaleString()}
                </div>
              </div>

              <div
                className={`font-semibold ${
                  tx.from === currentUser?.accountNumber
                    ? "text-red-600"
                    : "text-green-600"
                }`}
              >
                ₹{tx.amount}
              </div>
            </div>
          ))
        )}
      </div>

      {/* BOTTOM BAR */}
      <div className="bg-white border-t px-4 py-3 flex gap-2">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          className="flex-1 border rounded-lg px-3 py-2"
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-4 rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
}
