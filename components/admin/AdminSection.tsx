import React from "react";

const AdminSection = ({ children }: { children: React.ReactNode }) => {
  return <section className="flex h-main_section">{children}</section>;
};

export default AdminSection;
