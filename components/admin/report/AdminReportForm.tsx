"use client";
import { useReportStore } from "@/store/reportStore";
import { IReportInfo } from "@/types/firebase";
import { AcceptReportInfo, DeleteReportInfo } from "@/utils/firebase";
import { GetGeoLocation } from "@/utils/naver";
import Image from "next/image";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import CheckBox from "../upload/CheckBox";
import { useQueryClient } from "@tanstack/react-query";

const category: { [key: string]: { title: string; placeholder?: string; property?: string[] } } = {
  name: { title: "지점명", placeholder: "만월경 위례점" },
  type: { title: "카페 타입", property: ["일반", "무인"] },
  address: { title: "주소", placeholder: "주소 입력" },
  latitude: { title: "위도", placeholder: "주소검색시, 자동으로 등록" },
  longitude: { title: "경도", placeholder: "주소검색시, 자동으로 등록" },
  number: { title: "전화번호", placeholder: "- 포함 입력" },
  table: { title: "테이블", placeholder: "몇 테이블 / 많음" },
  group: { title: "단체석", placeholder: "몇인석" },
  parking: { title: "주차", property: ["가능", "불가"] },
  toilet: { title: "화장실", property: ["있음", "없음"] },
  internet: { title: "인터넷", property: ["가능", "불가"] },
};

const AdminReportForm = () => {
  const { report, resetReport } = useReportStore();
  const [reportData, setReportData] = useState<IReportInfo>(report);
  const queryClient = useQueryClient();
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  useEffect(() => {
    setReportData(report);
  }, [report]);

  const inputRef = useRef<HTMLInputElement>(null);
  const [imageFile, setImageFile] = useState<File[]>([]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files: File[] = Array.from(e.target.files);
      setImageFile(prevPreviews => [...prevPreviews, ...files]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReportData({
      ...reportData,
      [e.target.name]: e.target.value,
    });
  };

  const handleClickSearch = async () => {
    setIsSearchClicked(true);
    const res = await GetGeoLocation(reportData.address as string);
    if (res) {
      setReportData({ ...reportData, latitude: res.latitude, longitude: res.longitude });
    }
  };

  const handleImageRemove = (removeIndex: number) => {
    setImageFile(prevPreviews => prevPreviews.filter((preview, index) => index !== removeIndex));
  };

  const handleAccept = async () => {
    if (isSearchClicked) {
      const res = await AcceptReportInfo(reportData, imageFile);
      if (res) {
        setImageFile([]);
        resetReport();
        queryClient.invalidateQueries({ queryKey: ["reports"] });
        setIsSearchClicked(false);
      }
    } else {
      alert("지도 검색버튼이 클릭되지 않았습니다.");
    }
  };

  const handleReject = async () => {
    const res = await DeleteReportInfo(reportData.id, true);
    if (res) {
      resetReport();
      queryClient.invalidateQueries({ queryKey: ["reports"] });
    }
  };

  if (!report.name)
    return (
      <div className="min-w-[900px] h-full flex justify-center items-center">
        <p className="text-5xl">제보를 선택해주세요😊</p>
      </div>
    );
  return (
    <div className="min-w-[900px] h-full p-2 pl-10 text-center">
      <div className="text-xl border rounded-xl grid justify-center">
        {Object.entries(category).map(([key, value]) => (
          <div key={key} className={`flex gap-8 leading-8 py-2 pl-2 ${key === "address" && "justify-between pr-2"}`}>
            <p className="w-20">{value.title}</p>
            {value.property && (
              <CheckBox stateKey={key} property={value.property} setState={setReportData} state={reportData} />
            )}
            {value.placeholder && (
              <input
                className={`${key === "address" ? "w-[320px]" : "w-[400px]"} input-admin`}
                name={key}
                value={reportData[key as keyof IReportInfo]}
                onChange={handleChange}
                placeholder={value.placeholder}
              />
            )}
            {key === "address" && (
              <button className="text-base border border-black px-1 rounded-lg" onClick={handleClickSearch}>
                검색
              </button>
            )}
          </div>
        ))}
        <div className="flex gap-10 leading-10 py-2 pl-2">
          <p className="w-20">추가사항</p>
          <p className="w-[400px] text-start break-keep text-sm">{report.additional}</p>
        </div>
        <div className="flex gap-10 leading-10 py-2 pl-2">
          <p className="w-20">매장사진</p>
          <input type="file" multiple onChange={handleImageChange} className="hidden" ref={inputRef} />
          <button onClick={() => inputRef.current?.click()} className="bg-gray-500 px-2 rounded-md text-white text-sm">
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
              onClick={() => handleImageRemove(index)}
            />
          ))}
        </div>
      </div>
      <div className="mt-2 flex justify-center gap-5 text-2xl text-white">
        <button className="w-[140px] h-[52px] bg-[#3D7FFF] rounded-[20px]" onClick={handleAccept}>
          승인
        </button>
        <button className="w-[140px] h-[52px] bg-[#3D7FFF] rounded-[20px]" onClick={handleReject}>
          거부
        </button>
      </div>
    </div>
  );
};

export default AdminReportForm;
