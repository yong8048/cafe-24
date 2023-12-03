"use client";
import Map from "@/components/Map";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { useUserInfoStore } from "@/store/userInfoStore";
import { useEffect } from "react";

export default function Home() {
  const { resetUserInfo } = useUserInfoStore();
  useEffect(() => {
    resetUserInfo();
  }, []);
  return (
    <div>
      <Header />
      <Sidebar />
      <Map />
    </div>
  );
}
