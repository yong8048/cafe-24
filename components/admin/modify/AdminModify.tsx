"use client";
import React, { useState } from "react";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";

const PROPS_H1 = {
  전체: "전체",
  일반: "일반카페",
  무인: "무인카페",
};

const AdminModify = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [type, setType] = useState("전체");

  const handleClickType = (e: React.MouseEvent<HTMLHeadingElement>) => {
    e.stopPropagation();
    const headingEl = e.target as HTMLHeadingElement;

    setType(headingEl.textContent || "");
    setIsClicked(false);
  };

  return (
    <section className="w-full h-full">
      <div className="flex justify-between  w-3/5">
        <div>
          <div
            className="relative flex items-center cursor-pointer"
            onClick={() => {
              setIsClicked(!isClicked);
            }}
          >
            <span>{type}</span>
            {isClicked ? <MdArrowDropUp size="30" /> : <MdArrowDropDown size="30" />}
            {isClicked && (
              <div
                className="absolute right-0 z-50 w-20 text-base bg-white border border-gray-300 rounded top-full "
                onClick={handleClickType}
              >
                {Object.entries(PROPS_H1).map(([key, value], index) => (
                  <h1
                    key={index}
                    id={key}
                    className={`text-center p-1 cursor-pointer ${
                      index !== Object.entries(PROPS_H1).length - 1 && "border-b border-gray-300"
                    }`}
                  >
                    {value}
                  </h1>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex">
          <h1>지역</h1>
          <input type="text" className=" bg-black" />
        </div>
        <div className="flex">
          <h1>지점명</h1>
          <input type="text" className=" bg-black" />
        </div>
      </div>
      <div>리스트</div>
    </section>
  );
};

export default AdminModify;
