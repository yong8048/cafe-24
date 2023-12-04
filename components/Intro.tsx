import Image from "next/image";
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
    <div className="relative bg-[#F1EFD7] h-full">
      <Image src="/intro.png" alt="이미지 준비중" width={435} height={100} className="animate-cloud py-10" />
      <div className="text-center text-sm z-50">
        <h1 className="text-3xl mb-6">새벽 감성</h1>
        {subTitles.map((subTitle, index) => (
          <h3 key={index} className={`${animationPriority === index && "animate-subtitle"}`}>
            {subTitle}
          </h3>
        ))}
        {/* <h3>#새벽인데 커피땡기네..</h3>
        <h3>#밤산책하면서 커피한잔하고 싶다!</h3>
        <h3>#편의점말고 매장에서 먹고 싶은데</h3>
        <h3>#새벽에 조용히 커피먹고 싶을 때!!</h3> */}
        <h2 className="text-base font-bold mt-6">이런 분들을 위한 24시 운영하는 카페들을 모아 찾아보는 사이트</h2>
      </div>
      <div className="absolute right-2 bottom-20 text-xs text-right">
        <h2>lbw3973@gmail.com</h2>
        <h2>sylee8048@gmail.com</h2>
        <h2>Data Update : 2023.12.04</h2>
      </div>
    </div>
  );
};

export default Intro;
