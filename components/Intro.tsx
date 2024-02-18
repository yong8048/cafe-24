import Image from "next/image";
import intro from "../public/intro.png";
import "../styles/intro.css";
import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { GetUpdateDate } from "@/utils/firebase";

const subTitles = [
  "#새벽인데 커피 땡기네..",
  "#밤산책하면서 커피 한잔하고 싶다!",
  "#편의점말고 매장에서 먹고 싶은데",
  "#새벽에 조용히 커피먹고 싶을 때!!",
  "#눈치안보고 카공하고 싶을때 무인카페",
  "#새벽감성 #24시카페 #24시카페검색 #무인카페 #새벽카페검색",
];
const TIMER_TIME = 2;

const Intro = () => {
  const [animationPriority, setAnimationPriority] = useState(0);
  const [sec, setSec] = useState(0);
  const time = useRef(TIMER_TIME);
  const timerId = useRef<NodeJS.Timeout>();
  const { data: updateDate } = useQuery({
    queryKey: ["updateDate"],
    queryFn: GetUpdateDate,
  });

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
        className="sm:w-[435px] w-[348px] sm:h-[400px] h-[320px] animate-cloud py-10"
      />
      <div className="text-sm text-center">
        <div className="flex flex-col items-center justify-center ">
          {/* <h1 id="intro_title" className="flex text-3xl">
            새벽감성 24시 카페 검색
          </h1> */}
          {subTitles.map((subTitle, index) => (
            <h3 key={index} className={`${animationPriority === index && "animate-subtitle"} text-gray-400`}>
              {subTitle}
            </h3>
          ))}
          <h3 className="hidden">
            24시 24시카페 24시프랜차이즈카페 프랜차이즈 새벽감성 데이롱 만월경 나우커피 탐탐 탐앤탐스 커반 커피에반하다
            카페일분 터치카페 프리햇 할리스 밤샘카페 카공 투썸 스타벅스 파스쿠찌 더노벰버 TheNovember 무인카페
            엔젤리너스
          </h3>

          <h2 className="px-3 mt-6 text-base font-[600] break-keep">
            이런 분들을 위한 <br /> 24시 운영하는 카페들을 모아 찾아보는 사이트
          </h2>
        </div>
        <div className="absolute bottom-0 text-[9px] text-left left-2 leading-3">
          <h2>lbw3973@gmail.com</h2>
          <h2>sylee8048@gmail.com</h2>
          {updateDate && <h2>Data Update : {updateDate.ymd}</h2>}
        </div>
      </div>
    </div>
  );
};

export default Intro;
