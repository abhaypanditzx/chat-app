"use client";

import { useEffect, useState } from "react";
import io from "socket.io-client";

export default function Home() {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    const newSocket = io("https://chat-app-1-dx36.onrender.com/");
    console.log(newSocket)
    setSocket(newSocket);
    newSocket.on("receive-message", (msg) => {
      setChat((prev) => [...prev, msg]);
    });

    return () => newSocket.disconnect();
  }, []);

  const sendMessage = () => {
    if (socket && message) {
      socket.emit("send-message", message);
      setMessage("");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Next Chat 💬</h1>

      <div style={{ border: "1px solid black", height: 300, overflowY: "scroll" }}>
        {chat.map((msg, i) => (
          <p className={"bg-pink-500"} key={i}>{msg}</p>
        ))}
      </div>

      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type..."
      />

      <button onClick={sendMessage}>Send</button>
    </div>
  );
}