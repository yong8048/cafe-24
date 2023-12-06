"use client";
import React, { useEffect } from "react";
import HamburgerMenu from "@/components/HamburgerMenu";
import { signInWithPopup, GoogleAuthProvider, getAuth } from "firebase/auth";

import { GetUserInfo, PostUserInfo, auth } from "@/utils/firebase";
import Image from "next/image";
import LoginStatus from "./LoginStatus";
import { useCafeTypeStore } from "@/store/cafeTypeStore";
import { useUserInfoStore } from "@/store/userInfoStore";
import { useLoginStatusStore } from "@/store/loginStatusStore";

const Header = () => {
  const { type, setType } = useCafeTypeStore();
  const { userInfo, setUserInfo } = useUserInfoStore();
  const { loginStatus, setLoginStatus } = useLoginStatusStore();
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
            fav: userInfo.fav,
          });
        } else {
          PostUserInfo({
            name: user.displayName as string,
            email: user.email as string,
            uid: user.uid,
            fav: [],
          });
        }
        setLoginStatus(true);
      })
      .catch(error => {
        console.error(error);
      });
  };

  useEffect(() => {
    userInfo.name && setLoginStatus(true);
  }, []);

  return (
    <header className="bg-white w-full h-[78px] flex items-center border-b border-solid border-gray-300 p-4 text-black justify-between min-w-[900px]">
      <div className="flex gap-10 text-l font-semibold leading-[66.8px]">
        <HamburgerMenu />
        <Image src="/Logo.png" alt="Logo" width={150} height={32} className="-ml-6 cursor-default" />
        <h1
          className={`${type === "전체" && "text-red-400"} cursor-pointer duration-300 hover:leading-[60px]`}
          onClick={() => {
            setType("전체");
          }}
        >
          전체
        </h1>
        <h1
          className={`${type === "무인" && "text-red-400"} cursor-pointer duration-300 hover:leading-[60px]`}
          onClick={() => {
            setType("무인");
          }}
        >
          무인카페
        </h1>
        <h1
          className={`${type === "일반" && "text-red-400"} cursor-pointer duration-300 hover:leading-[60px]`}
          onClick={() => {
            setType("일반");
          }}
        >
          일반카페
        </h1>
        <h1
          className={`${type === "즐겨찾기" && "text-red-400"} cursor-pointer duration-300 hover:leading-[60px]`}
          onClick={() => {
            loginStatus ? setType("즐겨찾기") : alert("로그인이 필요합니다.");
          }}
        >
          즐겨찾기
        </h1>
      </div>

      {loginStatus ? (
        <LoginStatus />
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
