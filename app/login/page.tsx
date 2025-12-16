"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    accountNumber: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await res.json();
      localStorage.removeItem("currentUser");
      localStorage.setItem("currentUser", JSON.stringify(formData));
      localStorage.setItem("token", data.token);
      router.push("/dashboard");
    } catch (error) {
      alert("Login failed");
    }
  };

  return (
    <section className="min-h-[calc(100vh-8rem)] flex items-center justify-center bg-[#F8FAFC] px-6">
      <div className="w-full max-w-md bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <h1 className="text-2xl font-semibold text-[#0B1C2D]">
          Log in to your account
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Access your bank account securely.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Account Number
            </label>
            <input
              name="accountNumber"
              value={formData.accountNumber}
              onChange={handleChange}
              type="text"
              className="mt-1 w-full px-4 py-2 rounded-md border border-gray-300"
              required
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
              className="mt-1 w-full px-4 py-2 rounded-md border border-gray-300"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-md bg-[#2563EB] text-white"
          >
            Log in
          </button>
        </form>

        <p className="mt-6 text-sm text-gray-600 text-center">
          Don’t have an account?{" "}
          <Link href="/register" className="text-[#2563EB] font-medium">
            Create one
          </Link>
        </p>
      </div>
    </section>
  );
}
