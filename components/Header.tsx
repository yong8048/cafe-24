"use client";
import React, { useState } from "react";
import HamburgerMenu from "@/components/HamburgerMenu";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import { auth } from "@/utils/firebase";
import Image from "next/image";
import LoginStatus from "./LoginStatus";

const Header = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [isLogined, setIsLogined] = useState(false);

  const provider = new GoogleAuthProvider();

  const [userData, setUserData] = useState({
    name: " ",
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
        <LoginStatus name={userData.name} />
      ) : (
        <h1
          className="px-4 cursor-pointer"
          onClick={() => {
            handleLogin();
            setIsLogined(true);
          }}
        >
          로그인
        </h1>
      )}
    </header>
  );
};

export default Header;
