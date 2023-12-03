"use client";
import React, { useState } from "react";
import HamburgerMenu from "@/components/HamburgerMenu";
import { signInWithPopup, GoogleAuthProvider, getAuth } from "firebase/auth";

import { GetUserInfo, PostUserInfo, auth } from "@/utils/firebase";
import Image from "next/image";
import LoginStatus from "./LoginStatus";
import { useCafeTypeStore } from "@/store/cafeTypeStore";
import { useUserInfoStore } from "@/store/userInfoStore";

const Header = () => {
  const [isLogined, setIsLogined] = useState(false);
  const [selected, setSelected] = useState("전체");
  const { setType } = useCafeTypeStore();
  const { userInfo, setUserInfo } = useUserInfoStore();
  const provider = new GoogleAuthProvider();

  const handleLogin = () => {
    signInWithPopup(auth(), provider)
      .then(async result => {
        const user = result.user;
        const userInfo = await GetUserInfo(user.uid);

        if (userInfo) {
          setUserInfo({
            name: userInfo.name,
            email: userInfo.email,
            uid: user.uid,
            admin: userInfo.admin,
            fav: userInfo.fav,
          });
        } else {
          PostUserInfo({
            name: user.displayName as string,
            email: user.email as string,
            uid: user.uid,
            fav: [],
            admin: false,
          });
        }
        setIsLogined(true);
      })
      .catch(error => {
        console.error(error);
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
          onClick={() => {
            setSelected("즐겨찾기");
            setType("즐겨찾기");
          }}
        >
          즐겨찾기
        </h1>
      </div>

      {isLogined ? (
        <LoginStatus name={userInfo.name} />
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
