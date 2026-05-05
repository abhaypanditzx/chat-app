"use client";
import { createContext, useContext, useEffect, useState } from "react";

const DarkModeContext = createContext();

const DarkModeContextProvider = ({ children }) => {
  const [mode, setMode] = useState("light");

  useEffect(()=>{
      const saved = localStorage.getItem("theme") || "light";
      setMode(saved);

},[])


const ThemeMode = {
  dark: {
    bgColor: "bg-[#0f172a]",        // deep navy (not pitch black)
    fontColor: "text-gray-200",     // soft white (easy on eyes)
    cardColor: "bg-[#1e293b]",      // slightly lighter cards
    accent: "bg-blue-500",
  },
  light: {
    bgColor: "bg-[#f8fafc]",
    fontColor: "text-gray-800",
    cardColor: "bg-white",
    accent: "bg-blue-500",
  }

  };
  return (
    <DarkModeContext.Provider value={{ mode, setMode, ThemeMode}}>
      {children}
    </DarkModeContext.Provider>
  );
};

const useDarkMode = () => useContext(DarkModeContext);
export { useDarkMode, DarkModeContextProvider };
