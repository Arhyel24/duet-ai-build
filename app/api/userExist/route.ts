import User from "@/models/userModel";
import connectToDb from "@/utils/connectDatabase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  await connectToDb();
  try {
    // Parse the JSON request body
    const { email } = await req.json();

    // Check if the user already exists
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false });
    }
  } catch (error) {
    return NextResponse.json({ success: false });
  }
}
