import { IStoreInfo } from "./firebase";

declare global {
  interface Window {
    naver: any;
  }
}

export interface IMarkerInfo {
  data: IStoreInfo;
  setMap: any;
  setVisible: any;
}
