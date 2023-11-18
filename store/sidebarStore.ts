import { create } from "zustand";

export interface ISidebarStore {
  isOpen: boolean;
  setOpen: () => void;
}

const sidebarStore = create<ISidebarStore>(set => ({
  isOpen: true,
  setOpen: () => set(state => ({ isOpen: !state.isOpen })),
}));
export const useSidebarStore = () => sidebarStore(state => state);
