"use client";
import Navbar from "../components/Navbar";
import { useEffect, useRef, useState } from "react";
import Messages, { MessageGroupProps } from "../components/newUI/Messages";
import { getMessages } from "@/utils/chatHistoryUtil";
import { ChatMessageProps } from "../components/chatMessage";
import connectToDb from "@/utils/connectDatabase";
import User from "@/models/userModel";

const Test = () => {
  const chatBoxRef = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState<ChatMessageProps[]>([]);
  const [titles, setTitles] = useState([]);

  const getMsg = async () => {
    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { messages, titles } = await response.json();
      setMessage(messages);
      setTitles(titles);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // for (let i = 0; i < 5; i++) {
  //   const title = Math.random().toString(36).substring(2, 7); // Generate a random title
  //   console.log(`Running test ${i + 1} with title: ${title}`);
  //   Demo(title);
  // }

  useEffect(() => {
    getMsg();
  }, []);

  useEffect(() => {
    chatBoxRef.current?.scrollTo({
      top: chatBoxRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [message]);

  return (
    <div className="h-screen overflow-hidden">
      {/* <!-- Navbar --> */}
      <Navbar />
      <div className="flex">
        {/* <!-- Sidebar --> */}
        <div className="w-[20%] bg-white border-r border-gray-300">
          {/* <!-- Sidebar Header --> */}
          <header className="p-2 border-b border-gray-300 flex justify-between items-center bg-indigo-600 text-white">
            <h1 className="text-l font-semibold">Chat Web</h1>
            <div className="relative">
              <button className="focus:outline-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-100"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path d="M2 10a2 2 0 012-2h12a2 2 0 012 2 2 2 0 01-2 2H4a2 2 0 01-2-2z" />
                </svg>
              </button>
            </div>
          </header>

          {/* <!-- Contact List --> */}
          <div className="overflow-y-auto h-screen p-3 mb-9 pb-20">
            {titles.map((title, index) => (
              <p key={index}>{title}</p>
            ))}
          </div>
        </div>

        {/* <!-- Main Chat Area --> */}
        <div className="flex-1 h-screen">
          {/* <!-- Chat Header --> */}
          <div className="bg-white p-2 text-gray-700 border">
            <h1 className="text-l font-semibold">{titles[0]}</h1>
          </div>

          {/* <!-- Chat Messages --> */}
          <div className="h-4/5 box-border border-2 flex flex-col">
            <div className="flex-1 p-4 overflow-y-auto ">
              {message.map((msg, index) => (
                <Messages
                  key={index}
                  sender={msg.sender}
                  text={msg.text}
                  time={msg.time}
                />
              ))}
            </div>

            <form>
              <label htmlFor="chat" className="sr-only">
                Your message
              </label>
              <div className="flex items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700">
                <button
                  type="button"
                  className="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                >
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 18"
                  >
                    <path
                      fill="currentColor"
                      d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z"
                    />
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M18 1H2a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
                    />
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z"
                    />
                  </svg>
                  <span className="sr-only">Upload image</span>
                </button>

                <textarea
                  id="chat"
                  rows={1}
                  className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Your message..."
                ></textarea>
                <button
                  type="submit"
                  className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
                >
                  <svg
                    className="w-5 h-5 rotate-90 rtl:-rotate-90"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 18 20"
                  >
                    <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
                  </svg>
                  <span className="sr-only">Send message</span>
                </button>
              </div>
            </form>
          </div>

          {/* <!-- Chat Input --> */}
        </div>
      </div>
    </div>
  );
};

export default Test;

// <script>
// JavaScript for showing/hiding the menu
//   const menuButton = document.getElementById('menuButton');
//   const menuDropdown = document.getElementById('menuDropdown');

//   menuButton.addEventListener('click', () => {
//     if (menuDropdown.classNameList.contains('hidden')) {
//       menuDropdown.classNameList.remove('hidden');
//     } else {
//       menuDropdown.classNameList.add('hidden');
//     }
//   });

//   // Close the menu if you click outside of it
//   document.addEventListener('click', (e) => {
//     if (!menuDropdown.contains(e.target) && !menuButton.contains(e.target)) {
//       menuDropdown.classNameList.add('hidden');
//     }
//   });
// </script>
