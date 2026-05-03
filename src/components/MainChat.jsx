import React from 'react'

const MainChat = ({chat,socket,chatEndRef}) => {
  return (
  <div className="overflow-y-scroll hide-scrollbar bg-[url('/bg.jpg')] bg-cover  bg-no-repeat py-6 border border-black  bg-white rounded-md h-[600px] ">
          {chat?.map((msg, i) => (
            <div key={i} className="w-full relative z-10 px-4 py-2">
              <p
                className={`w-fit p-1 rounded-lg ${msg.senderId === socket.id ? "ml-auto bg-pink-400 border border-gray-400 text-white" : "bg-white text-black border border-gray-400  "}`}
                key={i}
              >
                <span className=" font-semibold">{msg.username}:</span>
                <span>{msg.message}</span>
              </p>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
  )
}

export default MainChat