"use client";
import React, { useState, useEffect } from "react";
import HamburgerMenu from "@/components/HamburgerMenu";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import { auth } from "@/utils/firebase";
import Image from "next/image";
import LoginStatus from "./LoginStatus";
import { useCafeTypeStore } from "@/store/cafeTypeStore";

const Header = () => {
  const [isLogined, setIsLogined] = useState(false);
  const [selected, setSelected] = useState("전체");
  const { setType } = useCafeTypeStore();
  const provider = new GoogleAuthProvider();

  const [userData, setUserData] = useState({
    name: "",
    email: "이메일",
    uid: "",
  });

  useEffect(() => {
    localStorage.setItem("userInfo", JSON.stringify(userData));
  }, [userData]);

  const handleLogin = () => {
    signInWithPopup(auth(), provider)
      .then(result => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        if (credential?.accessToken) {
          const token = credential.accessToken;
          const uid = result.user.uid;

          const user = result.user;
          console.log(result.user.uid);

          if (user.displayName && user.email) {
            setUserData({
              name: user.displayName,
              email: user.email,
              uid: user.uid,
            });
          }
          setIsLogined(true);
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
    <header className="bg-white w-full h-[78px] flex items-center border-b border-solid border-gray-300 p-4 text-black justify-between ">
      <div className="flex gap-10 text-l font-semibold leading-[66.8px]">
        <HamburgerMenu />
        <Image src="/Logo.png" alt="Logo" width={150} height={32} className="-ml-6 cursor-default" />
        <h1
          className={`${selected === "전체" && "text-red-400"} cursor-pointer`}
          onClick={() => {
            setSelected("전체");
            setType("전체");
          }}
        >
          전체
        </h1>
        <h1
          className={`${selected === "무인카페" && "text-red-400"} cursor-pointer`}
          onClick={() => {
            setSelected("무인카페");
            setType("무인");
          }}
        >
          무인카페
        </h1>
        <h1
          className={`${selected === "일반카페" && "text-red-400"} cursor-pointer`}
          onClick={() => {
            setSelected("일반카페");
            setType("일반");
          }}
        >
          일반카페
        </h1>
        <h1
          className={`${selected === "즐겨찾기" && "text-red-400"} cursor-pointer`}
          onClick={() => setSelected("즐겨찾기")}
        >
          즐겨찾기
        </h1>
      </div>

      {isLogined ? (
        <LoginStatus name={userData.name} />
      ) : (
        <h1
          className="px-4 cursor-pointer"
          onClick={() => {
            handleLogin();
          }}
        >
          로그인
        </h1>
      )}
    </header>
  );
};

export default Header;
