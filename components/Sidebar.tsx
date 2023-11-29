"use client";
import { useSidebarStore } from "@/store/sidebarStore";
import React from "react";
import StoreDetial from "./StoreDetial";
import { useSelectedStore } from "@/store/selectedStore";
import Intro from "./Intro";

const Sidebar = () => {
  const { isOpen } = useSidebarStore();
  const { data } = useSelectedStore();
  return (
    <aside
      className={`fixed top-[78px] h-full z-50 bg-white transition-width duration-500 ease-in-out w-[436px] overflow-hidden border-r border-gray-300 ${
        isOpen ? "left-0" : "-left-[436px]"
      }`}
    >
      {data.id ? <StoreDetial /> : <Intro />}
    </aside>
  );
};

export default Sidebar;
