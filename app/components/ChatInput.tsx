import { FaPaperPlane } from "react-icons/fa";

// components/ChatInput.tsx
interface ChatInputProps {
  userInput: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  sendMessage: () => void;
}

const ChatInput: React.FC<ChatInputProps> = ({
  userInput,
  handleInputChange,
  handleKeyPress,
  sendMessage,
}) => {
  return (
    <div className="flex mt-2 mb-4 w-full ">
      <input
        type="text"
        value={userInput}
        onChange={handleInputChange}
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
  );
};

export default ChatInput;
