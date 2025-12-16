"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Transaction = {
  _id: string;
  type: "credit" | "debit";
  amount: number;
  from: string;
  to: string;
  createdAt: string;
};

export default function HistoryPage() {
  const router = useRouter();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) {
      router.replace("/login");
      return;
    }

    const { accountNumber } = JSON.parse(currentUser);
    fetchTransactions(accountNumber);
  }, []);

  const fetchTransactions = async (accountNumber: string) => {
    try {
      // 🔴 CHANGE THIS URL ONLY if your API path is different
      const res = await fetch(
        `/api/transactions?accountNumber=${accountNumber}`
      );

      const data = await res.json();
      setTransactions(data.transactions || data);
    } catch (err) {
      console.error("Failed to load transactions");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
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
        <h1 className="text-2xl font-semibold">Transaction History</h1>
        <p className="text-sm opacity-90">
          All transactions linked to your account
        </p>
      </div>

      {/* TRANSACTIONS */}
      {transactions.length === 0 ? (
        <div className="bg-white rounded-xl p-6 text-center text-gray-500">
          No transactions found
        </div>
      ) : (
        <div className="space-y-3">
          {transactions.map((tx) => {
            const isCredit =
              tx.to ===
              JSON.parse(localStorage.getItem("currentUser") || "{}")
                .accountNumber;

            return (
              <div
                key={tx._id}
                className="bg-white rounded-xl border shadow-sm p-4 flex justify-between items-center"
              >
                <div>
                  <p className="font-medium">
                    {isCredit ? "Money Credited" : "Money Debited"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {isCredit ? `From: ${tx.from}` : `To: ${tx.to}`}
                  </p>
                  <p className="text-xs text-gray-400">
                    {new Date(tx.createdAt).toLocaleString()}
                  </p>
                </div>

                <div
                  className={`font-semibold ${
                    isCredit ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {isCredit ? "+" : "-"}₹{tx.amount.toLocaleString()}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
