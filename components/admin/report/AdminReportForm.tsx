import { useReportStore } from "@/store/reportStore";
import { IReportInfo } from "@/types/firebase";
import { GetReportInfo } from "@/utils/firebase";
import React from "react";

const category = {
  name: "지점명",
  type: "카페 타입",
  address: "주소",
  number: "전화번호",
  table: "테이블",
  parking: "주차",
  toilet: "화장실",
  internet: "인터넷",
  group: "단체석",
  image: "사진",
};

const AdminReportForm = () => {
  const { report } = useReportStore();

  return (
    <div className="min-w-[900px] p-10 text-center">
      <div className="text-xl border rounded-xl py-4 flex flex-col items-center">
        {Object.entries(category).map(([key, value]) => (
          <div key={key} className="flex gap-10 leading-10 py-2 pl-2">
            <p className="w-20">{value}</p>
            {key === "image" ? (
              <input type="file" multiple />
            ) : (
              <input defaultValue={report[key as keyof IReportInfo]} className="w-[400px] input-admin"></input>
            )}
          </div>
        ))}
      </div>
      <div className="mt-5 flex justify-center gap-5 text-2xl text-white">
        <button className="w-[140px] h-[52px] bg-[#3D7FFF] rounded-[20px]">승인</button>
        <button className="w-[140px] h-[52px] bg-[#3D7FFF] rounded-[20px]">거부</button>
      </div>
    </div>
  );
};

export default AdminReportForm;
