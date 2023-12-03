import { IUserInfo } from "@/types/firebase";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface IUserInfoStore {
  userInfo: IUserInfo;
  setUserInfo: (userInfo: IUserInfo) => void;
  resetUserInfo: () => void;
}

const initialState = {
  name: "",
  email: "",
  uid: "",
  fav: [],
  admin: false,
};

const userInfoStore = create(
  persist<IUserInfoStore>(
    set => ({
      userInfo: initialState,
      setUserInfo: (state: IUserInfo) => set({ userInfo: state }),
      resetUserInfo: () => set({ userInfo: initialState }),
    }),
    { name: "userInfo", storage: createJSONStorage(() => localStorage) },
  ),
);

export const useUserInfoStore = () => userInfoStore(state => state);
