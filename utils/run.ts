import User from "@/models/userModel";
import connectToDb from "./connectDatabase";

export default async function Demo(title: string) {
  await connectToDb();
  const email = "arhyelphilip024@gmail.com";

  const cuser = await User.findOne({ email });
  if (!cuser) {
    throw new Error(`User not found`);
  }

  const newMessage = {
    title,
    messages: [
      {
        sender: "user",
        text: "Hello, how are you?",
        time: "10:05",
      },
      {
        sender: "bot",
        text: "I'm doing great, thanks! How can I assist you today?",
        time: "10:06",
      },
      {
        sender: "user",
        text: "I need help with my order.",
        time: "10:07",
      },
      {
        sender: "bot",
        text: "Sorry to hear that. Can you please provide more details about your order?",
        time: "10:08",
      },
      {
        sender: "user",
        text: "I didn't receive my package.",
        time: "10:09",
      },
      {
        sender: "bot",
        text: "I apologize for the inconvenience. I've escalated the issue to our shipping team. You should receive an update soon.",
        time: "10:10",
      },
    ],
  };

  cuser.chatHistory.push(newMessage);
  await cuser.save(); // Corrected 'user' to 'cuser'
}

// Run the function five times with randomly generated titles
