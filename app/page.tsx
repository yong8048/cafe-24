"use client";
import { useState } from "react";
import Map from "@/components/Map";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import ReportButton from "@/components/ReportButton";

export default function Home() {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <>
      <Header />
      <Sidebar />
      <Map />
      <ReportButton />
    </>
  );
}
