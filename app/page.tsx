"use client";
import Map from "@/components/Map";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import ReportButton from "@/components/ReportButton";

export default function Home() {
  return (
    <>
      <Header />
      <Sidebar />
      <Map />
      <ReportButton />
    </>
  );
}
