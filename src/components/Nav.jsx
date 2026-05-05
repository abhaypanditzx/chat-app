"use client";
import LogoutBtn from "@/components/LogoutBtn";
import LoginBtn from "@/components/LoginBtn";
import { useDarkMode } from "@/context/DarkMode";

const Nav = ({ activeUser, username, ThemeMode }) => {
  const {mode,setMode} = useDarkMode();
  const handleMode = ()=>{
    localStorage.setItem("theme",mode=="dark"?"light":"dark")
const saved=  localStorage.getItem("theme") || 'light'
    setMode(saved);
  }
  return (
    <div
      className={`flex pb-4 sticky top-0 z-50 justify-between items-center p-4 ${mode==="dark" ? "bg-linear-to-br from-blue-500 from-5% to-100% to-purple-500" : " bg-linear-to-br from-blue-500  to-blue-400 "} rounded-t-none sm:rounded-t-lg`}
    >
      <div className="flex gap-3 justify-center items-center">
        <div className="relative bg-blue-100  px-2 text-xs sm:px-4 rounded-full  py-2  text-blue-500">
          {activeUser.length + " active users"}
          <div className="p-1 bg-green-500 rounded-full h-2 w-2 sm:h-3 sm:w-3 absolute top-0 right-0 "></div>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={()=>handleMode()}
          className={`${mode=="dark" ? ThemeMode?.dark?.cardColor + " " + ThemeMode?.dark?.fontColor : ThemeMode?.light?.cardColor + " " + ThemeMode?.light?.fontColor} rounded-lg p-1 text-xs sm:p-2 sm:text-base font-semibold hover:cursor-pointer transition-colors duration-300 `}
        >
          {mode ==="dark" ? "Light mode" : "Dark mode"}
        </button>
        {username ? <LogoutBtn /> : <LoginBtn />}
      </div>
    </div>
  );
};

export default Nav;
