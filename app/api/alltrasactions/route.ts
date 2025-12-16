import { connectDB } from "@/lib/db";
import Transaction from "@/models/Transaction";

export async function GET(req: Request) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const accountNumber = searchParams.get("accountNumber");

  if (!accountNumber) {
    return new Response(
      JSON.stringify({ message: "Account number is required" }),
      { status: 400 }
    );
  }

  const transactions = await Transaction.find({
    $or: [{ from: accountNumber }, { to: accountNumber }],
  })
    .sort({ createdAt: -1 })
    .lean();

  return new Response(JSON.stringify(transactions), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
