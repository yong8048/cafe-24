"use client";
import React, { ChangeEvent, Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { category } from "@/constants/admin";
import CheckBox from "../upload/CheckBox";
import { IStoreInfo } from "@/types/firebase";
import { CiCirclePlus as Plus } from "react-icons/ci";
import Image from "next/image";
import { GetGeoLocation } from "@/utils/naver";
import { useImageStore } from "@/store/imageStore";
import { DeleteStoreImage, DeleteStoreInfo, ModifyStoreInfo, PostStoreInfo } from "@/utils/firebase";
import { useQueryClient } from "@tanstack/react-query";

const AdminModifyStoreList = ({
  dataIndex,
  clickIndex,
  setClickIndex,
  storeData,
}: {
  dataIndex: string;
  clickIndex: string;
  setClickIndex: Dispatch<SetStateAction<string>>;
  storeData: IStoreInfo;
}) => {
  const [store, setStore] = useState<IStoreInfo>(storeData);
  const [imageFile, setImageFile] = useState<File[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const { urls, setUrl } = useImageStore();
  const [deleteImage, setDeleteImage] = useState<string[]>([]);
  const queryClient = useQueryClient();

  useEffect(() => {
    return () => {
      if (dataIndex === clickIndex) {
        setImageFile([]);
        setDeleteImage([]);
      }
    };
  }, [clickIndex]);

  //수정 버튼
  const handleClickModify = async () => {
    if (confirm("수정하시겠습니까?")) {
      //삭제된 이미지부터 먼저 삭제
      deleteImage.map(async url => {
        await DeleteStoreImage(url);
      });
      //업로드
      const res = await ModifyStoreInfo(store, imageFile);
      if (res) {
        queryClient.invalidateQueries({ queryKey: ["stores"] });
        setClickIndex("");
      }
    }
  };

  //검색 버튼
  const handleClickAddressSearch = async () => {
    const res = await GetGeoLocation(store.address as string);
    if (res) {
      setStore({ ...store, latitude: res.latitude, longitude: res.longitude });
    }
  };
  //인풋 체인지
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStore({
      ...store,
      [e.target.name]: e.target.value,
    });
  };
  //이미지 추가
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files: File[] = Array.from(e.target.files);
      setImageFile(prevPreviews => [...prevPreviews, ...files]);
    }
  };
  //기존 이미지 삭제
  const handleExistindRemove = (removeIndex: number) => {
    if (confirm("삭제 하시겠습니까?")) {
      setDeleteImage([...deleteImage, urls[removeIndex]]);
      setUrl(urls.filter((_, index) => index !== removeIndex));
    }
  };
  //신규 이미지 삭제
  const handleNewRemove = (removeIndex: number) => {
    if (confirm("삭제 하시겠습니까?")) {
      setImageFile(prevPreviews => prevPreviews.filter((preview, index) => index !== removeIndex));
      console.log(removeIndex);
    }
  };

  const handleClickModifyRemove = async () => {
    if (confirm("매장을 삭제 하시겠습니까?")) {
      const res = await DeleteStoreInfo(store.id);
      if (res) {
        queryClient.refetchQueries({ queryKey: ["stores"] });
        setClickIndex("");
      }
    }
  };

  return (
    <>
      <div className="w-full grid grid-cols-[40px_10px_minmax(300px,_2fr)_30px_minmax(450px,_3fr)_10px_90px] border p-2 my-2  rounded-sm ">
        <h1
          className={`${
            storeData.type === "무인" ? "bg-red-400" : "bg-blue-400"
          } text-center text-[#242424] font-bold rounded-lg`}
        >
          {storeData.type}
        </h1>
        <div className="my-[5px] w-px"></div>
        <h1>{storeData.name}</h1>
        <div className="my-[5px] w-px bg-gray-300"></div>

        <h1 className="overflow-hidden whitespace-nowrap text-ellipsis">{storeData.address}</h1>
        <div className="my-[5px] w-px bg-gray-300"></div>
        <h1>{storeData.date}</h1>
      </div>
      <div
        id="storeListDetail"
        className={`w-full cursor-default border  rounded-b-sm duration-300 ${
          dataIndex === clickIndex ? "h-full" : "h-0 hidden"
        }`}
      >
        <div>
          <div className=" h-48 m-5 p-3 border rounded-lg flex items-center gap-3">
            {urls.map((url, index) => (
              <div key={index} className="w-36 h-40 relative rounded-lg">
                <Image
                  id="existingImage"
                  key={index}
                  src={url.toString()}
                  alt="preview"
                  fill
                  onClick={() => handleExistindRemove(index)}
                />
              </div>
            ))}
            {imageFile.map((image, index) => (
              <div key={index} className="w-36 h-40 relative rounded-lg">
                <Image
                  id="newImage"
                  key={index}
                  src={URL.createObjectURL(image)}
                  alt="preview"
                  fill
                  onClick={() => handleNewRemove(index)}
                />
              </div>
            ))}
            <button
              onClick={() => inputRef.current?.click()}
              className="text-gray-400 w-36 h-40 border  rounded-lg flex justify-center items-center"
            >
              <input type="file" multiple onChange={handleImageChange} className="hidden" ref={inputRef} />
              <Plus size="70" />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 mx-3 gap-2">
          {Object.entries(category).map(([key, value]) => (
            <div
              key={key}
              className={`grid grid-cols-[80px_minmax(300px,_1fr)] h-10 items-center ${
                key === "address" && "col-span-2 grid-cols-[80px_minmax(300px,_1fr)_40px]"
              }`}
            >
              <p className=" text-center">{value.title}</p>
              {value.property && (
                <CheckBox stateKey={key} property={value.property} setState={setStore} state={store} />
              )}
              {value.placeholder && (
                <>
                  <input
                    type="text"
                    className="border"
                    name={key}
                    onChange={handleChange}
                    value={store[key as keyof IStoreInfo]}
                    placeholder={value.placeholder}
                  />
                  {key === "address" && (
                    <button
                      className="w-[40px] h-[24px] text-sm bg-[#3D7FFF] rounded-[20px] text-white ml-1"
                      onClick={handleClickAddressSearch}
                    >
                      검색
                    </button>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
        <div className="text-right mr-10 my-3">
          <button className=" w-[60px] h-[32px] bg-[#3D7FFF] rounded-[20px] text-white" onClick={handleClickModify}>
            수정
          </button>
          <button
            className=" w-[60px] h-[32px] bg-[#3D7FFF] rounded-[20px] text-white ml-3"
            onClick={handleClickModifyRemove}
          >
            삭제
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminModifyStoreList;
