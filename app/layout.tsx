import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import "tailwindcss/tailwind.css";
import localFont from "next/font/local";
import "./globals.css";
const pretendard = localFont({
  src: "../styles/PretendardVariable.woff2",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link rel="icon" type="image/png" href="/favicon.png" />
        <title>새벽 감성 - 24시 카페</title>
      </head>
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
