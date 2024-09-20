import User from "@/models/userModel";
import { hashPassword } from "@/utils/bcryptconfig";
import connectToDb from "@/utils/connectDatabase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await connectToDb();
  try {
    const email = "arhyelphilip024@gmail.com";

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 500 });
    }

    const messages = user.chatHistory[0].messages;
    const titles = user.chatHistory.map((msg) => msg.title);

    return new NextResponse(JSON.stringify({ messages, titles }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
