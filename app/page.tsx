"use client";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.replace("/dashboard");
    }
  }, []);
  return (
    <section className="flex items-center justify-center min-h-[calc(100vh-8rem)] bg-[#F8FAFC] px-6">
      <div className="max-w-xl text-center">
        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-semibold text-[#0B1C2D] leading-tight">
          Log in or create a <br />
          <span className="text-[#2563EB]">bank account</span>
        </h1>

        {/* Subtext */}
        <p className="mt-5 text-gray-600 text-base md:text-lg">
          Secure, fast, and modern digital banking built to manage your money
          with confidence.
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/register"
            className="
              px-8 py-3 rounded-md
              bg-[#2563EB] text-white font-medium
              hover:bg-[#1E4FD8]
              shadow-md hover:shadow-lg
              transition
            "
          >
            Create account
          </Link>
        </div>
      </div>
    </section>
  );
}
