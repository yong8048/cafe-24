"use client";
import { IUploadInfo } from "@/types/firebase";
import { PostStoreInfo } from "@/utils/firebase";
import { GetGeoLocation } from "@/utils/naver";
import Image from "next/image";
import React, { ChangeEvent, useRef, useState } from "react";
import CheckBox from "./CheckBox";
import { category } from "@/constants/admin";

const AdminUploadForm = () => {
  const [storeData, setStoreData] = useState<IUploadInfo>({
    address: "",
    group: "",
    internet: "",
    latitude: "",
    longitude: "",
    name: "",
    number: "",
    parking: "",
    table: "",
    toilet: "",
    type: "",
  });

  const inputRef = useRef<HTMLInputElement>(null);
  const [imageFile, setImageFile] = useState<File[]>([]);
  const [isAddressClicked, setIsAddressClicked] = useState(false);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files: File[] = Array.from(e.target.files);
      setImageFile(prevPreviews => [...prevPreviews, ...files]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStoreData({
      ...storeData,
      [e.target.name]: e.target.value,
    });
  };

  const handleClickSearch = async () => {
    setIsAddressClicked(true);
    const res = await GetGeoLocation(storeData.address);
    if (res) {
      setStoreData({ ...storeData, latitude: res.latitude, longitude: res.longitude });
    }
  };

  const handleUpload = async () => {
    if (isAddressClicked) {
      const res = await PostStoreInfo(storeData, imageFile);
      if (res) {
        setImageFile([]);
        setStoreData({ ...storeData, name: "", address: "", latitude: "", longitude: "" });
      }
      setIsAddressClicked(false);
    } else {
      alert("지도 검색버튼이 클릭되지 않았습니다.");
    }
  };

  const handleRemove = (removeIndex: number) => {
    setImageFile(prevPreviews => prevPreviews.filter((preview, index) => index !== removeIndex));
  };

  return (
    <div className="min-w-[900px] h-full p-10 text-center">
      <div className="grid justify-center py-4 text-xl border rounded-xl">
        {Object.entries(category).map(([key, value]) => (
          <div key={key} className={`flex gap-10 leading-10 py-2 pl-2 ${key === "address" && "justify-between pr-2"}`}>
            <p className="w-20">{value.title}</p>
            {value.property && (
              <CheckBox stateKey={key} property={value.property} setState={setStoreData} state={storeData} />
            )}
            {value.placeholder && (
              <input
                className={`${key === "address" ? "w-[320px]" : "w-[400px]"} input-admin`}
                name={key}
                value={storeData[key as keyof IUploadInfo]}
                onChange={handleChange}
                placeholder={value.placeholder}
              />
            )}
            {key === "address" && (
              <button className="px-1 text-base border border-black rounded-lg" onClick={handleClickSearch}>
                검색
              </button>
            )}
          </div>
        ))}
        <div className="flex gap-10 py-2 pl-2 leading-10">
          <p className="w-20">매장사진</p>
          <input type="file" multiple onChange={handleImageChange} className="hidden" ref={inputRef} />
          <button onClick={() => inputRef.current?.click()} className="px-2 text-sm text-white bg-gray-500 rounded-md">
            파일 선택
          </button>
          <p>{imageFile.length}개</p>
        </div>
        <div className="flex gap-2">
          {imageFile.map((image, index) => (
            <Image
              key={index}
              src={URL.createObjectURL(image)}
              alt="preview"
              width={100}
              height={100}
              onClick={() => handleRemove(index)}
            />
          ))}
        </div>
      </div>
      <div className="flex justify-center gap-5 mt-5 text-2xl text-white">
        <button className="w-[140px] h-[52px] bg-[#3D7FFF] rounded-[20px]" onClick={handleUpload}>
          업로드
        </button>
      </div>
    </div>
  );
};

export default AdminUploadForm;
