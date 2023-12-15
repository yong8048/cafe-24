"use client";
import Map from "@/components/Map";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import ReportButton from "@/components/ReportButton";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    function setVhProperty() {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    }

    setVhProperty();
    window.addEventListener("resize", setVhProperty);

    return () => {
      window.removeEventListener("resize", setVhProperty);
    };
  }, []);

  return (
    <>
      <Header />
      <Sidebar />
      <Map />
      <ReportButton />
    </>
  );
}
