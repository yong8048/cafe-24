"use client";
import React, { useState } from "react";
import HamburgerMenu from "@/components/HamburgerMenu";
import UserProfile from "./UserProfile";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const Header = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [isLogined, setIsLogined] = useState(false);

  const provider = new GoogleAuthProvider();
  // const auth = getAuth();

  // const handleLogin = () => {
  //   signInWithPopup(auth, provider)
  //     .then(result => {
  //       const credential = GoogleAuthProvider.credentialFromResult(result);
  //       if (credential?.accessToken) {
  //         const token = credential.accessToken;

  //         const user = result.user;
  //         console.log(user);
  //       }
  //     })
  //     .catch(error => {
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       const email = error.customData.email;
  //       const credential = GoogleAuthProvider.credentialFromError(error);
  //     });
  // };

  return (
    <header className="bg-white w-full h-[78px] flex items-center border-b border-solid border-gray-300 p-4 text-black justify-between fixed z-50 ">
      <div className="pl-4 flex gap-10 text-l font-semibold first-of-type:cursor-pointer">
        <HamburgerMenu />
        <h1>로고</h1>
        <h1>전체</h1>
        <h1>무인카페</h1>
        <h1>일반카페</h1>
      </div>

      {isLogined ? (
        <div className="flex gap-1 items-center">
          <UserProfile name="이승용" />

          <div
            className="flex gap-2 px-2 py-0.5 cursor-pointer bg-slate-200 rounded-lg"
            onClick={() => setIsClicked(!isClicked)}
          >
            {isClicked ? (
              <>
                <h1 className="text-base">이승용</h1>
                <span className=" relative absolute top-1 left-0 w-2 h-2 border-t-2 border-r-2 border-black rotate-[135deg]"></span>
              </>
            ) : (
              <>
                <h1 className="text-base">이승용</h1>
                <span className=" relative absolute top-2 left-0 w-2 h-2 border-t-2 border-r-2 border-black rotate-[315deg]"></span>
              </>
            )}
          </div>
        </div>
      ) : (
        // <h1 className="px-4 cursor-pointer" onClick={handleLogin}>
        <h1 className="px-4 cursor-pointer">로그인</h1>
      )}
    </header>
  );
};

export default Header;
