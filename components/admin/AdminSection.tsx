import { useGetStores } from "@/hooks/useGetStores";
import React, { useEffect } from "react";

const AdminSection = ({ children }: { children: React.ReactNode }) => {
  const { refetch } = useGetStores();
  useEffect(() => {
    refetch();
  }, []);
  return <section className="flex h-main_section">{children}</section>;
};

export default AdminSection;
