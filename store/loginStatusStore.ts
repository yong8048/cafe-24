import { create } from "zustand";

interface ILoginStatusStore {
  loginStatus: boolean;
  setLoginStatus: (type: boolean) => void;
}

const loginStatusStore = create<ILoginStatusStore>(set => ({
  loginStatus: false,
  setLoginStatus: (state: boolean) => set({ loginStatus: state }),
}));

export const useLoginStatusStore = () => loginStatusStore(state => state);
