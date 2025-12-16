import { connectDB } from "@/lib/db";
import User from "@/models/User";

export async function PUT(req: Request) {
  await connectDB();

  const { accountNumber, name } = await req.json();

  if (!accountNumber || !name) {
    return new Response(JSON.stringify({ message: "Invalid request" }), {
      status: 400,
    });
  }

  const user = await User.findOneAndUpdate(
    { accountNumber },
    { fullName: name },
    { new: true }
  );

  if (!user) {
    return new Response(JSON.stringify({ message: "User not found" }), {
      status: 404,
    });
  }

  return new Response(JSON.stringify({ message: "Profile updated" }), {
    status: 200,
  });
}
