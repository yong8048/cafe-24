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

export interface IMarkerOptions {
  position: any;
  map: any;
  data: IStoreInfo;
  icon?: {
    content: string;
    size: any;
    anchor: any;
  };
}
