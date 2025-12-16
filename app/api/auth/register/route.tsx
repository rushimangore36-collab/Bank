import User from "@/models/User";
import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const { fullName, accountNumber, password, balance } = await request.json();
    await connectDB();
    const existingUser = await User.findOne({ accountNumber });
    if (existingUser) {
      return NextResponse.json(
        { message: "Account number already in use" },
        { status: 409 }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      fullName,
      accountNumber,
      password: hashedPassword,
      balance,
    });
    await newUser.save();
    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error during user registration:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
