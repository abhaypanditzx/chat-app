"use client";
import { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import Image from "next/image"
import { useRouter } from "next/navigation";
import paw from "@/assets/paw.png"
import kitten from "@/assets/kitten.png"
export default function Home() {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [socketId, setSocketId] = useState("");
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
    <div
      style={{ padding: 20 }}
      className=" flex flex-col bg-white relative h-screen  `w-full"
    >
      <div className="flex pb-4  bg-white sticky top-0 z-50 justify-between items-center">
       <div className="flex gap-3 justify-center items-center">
          <div className="flex justify-between bg-pink-400 p-2 rounded-full items-center">
           <Image src={kitten} alt="kitten" width={25} height={25} />
         </div>
         <h2 className="text-xl font-semibold rounded-lg py-2">wlcm, {username}</h2>
       </div>
        
        {username ? (
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-500 p-1 cursor-pointer rounded-md px-2 text-white font-semibold"
          >
            logout
          </button>
        ) : (
          <button
            onClick={() => router.push("/")}
            className="bg-green-600 hover:bg-green-500 p-1 cursor-pointer rounded-md px-2 text-white font-semibold"
          >
            Join Chat
          </button>
        )}
      </div>

      <div className="overflow-y-scroll hide-scrollbar bg-[url('/bg.jpg')] bg-cover  bg-no-repeat py-6 border border-black  bg-white rounded-md h-[400px] ">
      
        {chat?.map((msg, i) => (
        <div key={i} className="w-full relative z-10 p-4">
            <p
            className={`w-fit mb-2 mx-2  py-2 p-1 rounded-lg   ${msg.senderId === socket.id ? "ml-auto bg-pink-400 border border-gray-400 text-white" : "bg-white text-black border border-gray-400  "}`}
            key={i}
          >
            <span className=" font-semibold">{msg.username}:</span>
            <span>{msg.message}</span>
          </p>
        </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <form
        onSubmit={sendMessage}
        className="  w-full md:w-[70%]  left-4 flex mt-2 "
      >
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type..."
          className="w-full border bg-white p-2"
        />

        <button
          type="submit"
          className="border w-fit px-6 py-3 cursor-pointer text-white bg-black"
        >
          <Image src={paw} alt="paw" width={25} height={25} />
        </button>
      </form>
    </div>
  );
}
