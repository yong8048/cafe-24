import { IReportInfo } from "@/types/firebase";
import { create } from "zustand";

interface IReportStore {
  report: IReportInfo;
  setReport: (state: IReportInfo) => void;
  resetReport: () => void;
}

const initialState = {
  address: "",
  latitude: "",
  longitude: "",
  group: "",
  internet: "",
  name: "",
  number: "",
  parking: "",
  table: "",
  toilet: "",
  type: "",
  additional: "",
};

const reportStore = create<IReportStore>(set => ({
  report: initialState,
  setReport: state => set({ report: state }),
  resetReport: () => set({ report: initialState }),
}));

export const useReportStore = () => reportStore(state => state);
