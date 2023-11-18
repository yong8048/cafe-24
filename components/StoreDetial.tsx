import React from "react";

const StoreDetial = () => {
  return (
    <section className="w-full">
      <div className="bg-gray-500 h-[220px]">StoreDetial</div>
      <div className="h-[115px] bg-gray-300 flex flex-col items-center justify-center gap-3 py-4">
        <p className="text-2xl">카페이름</p>
        <p className="text-[#777]">무인 카페</p>
      </div>
      <div className="p-6">
        <div className="h-10 flex gap-5">
          <p className="w-20">주소</p>
          <p>경기도 수원시 시골로 흘러가</p>
        </div>
        <div className="h-10 flex gap-5">
          <p className="w-20">전화번호</p>
          <p>경기도 수원시 시골로 흘러가</p>
        </div>
        <div className="h-10 flex gap-5">
          <p className="w-20">테이블</p>
          <p>경기도 수원시 시골로 흘러가</p>
        </div>
        <div className="h-10 flex gap-5">
          <p className="w-20">주차</p>
          <p>경기도 수원시 시골로 흘러가</p>
        </div>
        <div className="h-10 flex gap-5">
          <p className="w-20">화장실</p>
          <p>경기도 수원시 시골로 흘러가</p>
        </div>
        <div className="h-10 flex gap-5">
          <p className="w-20">인터넷</p>
          <p>경기도 수원시 시골로 흘러가</p>
        </div>
        <div className="h-10 flex gap-5">
          <p className="w-20">단체석</p>
          <p>경기도 수원시 시골로 흘러가</p>
        </div>
      </div>
    </section>
  );
};

export default StoreDetial;
