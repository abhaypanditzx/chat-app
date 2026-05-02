"use client";
import { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import { useRouter } from "next/navigation";

export default function Home() {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [username, setUsername] = useState("");
  const chatEndRef = useRef(null);
  const router = useRouter();
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
    const newSocket = io("https://chat-app-1-dx36.onrender.com/");
    // const newSocket = io("http://localhost:5000");
    setSocket(newSocket);
    newSocket.on("r-msg", (msg) => {
      setChat((prev) => [...prev, msg]);
    });

    return () => newSocket.disconnect();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("username");
    router.push("/");
  };
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chat]);

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
    <div style={{ padding: 20 }} className=" flex flex-col bg-slate-200 h-screen w-full">
      <div className="flex justify-between items-center">
        <h1 className="text-center text-2xl font-bold mb-4">
          welcome, {username} 💬
        </h1>
      {
        username?  <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-500 p-1 cursor-pointer rounded-md px-4 text-white font-semibold"
        >
          logout
        </button>:  <button
          onClick={()=>router.push("/")}
          className="bg-green-600 hover:bg-green-500 p-1 cursor-pointer rounded-md px-4 text-white font-semibold"
        >
         Join Chat
        </button>
      }
      </div>

      <div className="overflow-y-scroll hide-scrollbar py-6 border border-black  bg-white rounded-md h-[400px] ">
        {chat?.map((msg, i) => (
          <p
            className={`w-fit mb-2 mx-2 px-6 rounded-lg text-white  ${msg.senderId === socket.id ? "ml-auto bg-green-500" : "bg-pink-500  "}`}
            key={i}
          >
            <span className=" font-semibold">{msg.username}:</span>
            {msg.message}
          </p>
        ))}
        <div ref={chatEndRef} />
      </div>

      <form
        onSubmit={sendMessage}
        className="  w-full md:w-[70%]  left-4 flex mt-2 "
      >
        <input
          value={message}
          onKeyDown={(e) => e.key === "Enter" && sendMessage(e)}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type..."
          className="w-full border bg-white p-2"
        />

        <button
          type="submit"
          className="border w-fit px-6 py-3 cursor-pointer text-white bg-black"
        >
          Send
        </button>
      </form>
    </div>
  );
}
