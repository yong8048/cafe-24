"use client";
import AdminSidebar from "@/components/admin/report/AdminSidebar";
import AdminReportForm from "@/components/admin/report/AdminReportForm";
import { notFound, redirect, usePathname } from "next/navigation";
import React, { useEffect } from "react";
import AdminUploadForm from "@/components/admin/upload/AdminUploadForm";
import { useUserInfoStore } from "@/store/userInfoStore";
import { adminID } from "@/constants/admin";

type Tsection = "modify" | "report" | "upload";

const section = {
  modify: <></>,
  report: (
    <>
      <AdminSidebar />
      <AdminReportForm />
    </>
  ),
  upload: <AdminUploadForm />,
};
const Page = () => {
  const pathName = usePathname();
  const path = pathName.split("/")[2] as Tsection;
  const { userInfo } = useUserInfoStore();

  useEffect(() => {
    if (pathName.includes("admin") && (!userInfo.uid || !adminID.includes(userInfo.uid))) {
      notFound();
    }
  }, [pathName]);

  useEffect(() => {
    if (!(path in section)) {
      redirect("/admin");
    }
  }, []);

  return <>{section[path]}</>;
};

export default Page;
