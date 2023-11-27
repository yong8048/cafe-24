import Image from "next/image";
import React, { useState } from "react";

const AdminHeader = () => {
  const [isClicked, setIsClicked] = useState(false);
  return (
    <header className="bg-white w-full h-[78px] flex items-center border-b border-solid border-gray-300 p-4 text-black justify-between">
      <div className="flex gap-10 text-l font-semibold first-of-type:cursor-pointer leading-[66.8px]">
        <Image src="/Logo.png" alt="Logo" width={150} height={32} priority />
        <h1>제보 리스트</h1>
        <h1>매장 추가</h1>
        <h1>정보 수정</h1>
      </div>
      <div className="flex gap-1 items-center">
        <div className="flex items-center justify-center h-[26px] w-[26px] rounded-full bg-blue-500 text-white">관</div>
        <div
          className="relative flex gap-2 px-2 py-0.5 cursor-pointer bg-slate-200 rounded-lg items-center"
          onClick={() => setIsClicked(!isClicked)}
        >
          <h1 className="text-base">관리자 이름</h1>
          <span className={`w-2 h-2 border-t-2 border-r-2 border-black rotate-[${isClicked ? 315 : 135}deg]`}></span>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
