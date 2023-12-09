import { IStoreInfo } from "./firebase";

declare global {
  interface Window {
    naver: any;
  }
}

interface IMarkerInfo {
  data: IStoreInfo;
  setMap: any;
  setVisible: any;
}

export { IMarkerInfo };
