import { connectDB } from "@/lib/db";
import User from "@/models/User";

export async function POST(req: Request) {
  await connectDB();

  const { accountNumber, amount } = await req.json();

  if (!accountNumber || !amount || amount <= 0) {
    return new Response(JSON.stringify({ message: "Invalid request" }), {
      status: 400,
    });
  }

  const user = await User.findOne({ accountNumber });

  if (!user) {
    return new Response(JSON.stringify({ message: "User not found" }), {
      status: 404,
    });
  }

  user.balance += amount;
  await user.save();

  return new Response(
    JSON.stringify({ message: "Money added", balance: user.balance }),
    { status: 200 }
  );
}
