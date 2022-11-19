import React from "react";
import AdminMenu from "../../AdminMenu/AdminMenu";
import Layout from "../../Layout/Layout";

const AdminDashboard = () => {
  return (
    <Layout title="Admin Dashboard">
      <div className="container max-w-[1140px] mt-20 m-auto">
        <AdminMenu />
      </div>
    </Layout>
  );
};

export default AdminDashboard;
