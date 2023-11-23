import React, { useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Map from "../components/Map";
import GetStoreInfo from "@/utils/firebase";
import "tailwindcss/tailwind.css";
import localFont from "next/font/local";
import "./globals.css";
export const Pretendard = localFont({
  src: "../styles/PretendardVariable.woff2",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head></head>
      <body>
        <main className={Pretendard.className}>
          <Header />
          <Sidebar />
          <Map />
        </main>
      </body>
    </html>
  );
}
