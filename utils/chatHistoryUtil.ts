import User from "@/models/userModel";

const getMessages = async (email: string) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return null;
    }
    return user.chatHistory;
  } catch (error) {
    throw error;
  }
};

const createMessage = async (
  username: string,
  title: string,
  sender: string,
  text: string,
  time: string
) => {
  try {
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error(`User not found`);
    }
    const newMessage = {
      title,
      messages: [
        {
          sender,
          text,
          time,
        },
      ],
    };
    user.messages.push(newMessage);
    await user.save();
    return newMessage;
  } catch (error) {
    throw error;
  }
};

const addMessageToThread = async (
  username: string,
  title: string,
  sender: string,
  text: string,
  time: string
) => {
  try {
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error(`User not found`);
    }
    const messageThread = user.messages.find(
      (message) => message.title === title
    );
    if (!messageThread) {
      throw new Error(`Message thread not found`);
    }
    const newMessage = {
      sender,
      text,
      time,
    };
    const updatedMessages = [...messageThread.messages, newMessage];
    messageThread.messages = updatedMessages;
    await user.save();
    return newMessage;
  } catch (error) {
    throw error;
  }
};

const deleteMessageFromHistory = async (
  username: string,
  messageId: string
) => {
  try {
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error(`User not found`);
    }
    const messageIndex = user.messages.findIndex(
      (message) => message._id.toString() === messageId
    );
    if (messageIndex === -1) {
      throw new Error(`Message not found`);
    }
    user.messages.splice(messageIndex, 1);
    await user.save();
    return `Message with ID ${messageId} deleted successfully`;
  } catch (error) {
    throw error;
  }
};
export {
  getMessages,
  createMessage,
  addMessageToThread,
  deleteMessageFromHistory,
};
