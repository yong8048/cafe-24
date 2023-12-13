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
import { PostFavStore } from "@/utils/firebase";
import { useUserInfoStore } from "@/store/userInfoStore";
import { CgClose as Close } from "react-icons/cg";
import { useSidebarStore } from "@/store/sidebarStore";
import { isAdmin } from "@/utils/admin";
import "react-toastify/dist/ReactToastify.css";

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
  const { data, resetData } = useSelectedStore();
  const { urls } = useImageStore();
  const { userInfo, setUserInfo } = useUserInfoStore();
  const { isOpen } = useSidebarStore();

  const [isHovered, setIsHovered] = useState<{ [key: string]: boolean }>({});
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    const favList = userInfo.fav;
    if (favList) {
      setIsFav(favList.includes(data.id as string));
    }
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

  const handleClickAdminCopy = () => {
    navigator.clipboard.writeText(data.id);
    copyNotify();
  };

  return (
    <section className="relative w-full">
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
          <div className="flex flex-col items-center justify-center h-full gap-4">
            <Image src="/default.png" alt="이미지 준비중" width={100} height={100} />
            <p className="text-xl font-bold">이미지 준비중입니다.</p>
          </div>
        )}
      </div>
      <div className="h-[115px] bg-white flex flex-col items-center justify-center gap-3 py-4 border relative">
        <div className="flex items-center justify-center gap-3">
          <p className="text-2xl font-bold">{data.name}</p>
          <div className={`cursor-pointer ${isFav ? "text-[#fabe6d]" : "text-gray-400"}`} onClick={handleFav}>
            {isFav ? <Fav size="20" /> : <NotFav size="20" />}
          </div>
        </div>
        <div className="relative w-full text-center">
          <p className="text-[#777]">{data.type} 카페</p>
          {isAdmin(userInfo) && (
            <button
              className="absolute px-3 py-1 duration-300 -translate-y-1/2 border border-gray-300 rounded-lg top-1/2 right-20 hover:bg-gray-300"
              onClick={handleClickAdminCopy}
            >
              ID 복사
            </button>
          )}
        </div>
      </div>
      <div className="pt-2 overscroll-y-auto">
        {Object.entries(category).map(([key, value]) => (
          <div
            id={key}
            key={key}
            className="relative px-6 cursor-pointer hover:bg-gray-300 group"
            onClick={handleClick}
            onMouseOver={handleMouseOver}
            onMouseLeave={handleMouseLeave}
          >
            <div className="relative py-1.5 flex gap-9 items-center ">
              <div className="flex items-center justify-center h-7 w-7">{value.icon}</div>
              <p className={`${data[key as keyof IStoreInfo] || "text-gray-400"}`}>
                {data[key as keyof IStoreInfo] || "정보 없음"}
              </p>
              {value.copy && (
                <div className={`absolute right-1 ${isHovered[key] ? "opacity-100" : "opacity-0"}`}>
                  <Copy />
                </div>
              )}
            </div>
            <div className="absolute top-0 left-0 z-10 p-1 mt-10 text-sm text-white text-opacity-100 transition-opacity duration-300 ease-in-out bg-black rounded opacity-0 ml-14 group-hover:opacity-100">
              {value.name}
            </div>
          </div>
        ))}
      </div>
      {isOpen && (
        <button
          className="w-[43px] h-[44px] absolute top-[78px] -right-[44px] bg-white rounded-r-md shadow-closebutton hidden sm:flex justify-center items-center"
          onClick={resetData}
        >
          <Close size="25" />
        </button>
      )}
    </section>
  );
}

export default StoreDetial;
