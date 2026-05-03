"use client";
import { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import ActiveUsers from "@/components/ActiveUsers";
import MainChat from "@/components/MainChat";
import SendMessage from "@/components/SendMessage";
import Nav from "@/components/Nav";
export default function Home() {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [activeUser, setActiveUser] = useState([]);
  const [socketId, setSocketId] = useState("");
  const [username, setUsername] = useState("");
  const chatEndRef = useRef(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");

    if (storedUsername) {
      setUsername(storedUsername);
    }
    // const newSocket = io("http://localhost:5000");
    const newSocket = io("https://chat-app-1-dx36.onrender.com/");
    if (storedUsername) {
      newSocket.emit("join", storedUsername);
      newSocket.on("active-users", (users) => {
        setActiveUser(users);
        console.log(users);
      });
    }

    if (newSocket) {
      setSocketId(newSocket.id);
    }
    setSocket(newSocket);
    newSocket.on("r-msg", (msg) => {
      setChat((prev) => [...prev, msg]);
      if (msg.senderId !== socketId) {
        const audio = new Audio("/cat_sms.mp3");
        audio.play();
      }
    });
    return () => newSocket.disconnect();
  }, []);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chat]);

  return (
    <div className="flex  gap-x-6 w-full">
      <ActiveUsers activeUser={activeUser} />

      <div
        style={{ padding: 20 }}
        className=" flex flex-col bg-white relative h-screen  w-full"
      >
        <Nav activeUser={activeUser} username={username} />

        <MainChat chat={chat} socket={socket} chatEndRef={chatEndRef} />
        <SendMessage
          socket={socket}
          username={username}
          message={message}
          setMessage={setMessage}
        />
      </div>
    </div>
  );
}
