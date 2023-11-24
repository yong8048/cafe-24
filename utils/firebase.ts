import { IStoreInfo } from "@/types/firebase";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAas4ZPpzBIXSwb0_CszYKx1flnq42f-AU",
  authDomain: "cafe-24-2286c.firebaseapp.com",
  projectId: "cafe-24-2286c",
  storageBucket: "cafe-24-2286c.appspot.com",
  messagingSenderId: "651313538644",
  appId: "1:651313538644:web:0611ae6b0c4279dc816fc1",
};
initializeApp(firebaseConfig);
const GetStoreInfo = async (): Promise<IStoreInfo[]> => {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

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

export default GetStoreInfo;
