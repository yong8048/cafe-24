import { useSelectedStore } from "@/store/selectedStore";
import { IStoreInfo } from "@/types/firebase";
import React from "react";

const category = {
  address: "주소",
  number: "전화번호",
  table: "테이블",
  parking: "주차",
  toilet: "화장실",
  internet: "인터넷",
  group: "단체석",
};

function StoreDetial() {
  const { data } = useSelectedStore();

  return (
    <section className="w-full">
      <div className="bg-gray-500 h-[220px]">StoreDetial</div>
      <div className="h-[115px] bg-gray-300 flex flex-col items-center justify-center gap-3 py-4">
        <p className="text-2xl">{data.name}</p>
        <p className="text-[#777]">{data.type} 카페</p>
      </div>
      <div className="p-6">
        {Object.entries(category).map(([key, value]) => (
          <div key={key} className="h-10 flex gap-5">
            <p className="w-20">{value}</p>
            <p>{data[key as keyof IStoreInfo]}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default StoreDetial;
