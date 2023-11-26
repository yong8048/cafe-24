import "tailwindcss/tailwind.css";
import localFont from "next/font/local";
import "./globals.css";
import ReactQueryProvider from "@/components/ReactQueryProvider";
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
        <ReactQueryProvider>
          <main className={pretendard.className}>
            <div>{children}</div>
          </main>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
