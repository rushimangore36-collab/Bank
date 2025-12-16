import { NextResponse } from "next/server";
import Withdraw from "@/models/Withdraw";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

export async function POST(request: Request) {
  await connectDB();
  const { accountNumber, amount } = await request.json();
  const newWithdraw = new Withdraw({ accountNumber, amount, date: new Date() });
  await newWithdraw.save();
  const user = await User.findOne({ accountNumber });
  if (user) {
    user.balance -= amount;
    await user.save();
  }
  return NextResponse.json(
    { message: "Withdrawal successful" },
    { status: 200 }
  );
}

export async function GET(request: Request) {
  await connectDB();
  const { searchParams } = new URL(request.url);
  const accountNumber = searchParams.get("accountNumber");
  if (!accountNumber) {
    return NextResponse.json(
      { message: "Account number is required" },
      { status: 400 }
    );
  }
  const withdraws = await Withdraw.find({ accountNumber }).sort({ date: -1 });
  return NextResponse.json({ withdraws }, { status: 200 });
}
