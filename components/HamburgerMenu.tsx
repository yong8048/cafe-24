"use client";
import { useSidebarStore } from "@/store/sidebarStore";

const activeStyle = [
  { condition: "transform translate-x-1 -rotate-45 w-[75%]" },
  { condition: "opacity-0 -translate-x-20" },
  { condition: "transform translate-x-1 rotate-45 w-[75%]" },
];
const HamburgerMenu = () => {
  const { isOpen, setToggle } = useSidebarStore();

  return (
    <div className="flex items-center p-2" onClick={setToggle}>
      <button className="flex flex-col justify-between w-5 h-4">
        {activeStyle.map((style, index) => (
          <div
            key={index}
            className={`w-full h-0.5 bg-black transition-all duration-200 ease-out shadow-lg ${
              isOpen && style.condition
            }`}
          ></div>
        ))}
      </button>
    </div>
  );
};

export default HamburgerMenu;
