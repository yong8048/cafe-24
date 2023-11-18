import { useState } from "react";

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleMenu}
        className={`h-4 w-5 flex flex-col justify-between ${
          isOpen && "text-red-500"
        }`}
      >
        <div className="w-full h-0.5 bg-black"></div>
        <div className="w-full h-0.5 bg-black"></div>
        <div className="w-full h-0.5 bg-black"></div>
      </button>
      <div
        className={`fixed top-[74px] left-0 h-full bg-gray-100 transition-width duration-300 ease-in-out ${
          isOpen ? "w-64" : "w-0"
        } overflow-hidden`}
      >
        <a href="#" className="block p-4">
          메뉴 1
        </a>
        <a href="#" className="block p-4">
          메뉴 2
        </a>
        <a href="#" className="block p-4">
          메뉴 3
        </a>
      </div>
    </div>
  );
};

export default HamburgerMenu;
