import { adminID } from "@/constants/admin";
import { IUserInfo } from "@/types/firebase";

const isAdmin = (userInfo: IUserInfo) => {
  return adminID.includes(userInfo.uid);
};

export { isAdmin };
