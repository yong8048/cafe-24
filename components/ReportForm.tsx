import React, { useEffect, useState } from "react";
import CheckBox from "./admin/upload/CheckBox";
import { IReportInfo } from "@/types/firebase";
import { PostReportInfo } from "@/utils/firebase";
import { useReportClickStore } from "@/store/ReportClickStore";
import { useReportLocationStore } from "@/store/reportLocationStore";
import { GetAddrress } from "@/utils/naver";

const category: { [key: string]: { title: string; placeholder?: string; property?: string[] } } = {
  name: { title: "지점명*", placeholder: "만월경 위례점" },
  type: { title: "카페 타입*", property: ["일반", "무인"] },
  number: { title: "전화번호", placeholder: "- 포함 입력 / 정보없음" },
  table: { title: "테이블", placeholder: "몇 테이블 / 많음 / 정보없음" },
  group: { title: "단체석", placeholder: "몇인석 / 정보없음" },
  parking: { title: "주차", property: ["가능", "불가"] },
  toilet: { title: "화장실", property: ["있음", "없음"] },
  internet: { title: "인터넷", property: ["가능", "불가"] },
};

const notices = [
  "관리자의 검토를 거쳐 매장이 등록됩니다.",
  "정확한 이름과 정보를 기재해 주세요.",
  "가능한 많은 정보를 제공해 주시면 좋습니다!",
  "허위제보는 이용자들에게 불이익을 가져올 수 있습니다.",
];

const ReportForm = () => {
  const [reportData, setReportData] = useState<IReportInfo>({
    id: "",
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
  const { setIsReportClicked } = useReportClickStore();
  const { location } = useReportLocationStore();

  useEffect(() => {
    setReportData({ ...reportData, latitude: location.latitude, longitude: location.longitude });
  }, [location]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setReportData({
      ...reportData,
      [e.target.name]: e.target.value,
    });
  };

  const handleReportClick = async () => {
    if (!reportData.latitude || !reportData.longitude) {
      alert("지도를 클릭하여 위치를 선택해주세요.");
    } else if (!reportData.name) {
      alert("지점명을 입력해주세요.");
    } else if (!reportData.type) {
      alert("카페 타입을 선택해주세요.");
    } else {
      const address = await GetAddrress(reportData.longitude, reportData.latitude);
      if (address?.length) {
        const _address = `${address[0].region.area1.alias} ${address[0].region.area2.name} ${address[0].land.name} ${address[0].land.number1} ${address[0].land.number2}`;
        setReportData({ ...reportData, address: _address });
        const res = await PostReportInfo(reportData, _address);
        res && setIsReportClicked();
      } else {
        alert("정확한 위치에 핀을 위치해야 합니다.\n핀을 매장이 위치한 '건물'위에 올려주세요.");
      }
    }
  };

  return (
    <section className="z-40 w-full px-2 py-5">
      <div className="text-center">
        <h1 className="text-2xl">제보하기</h1>
      </div>
      <div className="flex flex-col gap-1 px-2 mt-4">
        {Object.entries(category).map(([key, value]) => (
          <div key={key} className="grid sm:grid-cols-[100px_minmax(200px,_1fr)] grid-cols-[80px_minmax(100px,_1fr)]">
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
        <div className="pt-2 grid sm:grid-cols-[100px_minmax(200px,_1fr)] grid-cols-[80px_minmax(100px,_1fr)]">
          <p className="h-10 leading-10">기타 제보</p>
          <textarea className="sm:h-40 h-28 p-2 input-report" name="additional" onChange={handleChange} />
        </div>
      </div>
      <div className="px-2 mt-4 text-sm">
        {notices.map((notice, index) => (
          <p key={index}>• {notice}</p>
        ))}
      </div>
      <div className="mx-auto w-[140px] my-4">
        <button className="w-full h-[54px] bg-[#3d7fff] rounded-2xl text-white text-xl" onClick={handleReportClick}>
          제보하기
        </button>
      </div>
    </section>
  );
};

export default ReportForm;
