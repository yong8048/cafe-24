import { IStoreInfo } from "@/types/firebase";
import { create } from "zustand";

interface ISelectedStore {
  data: IStoreInfo;
  setData: (data: IStoreInfo) => void;
  resetData: () => void;
}

const initialState = {
  id: "",
  address: "",
  group: "",
  internet: "",
  latitude: "",
  longitude: "",
  name: "",
  number: "",
  parking: "",
  table: "",
  toilet: "",
  type: "",
};

const selectedStore = create<ISelectedStore>(set => ({
  data: initialState,
  setData: state => set({ data: state }),
  resetData: () => set({ data: initialState }),
}));

export const useSelectedStore = () => selectedStore(state => state);
