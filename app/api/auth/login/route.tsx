import { connectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { accountNumber, password } = await req.json();

    // Basic validation
    if (!accountNumber || !password) {
      return Response.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // Find user
    const user = await User.findOne({ accountNumber });
    if (!user) {
      return Response.json(
        { message: "Invalid account number or password" },
        { status: 401 }
      );
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return Response.json(
        { message: "Invalid account number or password" },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      { userId: user._id, accountNumber: user.accountNumber },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );

    // Success (do NOT send password)
    return Response.json(
      {
        message: "Login successful",
        user: {
          id: user._id,
          fullName: user.fullName,
          accountNumber: user.accountNumber,
        },
        token,
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}
