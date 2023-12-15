import localFont from "next/font/local";
import "./globals.css";
import ReactQueryProvider from "@/components/ReactQueryProvider";
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://cafe-24.vercel.app"),
  title: "새벽 감성 - 24시 카페",
  description: "24시 운영하는 카페들을 모아 찾아보는 사이트",
  keywords: ["24시", "24시카페", "무인카페", "새벽감성", "밤카페", "카공"],
  openGraph: {
    title: "새벽 감성 - 24시 카페",
    description: "24시 운영하는 카페들을 모아 찾아보는 사이트",
    url: "https://cafe-24.vercel.app",
    siteName: "새벽 감성 - 24시 카페",
    images: [
      {
        url: "/Logo.png",
        width: 600,
        height: 450,
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "https://cafe-24.vercel.app",
    title: "새벽 감성 - 24시 카페",
    description: "24시 운영하는 카페들을 모아 찾아보는 사이트",
    images: ["/Logo.png"],
  },
};

const pretendard = localFont({
  src: "../styles/PretendardVariable.woff2",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link rel="icon" type="image/png" href="/favicon.png" />
        <meta name="viewport" content="width=device-width, minimal-ui, viewport-fit=cover" />
        <meta name="google-site-verification" content="q9x7v3OCZ9KTW_JeVWCs9PFKl3oQCviK82JokLkQmzY" />
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
