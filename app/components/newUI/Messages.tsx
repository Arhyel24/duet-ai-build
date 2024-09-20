"use client";
import Image from "next/image";
import React from "react";

export interface MessageGroupProps {
  title: string;
  messages: MessageProps[];
}

export interface MessageProps {
  sender: "user" | "bot";
  text: string;
  time: string;
}

const Messages: React.FC<MessageProps> = ({ sender, text, time }) => {
  const isUserMessage = sender === "user";
  const messageDirection = isUserMessage ? "flex-row-reverse" : "flex-row";
  const avatarDirection = isUserMessage ? "ml-2" : "mr-2";
  const textAlign = isUserMessage ? "text-right" : "text-left";
  const justifyRight = isUserMessage ? "justify-end" : "justify-start";
  const containerClass = isUserMessage
    ? "rounded-l-lg rounded-br-lg"
    : "rounded-e-lg rounded-es-lg";

  return (
    <div className={`flex items-start gap-2.5 ${messageDirection}`}>
      {!isUserMessage && (
        <Image
          width={8}
          height={8}
          className={`w-8 h-8 rounded-full ${avatarDirection}`}
          src="https://ptetutorials.com/images/user-profile.png"
          alt="Jese image"
        />
      )}
      <div
        className={`flex flex-col gap-1 w-full ${
          isUserMessage ? "max-w-[45%]" : " max-w-[65%]"
        } `}
      >
        <div
          className={`flex items-center space-x-2  ${justifyRight} rtl:space-x-reverse`}
        >
          <span
            className={`text-sm italic font-semibold text-gray-900 dark:text-white ${textAlign}`}
          >
            {isUserMessage ? "You" : "Duet AI"}
          </span>
        </div>
        <div
          className={`flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 ${containerClass} dark:bg-gray-700`}
        >
          <p className="text-sm font-normal text-gray-900 dark:text-white">
            {text}
          </p>
        </div>
        <div className={`flex ${justifyRight}`}>
          <span
            className={`text-sm italic font-normal text-gray-500 dark:text-gray-400 ${textAlign}`}
          >
            Delivered
          </span>
          <span
            className={`text-sm italic font-normal text-gray-500 dark:text-gray-400 pl-1 ${textAlign}`}
          >
            {time}
          </span>
        </div>
      </div>
      {!isUserMessage && (
        <button
          id="dropdownMenuIconButton"
          data-dropdown-toggle="dropdownDots"
          data-dropdown-placement="bottom-start"
          className={`inline-flex self-center items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-600`}
          type="button"
          onClick={() => navigator.clipboard.writeText(text)}
        >
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 4 15"
          >
            <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default Messages;
