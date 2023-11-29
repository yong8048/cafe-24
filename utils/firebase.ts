import { IReportInfo, IStoreInfo } from "@/types/firebase";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { addDoc, getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import { getDownloadURL, getStorage, listAll, ref } from "firebase/storage";

const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
const authDomain = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN;
const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
const storageBucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
const messagingSenderId = process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID;
const appId = process.env.NEXT_PUBLIC_FIREBASE_APP_ID;

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: authDomain,
  projectId: projectId,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
  appId: appId,
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export const auth = () => {
  initializeApp(firebaseConfig);
  return getAuth();
};
export const GetStoreInfo = async (): Promise<IStoreInfo[]> => {
  console.log(firebaseConfig);
  const querySnapshot = await getDocs(collection(db, "StoreInfo"));
  const users: IStoreInfo[] = [];

  querySnapshot.forEach(doc => {
    users.push({
      id: doc.id,
      ...doc.data(),
    } as IStoreInfo);
  });

  return users; // 배열 반환
};

export const GetReportInfo = async (): Promise<IReportInfo[]> => {
  const querySnapshot = await getDocs(collection(db, "ReportInfo"));
  const res: IReportInfo[] = [];

  querySnapshot.forEach(doc => {
    res.push({
      name: doc.id,
      ...doc.data(),
    } as IReportInfo);
  });

  return res; // 배열 반환
};
export const PostStoreInfo = async (storeData: IStoreInfo) => {
  await addDoc(collection(db, "StoreInfo"), storeData);
};

export const getStoreImages = async (fileID: string) => {
  const folderRef = ref(storage, fileID);
  const imageListRef = await listAll(folderRef);

  const imageList = imageListRef.items.map(imageRef => {
    return getDownloadURL(imageRef)
      .then(url => {
        return url;
      })
      .catch(error => {
        console.log(error);
      });
  });

  const images = await Promise.all(imageList);
  return images;
};
