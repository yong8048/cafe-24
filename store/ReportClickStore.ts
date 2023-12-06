import { create } from "zustand";

interface IReportClickStore {
  isClicked: boolean;
  setIsClicked: () => void;
}

const ReportClickStore = create<IReportClickStore>(set => ({
  isClicked: false,
  setIsClicked: () => set(state => ({ isClicked: !state.isClicked })),
}));

export const useReportClickStore = () => ReportClickStore(state => state);
