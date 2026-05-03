import React from "react";
import { useRouter } from "next/navigation";
const LogoutBtn = () => {
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem("username");
    router.push("/");
  };
  return (
    <button
      onClick={handleLogout}
      className="bg-red-600 hover:bg-red-500 p-1 cursor-pointer rounded-md px-2 text-white font-semibold"
    >
      logout
    </button>
  );
};

export default LogoutBtn;
