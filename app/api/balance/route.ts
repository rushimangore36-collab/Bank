import { NextResponse } from "next/server";
import User from "@/models/User";
import { connectDB } from "@/lib/db";

export async function POST(request: Request) {
  const { accountNumber } = await request.json();
  const user = await User.findOne({ accountNumber });
  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }
  return NextResponse.json({ balance: user.balance }, { status: 200 });
}
