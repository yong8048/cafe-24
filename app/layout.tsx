"use client";
import localFont from "next/font/local";
import "./globals.css";
import ReactQueryProvider from "@/components/ReactQueryProvider";
import { useEffect } from "react";
const pretendard = localFont({
  src: "../styles/PretendardVariable.woff2",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    function setVhProperty() {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
      console.log(vh);
    }

    setVhProperty();
    window.addEventListener("resize", setVhProperty);

    return () => {
      window.removeEventListener("resize", setVhProperty);
    };
  }, []);

  return (
    <html lang="ko">
      <head>
        <link rel="icon" type="image/png" href="/favicon.png" />
        <title>새벽 감성 - 24시 카페</title>
        <meta name="viewport" content="width=device-width, minimal-ui, viewport-fit=cover" />
      </head>
      <body>
        <ReactQueryProvider>
          <main className={pretendard.className}>
            <div className="relative">{children}</div>
          </main>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
