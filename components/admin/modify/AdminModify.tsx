"use client";
import React, { MouseEvent, useRef, useState } from "react";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import { FaSearch as Search } from "react-icons/fa";
import AdminModifyStoreList from "./AdminModifyStoreList";
import { useQueryClient } from "@tanstack/react-query";
import { IStoreInfo } from "@/types/firebase";
import { useImageStore } from "@/store/imageStore";
import { GetStoreImages } from "@/utils/firebase";

const PROPS_H1 = {
  전체: "전체",
  일반: "일반카페",
  무인: "무인카페",
};

const AdminModify = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [type, setType] = useState("전체");
  const [storeListClicked, setStoreListClicked] = useState<string>("");
  const queryClient = useQueryClient();
  const addressRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const [storeList, setStoreList] = useState<IStoreInfo[]>();
  const { setUrl, resetUrl } = useImageStore();

  //검색버튼이벤트
  const handleClickSearchCafe = () => {
    const stores = queryClient.getQueryData<IStoreInfo[]>(["stores"]);
    let resStore = stores;
    //카페타입체크
    type !== "전체" && (resStore = stores?.filter(store => store.type === type));

    //지역체크
    resStore = resStore?.filter(store => store && store.address.includes(addressRef.current?.value as string));

    //지점명체크
    resStore = resStore?.filter(store => store && store.name.includes(nameRef.current?.value as string));

    setStoreList(resStore);
  };

  //매장리스트클릭이벤트
  const handleListClick = async (index: string, e: MouseEvent<HTMLElement>) => {
    const el = e.target as HTMLElement;
    const parent = el.closest("#storeListDetail");
    if (parent) return;

    resetUrl();

    storeListClicked === index ? setStoreListClicked("") : setStoreListClicked(index);
    const image = await GetStoreImages(index);
    setUrl(image as string[]);
  };

  const handleClickType = (e: React.MouseEvent<HTMLHeadingElement>) => {
    e.stopPropagation();
    const headingEl = e.target as HTMLHeadingElement;

    setType(headingEl.id || "");

    setIsClicked(false);
  };

  return (
    <section className="w-full h-full flex flex-col items-center">
      <div className="min-w-[900px] w-2/5 h-20 flex justify-between items-center m-20 p-12 border rounded-lg">
        <div>
          <div
            className="w-24 relative flex justify-end items-center cursor-pointer"
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
          <input type="text" className=" ml-4 border" ref={addressRef} />
        </div>
        <div className="flex">
          <h1>지점명</h1>
          <input type="text" className=" ml-4 border" ref={nameRef} />
        </div>
        <div>
          <button className="border py-1.5 px-2 rounded-lg border-gray-400" onClick={handleClickSearchCafe}>
            <Search />
          </button>
        </div>
      </div>
      <div className="min-w-[1106px] w-3/5 flex justify-between items-center  px-12 pb-12 border rounded-lg">
        <ul className="w-full mx-10">
          {storeList?.map(store => (
            <li key={store.id} className="cursor-pointer" onClick={e => handleListClick(store.id, e)}>
              <AdminModifyStoreList dataIndex={store.id} clickIndex={storeListClicked} storeData={store} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default AdminModify;
