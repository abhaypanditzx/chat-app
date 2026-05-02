"use client";

import { useEffect, useState } from "react";
import io from "socket.io-client";

export default function Home() {
  const [socket, setSocket] = useState(null);
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    const newSocket = io("https://chat-app-1-dx36.onrender.com/");
    // const newSocket = io("http://localhost:5000");
    setSocket(newSocket);
    newSocket.on("r-msg", (msg) => {
      setChat((prev) => [...prev, msg]);
    });

    return () => newSocket.disconnect();
  }, []);

  const sendMessage = () => {
    if (socket && message) {
      socket.emit("s-msg",{username:username,message:message,senderId:socket.id});
      setMessage("");
    }
  };

  return (
    <div style={{ padding: 20 }} className=" flex flex-col h-screen w-full" >
      <h1 className="text-center text-2xl font-bold mb-4">Next Chat 💬</h1>
      <input type="text" 
      value={username} 
      onChange={(e)=>setUsername(e.target.value)} 
      placeholder="Enter your username"
      className="border-black border rounded-lg bg-amber-50  mb-3 p-2"/>
      <div
     
        className="overflow-y-scroll  py-6 border border-black rounded-md h-[400px] "
      >
        {chat?.map((msg, i) => (
          <p className={` w-fit mb-2  mx-2 px-6  rounded-lg text-white p-2 ${msg.senderId ===socket.id ? "ml-auto bg-green-500" : "bg-pink-500  "}`} key={i}>
          <span className=" font-semibold">{msg.username}:</span>{msg.message}
          </p>
        ))}
      </div>

    <div className=" absolute bottom-4 left-4 flex ">
        <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type..."
        className="w-full border rounded-l-2xl"
      />

      <button onClick={sendMessage}>Send</button>
    </div>
    </div>
  );
}
