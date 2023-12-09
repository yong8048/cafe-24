import { create } from "zustand";

interface IReportLocationStore {
  location: {
    latitude: string;
    longitude: string;
  };
  setLocation: ({ latitude, longitude }: { latitude: string; longitude: string }) => void;
  resetLocation: () => void;
}

const initialState = {
  latitude: "",
  longitude: "",
};

const reportLocationStore = create<IReportLocationStore>(set => ({
  location: initialState,
  setLocation: state => set({ location: { latitude: state.latitude, longitude: state.longitude } }),
  resetLocation: () => set({ location: initialState }),
}));

export const useReportLocationStore = () => reportLocationStore(state => state);
