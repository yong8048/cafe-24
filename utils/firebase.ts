import { IReportInfo, IStoreInfo, IUploadInfo, IUserInfo } from "@/types/firebase";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import {
  addDoc,
  arrayUnion,
  doc,
  getDoc,
  getFirestore,
  setDoc,
  updateDoc,
  collection,
  getDocs,
  arrayRemove,
  deleteDoc,
} from "firebase/firestore";
import { getDownloadURL, getStorage, listAll, ref, uploadBytes } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
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

export const PostStoreInfo = async (storeData: IUploadInfo, files: File[]) => {
  try {
    const docRef = await addDoc(collection(db, "StoreInfo"), storeData);
    files.map(async (file, index) => {
      const imageRef = ref(storage, `${docRef.id}/${index + 1}`);
      await uploadBytes(imageRef, file);
    });
    alert("업로드 완료");
    return true;
  } catch (error) {
    console.error("Error adding document: ", error);
    alert("업로드 실패");
    return "";
  }
};

export const GetReportInfo = async (): Promise<IReportInfo[]> => {
  const querySnapshot = await getDocs(collection(db, "ReportInfo"));
  const res: IReportInfo[] = [];

  querySnapshot.forEach(doc => {
    res.push({
      id: doc.id,
      ...doc.data(),
    } as IReportInfo);
  });
  return res; // 배열 반환
};

export const PostReportInfo = async (reportData: IReportInfo, address: string) => {
  reportData.address = address;
  const res = addDoc(collection(db, "ReportInfo"), reportData)
    .then(async result => {
      await updateDoc(doc(db, "ReportInfo", result.id), {
        id: result.id,
      });
      alert("소중한 제보 감사합니다.");
      return true;
    })
    .catch(error => {
      console.error(error);
      alert("에러발생\n사이트 새로고침 후 다시시도해주세요");
      return "";
    });
  return res;
};

export const AcceptReportInfo = async (reportData: IReportInfo, files: File[]) => {
  const { id, ..._reportData } = reportData;
  const res = await addDoc(collection(db, "StoreInfo"), _reportData)
    .then(async result => {
      files.map(async (file, index) => {
        const imageRef = ref(storage, `${result.id}/${index + 1}`);
        await uploadBytes(imageRef, file);
      });
      const deleteRes = await DeleteReportInfo(id, false);
      if (deleteRes) {
        alert("승인 완료");
        return true;
      }
    })
    .catch(error => {
      console.error(error);
      alert("에러 발생");
      return false;
    });
  return res;
};

export const DeleteReportInfo = async (reportID: string, isReject: boolean) => {
  const reportDoc = doc(db, "ReportInfo", reportID);
  const res = await deleteDoc(reportDoc)
    .then(() => {
      isReject && alert("삭제 완료");
      return true;
    })
    .catch(error => {
      console.error(error);
      alert("에러 발생");
      return false;
    });
  return res;
};

export const GetStoreImages = async (fileID: string) => {
  const folderRef = ref(storage, fileID);
  const imageListRef = await listAll(folderRef);

  const imageList = imageListRef.items.map(imageRef => {
    return getDownloadURL(imageRef)
      .then(url => {
        return url;
      })
      .catch(error => {
        console.error(error);
      });
  });

  const images = await Promise.all(imageList);
  return images;
};

export const PostUserInfo = async (userInfo: IUserInfo) => {
  try {
    const isExist = await GetIsExistUser(userInfo.uid);
    if (!isExist) {
      await setDoc(doc(db, "UserInfo", userInfo.uid), userInfo);
    }
  } catch (error) {
    console.error("Error adding UserInfo: ", error);
  }
};

export const GetUserInfo = async (userID: string) => {
  try {
    const querySnapshot = await getDoc(doc(db, "UserInfo", userID));
    return querySnapshot.data() as IUserInfo;
  } catch (error) {
    console.error(error);
  }
};
export const GetTotalUser = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "UserInfo"));

    return querySnapshot.size;
  } catch (error) {
    console.error(error);
  }
};
export const GetReportSize = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "ReportInfo"));

    return querySnapshot.size;
  } catch (error) {
    console.error(error);
  }
};

export const GetIsExistUser = async (uid: string) => {
  const querySnapshot = await getDoc(doc(db, "UserInfo", uid));
  return querySnapshot.exists();
};

export const PostFavStore = async (userID: string, storeID: string, isDelete: boolean) => {
  // TODO: currentUser 체크 추가
  try {
    await updateDoc(doc(db, "UserInfo", userID), {
      fav: isDelete ? arrayRemove(storeID) : arrayUnion(storeID),
    });
    return await GetFavStore(userID);
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

export const GetFavStore = async (userID: string) => {
  try {
    const querySnapshot = await getDoc(doc(db, "UserInfo", userID));
    return (querySnapshot.data() as IUserInfo).fav;
  } catch (error) {
    console.error("Error adding UserInfo: ", error);
  }
};
