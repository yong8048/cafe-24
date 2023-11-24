import { create } from "zustand";

export interface ISidebarStore {
  isOpen: boolean;
  setToggle: () => void;
  setOpen: () => void;
}

const sidebarStore = create<ISidebarStore>(set => ({
  isOpen: true,
  setToggle: () => set(state => ({ isOpen: !state.isOpen })),
  setOpen: () => set({ isOpen: true }),
}));
export const useSidebarStore = () => sidebarStore(state => state);
