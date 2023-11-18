import React from "react";
import HamburgerMenu from "@/components/HamburgerMenu";
import UserProfile from "./UserProfile";

const Header = () => {
  return (
    <header className="bg-white h-[74px] flex items-center border-b border-solid border-gray-300 p-4 text-black justify-between">
      <div className="flex gap-4">
        <HamburgerMenu />
        <h1>로고</h1>
        <h1>전체</h1>
        <h1>무인카페</h1>
        <h1>일반카페</h1>
      </div>
      <div className="flex gap-1 items-center">
        <UserProfile name="이승용" />
        <div className="flex gap-1">
          <h1 className="text-base">이승용</h1>
          <h1>0</h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
