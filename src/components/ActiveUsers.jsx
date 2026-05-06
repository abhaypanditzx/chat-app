"use client";
import React from "react";
import { useDarkMode } from "@/context/DarkMode";

const Skeleton = () => {
  const { mode, ThemeMode } = useDarkMode();
  const numberOfSkeleton = 7;
  return (
    <>
      {Array.from({ length: numberOfSkeleton }).map((_, i) => (
        <div
          key={i}
          className={`${mode == "dark" ? ThemeMode?.dark?.cardColor : ThemeMode?.light?.cardColor} rounded-lg min-h-12 relative overflow-hidden hover:shadow-md cursor-pointer h-fit w-full px-2 `}
        >
          <div className="inset-0 absolute top-2 h-[70px] w-[20px]  animate-shine"></div>
        </div>
      ))}
    </>
  );
};
const ActiveUsers = ({ ThemeMode, activeUser, activeUserLoading }) => {
  const { mode } = useDarkMode();

  return (
    <div
      className={`flex-col ${mode == "dark" ? ThemeMode?.dark?.bgColor + " " + ThemeMode?.dark?.fontColor : ThemeMode?.light?.bgColor + " " + ThemeMode?.light?.fontColor} md:flex hidden gap-2 w-[400px] rounded-lg shadow-lg py-5 h-[600px] overflow-auto`}
    >
      <h2 className="text-xl font-semibold text-start px-4 border-b border-gray-300 pb-2 w-full ">
        Active Users
      </h2>
      <div className="flex flex-col gap-2 px-4 py-2">
        {!activeUserLoading ? (
          activeUser.map((user, index) => (
            <h2
              key={index}
              className={` ${mode == "dark" ? ThemeMode?.dark?.cardColor : ThemeMode?.light?.cardColor} text-xl font-semibold rounded-lg py-2 flex justify-between items-center cursor-pointer shadow-md  h-fit w-full px-2 `}
            >
              <span>@{user}</span>
              <div className="p-1 bg-green-500 rounded-full h-3 w-3 "></div>
            </h2>
          ))
        ) : (
          <Skeleton />
        )}
      </div>
    </div>
  );
};

export default ActiveUsers;
