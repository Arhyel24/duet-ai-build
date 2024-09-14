"use client";
import { useState, useEffect, useRef } from "react";
import ChatMessage, { ChatMessageProps } from "../components/chatMessage";
import ChatInput from "../components/ChatInput";
import { signOut, useSession } from "next-auth/react";
import connectToDb from "@/utils/connectDatabase";
import User from "@/models/userModel";

const ChatPage = async () => {
  const { data: session } = useSession();
  const [username, setUsername] = useState("");

  const email = session?.user?.email;

  async function getUser() {
    await connectToDb();

    const user = await User.findOne({ email });
    setUsername(user.username);
  }

  useEffect(() => {
    getUser();
  }, []);

  const chatBoxRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<ChatMessageProps[]>([]);
  const [userInput, setUserinput] = useState("");

  useEffect(() => {
    chatBoxRef.current?.scrollTo({
      top: chatBoxRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  const addMessage = (sender: "user" | "bot", text: string) => {
    setMessages((prevMessages) => [...prevMessages, { sender, text }]);
  };

  const sendMessage = async () => {
    const text = userInput.trim();
    if (text === "") return;

    addMessage("user", text);
    setUserinput(""); // Clear the input box

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: text }),
      });
      const data = await response.json();

      addMessage("bot", data.message);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserinput(event.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="chat-container bg-white border border-gray-300 rounded-lg shadow-lg max-w-md w-full p-4">
        <div className="flex justify-end mb-4">
          <p>Welcome back, {username}</p>
          <button
            onClick={() => signOut()}
            className="text-blue-500 hover:underline"
          >
            Log out
          </button>
        </div>
        <div
          className="msg_history overflow-auto max-h-[500px] p-2"
          ref={chatBoxRef}
        >
          {messages.map((msg, index) => (
            <ChatMessage key={index} sender={msg.sender} text={msg.text} />
          ))}
        </div>
        <ChatInput
          userInput={userInput}
          handleInputChange={handleInputChange}
          handleKeyPress={handleKeyPress}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  );
};

export default ChatPage;
