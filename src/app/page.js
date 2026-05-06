"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useDarkMode } from '@/context/DarkMode'
const page = () => {
  const router = useRouter();
  const {username,setUsername} = useDarkMode();
  const handleUser = ()=>{
    if(!username) return;
    localStorage.setItem("username",username);
    router.push("/chat");
  }
  return (
    <div  className='flex justify-center flex-col items-center h-screen w-full '>
     <div className='bg-slate-200 p-10 shadow-lg rounded-lg flex flex-col gap-4 '>
       <h2 className='text-center text-3xl font-bold mb-3'>Join the chat</h2>
       <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)} placeholder='enter your Username' className='bg-white rounded-lg placeholder-gray-600 p-2' />
      <button onClick={handleUser} className='bg-green-500 cursor-pointer hover:bg-green-600 p-2 text-white rounded-lg'>Enter chat</button>
     </div>
    </div>
  )
}

export default page