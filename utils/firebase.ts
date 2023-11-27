import { IStoreInfo } from "@/types/firebase";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { addDoc, getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import { getDownloadURL, getStorage, listAll, ref } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAas4ZPpzBIXSwb0_CszYKx1flnq42f-AU",
  authDomain: "cafe-24-2286c.firebaseapp.com",
  projectId: "cafe-24-2286c",
  storageBucket: "cafe-24-2286c.appspot.com",
  messagingSenderId: "651313538644",
  appId: "1:651313538644:web:0611ae6b0c4279dc816fc1",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export const auth = () => {
  initializeApp(firebaseConfig);
  return getAuth();
};
export const GetStoreInfo = async (): Promise<IStoreInfo[]> => {
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

export const PostStoreInfo = async (storeData: IStoreInfo) => {
  const a = await addDoc(collection(db, "StoreInfo"), storeData);
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
