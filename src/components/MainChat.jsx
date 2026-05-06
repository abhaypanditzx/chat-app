import React from "react";
import { useDarkMode } from "@/context/DarkMode";

const MainChat = ({ chat, socket, chatEndRef }) => {
  const { mode, ThemeMode } = useDarkMode();
  return (
    <div
      className={`${mode == "dark" ? "bg-slate-950" : ThemeMode?.light?.bgColor} pb-24 overflow-y-scroll hide-scrollbar py-6 flex-1 `}
    >
      {chat?.map((msg, i) => (
        <div key={i} className="w-full relative mt-2 px-4   z-10 ">
          <p
            className={`w-fit px-4 py-2  rounded-lg ${msg.senderId === socket.id ? "ml-auto bg-blue-600  text-white" : "bg-white text-gray-600 border  "}`}
            key={i}
          >
            <span className=" font-semibold">{msg.username}:</span>
            <span>{msg.message}</span>
          </p>
        </div>
      ))}
      <div ref={chatEndRef} />
    </div>
  );
};

export default MainChat;
