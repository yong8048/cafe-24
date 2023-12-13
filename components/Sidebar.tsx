"use client";
import { useSidebarStore } from "@/store/sidebarStore";
import React from "react";
import StoreDetial from "./StoreDetial";
import { useSelectedStore } from "@/store/selectedStore";
import Intro from "./Intro";
import ReportForm from "./ReportForm";
import { useReportClickStore } from "@/store/ReportClickStore";

const Sidebar = () => {
  const { isOpen } = useSidebarStore();
  const { data } = useSelectedStore();
  const { isReportClicked } = useReportClickStore();
  return (
    <aside
      className={`sm_test fixed sm:top-[78px] top-[44px] z-40 sm:h-main_section_sm bg-white transition-width duration-500 ease-in-out sm:w-[436px] w-full border-r border-gray-300 ${
        isOpen ? "left-0" : "sm:-left-[436px] -left-[640px]"
      }`}
    >
      {/* <aside
      className={`fixed sm:top-[78px] top-[44px] z-40 sm:h-main_section_sm h-main_section bg-white transition-width duration-500 ease-in-out sm:w-[436px] w-full border-r border-gray-300 ${
        isOpen ? "left-0" : "sm:-left-[436px] -left-[640px]"
      }`}
    > */}
      {isReportClicked ? <ReportForm /> : data.id ? <StoreDetial /> : <Intro />}
    </aside>
  );
};

export default Sidebar;
