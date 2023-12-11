"use client";
import AdminDashboard from "@/components/admin/dashboard/AdminDashboard";
import { adminID } from "@/constants/admin";
import { useUserInfoStore } from "@/store/userInfoStore";
import { notFound, usePathname } from "next/navigation";
import React, { useEffect } from "react";

const DashBoard = () => {
  const pathName = usePathname();
  const { userInfo } = useUserInfoStore();

  useEffect(() => {
    if (pathName.includes("admin") && (!userInfo.uid || !adminID.includes(userInfo.uid))) {
      notFound();
    }
  }, [pathName]);

  return <AdminDashboard />;
};

export default DashBoard;
