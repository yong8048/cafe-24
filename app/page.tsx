"use client";
import { useEffect } from "react";
import Layout from "./layout";
import "tailwindcss/tailwind.css";
import GetStoreInfo from "@/utils/firebase";
export default function Home() {
  useEffect(() => {
    const fetchData = async () => {
      const storeInfo = await GetStoreInfo();
    };

    fetchData();
  }, []);
  return (
    <Layout>
      <div></div>
    </Layout>
  );
}
