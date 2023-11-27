"use client";
import AdminSidebar from "@/components/admin/report/AdminSidebar";
import AdminReportForm from "@/components/admin/report/AdminReportForm";
import { redirect, usePathname } from "next/navigation";
import React, { useEffect } from "react";

type Tsection = "modify" | "report" | "upload";

const section = {
  modify: <></>,
  report: (
    <>
      <AdminSidebar />
      <AdminReportForm />
    </>
  ),
  upload: (
    <>
      <AdminReportForm />
    </>
  ),
};
const Page = () => {
  const pathName = usePathname();
  const path = pathName.split("/")[2] as Tsection;

  useEffect(() => {
    if (!(path in section)) {
      redirect("/admin");
    }
  }, []);

  return <>{section[path]}</>;
};

export default Page;
