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

const STYLE_H1 = `text-center p-1`;

const Header = () => {
  const [isClicked, setIsClicked] = useState(false);
  const { type, setType } = useCafeTypeStore();
  const { userInfo, setUserInfo } = useUserInfoStore();
  const { loginStatus, setLoginStatus } = useLoginStatusStore();
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
    <header className="bg-white w-full sm:h-[78px] h-[44px] flex items-center border-b border-solid border-gray-300 px-4 text-black justify-between whitespace-nowrap">
      <div className="flex items-center sm:gap-10 sm:justify-normal justify-between text-xl w-full">
        <HamburgerMenu />
        <div
          className="sm:hidden flex items-center relative"
          onClick={() => {
            setIsClicked(!isClicked);
          }}
        >
          <span>{type === "즐겨찾기" ? "즐찾" : type}</span>
          {isClicked ? <MdArrowDropUp size="30" /> : <MdArrowDropDown size="30" />}
          {isClicked && (
            <div
              className="z-50 absolute top-full text-base right-0 rounded w-20 border border-gray-300 bg-white"
              onClick={handleClickType}
            >
              <h1 id="전체" className={`${STYLE_H1} border-b border-gray-300`}>
                전체
              </h1>
              <h1 id="일반" className={`${STYLE_H1} border-b border-gray-300`}>
                일반카페
              </h1>
              <h1 id="무인" className={`${STYLE_H1} border-b border-gray-300`}>
                무인카페
              </h1>
              <h1 id="즐겨찾기" className={STYLE_H1}>
                즐겨찾기
              </h1>
            </div>
          )}
        </div>
        <Image
          src={logo}
          alt="Logo"
          className="sm:w-[150px] w-[90px] sm:h-[66px] h-[39px] sm:-ml-4 cursor-default"
          onClick={resetData}
        />
        <div className="hidden sm:flex items-center gap-10 font-semibold">
          <h1
            className={`${type === "전체" && "text-red-400"} cursor-pointer duration-300 hover:-translate-y-1`}
            onClick={() => {
              setType("전체");
            }}
          >
            전체
          </h1>
          <h1
            className={`${type === "무인" && "text-red-400"} cursor-pointer duration-300 hover:-translate-y-1`}
            onClick={() => {
              setType("무인");
            }}
          >
            무인카페
          </h1>
          <h1
            className={`${type === "일반" && "text-red-400"} cursor-pointer duration-300 hover:-translate-y-1`}
            onClick={() => {
              setType("일반");
            }}
          >
            일반카페
          </h1>
          <h1
            className={`${type === "즐겨찾기" && "text-red-400"} cursor-pointer duration-300 hover:-translate-y-1`}
            onClick={() => {
              loginStatus ? setType("즐겨찾기") : alert("로그인이 필요합니다.");
            }}
          >
            즐겨찾기
          </h1>
        </div>
        <div className="sm:w-full w-16"></div>
        {loginStatus ? (
          <LoginStatus />
        ) : (
          <h1
            className="cursor-pointer sm:text-base text-sm sm:whitespace-nowrap whitespace-normal"
            onClick={() => {
              handleLogin();
            }}
          >
            로그인
          </h1>
        )}
      </div>
    </header>
  );
};

export default Header;
