import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { checkMarks } from "@/utils/checkregex";

// Create an instance of GoogleGenerativeAI with the API key
const apikey = process.env.GEMINI_KEY as string;
const generativeAI = new GoogleGenerativeAI(apikey);

export const POST = async (req: NextRequest) => {
  if (req.method === "POST") {
    const userMessage = await req.json();
    // console.log(userMessage.message);

    const message: Promise<Array<string>> = userMessage.message;

    // console.log("message:", message);

    if (!message) {
      return new NextResponse(
        JSON.stringify({ message: "Message is required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const msg = await message;

    // console.log("msg:", msg);

    try {
      const model = generativeAI.getGenerativeModel({
        model: "gemini-1.5-flash",
      });

      const result = await model.generateContent(msg);
      const response = result.response;
      const text = await response.text(); // Make sure to use `await` here

      // console.log("Text", text);

      const checkedmessage = await checkMarks(text);

      // console.log("Feedback", checkedmessage);

      return new NextResponse(JSON.stringify(checkedmessage), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      // console.error("Error with chatbot API:", error);
      return new NextResponse(
        JSON.stringify({ message: "Failed to generate a response" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  } else {
    return new NextResponse(
      JSON.stringify({ message: `Method ${req.method} Not Allowed` }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", Allow: "POST" },
      }
    );
  }
};
