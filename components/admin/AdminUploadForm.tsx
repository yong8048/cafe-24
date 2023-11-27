import { useReportStore } from "@/store/reportStore";
import React from "react";

const category = {
  name: "지점명",
  address: "주소",
  number: "전화번호",
  table: "테이블",
  parking: "주차",
  toilet: "화장실",
  internet: "인터넷",
  group: "단체석",
};

const AdminUploadForm = () => {
  const { data } = useReportStore();
  return (
    <div className="w-[900px] h-full p-10">
      <div className="text-xl">
        {Object.entries(category).map(([key, value]) => (
          <div key={key} className="h-10 flex gap-10 leading-10 mb-6 ">
            <p className="w-20">{value}</p>
            <input defaultValue={data}></input>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminUploadForm;
