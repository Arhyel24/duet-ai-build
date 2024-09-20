export type MessageProps = {
  sender: string;
  text: string;
  time: string;
};

export type Message = {
  _id: string;
  title: string;
  messages: MessageProps[];
};
