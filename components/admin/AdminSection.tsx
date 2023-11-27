import React from "react";
import AdminSidebar from "./AdminSidebar";
import AdminUploadForm from "./AdminUploadForm";

const AdminSection = () => {
  return (
    <section className="flex h-main_section">
      <AdminSidebar />
      <AdminUploadForm />
    </section>
  );
};

export default AdminSection;
