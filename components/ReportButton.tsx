import { useReportClickStore } from "@/store/ReportClickStore";
import React from "react";

const ReportButton = () => {
  const { isClicked, setIsClicked } = useReportClickStore();
  const handleClickReport = () => {
    setIsClicked();
  };
  return (
    <button
      className={`${
        isClicked ? "hidden" : "block"
      } w-[140px] h-[54px] text-2xl rounded-2xl absolute bottom-5 right-5 bg-[#3d7fff] text-white`}
      onClick={handleClickReport}
    >
      제보하기
    </button>
  );
};

export default ReportButton;
