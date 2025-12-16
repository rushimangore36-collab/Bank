// app/api/users/search/route.ts
import { NextResponse } from "next/server";
import User from "@/models/User";
import { connectDB } from "@/lib/db";

export async function GET(req: Request) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q");
  console.log("Search query:", query);

  if (!query) {
    return NextResponse.json([]);
  }

  const users = await User.find({
    fullName: { $regex: query, $options: "i" },
  }).select("fullName accountNumber");
  console.log("Found users:", users);

  return NextResponse.json(users);
}
