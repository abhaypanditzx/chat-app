import React from "react";

const ActiveUsers = ({ activeUser }) => {
  return (
    <div className=" flex-col md:flex hidden gap-2 w-[400px] border-r border-pink-400  bg-pink-300/20 py-5 rounded-lg ">
      <h2 className="text-lg font-semibold text-center text-black w-full  border-b border-pink-400">
        Active Users
      </h2>
      <div className="flex flex-col gap-2 px-4 py-2">
        {activeUser?.map((user, index) => (
          <h2
            key={index}
            className="text-xl font-semibold rounded-lg py-2 relative bg-white  border-pink-400 border hover:shadow-md transition-all cursor-pointer text-pink-600 h-fit w-full px-2 "
          >
            {user}
            {/* <div className="p-1 bg-green-500 rounded-full h-3 w-3 absolute top-0 right-0 "></div> */}
          </h2>
        ))}
      </div>
    </div>
  );
};

export default ActiveUsers;
