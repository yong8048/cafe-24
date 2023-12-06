import React, { useState } from "react";
import CheckBox from "./admin/upload/CheckBox";
import { IUploadInfo } from "@/types/firebase";

const category: { [key: string]: { title: string; placeholder?: string; property?: string[] } } = {
  name: { title: "지점명", placeholder: "만월경 위례점" },
  type: { title: "카페 타입", property: ["일반", "무인"] },
  address: { title: "주소", placeholder: "주소 입력" },
  latitude: { title: "위도", placeholder: "주소검색시, 자동으로 등록" },
  longitude: { title: "경도", placeholder: "주소검색시, 자동으로 등록" },
  number: { title: "전화번호", placeholder: "- 포함 입력 / 정보없음" },
  table: { title: "테이블", placeholder: "몇 테이블 / 많음 / 정보없음" },
  parking: { title: "주차", property: ["가능", "불가"] },
  toilet: { title: "화장실", property: ["있음", "없음"] },
  internet: { title: "인터넷", property: ["가능", "불가"] },
  group: { title: "단체석", placeholder: "몇인석 / 정보없음" },
};

const ReportForm = () => {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStoreData({
      ...storeData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className="w-full pt-5 px-2">
      <div className="text-center">
        <h1 className="text-2xl">제보하기</h1>
      </div>
      <div className="px-2 mt-4 flex flex-col gap-1">
        {Object.entries(category).map(([key, value]) => (
          <div key={key} className="grid grid-cols-[100px_minmax(200px,_1fr)]">
            <p className="h-10 leading-10">{value.title}</p>
            {value.placeholder && (
              <input
                placeholder={value.placeholder}
                className="h-10 pl-2"
                name={key}
                value={storeData[key as keyof IUploadInfo]}
                onChange={handleChange}
              />
            )}
            {value.property && (
              <CheckBox state={storeData} setState={setStoreData} stateKey={key} property={value.property} />
            )}
          </div>
        ))}
        <div className="mx-auto w-[140px] mt-4">
          <button className="w-full h-[54px] bg-[#3d7fff] rounded-2xl text-white">제보하기</button>
        </div>
      </div>
    </section>
  );
};

export default ReportForm;
