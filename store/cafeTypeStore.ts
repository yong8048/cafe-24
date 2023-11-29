import { create } from "zustand";

interface ICafeTypeStore {
  type: string;
  setType: (type: string) => void;
}

const cafeTypeStore = create<ICafeTypeStore>(set => ({
  type: "전체",
  setType: (state: string) => set({ type: state }),
}));

export const useCafeTypeStore = () => cafeTypeStore(state => state);
