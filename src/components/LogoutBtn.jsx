import React from "react";
import { useRouter } from "next/navigation";
import { useDarkMode } from "@/context/DarkMode";
const LogoutBtn = () => {
  const router = useRouter();
  const {mode,ThemeMode} = useDarkMode();
  const handleLogout = () => {
    localStorage.removeItem("username");
    router.push("/");
  };
  return (
    <button
      onClick={handleLogout}
      className={`${mode=="dark" ? ThemeMode?.dark?.fontColor : ThemeMode?.light?.fontColor} ${mode=="dark" ? ThemeMode?.dark?.cardColor : ThemeMode?.light?.cardColor}  p-1 cursor-pointer rounded-md px-2  font-semibold`}
    >
      logout
    </button>
  );
};

export default LogoutBtn;
