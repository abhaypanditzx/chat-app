import React from "react";
import { useRouter } from "next/navigation";
import { useDarkMode } from "@/context/DarkMode";
const LogoutBtn = () => {
  const router = useRouter();
  const { mode, ThemeMode } = useDarkMode();
  const handleLogout = () => {
    localStorage.removeItem("username");
    router.push("/");
  };
  return (
    <button
      onClick={handleLogout}
      className={`${mode == "dark" ? ThemeMode?.dark?.fontColor : ThemeMode?.light?.fontColor} ${mode == "dark" ? ThemeMode?.dark?.cardColor : ThemeMode?.light?.cardColor} p-2 rounded-md cursor-pointer  transition-colors duration-300  font-semibold`}
    >
      <svg
        width="20px"
        height="20px"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13.5 7.5L10.5 10.75M13.5 7.5L10.5 4.5M13.5 7.5L4 7.5M8 13.5H1.5L1.5 1.5L8 1.5"
          stroke="currentColor"
        />
      </svg>
    </button>
  );
};

export default LogoutBtn;
