import React from "react";
import AdminMenuDetails from "../../AdminMenu/AdminMenuDetails";
import Layout from "../../Layout/Layout";

const AdminOrderDetails = () => {
  return (
    <Layout title="Admin details">
      <div className="container max-w-[1140px] mt-20 m-auto">
        <AdminMenuDetails />
      </div>
    </Layout>
  );
};

export default AdminOrderDetails;
