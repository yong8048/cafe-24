import { useImageStore } from "@/store/imageStore";
import { useSelectedStore } from "@/store/selectedStore";
import { IStoreInfo } from "@/types/firebase";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import ImageSwiper from "./ImageSwiper";
import { FaPhone as Phone } from "react-icons/fa6";
import { LiaMapMarkerAltSolid as Marker } from "react-icons/lia";
import { MdOutlineTableBar as Table } from "react-icons/md";
import { FaCarSide as Parking } from "react-icons/fa6";
import { FaRestroom as Toilet } from "react-icons/fa";
import { IoIosWifi as Internet } from "react-icons/io";
import { VscOrganization as Group } from "react-icons/vsc";
import { FaRegCopy as Copy } from "react-icons/fa";
import { FaRegStar as NotFav } from "react-icons/fa";
import { FaStar as Fav } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PostFavStore } from "@/utils/firebase";
import { useUserInfoStore } from "@/store/userInfoStore";

const category = {
  address: { name: "주소", icon: <Marker size="25" />, copy: true },
  number: { name: "전화번호", icon: <Phone size="20" />, copy: true },
  table: { name: "테이블", icon: <Table size="25" />, copy: false },
  parking: { name: "주차", icon: <Parking size="25" />, copy: false },
  toilet: { name: "화장실", icon: <Toilet size="25" />, copy: false },
  internet: { name: "인터넷", icon: <Internet size="25" />, copy: false },
  group: { name: "단체석", icon: <Group size="25" />, copy: false },
};

function StoreDetial() {
  const { data } = useSelectedStore();
  const { urls } = useImageStore();
  const { userInfo, setUserInfo } = useUserInfoStore();

  const [isHovered, setIsHovered] = useState<{ [key: string]: boolean }>({});
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    const favList = userInfo.fav;
    setIsFav(favList.includes(data.id as string));
  }, [data, userInfo]);

  ////토스트 메세지 종류 추가
  const copyNotify = () => toast(`복사 완료`);
  const favAddNotify = () => toast("즐겨찾기가 추가되었습니다.");
  const favRemoveNotify = () => toast("즐겨찾기가 삭제되었습니다.");

  const handleMouseOver = (e: React.MouseEvent<HTMLDivElement>) => {
    const id = e.currentTarget.id;
    setIsHovered(prevState => ({ ...prevState, [id]: true }));
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const id = e.currentTarget.id;
    setIsHovered(prevState => ({ ...prevState, [id]: false }));
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const id = e.currentTarget.id;
    if (id === "address" || id === "number") {
      const text = data[id as keyof IStoreInfo];
      if (text) {
        navigator.clipboard.writeText(text);
        copyNotify();
      }
    }
  };

  const handleFav = async () => {
    if (userInfo.name) {
      setIsFav(!isFav);
      !isFav ? favAddNotify() : favRemoveNotify();
      const favList = await PostFavStore(userInfo.uid, data.id as string, isFav);
      setUserInfo({ ...userInfo, fav: favList as string[] });
    } else {
      alert("로그인이 필요합니다.");
    }
  };

  return (
    <section className="w-full">
      <ToastContainer
        position="bottom-center"
        autoClose={300}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
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
        <div className="flex justify-center items-center gap-3 ">
          <p className="text-2xl font-bold">{data.name}</p>
          <div className={`cursor-pointer ${isFav ? "text-[#fabe6d]" : "text-gray-400"}`} onClick={handleFav}>
            {isFav ? <Fav size="20" /> : <NotFav size="20" />}
          </div>
        </div>
        <p className="text-[#777]">{data.type} 카페</p>
      </div>
      <div className="">
        {Object.entries(category).map(([key, value]) => (
          <div
            id={key}
            key={key}
            className="px-6 hover:bg-gray-300 cursor-pointer relative group"
            onClick={handleClick}
            onMouseOver={handleMouseOver}
            onMouseLeave={handleMouseLeave}
          >
            <div className="relative h-10 flex gap-9 items-center ">
              <div className="h-7 w-7 flex justify-center items-center">{value.icon}</div>
              <p className={`${data[key as keyof IStoreInfo] || "text-gray-400"}`}>
                {data[key as keyof IStoreInfo] || "정보 없음"}
              </p>
              {value.copy && (
                <div className={`absolute right-1 ${isHovered[key] ? "opacity-100" : "opacity-0"}`}>
                  <Copy />
                </div>
              )}
            </div>
            <div className="absolute left-0 top-0 mt-10 ml-14 text-white text-sm bg-black p-1 rounded transition-opacity duration-300 ease-in-out opacity-0  text-opacity-100 group-hover:opacity-100 z-10">
              {value.name}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default StoreDetial;
