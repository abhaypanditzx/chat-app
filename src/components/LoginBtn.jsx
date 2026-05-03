import React from "react";
import { useRouter } from "next/navigation";
const LoginBtn = () => {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push("/")}
      className="bg-green-600 hover:bg-green-500 p-1 cursor-pointer rounded-md px-2 text-white font-semibold"
    >
      Join Chat
    </button>
  );
};

export default LoginBtn;
