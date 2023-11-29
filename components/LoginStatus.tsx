import React, { useState } from "react";

const LoginStatus = ({ name }: { name: String }) => {
  const [isClicked, setIsClicked] = useState(false);

  const Logout = () => {};
  return (
    <div className="relative inline-block">
      <div className="flex gap-1 items-center">
        <div className="flex items-center justify-center h-[26px] w-[26px] rounded-full bg-blue-500 text-white">
          {name[0]}
        </div>
        <div
          className="flex gap-2 px-2 py-0.5 cursor-pointer bg-slate-200 rounded-lg"
          onClick={() => setIsClicked(!isClicked)}
        >
          <h1 className="text-base">{name}</h1>
          <span
            className={`relative  top-2 left-0 w-2 h-2 border-t-2 border-r-2 border-black ${
              isClicked ? "rotate-[315deg]" : "rotate-[135deg]"
            }`}
          ></span>
        </div>
      </div>
      {isClicked ? (
        <div className="absolute w-[74px] h-10 top-full mt-2 ml-7 text-center border border-gray-300 bg-white text-black rounded-md ">
          <ul className="w-[74px] h-10 flex flex-col justify-center gap-2 ">
            <li className="cursor-pointer" onClick={Logout}>
              로그아웃
            </li>
          </ul>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default LoginStatus;
