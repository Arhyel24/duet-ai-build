import Image from "next/image";

// components/ChatMessage.tsx
export interface ChatMessageProps {
  sender: "user" | "bot";
  text: string;
}

const myLoader = () => {
  return "https://ptetutorials.com/images/user-profile.png";
};

const ChatMessage: React.FC<ChatMessageProps> = ({ sender, text }) => {
  return (
    <div
      className={`message flex ${
        sender === "user" ? "justify-end" : "justify-start"
      } mb-4`}
    >
      {sender === "bot" && (
        <div className="incoming_msg_Image mr-2">
          <Image
            unoptimized
            loader={myLoader}
            src="https://ptetutorials.com/images/user-profile.png"
            alt="bot"
            width={10}
            height={10}
            className="w-10 h-10 rounded-full"
          />
        </div>
      )}
      <div
        className={`text p-2 rounded-lg ${
          sender === "user"
            ? "bg-blue-500 text-white"
            : "bg-gray-200 text-gray-700"
        } max-w-[70%]`}
      >
        <div>{text}</div>
        <div className="text-xs text-gray-500 mt-1">
          {new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
