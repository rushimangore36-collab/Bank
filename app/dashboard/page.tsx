"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import ImageSlider from "@/components/Slider";
import ActionCard from "@/components/ActionCard";
import Link from "next/link";

export default function Dashboard() {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) window.location.href = "/login";
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-10">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500">
          Manage your account and transactions
        </p>
      </div>

      {/* Slider */}
      <div className="mb-10">
        <ImageSlider />
      </div>

      {/* Actions */}
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
        <Link href="/dashboard/send">
          <ActionCard title="Send Money" image="/send.png" />
        </Link>
        <Link href="/dashboard/withdraw">
          <ActionCard title="Withdraw Money" image="/withdraw.png" />
        </Link>
        <Link href="/dashboard/add">
          <ActionCard title="Add Money" image="/add.png" />
        </Link>
        <Link href="/dashboard/account">
          <ActionCard title="Account Info" image="/account.png" />
        </Link>
        <Link href="/dashboard/ai">
          <ActionCard title="Help" image="/faq.png" />
        </Link>
        <Link href="/dashboard/history">
          <ActionCard title="Payment History" image="/history.png" />
        </Link>
      </div>
    </div>
  );
}
