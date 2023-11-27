import React, { useState } from "react";

const LoginStatus = ({ name }: { name: String }) => {
  const [isClicked, setIsClicked] = useState(false);
  return (
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
  );
};

export default LoginStatus;
