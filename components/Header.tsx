"use client";
import React, { MouseEvent, useEffect, useState } from "react";
import HamburgerMenu from "@/components/HamburgerMenu";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { GetUserInfo, PostUserInfo, auth } from "@/utils/firebase";
import Image from "next/image";
import logo from "../public/Logo.png";
import LoginStatus from "./LoginStatus";
import { useCafeTypeStore } from "@/store/cafeTypeStore";
import { useUserInfoStore } from "@/store/userInfoStore";
import { useLoginStatusStore } from "@/store/loginStatusStore";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import { useSelectedStore } from "@/store/selectedStore";
import { useSidebarStore } from "@/store/sidebarStore";

const PROPS_H1 = {
  전체: "전체",
  일반: "일반카페",
  무인: "무인카페",
  즐겨찾기: "즐겨찾기",
};

const Header = () => {
  const [isClicked, setIsClicked] = useState(false);
  const { type, setType } = useCafeTypeStore();
  const { userInfo, setUserInfo } = useUserInfoStore();
  const { loginStatus, setLoginStatus } = useLoginStatusStore();
  const { setOpen } = useSidebarStore();
  const provider = new GoogleAuthProvider();
  const { resetData } = useSelectedStore();

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

  const handleClickType = (e: MouseEvent<HTMLHeadingElement>) => {
    e.stopPropagation();
    const headingEl = e.target as HTMLHeadingElement;
    if (headingEl.id === "즐겨찾기") {
      if (!loginStatus) {
        alert("로그인이 필요합니다.");
        return;
      }
    }
    setType(headingEl.id);
    setIsClicked(false);
  };
  return (
    <header className="flex items-center justify-between bg-white w-full sm:h-[78px] h-[44px] border-b border-solid border-gray-300 px-4 text-black whitespace-nowrap">
      <div className="flex items-center justify-between w-full text-xl sm:gap-10 sm:justify-normal">
        <HamburgerMenu />
        <div
          className="relative flex items-center sm:hidden"
          onClick={() => {
            setIsClicked(!isClicked);
          }}
        >
          <span>{type === "즐겨찾기" ? "즐찾" : type}</span>
          {isClicked ? <MdArrowDropUp size="30" /> : <MdArrowDropDown size="30" />}
          {isClicked && (
            <div
              className="absolute right-0 z-50 w-20 text-base bg-white border border-gray-300 rounded top-full"
              onClick={handleClickType}
            >
              {Object.entries(PROPS_H1).map(([key, value], index) => (
                <h1
                  key={index}
                  id={key}
                  className={`text-center p-1 ${
                    index !== Object.entries(PROPS_H1).length - 1 && "border-b border-gray-300"
                  }`}
                >
                  {value}
                </h1>
              ))}
            </div>
          )}
        </div>
        <Image
          src={logo}
          alt="Logo"
          className="sm:w-[150px] w-[90px] sm:h-[66px] h-[39px] sm:-ml-4 cursor-default"
          onClick={() => {
            resetData();
            setOpen();
          }}
        />
        <div className="items-center hidden gap-10 font-semibold sm:flex">
          {Object.entries(PROPS_H1).map(([key, value], index) => (
            <h1
              key={key}
              id={key}
              className={`${type === key && "text-red-400"} cursor-pointer duration-300 hover:-translate-y-1`}
              onClick={handleClickType}
            >
              {value}
            </h1>
          ))}
        </div>
        <div className="w-16 sm:w-full"></div>
        {loginStatus ? (
          <LoginStatus />
        ) : (
          <button
            className="sm:text-base text-sm cursor-pointer sm:bg-none bg-[url('/googleIcon.ico')] sm:w-auto w-8 h-8 pr-8"
            onClick={() => {
              handleLogin();
            }}
          >
            <span className="hidden sm:inline">로그인</span>
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
