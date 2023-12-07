import React, { useState } from "react";
import CheckBox from "./admin/upload/CheckBox";
import { IReportInfo } from "@/types/firebase";
import { PostReportInfo } from "@/utils/firebase";
import { useReportClickStore } from "@/store/ReportClickStore";

const category: { [key: string]: { title: string; placeholder?: string; property?: string[] } } = {
  name: { title: "지점명", placeholder: "만월경 위례점" },
  type: { title: "카페 타입", property: ["일반", "무인"] },
  // address: { title: "주소", placeholder: "주소 입력" },
  // latitude: { title: "위도", placeholder: "주소검색시, 자동으로 등록" },
  // longitude: { title: "경도", placeholder: "주소검색시, 자동으로 등록" },
  number: { title: "전화번호", placeholder: "- 포함 입력 / 정보없음" },
  table: { title: "테이블", placeholder: "몇 테이블 / 많음 / 정보없음" },
  group: { title: "단체석", placeholder: "몇인석 / 정보없음" },
  parking: { title: "주차", property: ["가능", "불가"] },
  toilet: { title: "화장실", property: ["있음", "없음"] },
  internet: { title: "인터넷", property: ["가능", "불가"] },
};

const notices = [
  "관리자의 검토를 거쳐 매장이 등록됩니다.",
  "정확한 이름과 주소를 기재해 주세요.",
  "가능한 많은 정보를 제공해 주시면 좋습니다!",
  "허위제보는 이용자들에게 불이익을 가져올 수 있습니다.",
];

const ReportForm = () => {
  const [reportData, setReportData] = useState<IReportInfo>({
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
    additional: "",
  });
  const { setIsClicked } = useReportClickStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setReportData({
      ...reportData,
      [e.target.name]: e.target.value,
    });
  };

  const handleReportClick = async () => {
    const res = await PostReportInfo(reportData);
    console.log(res);
    if (res) {
      setIsClicked();
    }
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
                className="h-10 pl-2 input-report"
                name={key}
                value={reportData[key as keyof IReportInfo]}
                onChange={handleChange}
              />
            )}
            {value.property && (
              <CheckBox state={reportData} setState={setReportData} stateKey={key} property={value.property} />
            )}
          </div>
        ))}
        <div className="pt-2 grid grid-cols-[100px_minmax(200px,_1fr)]">
          <p className="h-10 leading-10">추가정보</p>
          <textarea className="p-2 h-40 input-report" name="additional" onChange={handleChange} />
        </div>
      </div>
      <div className="px-2 mt-4 text-sm">
        {notices.map((notice, index) => (
          <p key={index}>• {notice}</p>
        ))}
      </div>
      <div className="mx-auto w-[140px] mt-4">
        <button className="w-full h-[54px] bg-[#3d7fff] rounded-2xl text-white text-xl" onClick={handleReportClick}>
          제보하기
        </button>
      </div>
    </section>
  );
};

export default ReportForm;
