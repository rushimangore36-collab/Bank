"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [accountNumber, setAccountNumber] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (!user) {
      router.replace("/login");
      return;
    }
    const parsed = JSON.parse(user);
    setAccountNumber(parsed.accountNumber);
  }, [router]);

  if (!accountNumber) return null;

  return (
    <div className="min-h-screen bg-linear-to-b from-blue-50 to-gray-100 px-4 pt-23">
      <div className="max-w-md mx-auto space-y-6">
        {/* PROFILE CARD */}
        <div className="bg-white rounded-2xl shadow-sm border p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-14 w-14 rounded-full bg-blue-600 flex items-center justify-center text-white text-xl font-semibold">
              U
            </div>
            <div>
              <p className="text-sm text-gray-500">Bank Account</p>
              <p className="font-semibold tracking-wide">{accountNumber}</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600">
            This account is secured and managed under your banking profile.
          </div>
        </div>

        {/* QUICK ACTIONS */}
        <div className="bg-white rounded-2xl shadow-sm border p-6">
          <h2 className="text-sm font-semibold mb-4 text-gray-700">
            Account Actions
          </h2>

          <div className="space-y-3">
            <button
              onClick={() => router.push("/profile/edit")}
              className="w-full border rounded-xl py-3 text-sm hover:bg-gray-50"
            >
              Edit Profile
            </button>

            <button
              onClick={() => {
                localStorage.clear();
                router.replace("/login");
              }}
              className="w-full border border-red-600 text-red-500 rounded-xl py-3 text-sm "
            >
              Logout
            </button>
          </div>
        </div>

        {/* FOOTER SPACE */}
        <p className="text-xs text-center text-gray-400 pt-6">
          © Secure Bank App
        </p>
      </div>
    </div>
  );
}
