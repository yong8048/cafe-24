import { IStoreInfo } from "@/types/firebase";
import { create } from "zustand";

interface IImageStore {
  urls: string[];
  setUrl: (url: string[]) => void;
  resetUrl: () => void;
}

const imageStore = create<IImageStore>(set => ({
  urls: [],
  setUrl: state => set({ urls: state }),
  resetUrl: () => set({ urls: ["/loading.gif"] }),
}));

export const useImageStore = () => imageStore(state => state);
