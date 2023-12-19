export interface IStoreInfo {
  id: string;
  address: string;
  group: string;
  internet: string;
  latitude: string;
  longitude: string;
  name: string;
  number: string;
  parking: string;
  table: string;
  toilet: string;
  type: string;
  date: string;
}

export interface IReportInfo {
  id: string;
  address?: string;
  latitude?: string;
  longitude?: string;
  group: string;
  internet: string;
  name: string;
  number: string;
  parking: string;
  table: string;
  toilet: string;
  type: string;
  additional?: string;
}

export interface IUserInfo {
  name: string;
  email: string;
  uid: string;
  fav: string[];
}

export interface IUploadInfo {
  address: string;
  group: string;
  internet: string;
  latitude: string;
  longitude: string;
  name: string;
  number: string;
  parking: string;
  table: string;
  toilet: string;
  type: string;
}
