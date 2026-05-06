"use client";
import paw from "@/assets/paw.png";
import { useDarkMode } from "@/context/DarkMode";
import Image from "next/image";

const SendMessage = ({ socket, username, message, setMessage }) => {
  const { mode, ThemeMode } = useDarkMode();
  const sendMessage = (e) => {
    e.preventDefault();
    if (socket && message && username) {
      socket.emit("s-msg", {
        username: username,
        message: message,
        senderId: socket.id,
      });
      setMessage("");
    }
  };
  return (
    <div className="fixed bottom-0 left-0 w-full p-2 z-50 md:static md:w-auto md:p-0">
      <form
        onSubmit={sendMessage}
        className={`w-[90%] my-4 h-[50px]  mx-4 md:w-[65%] ${mode === "dark" ? ThemeMode?.dark?.cardColor + " border border-white/10 rounded-2xl shadow-md shadow-black/30" : ThemeMode?.light?.cardColor + " border border-gray-400 rounded-2xl shadow-md shadow-gray-300"} flex `}
      >
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type..."
          className={`${mode === "dark" ? ThemeMode?.dark?.fontColor : ThemeMode?.light?.fontColor} w-full border  border-none outline-none bg-transparent p-2  placeholder-gray-400`}
        />

        <button
          type="submit"
          className="w-fit px-6 py-3 cursor-pointer rounded-r-2xl  text-white bg-blue-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
            />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default SendMessage;
