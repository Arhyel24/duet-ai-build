import Image from "next/image";

// components/ChatMessage.tsx
export interface ChatMessageProps {
  sender: "user" | "bot";
  text: string;
  time: string;
}

const myLoader = () => {
  return "https://ptetutorials.com/images/user-profile.png";
};

const ChatMessage: React.FC<ChatMessageProps> = ({ sender, text, time }) => {
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
            width={5}
            height={5}
            className="w-7 h-7 rounded-full"
          />
        </div>
      )}
      <div
        className={`text p-2 rounded-lg ${
          sender === "user"
            ? "bg-blue-500 text-white w-[50%]"
            : "bg-gray-200 text-gray-700"
        } max-w-[70%]`}
      >
        <div
          className="msg-c text-sm break-words whitespace-pre-wrap"
          dangerouslySetInnerHTML={{ __html: text }}
        />
        <div
          className={`text-xs italic ${
            sender === "user" ? "text-gray-200 text-right" : "text-gray-500"
          } mt-1`}
        >
          {time}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
