import { IStoreInfo, IUploadInfo } from "@/types/firebase";
import { PostStoreInfo } from "@/utils/firebase";
import GetGeoLocation from "@/utils/naver";
import React, { useState } from "react";

const category = {
  name: "지점명",
  type: "카페 타입",
  address: "주소",
  latitude: "위도",
  longitude: "경도",
  number: "전화번호",
  table: "테이블",
  parking: "주차",
  toilet: "화장실",
  internet: "인터넷",
  group: "단체석",
};

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

  const Post = () => {
    PostStoreInfo(storeData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStoreData({
      ...storeData,
      [e.target.name]: e.target.value,
    });
  };

  const handleClickSearch = async () => {
    const res = await GetGeoLocation(storeData.address);
    if (res) {
      setStoreData({ ...storeData, latitude: res.latitude, longitude: res.longitude });
    }
  };

  return (
    <div className="min-w-[900px] h-full p-10 text-center">
      <div className="text-xl border rounded-xl py-4 grid justify-center">
        {Object.entries(category).map(([key, value]) => (
          <div key={key} className={`flex gap-10 leading-10 py-2 pl-2 ${key === "address" && "justify-between pr-2"}`}>
            <p className="w-20">{value}</p>
            <input
              className={`${key === "address" ? "w-[320px]" : "w-[400px]"} input-admin`}
              name={key}
              value={storeData[key as keyof IUploadInfo]}
              onChange={handleChange}
            />
            {key === "address" && (
              <button className="text-base border border-black px-1 rounded-lg" onClick={handleClickSearch}>
                검색
              </button>
            )}
          </div>
        ))}
        <div className="flex gap-10 leading-10 py-2 pl-2">
          <p className="w-20">매장사진</p>
          <input type="file" multiple />
        </div>
      </div>
      <div className="mt-5 flex justify-center gap-5 text-2xl text-white">
        <button className="w-[140px] h-[52px] bg-[#3D7FFF] rounded-[20px]" onClick={Post}>
          업로드
        </button>
      </div>
    </div>
  );
};

export default AdminUploadForm;
