"use client";
import React, { useState } from "react";
import HamburgerMenu from "@/components/HamburgerMenu";
import UserProfile from "./UserProfile";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { auth } from "@/utils/firebase";
import Image from "next/image";

const Header = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [isLogined, setIsLogined] = useState(false);

  const provider = new GoogleAuthProvider();

  const [userData, setUserData] = useState({
    name: "이름",
    email: "이메일",
  });

  const handleLogin = () => {
    signInWithPopup(auth(), provider)
      .then(result => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        if (credential?.accessToken) {
          const token = credential.accessToken;

          const user = result.user;

          if (user.displayName && user.email) {
            setUserData({
              name: user.displayName,
              email: user.email,
            });
          }
          console.log(user);
        }
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };

  return (
    <header className="bg-white w-full h-[78px] flex items-center border-b border-solid border-gray-300 p-4 text-black justify-between fixed z-50 ">
      <div className="flex gap-10 text-l font-semibold first-of-type:cursor-pointer leading-[66.8px]">
        <HamburgerMenu />
        <Image src="/Logo.png" alt="Logo" width={150} height={32} className="-ml-6" priority />
        <h1>전체</h1>
        <h1>무인카페</h1>
        <h1>일반카페</h1>
      </div>

      {isLogined ? (
        <div className="flex gap-1 items-center">
          <UserProfile name={userData.name} />

          <div
            className="flex gap-2 px-2 py-0.5 cursor-pointer bg-slate-200 rounded-lg"
            onClick={() => setIsClicked(!isClicked)}
          >
            {isClicked ? (
              <>
                <h1 className="text-base">{userData.name}</h1>
                <span className=" relative absolute top-2 left-0 w-2 h-2 border-t-2 border-r-2 border-black rotate-[315deg]"></span>
              </>
            ) : (
              <>
                <h1 className="text-base">{userData.name}</h1>
                <span className=" relative absolute top-1 left-0 w-2 h-2 border-t-2 border-r-2 border-black rotate-[135deg]"></span>
              </>
            )}
          </div>
        </div>
      ) : (
        <h1
          className="px-4 cursor-pointer"
          onClick={() => {
            handleLogin();
            setIsLogined(true);
          }}
        >
          {/* <h1 className="px-4 cursor-pointer">로그인</h1> */}로그인
        </h1>
      )}
    </header>
  );
};

export default Header;
