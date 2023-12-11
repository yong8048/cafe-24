import { adminID } from "@/constants/admin";
import { useLoginStatusStore } from "@/store/loginStatusStore";
import { useSelectedStore } from "@/store/selectedStore";
import { useUserInfoStore } from "@/store/userInfoStore";
import { auth } from "@/utils/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const LoginStatus = () => {
  const [isClicked, setIsClicked] = useState(false);
  const { userInfo, resetUserInfo } = useUserInfoStore();
  const { setLoginStatus } = useLoginStatusStore();
  const { resetData } = useSelectedStore();
  const router = useRouter();

  const handleAdmin = () => {
    window.open("/admin");
  };

  const handleLogout = () => {
    signOut(auth())
      .then(() => {
        resetUserInfo();
        setIsClicked(false);
        setLoginStatus(false);
        resetData();
      })
      .catch(error => {
        console.error(error);
      });
  };
  return (
    <div className="relative inline-block">
      <div className="flex gap-1 items-center">
        <div className="flex items-center justify-center h-[26px] w-[26px] rounded-full bg-blue-500 text-white">
          {userInfo.name[0]}
        </div>
        <div
          className="flex gap-2 px-2 py-0.5 cursor-pointer bg-slate-200 rounded-lg"
          onClick={() => setIsClicked(!isClicked)}
        >
          <h1 className="text-base">{userInfo.name}</h1>
          <span
            className={`relative  top-2 left-0 w-2 h-2 border-t-2 border-r-2 border-black ${
              isClicked ? "rotate-[315deg]" : "rotate-[135deg]"
            }`}
          ></span>
        </div>
      </div>
      {isClicked ? (
        <div className="absolute z-10 top-full mt-2 right-0 text-center">
          <ul className="flex flex-col justify-center">
            {adminID.includes(userInfo.uid) && (
              <li
                className="w-[74px] h-10 cursor-pointer border border-gray-300 bg-white text-black rounded-md leading-10"
                onClick={handleAdmin}
              >
                백오피스
              </li>
            )}
            <li
              className="w-[74px] h-10 cursor-pointer border border-gray-300 bg-white text-black rounded-md leading-10"
              onClick={handleLogout}
            >
              로그아웃
            </li>
          </ul>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default LoginStatus;
