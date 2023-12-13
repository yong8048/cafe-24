import Image from "next/image";
import intro from "../public/intro.png";
import "../styles/intro.css";
import React, { useEffect, useRef, useState } from "react";

const subTitles = [
  "#새벽인데 커피 땡기네..",
  "#밤산책하면서 커피 한잔하고 싶다!",
  "#편의점말고 매장에서 먹고 싶은데",
  "#새벽에 조용히 커피먹고 싶을 때!!",
];

const TIMER_TIME = 2;

const Intro = () => {
  const [animationPriority, setAnimationPriority] = useState(0);
  const [sec, setSec] = useState(0);
  const time = useRef(TIMER_TIME);
  const timerId = useRef<NodeJS.Timeout>();

  const startTimer = () => {
    time.current = TIMER_TIME;
    timerId.current = setInterval(() => {
      setSec(time.current);
      time.current -= 1;
    }, 1000);
  };

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerId.current);
  }, []);

  useEffect(() => {
    if (time.current === 0) {
      animationPriority === subTitles.length - 1
        ? setAnimationPriority(0)
        : setAnimationPriority(animationPriority + 1);
      clearInterval(timerId.current);
      setSec(0);
      startTimer();
    }
  }, [sec]);

  return (
    <div className="relative bg-[#F1EFD7] h-full flex flex-col items-center">
      <Image
        src={intro}
        alt="이미지 준비중"
        className="sm:w-[435px] w-[348px] sm:h-[400px] h-[320px] py-10 animate-cloud"
      />
      <div className="text-center text-sm">
        <div className="flex flex-col justify-center items-center">
          <h1 id="intro_title" className="flex text-3xl">
            새벽감성 24시 카페 검색
          </h1>
          {subTitles.map((subTitle, index) => (
            <h3 key={index} className={`${animationPriority === index && "animate-subtitle"} text-gray-400`}>
              {subTitle}
            </h3>
          ))}
          <h2 className="text-base font-bold mt-6">이런 분들을 위한 24시 운영하는 카페들을 모아 찾아보는 사이트</h2>
        </div>
        <div className="absolute right-2 bottom-0 text-xs text-right">
          <h2>lbw3973@gmail.com</h2>
          <h2>sylee8048@gmail.com</h2>
          <h2>Data Update : 2023.12.04</h2>
        </div>
      </div>
    </div>
  );
};

export default Intro;
