"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type User = {
  name: string;
  accountNumber: string;
  balance: number;
  createdAt?: string;
};

export default function AccountPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) {
      router.replace("/login");
      return;
    }

    const parsed = JSON.parse(currentUser);
    fetchUser(parsed.accountNumber);
  }, []);

  const fetchUser = async (accountNumber: string) => {
    const res = await fetch("/api/account", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ accountNumber }),
    });
    const data = await res.json();
    setUser(data);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto min-h-screen bg-gray-50 pt-20 pb-10 px-4 space-y-6">
      {/* HEADER */}
      <div className="bg-linear-to-r from-blue-600 to-blue-500 text-white rounded-xl p-6">
        <p className="text-sm opacity-90">Account Holder</p>
        <h1 className="text-2xl font-semibold">{user?.name}</h1>
        <p className="text-xs mt-1 opacity-90">
          Account No: {user?.accountNumber}
        </p>
      </div>

      {/* ACCOUNT SUMMARY */}
      <div className="bg-white rounded-xl shadow border p-6 space-y-4">
        <InfoRow label="Account Holder Name" value={user?.name} />
        <InfoRow label="Account Number" value={user?.accountNumber} />
        <InfoRow
          label="Available Balance"
          value={`₹${user?.balance?.toLocaleString()}`}
          highlight
        />
        <InfoRow label="Account Type" value="Savings Account" />
        <InfoRow label="Account Status" value="Active" />
        {user?.createdAt && (
          <InfoRow
            label="Account Opened On"
            value={new Date(user.createdAt).toLocaleDateString()}
          />
        )}
      </div>

      {/* SECURITY INFO */}
      <div className="bg-white rounded-xl shadow border p-6 space-y-3">
        <h2 className="text-lg font-semibold">Security Information</h2>

        <InfoRow label="KYC Status" value="Verified" />
        <InfoRow label="Two-Factor Authentication" value="Enabled" />
        <InfoRow label="Last Login" value="Today" />
      </div>

      {/* BANK INFO / FOOTER CARD */}
      <div className="bg-white rounded-xl shadow border p-6 space-y-2 text-sm text-gray-600">
        <p>This account is protected with bank-grade security protocols.</p>
        <p>
          For any suspicious activity, contact customer support immediately.
        </p>
        <p className="text-xs text-gray-400 pt-2">
          © 2025 Your Bank. All rights reserved.
        </p>
      </div>
    </div>
  );
}

function InfoRow({
  label,
  value,
  highlight,
}: {
  label: string;
  value?: string | number;
  highlight?: boolean;
}) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-sm text-gray-500">{label}</span>
      <span
        className={`font-medium ${highlight ? "text-green-600 text-lg" : ""}`}
      >
        {value || "-"}
      </span>
    </div>
  );
}
