
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("https://chat-app-0v4m.onrender.com/");

function Chat() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  const sendMessage = () => {
    if (inputMessage.trim() !== "" && username.trim() !== "") {
      socket.emit("sendMessage", { username, message: inputMessage });
      setInputMessage("");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Chat App</h1>
      <input
        type="text"
        placeholder="Enter your username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <div style={{ border: "1px solid #ccc", padding: "10px", marginTop: "10px", height: "300px", overflowY: "auto" }}>
        {messages.map((msg, index) => (
          <p key={index}>
            <strong>{msg.username}: </strong> {msg.message}
          </p>
        ))}
      </div>
      <input
        type="text"
        placeholder="Type a message..."
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default Chat;
