import { useReportStore } from "@/store/reportStore";
import { mock } from "node:test";
import React from "react";

const mockData = {
  1: "카페만월경 호매실점",
  2: "데이롱카페 호매실점",
  3: "카페일분 위례점",
};

const AdminSidebar = () => {
  const { setData } = useReportStore();
  const handleClick = (value: string) => {
    setData(value);
  };

  return (
    <div className="w-[425px] h-full bg-[#d9d9d9] border-r-2 border-gray-300">
      {Object.entries(mockData).map(([key, value]) => (
        <div
          onClick={() => handleClick(value)}
          className="w-full h-16 leading-[64px] text-center text-xl border-b border-[#a1a1a1] cursor-pointer"
          key={key}
        >
          {value}
        </div>
      ))}
    </div>
  );
};

export default AdminSidebar;
