import Image from "next/image";
import React from "react";

const Intro = () => {
  return (
    <div className="relative bg-[#F1EFD7] h-full">
      <div>
        <Image src="/intro.png" alt="이미지 준비중" width={435} height={100} />
      </div>
      <div className="text-center text-sm">
        <h1 className="text-3xl mb-6 -mt-4">새벽 감성</h1>
        <h2>#새벽인데 커피땡기네..</h2>
        <h2>#밤산책하면서 커피한잔하고 싶다!</h2>
        <h2>#편의점말고 매장에서 먹고 싶은데</h2>
        <h2>#새벽에 조용히 커피먹고 싶을 때!!</h2>
        <h2 className="text-base font-bold mt-6">이런 분들을 위한 24시 운영하는 카페들을 모아 찾아보는 사이트</h2>
      </div>
      <div className="absolute right-2 bottom-20 text-sm text-right">
        <h2>lbw3973@gmail.com</h2>
        <h2>sylee8048@gmail.com</h2>
        <h2>Data Update : 2023.12.04</h2>
      </div>
    </div>
  );
};

export default Intro;
