"use client";
import { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import ActiveUsers from "@/components/ActiveUsers";
import MainChat from "@/components/MainChat";
import SendMessage from "@/components/SendMessage";
import Nav from "@/components/Nav";
import { useDarkMode } from "@/context/DarkMode";
import toast from "react-hot-toast";
export default function Home() {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [activeUser, setActiveUser] = useState([]);
  const [socketId, setSocketId] = useState("");
  const [activeUserLoading, setActiveUserLoading] = useState(true);
  const chatEndRef = useRef(null);
  const { mode, ThemeMode,username } = useDarkMode();
  useEffect(() => {
    // const newSocket = io("http://localhost:5000");
    const newSocket = io("https://chat-app-1-dx36.onrender.com/");
    if (username) {
      newSocket.emit("join", username);
      newSocket.on("user-joined",(username)=>{
        toast.success(`${username} joined the chat`);  
      })
      newSocket.on("user-disconnected",(username)=>{
        toast.error(`${username} left the chat`);  
      })
      newSocket.on("active-users", (users) => {
        setActiveUserLoading(false);
        setActiveUser(users);
      });
    }

    if (newSocket) {
      setSocketId(newSocket.id);
    }
    setSocket(newSocket);
    newSocket.on("r-msg", (msg) => {
      setChat((prev) => [...prev, msg]);
      if (msg.senderId !== socketId) {
      }
    });
    return () => newSocket.disconnect(username);
  }, [username]);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chat]);

  return (
    <div
      className={`flex  gap-x-6 h-screen w-full ${mode === "dark" ? "bg-[#0e1013]" : "bg-[#f0f4f8]"} p-0 sm:p-4`}
    >
      <ActiveUsers
        ThemeMode={ThemeMode}
        activeUser={activeUser}
        activeUserLoading={activeUserLoading}
      />
      <div
        className={` flex flex-col relative shadow-lg w-full rounded-lg ${mode === "dark" ? ThemeMode?.dark?.bgColor : ThemeMode?.light?.bgColor} `}
      >
        <Nav
          ThemeMode={ThemeMode}
          activeUser={activeUser}
          username={username}
        />

<div className="flex flex-col w-full h-full relative overflow-hidden min-h-0">
          <MainChat
            ThemeMode={ThemeMode}
            chat={chat}
            socket={socket}
            chatEndRef={chatEndRef}
          />
          <SendMessage
            socket={socket}
            username={username}
            message={message}
            setMessage={setMessage}
          />
   </div>
      </div>
    </div>
  );
}
