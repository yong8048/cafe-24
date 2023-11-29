import { useImageStore } from "@/store/imageStore";
import { useSelectedStore } from "@/store/selectedStore";
import { IStoreInfo } from "@/types/firebase";
import Image from "next/image";
import React from "react";
import ImageSwiper from "./ImageSwiper";
import { FaPhone as Phone } from "react-icons/fa6";
import { LiaMapMarkerAltSolid as Marker } from "react-icons/lia";
import { MdOutlineTableBar as Table } from "react-icons/md";
import { FaCarSide as Parking } from "react-icons/fa6";
import { FaRestroom as Toilet } from "react-icons/fa";
import { IoIosWifi as Internet } from "react-icons/io";
import { VscOrganization as Group } from "react-icons/vsc";
const category = {
  address: { name: "주소", icon: <Marker size="25" /> },
  number: { name: "전화번호", icon: <Phone size="20" /> },
  table: { name: "테이블", icon: <Table size="25" /> },
  parking: { name: "주차", icon: <Parking size="25" /> },
  toilet: { name: "화장실", icon: <Toilet size="25" /> },
  internet: { name: "인터넷", icon: <Internet size="25" /> },
  group: { name: "단체석", icon: <Group size="25" /> },
};

function StoreDetial() {
  const { data } = useSelectedStore();
  const { urls } = useImageStore();

  return (
    <section className="w-full">
      <div className="h-[220px] relative">
        {urls.length ? (
          <ImageSwiper urls={urls} />
        ) : (
          <div className="flex flex-col items-center gap-4 justify-center h-full">
            <Image src="/default.png" alt="이미지 준비중" width={100} height={100} />
            <p className="text-xl font-bold">이미지 준비중입니다.</p>
          </div>
        )}
      </div>
      <div className="h-[115px] bg-white flex flex-col items-center justify-center gap-3 py-4 border">
        <p className="text-2xl font-bold">{data.name}</p>
        <p className="text-[#777]">{data.type} 카페</p>
      </div>
      <div className="p-6">
        {Object.entries(category).map(([key, value]) => (
          <div key={key} className="h-10 flex gap-9 items-center">
            <div className="h-7 w-7 flex justify-center">{value.icon}</div>
            <p>{data[key as keyof IStoreInfo]}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default StoreDetial;
