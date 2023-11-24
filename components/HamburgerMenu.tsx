import { useSidebarStore } from "@/store/sidebarStore";

const HamburgerMenu = () => {
  const { setOpen } = useSidebarStore();

  return (
    <div className="flex items-center p-2" onClick={setOpen}>
      <button className="h-4 w-5 flex flex-col justify-between">
        <div className="w-full h-0.5 bg-black"></div>
        <div className="w-full h-0.5 bg-black"></div>
        <div className="w-full h-0.5 bg-black"></div>
      </button>
    </div>
  );
};

export default HamburgerMenu;
