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
          data-copy-to-clipboard-target="npm-install-copy-button"
          data-tooltip-target="tooltip-copy-npm-install-copy-button"
          className={`inline-flex self-center items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-600`}
          type="button"
          onClick={() => navigator.clipboard.writeText(text)}
        >
          <span id="default-icon">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 20"
            >
              <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
            </svg>
          </span>
          <span id="success-icon" className="hidden inline-flex items-center">
            <svg
              className="w-4 h-4  text-blue-700 dark:text-blue-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 16 12"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5.917 5.724 10.5 15 1.5"
              />
            </svg>
          </span>
        </button>
      )}
      <div
        id="tooltip-copy-npm-install-copy-button"
        role="tooltip"
        className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
      >
        <span id="default-tooltip-message">Copy to clipboard</span>
        <span id="success-tooltip-message" className="hidden">
          Copied!
        </span>
        <div className="tooltip-arrow" data-popper-arrow></div>
      </div>
    </div>
  );
};

export default Messages;
