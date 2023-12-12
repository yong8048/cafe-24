import { useReportStore } from "@/store/reportStore";
import { IReportInfo } from "@/types/firebase";
import { GetReportInfo } from "@/utils/firebase";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";

const AdminSidebar = () => {
  const [isCurrent, isSetCurrent] = useState("");
  const { setReport, resetReport } = useReportStore();

  const handleClick = (report: IReportInfo) => {
    setReport(report);
    isSetCurrent(report.id);
  };

  useEffect(() => {
    return () => {
      resetReport();
    };
  }, []);

  const { data: reports } = useQuery<IReportInfo[]>({
    queryKey: ["reports"],
    queryFn: GetReportInfo,
  });

  return (
    <div className="min-w-[425px] h-full bg-[#b1b1b1] overflow-y-auto">
      {reports?.length === 0 && (
        <div className="w-full h-full flex flex-col justify-center items-center">
          {Array.from("제보가 없습니다🤣").map((char, index) => (
            <p key={index} className="text-2xl h-8">
              {char}
            </p>
          ))}
        </div>
      )}
      {reports &&
        reports.map((report, index) => (
          <div
            onClick={() => handleClick(report)}
            className={`w-full h-16 leading-[64px] text-center text-xl border-b border-[#a1a1a1] cursor-pointer hover:opacity-50
            ${isCurrent === report.id && "text-[#3D7FFF] font-bold"} 
            ${index % 2 && "bg-[#c5c5c5]"}`}
            key={report.name}
          >
            {report.name}
          </div>
        ))}
    </div>
  );
};

export default AdminSidebar;
