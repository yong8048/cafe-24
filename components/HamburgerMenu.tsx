"use client";
import { useSidebarStore } from "@/store/sidebarStore";
import { useState, useEffect } from "react";

const HamburgerMenu = () => {
  const { isOpen, setToggle } = useSidebarStore();
  const [isActive, setIsActive] = useState(true);
  const handleActive = () => {
    setToggle();
  };

  useEffect(() => {
    setIsActive(!isActive);
  }, [isOpen]);

  return (
    <div className="flex items-center p-2" onClick={handleActive}>
      <button className="h-4 w-5 flex flex-col justify-between">
        <div
          className={`w-full h-0.5 bg-black transition-all duration-200 ease-out shadow-lg ${
            isActive ? "" : "transform translate-y-1 rotate-45"
          } `}
        ></div>
        <div
          className={`w-full h-0.5 bg-black transition-all duration-200 ease-out shadow-lg ${
            isActive ? "" : "opacity-0 -translate-x-20"
          }`}
        ></div>
        <div
          className={`w-full h-0.5 bg-black transition-all duration-200 ease-out shadow-lg ${
            isActive ? "" : "transform -translate-y-2.5 -rotate-45"
          }`}
        ></div>
      </button>
    </div>
  );
};

export default HamburgerMenu;
