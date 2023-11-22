import React, { useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Map from "../components/Map";
import GetStoreInfo from "@/utils/firebase";
import localFont from "next/font/local";
export const Pretendard = localFont({
  src: "../styles/PretendardVariable.woff2",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const fetchData = async () => {
      const storeInfo = await GetStoreInfo();
    };

    fetchData();
  }, []);

  return (
    <main className={Pretendard.className}>
      <Header />
      <Sidebar />
      <Map />
    </main>
  );
}
