import { useReportClickStore } from "@/store/ReportClickStore";
import { useSidebarStore } from "@/store/sidebarStore";
import React from "react";

const ReportButton = () => {
  const { isReportClicked, setIsReportClicked } = useReportClickStore();
  const { isOpen, setOpen } = useSidebarStore();
  const handleClickReport = () => {
    !isOpen && setOpen();
    setIsReportClicked();
  };
  return (
    <button
      className={`${
        isReportClicked ? "hidden" : "block"
      } w-[140px] h-[54px] text-2xl rounded-2xl absolute bottom-5 sm:right-5 right-1 bg-[#3d7fff] text-white`}
      onClick={handleClickReport}
    >
      제보하기
    </button>
  );
};

export default ReportButton;
