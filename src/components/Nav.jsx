"use client";
import Image from "next/image";
import kitten from "@/assets/kitten.png";
import LogoutBtn from "@/components/LogoutBtn";
import LoginBtn from "@/components/LoginBtn";
const Nav = ({activeUser,username}) => {
  return (
       <div className="flex pb-4  bg-white sticky top-0 z-50 justify-between items-center">
          <div className="flex gap-3 justify-center items-center">
            <div className="flex justify-between bg-pink-400 p-2 rounded-full items-center">
              <Image src={kitten} alt="kitten" width={25} height={25} />
            </div>
            <div className="relative bg-pink-100  rounded-full px-4 py-2  text-pink-500">
              {activeUser.length + " users active"}
              <div className="p-1 bg-green-500 rounded-full h-3 w-3 absolute top-0 right-0 "></div>
            </div>
          </div>

          {username ? <LogoutBtn /> : <LoginBtn />}
        </div>
  )
}

export default Nav