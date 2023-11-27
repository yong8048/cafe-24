import { create } from "zustand";

interface IReportStore {
  data: string;
  setData: (state: string) => void;
}

const initialState = "";

const reportStore = create<IReportStore>(set => ({
  data: initialState,
  setData: state => set({ data: state }),
}));

export const useReportStore = () => reportStore(state => state);
