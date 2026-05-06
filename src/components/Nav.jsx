"use client";
import LogoutBtn from "@/components/LogoutBtn";
import LoginBtn from "@/components/LoginBtn";
import { useDarkMode } from "@/context/DarkMode";

const Nav = ({ activeUser, username, ThemeMode }) => {
  const { mode, setMode } = useDarkMode();
  const handleMode = () => {
    localStorage.setItem("theme", mode == "dark" ? "light" : "dark");
    const saved = localStorage.getItem("theme") || "light";
    setMode(saved);
  };

  return (
    <div
      className={`flex pb-4 sticky top-0 z-50 justify-between items-center p-4 ${mode === "dark" ? "bg-linear-to-br from-blue-500 from-5% to-100% to-purple-500" : " bg-linear-to-br from-blue-500  to-blue-400 "} rounded-t-none sm:rounded-t-lg`}
    >
      <div className="flex gap-3 justify-center items-center">
        <div className="relative bg-blue-100  px-2 text-xs sm:px-4 rounded-full  py-2  text-blue-500">
          {activeUser.length + " active users"}
          <div className="p-1 bg-green-500 rounded-full h-2 w-2 sm:h-3 sm:w-3 absolute top-0 right-0 "></div>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => handleMode()}
          className={`${mode == "dark" ? ThemeMode?.dark?.cardColor + " " + ThemeMode?.dark?.fontColor : ThemeMode?.light?.cardColor + " " + ThemeMode?.light?.fontColor} rounded-lg p-1 text-xs sm:p-2 sm:text-base font-semibold hover:cursor-pointer transition-colors duration-300 `}
        >
          {mode === "dark" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
              />
            </svg>
          )}
        </button>
        {username ? <LogoutBtn /> : <LoginBtn />}
      </div>
    </div>
  );
};

export default Nav;
