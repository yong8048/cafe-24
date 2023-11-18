import React from "react";
import Header from "../components/Header";
import Sidebar from "@/components/Sidebar";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <Sidebar />
      <main>{children}</main>
    </>
  );
}
