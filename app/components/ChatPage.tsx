"use client";
import { useState, useEffect, useRef } from "react";
import ChatMessage, { ChatMessageProps } from "../components/chatMessage";
import ChatInput from "../components/ChatInput";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
// import connectToDb from "@/utils/connectDatabase";
// import User from "@/models/userModel";
// import { getServerSession } from "next-auth";
// import authOptions from "@/utils/AuthOptions";

const ChatPage = () => {
  const { data: session } = useSession();

  const [username, setUsername] = useState("Block");

  const chatBoxRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<ChatMessageProps[]>([]);
  const [userInput, setUserinput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    chatBoxRef.current?.scrollTo({
      top: chatBoxRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  const addMessage = (sender: "user" | "bot", text: string, time: string) => {
    setMessages((prevMessages) => [...prevMessages, { sender, text, time }]);
  };

  const sendMessage = async () => {
    const text = userInput.trim();
    if (text === "") return;

    const utime = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    addMessage("user", text, utime);
    setUserinput(""); // Clear the input box

    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: text }),
      });
      const data = await response.json();
      setLoading(false);
      addMessage("bot", data.message, data.time);
    } catch (error) {
      setLoading(false);
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

  const myLoader = () => {
    return "https://ptetutorials.com/images/user-profile.png";
  };

  return (
    <div className="flex flex-col items-center justify-center text-l min-h-screen p-4 ">
      <div className="chat-container bg-white border dark:bg-slate-800 border-gray-300 rounded-lg shadow-lg w-full md:w-4/5 lg:w-4/5 xl:w-4/5 p-4">
        <div className="flex justify-between mb-4">
          <p className="text-m font-bold text-slate-500 dark:text-slate-400 mb-4">
            Welcome back,{" "}
            <span className="text-orange-500">
              {session?.user?.name || username}
            </span>
          </p>
          <button
            onClick={() => signOut()}
            className="bg-red-300 hover:bg-red-400 text-white text-xs font-bold px-2 py-1 rounded"
          >
            Log out
          </button>
        </div>
        <div
          className="msg_history overflow-y-auto sm:max-h-[600px] md:max-h-[850px] lg:max-h-[900px] xl:max-h-[1000px]  max-h-[350px] p-2"
          ref={chatBoxRef}
        >
          <div className={"message flex justify-start mb-4"}>
            <div className="incoming_msg_Image mr-2">
              <Image
                unoptimized
                loader={myLoader}
                src="https://ptetutorials.com/images/user-profile.png"
                alt="bot"
                width={2}
                height={2}
                className="w-7 h-7 rounded-full"
              />
            </div>
            <div
              className={
                "text p-2 rounded-lg bg-gray-200 text-gray-700 max-w-[70%]"
              }
            >
              <div className="text-sm">
                Welcome to Duet AI, feel free to ask anything!
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {new Date().toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          </div>
          {messages.map((msg, index) => (
            <ChatMessage
              key={index}
              sender={msg.sender}
              text={msg.text}
              time={msg.time}
            />
          ))}
        </div>
        {loading && (
          <div className={"message flex justify-start mb-4"}>
            <div className="incoming_msg_Image mr-2">
              <Image
                unoptimized
                loader={myLoader}
                src="https://ptetutorials.com/images/user-profile.png"
                alt="bot"
                width={2}
                height={2}
                className="w-7 h-7 rounded-full"
              />
            </div>
            <div
              className={
                "text p-2 rounded-lg bg-gray-200 text-gray-700 max-w-[70%]"
              }
            >
              <div className="loading loading07">
                <span data-text="L">L</span>
                <span data-text="O">O</span>
                <span data-text="A">A</span>
                <span data-text="D">D</span>
                <span data-text="I">I</span>
                <span data-text="N">N</span>
                <span data-text="G">G</span>
              </div>
            </div>
          </div>
        )}
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
