"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Navbar() {
  const [isLogged, setIsLogged] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLogged(true);
    }
  }, []);

  return (
    <nav className="w-full h-16 bg-linear-to-r from-white/90 to-gray-50/90 backdrop-blur-md border-b border-gray-200 shadow-sm fixed top-0 z-50">
      <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-3xl font-bold tracking-tight text-[#0B1C2D] hover:text-[#2563EB] transition-colors duration-300"
        >
          Bank<span className="text-[#2563EB]">X</span>
        </Link>

        {/* Login Button */}
        {isLogged ? (
          <Link href="/profile">
            <div className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-100 transition-all duration-200">
              <Image
                width={24}
                height={24}
                src="/user.png"
                alt="Profile"
                className="rounded-full"
              />
              <p className="text-sm font-medium text-gray-700">Profile</p>
            </div>
          </Link>
        ) : (
          <Link
            href="/login"
            className="
            px-6 py-2 rounded-full
            bg-linear-to-[#1D4ED8] text-white font-semibold
            hover:from-[#1E4FD8] hover:to-[#1E40AF]
            shadow-lg hover:shadow-xl
            transform hover:scale-105
            transition-all duration-300
          "
          >
            Log in
          </Link>
        )}
      </div>
    </nav>
  );
}
