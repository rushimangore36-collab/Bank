import { connectDB } from "@/lib/db";
import User from "@/models/User";

export async function POST(req: Request) {
  await connectDB();

  const { accountNumber } = await req.json();

  const user = await User.findOne(
    { accountNumber },
    { password: 0 } // hide password
  );

  const userData = {
    name: user?.fullName,
    accountNumber: user?.accountNumber,
    balance: user?.balance,
    createdAt: user?.createdAt,
  };

  if (!user) {
    return new Response(JSON.stringify({ message: "User not found" }), {
      status: 404,
    });
  }

  return new Response(JSON.stringify(userData), { status: 200 });
}
