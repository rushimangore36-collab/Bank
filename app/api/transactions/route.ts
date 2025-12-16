import { connectDB } from "@/lib/db";
import Transaction from "@/models/Transaction";
import User from "@/models/User";

// SEND MONEY
export async function POST(req: Request) {
  await connectDB();

  const { from, to, amount } = await req.json();
  console.log("POST /api/transactions", { from, to, amount });

  if (!from || !to || !amount || amount <= 0) {
    return Response.json({ message: "Invalid input" }, { status: 400 });
  }

  const sender = await User.findOne({ accountNumber: from });
  const receiver = await User.findOne({ accountNumber: to });

  if (!sender || !receiver) {
    return Response.json({ message: "User not found" }, { status: 404 });
  }

  if (sender.balance < amount) {
    return Response.json({ message: "Insufficient balance" }, { status: 400 });
  }

  await Transaction.create({
    from,
    to,
    amount,
  });

  sender.balance -= amount;
  receiver.balance += amount;

  await sender.save();
  await receiver.save();

  return Response.json({ message: "Transaction successful" });
}

// GET TRANSACTIONS
export async function GET(req: Request) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const accountNumber = searchParams.get("accountNumber");

  if (!accountNumber) {
    return Response.json(
      { message: "Account number required" },
      { status: 400 }
    );
  }

  const transactions = await Transaction.find({
    $or: [{ from: accountNumber }, { to: accountNumber }],
  }).sort({ createdAt: -1 });

  return Response.json({ transactions });
}
