"use client";
import { useSidebarStore } from "@/store/sidebarStore";

const activeStyle = [
  { condition: "transform translate-y-1 rotate-45" },
  { condition: "opacity-0 -translate-x-20" },
  { condition: "transform -translate-y-2.5 -rotate-45" },
];
const HamburgerMenu = () => {
  const { isOpen, setToggle } = useSidebarStore();

  const handleActive = () => {
    setToggle();
  };

  return (
    <div className="flex items-center p-2" onClick={setToggle}>
      <button className="h-4 w-5 flex flex-col justify-between">
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
