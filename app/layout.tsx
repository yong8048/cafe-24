import React, { useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Map from "../components/Map";
import GetStoreInfo from "@/utils/firebase";
import "tailwindcss/tailwind.css";
import localFont from "next/font/local";
import "./globals.css";
const pretendard = localFont({
  src: "../styles/PretendardVariable.woff2",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head></head>
      <body>
        <main className={pretendard.className}>
          <Header />
          <Sidebar />

          <div>{children}</div>
        </main>
      </body>
    </html>
  );
}
