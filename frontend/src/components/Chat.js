import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";

const socket = io("https://chat-app-ugyb.onrender.com", { 
    transports: ["websocket", "polling"], 
    withCredentials: true 
});

function Chat() {
  const [messages, setMessages] = useState<{ username: string; message: string }[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [username, setUsername] = useState("");
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  useEffect(() => {
    // Auto-scroll to the latest message
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = () => {
    if (inputMessage.trim() === "" || username.trim() === "") {
      alert("Please enter both a username and a message.");
      return;
    }

    socket.emit("sendMessage", { username, message: inputMessage });
    setInputMessage("");
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Chat App</h1>
      <input
        type="text"
        placeholder="Enter your username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ marginBottom: "10px", padding: "5px" }}
      />
      <div
        ref={chatContainerRef}
        style={{ 
          border: "1px solid #ccc", 
          padding: "10px", 
          marginTop: "10px", 
          height: "300px", 
          overflowY: "auto", 
          textAlign: "left" 
        }}
      >
        {messages.map((msg, index) => (
          <p key={index} style={{ margin: "5px 0" }}>
            <strong>{msg.username}: </strong> {msg.message}
          </p>
        ))}
      </div>
      <input
        type="text"
        placeholder="Type a message..."
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && sendMessage()}
        style={{ marginTop: "10px", padding: "5px" }}
      />
      <button onClick={sendMessage} style={{ marginLeft: "10px", padding: "5px" }}>
        Send
      </button>
    </div>
  );
}

export default Chat;
