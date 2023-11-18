import { useSidebarStore } from "@/store/sidebarStore";
import React from "react";
import StoreDetial from "./StoreDetial";

const Sidebar = () => {
  const { isOpen } = useSidebarStore();
  const temp = "카페만월경 안양점";

  return (
    <aside
      className={`fixed top-[78px] h-full bg-gray-100 transition-width duration-500 ease-in-out w-[436px] overflow-hidden ${
        isOpen ? "left-0" : "-left-[436px]"
      }`}
    >
      {temp ? <StoreDetial></StoreDetial> : "포폴이에연"}
    </aside>
  );
};

export default Sidebar;
