"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { FaPaperPlane } from "react-icons/fa";
const marked = require("marked");
import { useRouter } from "next/navigation";

// Define TypeScript types for message
type Message = {
  sender: "user" | "bot";
  text: string;
};

interface Props {
  apiEndpoint: string;
}

// ChatPage component
export default function ChatPage() {
  const router = useRouter();

  // useEffect(() => {
  //   const storedUser = localStorage.getItem("user");
  //   if (!storedUser) {
  //     router.push("/login");
  //   }
  // }, []);

  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState("");
  const chatBoxRef = useRef<HTMLDivElement>(null);
  const [apiEndpoint, setApiEndpoint] = useState("Loading...");

  // Scroll to bottom when messages change
  useEffect(() => {
    chatBoxRef.current?.scrollTo({
      top: chatBoxRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  // Add a message to the chat
  const addMessage = (sender: "user" | "bot", text: string) => {
    setMessages((prevMessages) => [...prevMessages, { sender, text }]);
  };

  // useEffect(() => {
  //   const protocol = window.location.protocol;
  //   const host = window.location.host;

  //   const apiEndpoint = `<p>We are thrilled to present <strong>Duet AI</strong>, an innovative project developed by Yiming, Jace, and Enoch. Duet AI is built to revolutionize conversational experiences with its advanced artificial intelligence capabilities.</p>
  //     <p>Explore the capabilities of Duet AI by interacting with our API endpoint:
  //     <a href="${protocol}//${host}/api/chat" target="_blank">${protocol}//${host}/api/chat</a></p>`;

  //   setApiEndpoint(apiEndpoint);
  // }, []);

  // function checkMarks(content: string): string {
  //   const markdownSymbolsRegex =
  //     /(\*\*|\*|__|_|`|~|\[\[|\]\]|\!\[|\]\(|\]\)|\!\[|\]\()/;

  //   if (markdownSymbolsRegex.test(content)) {
  //     // If Markdown is detected, use marked to convert Markdown to HTML

  //     return marked.parse(content);
  //   } else {
  //     // If no Markdown is detected, return content as is
  //     return content;
  //   }
  // }

  addMessage("bot", apiEndpoint);
  // addMessage("bot", checkMarks(apiEndpoint));

  // Function to handle sending a message
  const sendMessage = async () => {
    const text = userInput.trim();
    if (text === "") return;

    addMessage("user", text);
    setUserInput(""); // Clear the input box

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: text }),
      });
      const data = await response.json();
      console.log(data);

      addMessage("bot", data.message);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Handle Enter key press
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="chat-container bg-white border border-gray-300 rounded-lg shadow-lg max-w-md w-full p-4">
        <div className="flex justify-end mb-4">
          <a href="/logout" className="text-blue-500 hover:underline">
            Log out
          </a>
        </div>
        <div
          className="msg_history overflow-auto max-h-[500px] p-2"
          ref={chatBoxRef}
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              } mb-4`}
            >
              {msg.sender === "bot" && (
                <div className="incoming_msg_Image mr-2">
                  <Image
                    src="https://ptetutorials.com/images/user-profile.png"
                    alt="bot"
                    className="w-10 h-10 rounded-full"
                  />
                </div>
              )}
              <div
                className={`text p-2 rounded-lg ${
                  msg.sender === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                } max-w-[70%]`}
              >
                <div>{msg.text}</div>
                <div className="text-xs text-gray-500 mt-1">
                  {new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex mt-4">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg mr-2"
          />
          <button
            onClick={sendMessage}
            className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </div>
  );
}
