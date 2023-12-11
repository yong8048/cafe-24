import { create } from "zustand";

interface IReportClickStore {
  isReportClicked: boolean;
  setIsReportClicked: () => void;
}

const ReportClickStore = create<IReportClickStore>(set => ({
  isReportClicked: false,
  setIsReportClicked: () => set(state => ({ isReportClicked: !state.isReportClicked })),
}));

export const useReportClickStore = () => ReportClickStore(state => state);
