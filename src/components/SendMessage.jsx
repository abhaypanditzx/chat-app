"use client";
import paw from "@/assets/paw.png";
import Image from "next/image";
const SendMessage = ({socket,username,message, setMessage }) => {

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
  )
}

export default SendMessage