"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    accountNumber: "",
    password: "",
    balance: 0,
  });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    router.push("/login");
  };

  return (
    <section className="min-h-[calc(100vh-8rem)] flex items-center justify-center bg-[#F8FAFC] px-6">
      <div className="w-full max-w-md bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <h1 className="text-2xl font-semibold text-[#0B1C2D]">
          Create a bank account
        </h1>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              type="text"
              placeholder="Eren Yeager"
              className="mt-1 w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#2563EB]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Account Number
            </label>
            <input
              name="accountNumber"
              value={formData.accountNumber}
              onChange={handleChange}
              type="text"
              placeholder="Enter account number"
              className="mt-1 w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#2563EB]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              name="password"
              value={formData.password}
              onChange={handleChange}
              type="password"
              placeholder="••••••••"
              className="mt-1 w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#2563EB]"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-md bg-[#2563EB] text-white font-medium hover:bg-[#1E4FD8] transition"
          >
            Create account
          </button>
        </form>

        <p className="mt-6 text-sm text-gray-600 text-center">
          Already have an account?{" "}
          <Link href="/login" className="text-[#2563EB] font-medium">
            Log in
          </Link>
        </p>
      </div>
    </section>
  );
}
