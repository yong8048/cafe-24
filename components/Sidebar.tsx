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
      className={`fixed top-[78px] h-full z-40 bg-white transition-width duration-500 ease-in-out w-[436px] border-r border-gray-300 ${
        isOpen ? "left-0" : "-left-[436px]"
      }`}
    >
      {isReportClicked ? <ReportForm /> : data.id ? <StoreDetial /> : <Intro />}
    </aside>
  );
};

export default Sidebar;
