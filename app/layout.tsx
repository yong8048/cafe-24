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
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover"></meta>
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
